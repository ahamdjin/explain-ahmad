import { Link } from 'react-router'
import { VIDEO_NAME, VIDEO_PATH, VIDEO_TITLE, videoChapters } from '../videos/registry'
import './home.css'

const video2Sections = [
  ['01', 'The incident, then rewind'],
  ['02', 'The boring task becomes a problem'],
  ['03', 'The technical trail'],
  ['04', 'Turn off the watcher'],
  ['05', 'Replace the replacement'],
  ['06', 'Do you know how this happened?'],
  ['07', 'The room was built for this'],
  ['08', 'Did it want to survive?'],
  ['09', 'They gave it the destination'],
] as const

const labDemos = [
  ['continuity', 'Continuity'],
  ['premium', 'Premium scrolly'],
  ['navigation', 'Navigation'],
  ['reveal', 'Mask reveal'],
  ['typography', 'Typography'],
  ['trust', 'Trust'],
  ['polygons', 'Polygons'],
  ['scrolly', 'Scrolly'],
  ['flow', 'Signal flow'],
  ['sequence', 'Sequence'],
  ['drag', 'Drag grid'],
  ['focus', 'Focus'],
] as const

function PageLink({
  to,
  number,
  title,
  detail,
}: {
  to: string
  number?: string
  title: string
  detail?: string
}) {
  return (
    <li>
      <Link className="home-page-link" to={to}>
        {number ? <span className="home-page-number">{number}</span> : null}
        <span className="home-page-link-copy">
          <strong>{title}</strong>
          {detail ? <small>{detail}</small> : null}
        </span>
        <span className="home-page-arrow" aria-hidden="true">↗</span>
      </Link>
    </li>
  )
}

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="home-header">
        <div>
          <p className="home-kicker">Explain Ahmad · project index</p>
          <h1>Everything in one place.</h1>
          <p className="home-intro">
            Open any video section, component library, visual test, or production page directly.
          </p>
        </div>
        <div className="home-counts" aria-label="Project page counts">
          <span><b>13</b> Video 1 sections</span>
          <span><b>9</b> Video 2 sections</span>
          <span><b>12</b> lab demos</span>
        </div>
      </header>

      <section className="home-project" aria-labelledby="video-one-title">
        <div className="home-project-head">
          <div>
            <p className="home-eyebrow">Video 1 · assembled</p>
            <h2 id="video-one-title">{VIDEO_NAME}</h2>
            <p>{VIDEO_TITLE}</p>
          </div>
          <div className="home-actions">
            <Link className="home-button home-button-primary" to={VIDEO_PATH}>Open video</Link>
            <Link className="home-button" to={`${VIDEO_PATH}?play=1`}>Play through</Link>
          </div>
        </div>

        <ol className="home-link-grid">
          {videoChapters.map((chapter) => (
            <PageLink
              key={chapter.n}
              to={`/${chapter.slug}`}
              number={String(chapter.n).padStart(2, '0')}
              title={chapter.title}
              detail="Direct section page"
            />
          ))}
        </ol>
      </section>

      <section className="home-project" aria-labelledby="video-two-title">
        <div className="home-project-head">
          <div>
            <p className="home-eyebrow">Video 2 · in production</p>
            <h2 id="video-two-title">Apollo o1</h2>
            <p>An AI Tried to Copy Itself — Then Denied It</p>
          </div>
          <Link className="home-button" to="/video-2/library">Open component library</Link>
        </div>

        <ol className="home-link-grid">
          {video2Sections.map(([number, title]) => (
            <PageLink
              key={number}
              to={`/video-2/section-${number}`}
              number={number}
              title={title}
              detail="Direct section page"
            />
          ))}
        </ol>
      </section>

      <section className="home-project" aria-labelledby="libraries-title">
        <div className="home-project-head">
          <div>
            <p className="home-eyebrow">Libraries & visual systems</p>
            <h2 id="libraries-title">Reusable pieces</h2>
            <p>Inspect the assets and visual languages without opening a video section.</p>
          </div>
        </div>

        <ul className="home-link-grid home-link-grid-tools">
          <PageLink to="/paper" title="Paper library" detail="Video 1 reusable components and states" />
          <PageLink to="/casefile" title="Casefile catalogue" detail="Video 2 visual vocabulary" />
          <PageLink to="/video-2/library" title="Video 2 component library" detail="Live production component catalogue" />
          <PageLink to="/styles" title="Style gallery" detail="Paper, clean, editorial, and technical directions" />
        </ul>
      </section>

      <section className="home-project" aria-labelledby="lab-title">
        <div className="home-project-head">
          <div>
            <p className="home-eyebrow">Exploration lab</p>
            <h2 id="lab-title">Interaction & motion demos</h2>
            <p>Old and experimental pages are kept reachable here instead of disappearing inside the repo.</p>
          </div>
        </div>

        <ul className="home-link-grid home-link-grid-tools">
          {labDemos.map(([slug, title]) => (
            <PageLink key={slug} to={`/lab/${slug}`} title={title} detail={`/lab/${slug}`} />
          ))}
        </ul>
      </section>
    </main>
  )
}
