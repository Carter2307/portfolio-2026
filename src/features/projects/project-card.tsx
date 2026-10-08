import { Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState, type Ref } from 'react'
import type { Project } from '@/content/types'
import { useI18n } from '@/i18n'

interface ProjectCardProps {
  project: Project
  className: string
  active?: boolean
  anchorRef?: Ref<HTMLSpanElement>
  onFocus: () => void
}

export function ProjectCard({
  project,
  className,
  active = true,
  anchorRef,
  onFocus,
}: ProjectCardProps) {
  const { t } = useI18n()
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!active) {
      video.pause()
      return
    }

    let visible = false
    const updatePlayback = () => {
      if (visible && !document.hidden) {
        void video.play().catch(() => {
          // Browsers may defer autoplay until the user interacts with the page.
        })
      } else {
        video.pause()
      }
    }
    // Both responsive layouts exist in the DOM; only the visible one should play.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false
      updatePlayback()
    })
    observer.observe(video)
    document.addEventListener('visibilitychange', updatePlayback)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', updatePlayback)
      video.pause()
    }
  }, [active, project.video])

  const soundLabel = muted ? t.projects.unmute : t.projects.mute
  const SoundIcon = muted ? VolumeX : Volume2
  const hasSoundControl = Boolean(project.video) && project.videoHasAudio !== false

  return (
    <div
      className={className}
      data-active={active ? 'true' : 'false'}
      aria-hidden={!active || undefined}
      inert={!active}
      onFocus={onFocus}
    >
      {anchorRef && <span ref={anchorRef} className="project-preview-anchor" aria-hidden="true" />}
      {(project.openSource || hasSoundControl) && (
        <div className="project-media-header">
          {project.openSource && (
            <span className="project-open-source">{t.projects.openSource}</span>
          )}
          {hasSoundControl && (
            <button
              type="button"
              className="project-video-toggle"
              aria-label={soundLabel}
              title={soundLabel}
              onClick={() => setMuted((current) => !current)}
            >
              <SoundIcon size={16} strokeWidth={1.75} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
      <a
        className="project-preview-content"
        href={project.href}
        aria-label={project.name}
        aria-describedby={`project-${project.id}-description`}
      >
        <span className="project-thumbnail">
          {project.video ? (
            <video
              ref={videoRef}
              className="project-video"
              src={project.video}
              autoPlay={active}
              loop
              muted={muted}
              playsInline
              preload={active ? 'metadata' : 'none'}
              aria-hidden="true"
            />
          ) : (
            <span className="project-thumbnail-initials" aria-hidden="true">
              {project.name.slice(0, 2)}
            </span>
          )}
        </span>
        <span className="project-details">
          <span className="project-description">{project.description}</span>
          <span className="project-stack">
            {project.stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </span>
        </span>
      </a>
    </div>
  )
}
