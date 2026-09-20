/**
 * Case-file components — Video 2 only.
 *
 * Video 2 shares the channel's paper material and the low-level engine (slot,
 * camera, ink, palette) and shares **no metaphor** with Video 1. Nothing in
 * this folder may import from `../cast`, and nothing in `../cast` may import
 * from here. See `art-direction/VIDEO_2_INCIDENT_REPLAY.md`.
 */
import './casefile.css'

export { Document, type DocLine } from './Document'
export { ConfigFile } from './ConfigFile'
export { Timeline, INCIDENT, type IncidentEvent } from './Timeline'
export { Server, Transfer } from './Servers'
export { Chat } from './Chat'
export { Evidence, SHOT, P1, P2, P3, DENIAL, DEMO, type Region, type Source } from './Evidence'
export { Watcher, Box, Copy, Step, Job, Credit, Quote } from './Extract'
