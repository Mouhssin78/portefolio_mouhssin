import type { ReactNode } from 'react'

interface DesktopIconProps {
  label: string
  onOpen: () => void
  children: ReactNode
}

export function DesktopIcon({ label, onOpen, children }: DesktopIconProps) {
  return (
    <button
      type="button"
      className="retro-icon-tile"
      onDoubleClick={onOpen}
      onClick={(event) => {
        if (window.matchMedia('(pointer: coarse)').matches) onOpen()
        event.currentTarget.focus()
      }}
    >
      {children}
      <span className="retro-icon-label">{label}</span>
    </button>
  )
}
