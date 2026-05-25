import { useEffect, useState } from 'react'

export function useCoarsePointer(): boolean {
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(pointer: coarse)').matches
      : false,
  )

  useEffect(() => {
    const media = window.matchMedia('(pointer: coarse)')
    const sync = () => setIsCoarse(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return isCoarse
}
