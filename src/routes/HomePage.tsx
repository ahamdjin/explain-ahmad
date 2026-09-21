import { Link } from 'react-router'
import { VIDEO2_NAME, VIDEO2_PATH, VIDEO2_TITLE, video2Chapters } from '../videos/apollo-o1/video-2/registry'
import { VIDEO_NAME, VIDEO_PATH, VIDEO_TITLE, videoChapters } from '../videos/registry'
import './home.css'

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="film-2-title">
        <p className="home-kicker">In build · 9 chapters · ~11:00</p>
        <p className="home-name">{VIDEO2_NAME}</p>
        <h1 id="film-2-title">{VIDEO2_TITLE}</h1>
        <p className="home-intro">
          The Apollo Research o1 evaluation, drawn from the transcripts and the system card.
        </p>
        <div className="home-actions">
          <Link className="home-button home-button-primary" to={VIDEO2_PATH}>
            Open video 2
          </Link>
          <Link className="home-button" to={`${VIDEO2_PATH}?play=1`}>
            Play through
          </Link>
        </div>
      </section>

      <section className="home-chapters" aria-labelledby="chapters-2-title">
        <div className="home-chapters-heading">
          <h2 id="chapters-2-title">Video 2 chapters</h2>
          <span>Jump in anywhere</span>
        </div>
        <ol className="home-chapter-list">
          {video2Chapters.map((chapter) => (
            <li key={chapter.n}>
              <Link to={`${VIDEO2_PATH}?section=${chapter.n}`}>
                <span className="home-chapter-number">{String(chapter.n).padStart(2, '0')}</span>
                <span>{chapter.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

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
