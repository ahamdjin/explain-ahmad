import { spawn } from 'node:child_process'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { chromium } from 'playwright'
const V='apollo-o1/video-2'
const dir=path.resolve(`src/videos/${V}`)
const secs=(await readdir(dir)).filter(d=>/^section-\d\d$/.test(d)).sort()
const child=spawn('npx',['vite','--host','127.0.0.1','--port','4362','--strictPort'],{stdio:'ignore'})
const url='http://127.0.0.1:4362'
for(let i=0;i<80;i++){try{await fetch(url);break}catch{await new Promise(r=>setTimeout(r,300))}}
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1600,height:900}})
const split=()=>{
  const R='.s1-slot, .s1-note, .s1-brace, .s1-bubble, .s1-arrow, .s1-tick'
  const vis=e=>{const c=getComputedStyle(e);return !(c.visibility==='hidden'||c.display==='none'||Number(c.opacity)<0.06)}
  const shown=e=>{for(let n=e;n&&n!==document.body;n=n.parentElement){if(!vis(n))return false;if(n.getAttribute?.('aria-hidden')==='true')return false}return true}
  const roots=[...document.querySelectorAll(R)].filter(shown)
  const tops=roots.filter(e=>!roots.some(o=>o!==e&&o.contains(e)))
  let text=0,shape=0,img=0
  const walk=n=>{const kids=[...n.children]
    const isShape=n instanceof SVGGraphicsElement&&n.tagName!=='svg'&&n.tagName!=='g'
    if(!kids.length||isShape){if(!vis(n))return
      const r=n.getBoundingClientRect(); const a=r.width*r.height; if(a<64)return
      const t=(n.textContent??'').trim()
      if(n.tagName==='IMG'||n.tagName==='image')img+=a
      else if(t.length>=2)text+=a
      else shape+=a; return}
    for(const k of kids) if(vis(k)) walk(k)}
  for(const e of tops) walk(e)
  return {text,shape,img}}
let T=0,S=0,I=0
for(const s of secs){
  const src=await readFile(path.join(dir,s,'beats.ts'),'utf8')
  const ns=[...src.matchAll(/^ {4}n: (\d+),/gm)].map(m=>Number(m[1]))
  let t=0,sh=0,im=0
  for(const n of ns){await p.goto(`${url}/video-2/${s}?beat=${n}`,{waitUntil:'load'}); await p.waitForTimeout(3400)
    const r=await p.evaluate(split); t+=r.text; sh+=r.shape; im+=r.img}
  const tot=t+sh+im||1
  console.log(`§${s.slice(-2)}  text ${String(Math.round(100*t/tot)).padStart(3)}%  drawn ${String(Math.round(100*sh/tot)).padStart(3)}%  page ${String(Math.round(100*im/tot)).padStart(3)}%   textual ${Math.round(100*(t+im)/tot)}%`)
  T+=t;S+=sh;I+=im}
const tot=T+S+I||1
console.log(`\nFILM  text ${Math.round(100*T/tot)}%  drawn ${Math.round(100*S/tot)}%  page ${Math.round(100*I/tot)}%   textual ${Math.round(100*(T+I)/tot)}%`)
await b.close(); child.kill('SIGTERM')
