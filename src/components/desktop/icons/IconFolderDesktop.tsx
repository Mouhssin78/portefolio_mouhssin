import { DESKTOP_ICON_YELLOW } from './IconFolder'

const DESKTOP_ICON_BLACK = '#111111'
const DESKTOP_ICON_WHITE = '#faf8f4'

export function IconFolderDesktop() {
  return (
    <svg width={52} height={52} viewBox="0 0 52 52" aria-hidden="true">
      <path
        d="M6 14h16l4 6h20v26H6V14z"
        fill={DESKTOP_ICON_YELLOW}
        stroke={DESKTOP_ICON_BLACK}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="24"
        width="18"
        height="14"
        rx="1"
        fill={DESKTOP_ICON_WHITE}
        stroke={DESKTOP_ICON_BLACK}
        strokeWidth="2"
      />
    </svg>
  )
}
