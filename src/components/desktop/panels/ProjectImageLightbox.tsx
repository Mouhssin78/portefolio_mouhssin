import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ProjectImageLightboxProps {
  images: string[]
  currentIndex: number
  title: string
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ProjectImageLightbox({
  images,
  currentIndex,
  title,
  onClose,
  onNavigate,
}: ProjectImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const hasMultiple = images.length > 1

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length)
  }, [currentIndex, images.length, onNavigate])

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (!hasMultiple) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [goNext, goPrev, hasMultiple, onClose])

  const currentSrc = images[currentIndex]

  return createPortal(
    <div
      className="retro-lightbox"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="retro-lightbox-window retro-window"
        role="dialog"
        aria-modal="true"
        aria-label={`Aperçu — ${title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="retro-window-titlebar">
          <div className="retro-window-controls" aria-hidden="true">
            <span className="retro-window-control" />
            <span className="retro-window-control" />
          </div>
          <span>Aperçu</span>
          <div className="retro-window-controls-right">
            <button
              ref={closeButtonRef}
              type="button"
              className="retro-close-btn"
              aria-label="Fermer l'aperçu"
              onClick={onClose}
            >
              ×
            </button>
          </div>
        </div>

        <div className="retro-lightbox-body">
          {hasMultiple && (
            <button
              type="button"
              className="retro-lightbox-nav retro-lightbox-nav--prev"
              aria-label="Image précédente"
              onClick={goPrev}
            >
              ‹
            </button>
          )}

          <figure className="retro-lightbox-figure">
            <img
              src={currentSrc}
              alt={`${title} — image ${currentIndex + 1}`}
              className="retro-lightbox-image"
            />
            {hasMultiple && (
              <figcaption className="retro-lightbox-counter">
                {currentIndex + 1} / {images.length}
              </figcaption>
            )}
          </figure>

          {hasMultiple && (
            <button
              type="button"
              className="retro-lightbox-nav retro-lightbox-nav--next"
              aria-label="Image suivante"
              onClick={goNext}
            >
              ›
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
