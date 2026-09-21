import { VIDEO_TITLE, videoChapters } from '../videos/registry'
import FilmPage from './FilmPage'

export default function WatchPage() {
  return <FilmPage title={VIDEO_TITLE} chapters={videoChapters} />
}
