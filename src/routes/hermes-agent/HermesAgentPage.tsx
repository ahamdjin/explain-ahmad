import { SceneFrame, VideoPage } from '../../engine/SceneFrame'
import { SnapStory } from '../../engine/SnapStory'
import { SketchAnnotation } from '../../visuals/SketchAnnotation'
import { SketchArrow } from '../../visuals/SketchShape'
import { VisualIcon } from '../../visuals/VisualIcon'

const tools = [
  { icon: 'browser' as const, title: 'Browser', text: 'Read pages, inspect products, collect information.' },
  { icon: 'terminal' as const, title: 'Terminal', text: 'Run commands and operate on the local environment.' },
  { icon: 'code' as const, title: 'Codex', text: 'Delegate coding work when a specialist is useful.' },
  { icon: 'memory' as const, title: 'Memory / Skills', text: 'Keep reusable knowledge and workflows available.' },
]

export default function HermesAgentPage() {
  return (
    <VideoPage>
      <SnapStory>
        <SceneFrame art="editorial">
          <span className="video-route-badge">/hermes-agent · 01</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">WHY HERMES?</p>
              <h1 className="scene-title">An agent is only useful if it can act.</h1>
              <p className="scene-body">The visual focus is not “AI magic.” It is the gap between <SketchAnnotation color="#c96f50">thinking</SketchAnnotation> and actually doing work.</p>
            </div>
            <div className="scene-visual">
              <div className="route-diagram scene-card is-flat">
                <div className="route-node"><VisualIcon name="user" size={36}/><strong>You</strong></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="agent" size={40}/><strong>Hermes</strong><small>agent</small></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="tool" size={38}/><strong>Action</strong><small>real tool use</small></div>
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="editorial">
          <span className="video-route-badge">/hermes-agent · 02</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">TOOLS</p>
              <h1 className="scene-title">The agent can branch into specialists.</h1>
              <p className="scene-body">Each tool stays visually distinct so the audience can see what the agent chose—and why that matters.</p>
            </div>
            <div className="scene-visual">
              <div className="agent-tools">
                {tools.map((tool) => (
                  <article key={tool.title} className="agent-tool-card">
                    <div className="icon-tile"><VisualIcon name={tool.icon} size={34}/></div>
                    <div><h3>{tool.title}</h3><p>{tool.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </SceneFrame>

        <SceneFrame art="editorial">
          <span className="video-route-badge">/hermes-agent · 03</span>
          <div className="scene-grid">
            <div className="scene-copy">
              <p className="scene-kicker">30-DAY TEST</p>
              <h1 className="scene-title">Does this become a real daily driver?</h1>
              <p className="scene-body">That is the story: not whether Hermes has features, but whether the system compounds into useful work over time.</p>
            </div>
            <div className="scene-visual">
              <div className="route-diagram scene-card is-flat">
                <div className="route-node"><VisualIcon name="clock" size={36}/><strong>Day 1</strong><small>setup</small></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="workflow" size={36}/><strong>Day 15</strong><small>workflows</small></div>
                <SketchArrow />
                <div className="route-node"><VisualIcon name="success" size={36}/><strong>Day 30</strong><small>keep or quit?</small></div>
              </div>
            </div>
          </div>
        </SceneFrame>
      </SnapStory>
    </VideoPage>
  )
}
