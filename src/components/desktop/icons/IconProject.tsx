import projectsIcon from '@images/projects.png'

export function IconProject() {
  return (
    <img
      src={projectsIcon}
      alt=""
      width={52}
      height={52}
      className="h-[52px] w-[52px] object-contain"
      draggable={false}
      aria-hidden="true"
    />
  )
}
