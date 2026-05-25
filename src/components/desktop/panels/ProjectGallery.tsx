import { useState } from 'react'
import { ProjectImageLightbox } from './ProjectImageLightbox'

interface ProjectGalleryProps {
  images: string[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (images.length === 0) return null

  const gridClass =
    images.length === 1 ? 'retro-gallery-grid retro-gallery-grid--single' : 'retro-gallery-grid'

  return (
    <>
      <div className={`retro-gallery ${gridClass}`}>
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            className="retro-gallery-thumb"
            aria-label={`Voir ${title} — image ${index + 1} en grand`}
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={src}
              alt=""
              className="retro-gallery-thumb__image"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 480px) 92vw, 432px"
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ProjectImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          title={title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  )
}
