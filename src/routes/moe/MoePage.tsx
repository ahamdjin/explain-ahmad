import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { SnapStory } from '../../engine/SnapStory'
import { SketchAnnotation } from '../../visuals/SketchAnnotation'
import { SketchArrow, SketchShape } from '../../visuals/SketchShape'
import { VisualIcon } from '../../visuals/VisualIcon'

const experts = ['Math', 'Code', 'Language', 'Vision', 'Logic', 'Tools', 'Memory', 'Planning']

export default function MoePage() {
  return (
    <VideoPage>
      <SnapStory>
        <SceneFrame art="paper">
          <span className="video-route-badge">/moe · 01</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">MIXTURE OF EXPERTS</p>
              <h1 className="scene-title">The model has many specialists.</h1>
              <p className="scene-body">But the point is not that every expert runs. The interesting part is <SketchAnnotation type="box" color="#4c9f94">selection</SketchAnnotation>.</p>
            </div>
            <div className="scene-visual">
              <div className="route-experts">
                {experts.map((expert) => <div key={expert} className="route-expert">{expert}</div>)}
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="paper">
          <span className="video-route-badge">/moe · 02</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">ROUTER</p>
              <h1 className="scene-title">A router scores the options.</h1>
              <p className="scene-body">One simple visual question: where should this token go?</p>
            </div>
            <div className="scene-visual">
              <div className="route-diagram scene-card is-flat">
                <div className="route-node">
                  <VisualIcon name="prompt" size={34}/>
                  <strong>Token</strong>
                  <small>current hidden state</small>
                </div>
                <SketchArrow width={150}/>
                <div className="route-node" style={{ position: 'relative' }}>
                  <SketchShape kind="rectangle" width={172} height={122} className="route-node-sketch" />
                  <VisualIcon name="router" size={36}/>
                  <strong>Router</strong>
                  <small>scores experts</small>
                </div>
                <SketchArrow width={150}/>
                <div className="route-experts">
                  <div className="route-expert is-selected">Code</div>
                  <div className="route-expert">Vision</div>
                  <div className="route-expert is-selected">Logic</div>
                  <div className="route-expert">Memory</div>
                </div>
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="paper">
          <span className="video-route-badge">/moe · 03</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">TOP-K</p>
              <h1 className="scene-title">Only the useful experts wake up.</h1>
              <p className="scene-body">The inactive experts stay visible so the viewer understands the choice—not just the result.</p>
            </div>
            <div className="scene-visual">
              <div className="route-experts" style={{ transform: 'scale(1.25)' }}>
                {experts.map((expert, index) => <div key={expert} className={`route-expert ${index === 1 || index === 4 ? 'is-selected' : ''}`}>{expert}</div>)}
              </div>
            </div>
          </div>
        </SceneFrame>
      </SnapStory>
    </VideoPage>
  )
}
