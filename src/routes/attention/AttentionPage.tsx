import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { SnapStory } from '../../engine/SnapStory'
import { SketchAnnotation } from '../../visuals/SketchAnnotation'
import { SketchArrow } from '../../visuals/SketchShape'
import { VisualIcon } from '../../visuals/VisualIcon'

const tokens = ['The', 'dog', 'chased', 'it']

export default function AttentionPage() {
  return (
    <VideoPage>
      <SnapStory>
        <SceneFrame art="technical">
          <span className="video-route-badge">/attention · 01</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">ATTENTION</p>
              <h1 className="scene-title">Words begin as separate tokens.</h1>
              <p className="scene-body">Before a token can use context, the model first has separate pieces to compare.</p>
            </div>
            <div className="scene-visual">
              <div className="attention-token-row">
                {tokens.map((token) => <div key={token} className={`attention-token ${token === 'it' ? 'is-focus' : ''}`}>{token}</div>)}
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="technical">
          <span className="video-route-badge">/attention · 02</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">Q · K · V</p>
              <h1 className="scene-title">One token asks. Others advertise.</h1>
              <p className="scene-body"><SketchAnnotation color="#4a9e94">Query</SketchAnnotation> asks what it needs. Keys describe what each token contains. Values carry the information onward.</p>
            </div>
            <div className="scene-visual">
              <div className="route-diagram scene-card is-flat">
                <div className="route-node"><VisualIcon name="prompt" size={34}/><strong>Query</strong><small>What do I need?</small></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="attention" size={34}/><strong>Keys</strong><small>What do I contain?</small></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="layers" size={34}/><strong>Values</strong><small>Pass this onward</small></div>
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="technical">
          <span className="video-route-badge">/attention · 03</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">CONTEXT</p>
              <h1 className="scene-title">“It” can now pull from “dog.”</h1>
              <p className="scene-body">The relationship becomes the visual. No glow, no tiny labels—just the connection the viewer needs to understand.</p>
            </div>
            <div className="scene-visual">
              <div className="attention-token-row">
                <div className="attention-token is-focus">it</div>
                <SketchArrow width={220} height={70}/>
                <div className="attention-token">dog</div>
              </div>
            </div>
          </div>
        </SceneFrame>
      </SnapStory>
    </VideoPage>
  )
}
