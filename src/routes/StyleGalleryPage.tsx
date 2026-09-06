import { SceneFrame, VideoPage, type ArtDirection } from '../engine/SceneFrame'
import { SnapStory } from '../engine/SnapStory'
import { SketchAnnotation } from '../visuals/SketchAnnotation'
import { SketchArrow } from '../visuals/SketchShape'
import { VisualIcon } from '../visuals/VisualIcon'

const styles: Array<{ art: ArtDirection; name: string; note: string }> = [
  { art: 'paper', name: 'Paper / Sketch', note: 'Warm surface, imperfect geometry, Ncase-like charm.' },
  { art: 'clean', name: 'Clean', note: 'Pure white, restrained lines, maximum readability.' },
  { art: 'editorial', name: 'Editorial', note: 'Bigger type, stronger pacing, magazine-like composition.' },
  { art: 'technical', name: 'Technical', note: 'Grid logic, structured diagrams, engineering explanations.' },
]

function StyleScene({ art, name, note, index }: { art: ArtDirection; name: string; note: string; index: number }) {
  return (
    <SceneFrame art={art}>
      <span className="video-route-badge">/styles · 0{index + 1}</span>
      <div className="scene-grid">
        <div className="scene-copy">
          <p className="scene-kicker">ART DIRECTION</p>
          <h1 className="scene-title">{name}</h1>
          <p className="scene-body">{note}</p>
          {art === 'paper' && <p className="scene-body">Use <SketchAnnotation type="circle" color="#55a99e">imperfection</SketchAnnotation> intentionally—not as a filter over everything.</p>}
        </div>
        <div className="scene-visual">
          <div className="route-diagram scene-card is-flat">
            <div className="route-node"><VisualIcon name="prompt" size={34}/><strong>Prompt</strong></div>
            <SketchArrow />
            <div className="route-node"><VisualIcon name="router" size={34}/><strong>Router</strong></div>
            <SketchArrow />
            <div className="route-node"><VisualIcon name="expert" size={34}/><strong>Expert</strong></div>
          </div>
        </div>
      </div>
    </SceneFrame>
  )
}

export default function StyleGalleryPage() {
  return (
    <VideoPage>
      <SnapStory>
        {styles.map((style, index) => <StyleScene key={style.art} {...style} index={index} />)}
      </SnapStory>
    </VideoPage>
  )
}
