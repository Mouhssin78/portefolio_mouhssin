import type { ComponentType } from 'react'
import { IconAbout } from './IconAbout'
import { IconFolderDesktop } from './IconFolderDesktop'
import { IconLinkedIn } from './IconLinkedIn'
import { IconMail } from './IconMail'

const ICON_MAP: Record<string, ComponentType> = {
  about: IconAbout,
  contact: IconMail,
  linkedin: IconLinkedIn,
  'project-default': IconFolderDesktop,
}

export function getIconComponent(iconKey: string): ComponentType {
  return ICON_MAP[iconKey] ?? IconFolderDesktop
}
