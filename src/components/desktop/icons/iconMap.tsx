import type { ComponentType } from 'react'
import { IconAbout } from './IconAbout'
import { IconFolder } from './IconFolder'
import { IconLinkedIn } from './IconLinkedIn'
import { IconMail } from './IconMail'
import { IconProject } from './IconProject'

const ICON_MAP: Record<string, ComponentType> = {
  about: IconAbout,
  contact: IconMail,
  linkedin: IconLinkedIn,
  'project-default': IconProject,
}

export function getIconComponent(iconKey: string): ComponentType {
  return ICON_MAP[iconKey] ?? IconFolder
}
