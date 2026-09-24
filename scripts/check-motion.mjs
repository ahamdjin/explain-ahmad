/**
 * Finds beats that are a still frame.
 *
 * ## Why this exists
 *
 * "Why is there too little movement" is a fair note and an unfalsifiable one
 * until something counts it. A beat that puts three objects up in the same
 * instant and then holds them for six seconds is a slide, not a shot -- and
 * it also breaks `BEAT_GRANULARITY` rule 1, one beat one move. Both faults
 * have the same fix: stage the arrivals.
 *
 * At first measurement, 43 of Video 2's 107 beats never changed at all after
 * the opening 700ms. §7 held one arrangement for seven seconds.
 *
 * ## What it measures, having been wrong in both directions first
 *
 * Three samples per beat, compared. *What* is compared turned out to matter
 * more than the sampling:
 *
 *   - **Slot rectangles alone** called a beat still when the movement was
 *     happening inside a component -- a counter running, a chain filling, a
 *     thumb pressing. Those are the beats most likely to have been staged
 *     deliberately, so it was wrong exactly where it mattered: 40%.
 *
 *   - **Hashing the markup** reported 0 of 107 still, which is nonsense.
 *     Motion rewrites inline transform styles every frame, so a spring merely
 *     settling looked like a redraw.
 *
 * Geometry plus text length and child count is what works. Those change when
 * a component genuinely draws something different, and do not change while a
 * spring is coming to rest.
 *
 *   VIDEO=apollo-o1/video-2 node scripts/check-motion.mjs
 *   PORT=4400 node scripts/check-motion.mjs
 */
import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'
const V='apollo-o1/video-2'
const dir=path.resolve(`src/videos/${V}`)
const secs=(await readdir(dir)).filter(d=>/^section-\d\d$/.test(d)).sort()
const child=spawn('npx',['vite','--host','127.0.0.1','--port',String(process.env.PORT ?? 4318),'--strictPort'],{stdio:'ignore'})
const url='http://127.0.0.1:4318'
for(let i=0;i<80;i++){try{await fetch(url);break}catch{await new Promise(r=>setTimeout(r,300))}}
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1600,height:900}})
/*
 * Geometry AND content. Comparing only slot rects called a beat still when
 * the movement was happening *inside* a component -- a thumb pressing, a
 * counter running, a chain filling. Those are the beats most likely to have
 * been staged deliberately, so the measure was wrong exactly where it
 * mattered. `innerHTML.length` is a cheap proxy for "the component redrew".
 */
const snap=()=>[...document.querySelectorAll('.s1-slot')].map(e=>{
  const r=e.getBoundingClientRect(); const o=Number(getComputedStyle(e).opacity)
  return `${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.width)},${o>0.06?1:0},${(e.textContent||'').replace(/\\s+/g,'').length},${e.querySelectorAll('*').length}`}).join('|')
let still=0,total=0
for(const s of secs){
  const src=await readFile(path.join(dir,s,'beats.ts'),'utf8')
  const ns=[...src.matchAll(/^ {4}n: (\d+),/gm)].map(m=>Number(m[1]))
  const dead=[]
  for(const n of ns){
    await p.goto(`${url}/video-2/${s}?beat=${n}`,{waitUntil:'load'})
    await p.waitForTimeout(700); const a=await p.evaluate(snap)
    await p.waitForTimeout(2600); const b2=await p.evaluate(snap)
    await p.waitForTimeout(2600); const c=await p.evaluate(snap)
    total++; if(a===b2&&b2===c){still++;dead.push(n)}
  }
  console.log(`§${s.slice(-2)}  ${String(dead.length).padStart(2)} of ${String(ns.length).padStart(2)} still  ${dead.join(',')}`)
}
console.log(`\nFILM  ${still} of ${total} still (${Math.round(100*still/total)}%)`)
await b.close(); child.kill('SIGTERM')
