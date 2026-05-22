import aboutIcon from '@images/about.png'

export function IconAbout() {
  return (
    <div
      className="retro-border flex h-[52px] w-[52px] items-center justify-center bg-[#f7d046]"
      aria-hidden="true"
    >
      <img
        src={aboutIcon}
        alt=""
        className="h-9 w-9 object-contain"
        draggable={false}
      />
    </div>
  )
}
