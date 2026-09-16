import { Link } from 'react-router'
import { VIDEO_NAME, VIDEO_PATH, VIDEO_TITLE, videoChapters } from '../videos/registry'
import './home.css'

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="film-title">
        <p className="home-kicker">Production preview · 13 chapters</p>
        <p className="home-name">{VIDEO_NAME}</p>
        <h1 id="film-title">{VIDEO_TITLE}</h1>
        <p className="home-intro">
          Open the film from the beginning, let it play through, or jump directly to any chapter below.
        </p>
        <div className="home-actions">
          <Link className="home-button home-button-primary" to={VIDEO_PATH}>
            Open video
          </Link>
          <Link className="home-button" to={`${VIDEO_PATH}?play=1`}>
            Play through
          </Link>
        </div>
      </section>

      <section className="home-chapters" aria-labelledby="chapters-title">
        <div className="home-chapters-heading">
          <h2 id="chapters-title">Chapters</h2>
          <span>Jump in anywhere</span>
        </div>
        <ol className="home-chapter-list">
          {videoChapters.map((chapter) => (
            <li key={chapter.n}>
              <Link to={`${VIDEO_PATH}?section=${chapter.n}`}>
                <span className="home-chapter-number">{String(chapter.n).padStart(2, '0')}</span>
                <span>{chapter.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
