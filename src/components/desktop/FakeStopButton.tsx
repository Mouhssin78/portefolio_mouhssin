import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { useDesktopStore } from '../../store/useDesktopStore'
import { findSafeFleePosition } from '../../utils/findSafeFleePosition'

const IDLE_MS = 150
const INITIAL_LEFT = 8
const INITIAL_BOTTOM_OFFSET = 80

function computeInitialPosition(boundsEl: HTMLElement, button: HTMLElement) {
  const boundsHeight = boundsEl.getBoundingClientRect().height
  const buttonHeight = button.getBoundingClientRect().height
  return {
    x: INITIAL_LEFT,
    y: boundsHeight - INITIAL_BOTTOM_OFFSET - buttonHeight,
  }
}

export function FakeStopButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const stopButtonResetCount = useDesktopStore((state) => state.stopButtonResetCount)

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  const resetToInitialPosition = useCallback(() => {
    const container = containerRef.current
    const button = buttonRef.current
    if (!container || !button) return

    const boundsEl = container.closest('[data-desktop-root]')
    if (!(boundsEl instanceof HTMLElement)) return

    setPosition(computeInitialPosition(boundsEl, button))
    clearIdleTimer()
  }, [clearIdleTimer])

  useLayoutEffect(() => {
    const container = containerRef.current
    const button = buttonRef.current
    if (!container || !button) return

    const boundsEl = container.closest('[data-desktop-root]')
    if (!(boundsEl instanceof HTMLElement)) return

    setPosition(computeInitialPosition(boundsEl, button))
  }, [])

  useLayoutEffect(() => {
    if (stopButtonResetCount === 0) return
    resetToInitialPosition()
  }, [stopButtonResetCount, resetToInitialPosition])

  const flee = useCallback(() => {
    const container = containerRef.current
    const button = buttonRef.current
    if (!container || !button) return

    const boundsEl = container.closest('[data-desktop-root]')
    if (!(boundsEl instanceof HTMLElement)) return

    const next = findSafeFleePosition(button, boundsEl, container)
    setPosition(next)
    clearIdleTimer()
  }, [clearIdleTimer])

  const scheduleIdleFlee = useCallback(() => {
    clearIdleTimer()
    idleTimerRef.current = setTimeout(() => {
      flee()
    }, IDLE_MS)
  }, [clearIdleTimer, flee])

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault()
    flee()
  }

  const handlePointerMove = () => {
    scheduleIdleFlee()
  }

  const handlePointerEnter = () => {
    scheduleIdleFlee()
  }

  const handlePointerLeave = () => {
    clearIdleTimer()
  }

  return (
    <div
      ref={containerRef}
      className="absolute z-[9999] transition-[left,top] duration-200 ease-out"
      style={position ? { left: position.x, top: position.y } : { visibility: 'hidden' }}
    >
      <button
        ref={buttonRef}
        type="button"
        className="retro-border cursor-pointer bg-[var(--color-retro-yellow)] px-2 py-0.5 text-[10px] font-bold"
        title="Arrêter"
        aria-label="Arrêter — bouton qui s'enfuit"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        Arrêter
      </button>
    </div>
  )
}
