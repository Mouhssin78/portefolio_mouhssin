const OBSTACLE_SELECTORS = [
  '.retro-menu-bar',
  '.retro-menu-bar ul',
  '.retro-dock-item',
  '.retro-icon-tile',
  '.retro-window',
  '[role="menu"]',
].join(', ')

const PADDING = 12
const MAX_ATTEMPTS = 40
const BOUNDS_INSET = { top: 36, bottom: 100, left: 8, right: 8 }

interface Rect {
  left: number
  top: number
  right: number
  bottom: number
}

function toRect(domRect: DOMRect): Rect {
  return {
    left: domRect.left,
    top: domRect.top,
    right: domRect.right,
    bottom: domRect.bottom,
  }
}

function expandRect(rect: Rect, padding: number): Rect {
  return {
    left: rect.left - padding,
    top: rect.top - padding,
    right: rect.right + padding,
    bottom: rect.bottom + padding,
  }
}

function rectsOverlap(a: Rect, b: Rect): boolean {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom)
}

function rectCenter(rect: Rect): { x: number; y: number } {
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2,
  }
}

function distanceBetweenCenters(a: Rect, b: Rect): number {
  const ca = rectCenter(a)
  const cb = rectCenter(b)
  const dx = ca.x - cb.x
  const dy = ca.y - cb.y
  return Math.hypot(dx, dy)
}

function collectObstacleRects(boundsEl: HTMLElement, excludeEl?: HTMLElement): Rect[] {
  const obstacles = boundsEl.querySelectorAll(OBSTACLE_SELECTORS)
  const rects: Rect[] = []

  obstacles.forEach((el) => {
    if (!(el instanceof HTMLElement)) return
    if (excludeEl?.contains(el) || el === excludeEl) return
    const rect = el.getBoundingClientRect()
    if (rect.width === 0 && rect.height === 0) return
    rects.push(expandRect(toRect(rect), PADDING))
  })

  return rects
}

function isPositionSafe(candidate: Rect, obstacles: Rect[]): boolean {
  return !obstacles.some((obstacle) => rectsOverlap(candidate, obstacle))
}

function getPlayArea(boundsEl: HTMLElement, buttonWidth: number, buttonHeight: number): Rect {
  const bounds = boundsEl.getBoundingClientRect()
  return {
    left: bounds.left + BOUNDS_INSET.left,
    top: bounds.top + BOUNDS_INSET.top,
    right: bounds.right - BOUNDS_INSET.right - buttonWidth,
    bottom: bounds.bottom - BOUNDS_INSET.bottom - buttonHeight,
  }
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function candidateFromAbsolute(
  left: number,
  top: number,
  width: number,
  height: number,
): Rect {
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  }
}

function findFarthestCorner(
  playArea: Rect,
  buttonWidth: number,
  buttonHeight: number,
  obstacles: Rect[],
): { x: number; y: number } {
  const corners = [
    { x: playArea.left, y: playArea.top },
    { x: playArea.right, y: playArea.top },
    { x: playArea.left, y: playArea.bottom },
    { x: playArea.right, y: playArea.bottom },
  ]

  const obstacleCenters = obstacles.map(rectCenter)
  const avgObstacle =
    obstacleCenters.length > 0
      ? {
          x: obstacleCenters.reduce((sum, c) => sum + c.x, 0) / obstacleCenters.length,
          y: obstacleCenters.reduce((sum, c) => sum + c.y, 0) / obstacleCenters.length,
        }
      : { x: (playArea.left + playArea.right) / 2, y: (playArea.top + playArea.bottom) / 2 }

  let best = corners[0]
  let bestDistance = -1

  for (const corner of corners) {
    const candidate = candidateFromAbsolute(corner.x, corner.y, buttonWidth, buttonHeight)
    const dist = distanceBetweenCenters(candidate, {
      left: avgObstacle.x,
      top: avgObstacle.y,
      right: avgObstacle.x,
      bottom: avgObstacle.y,
    })
    if (dist > bestDistance) {
      bestDistance = dist
      best = corner
    }
  }

  return best
}

export function findSafeFleePosition(
  buttonEl: HTMLElement,
  boundsEl: HTMLElement,
  excludeEl?: HTMLElement,
): { x: number; y: number } {
  const buttonRect = buttonEl.getBoundingClientRect()
  const boundsRect = boundsEl.getBoundingClientRect()
  const buttonWidth = buttonRect.width
  const buttonHeight = buttonRect.height
  const playArea = getPlayArea(boundsEl, buttonWidth, buttonHeight)
  const obstacles = collectObstacleRects(boundsEl, excludeEl)

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const left = randomInRange(playArea.left, Math.max(playArea.left, playArea.right))
    const top = randomInRange(playArea.top, Math.max(playArea.top, playArea.bottom))
    const candidate = candidateFromAbsolute(left, top, buttonWidth, buttonHeight)

    if (isPositionSafe(candidate, obstacles)) {
      return {
        x: left - boundsRect.left,
        y: top - boundsRect.top,
      }
    }
  }

  const fallback = findFarthestCorner(playArea, buttonWidth, buttonHeight, obstacles)
  return {
    x: fallback.x - boundsRect.left,
    y: fallback.y - boundsRect.top,
  }
}
