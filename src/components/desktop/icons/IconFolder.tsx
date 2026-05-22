interface IconFolderProps {
  fill?: string
  size?: number
}

export const DESKTOP_ICON_YELLOW = '#f7d046'
export const PROJECT_FOLDER_FILL = 'var(--color-retro-project)'

export function IconFolder({ fill = DESKTOP_ICON_YELLOW, size = 52 }: IconFolderProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" aria-hidden="true">
      <path
        d="M6 14h16l4 6h20v26H6V14z"
        fill={fill}
        stroke="var(--color-retro-black)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="18"
        y="24"
        width="18"
        height="14"
        rx="1"
        fill="var(--color-retro-white)"
        stroke="var(--color-retro-black)"
        strokeWidth="2"
      />
    </svg>
  )
}
