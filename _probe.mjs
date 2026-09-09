import { spawn } from 'node:child_process'
import { chromium } from 'playwright'
const child = spawn('npx',['vite','--port','0'],{stdio:['ignore','pipe','inherit']})
const url = await new Promise(res=>{let b='';child.stdout.on('data',c=>{b+=c;const m=b.match(/http:\/\/localhost:(\d+)/);if(m)res(m[0])})})
const browser = await chromium.launch()
const page = await browser.newPage({viewport:{width:1920,height:1080}})
await page.goto(`${url}/section-01?beat=12`,{waitUntil:'networkidle'}); await page.waitForTimeout(2500)
console.log(JSON.stringify(await page.evaluate(() => {
  return [...document.querySelectorAll('.s1-word')].map(el => {
    const r = el.getBoundingClientRect()
    const slot = el.closest('[style*="left"]')
    return { text: el.textContent, w: Math.round(r.width), h: Math.round(r.height), left: Math.round(r.left), top: Math.round(r.top), slot: slot?.getAttribute('style')?.slice(0,80) }
  })
}), null, 1))
await browser.close(); child.kill('SIGTERM')
