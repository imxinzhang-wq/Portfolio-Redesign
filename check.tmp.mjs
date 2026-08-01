import { chromium } from 'playwright';
const dir = '/tmp/claude-0/-home-user-Portfolio-Redesign/e7d33349-b6c1-55d9-8ec9-41f74bbd44b6/scratchpad';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 950 } });
const failed = [];
p.on('response', r => { if (r.status() >= 400) failed.push(r.status()+' '+r.url().split('/').pop()); });
p.on('pageerror', e => failed.push('JS: '+e.message.slice(0,90)));

await p.goto('http://localhost:5050/', { waitUntil: 'load' });
await p.waitForSelector('[data-testid="loading-screen"]', { state:'detached', timeout: 20000 });
await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));} });
await p.waitForTimeout(2500);
const home = await p.evaluate(() => ({
  broken: [...document.querySelectorAll('img')].filter(i=>i.naturalWidth===0).map(i=>i.src.split('/').pop()),
  imgs: document.querySelectorAll('img').length,
  vids: [...document.querySelectorAll('video')].filter(v=>v.videoWidth>0).length,
}));
console.log('HOME  imgs', home.imgs, '| playing videos', home.vids, '| broken', home.broken);
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);
await p.screenshot({ path: `${dir}/final-home.png` });

for (const id of ['1','2','3','4']) {
  await p.goto(`http://localhost:5050/#/project/${id}`, { waitUntil: 'load' });
  await p.waitForTimeout(1500);
  const pw = p.locator('input[type="password"]');
  if (await pw.count()) { await pw.fill('helloworld'); await pw.press('Enter'); await p.waitForTimeout(1500); }
  await p.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));} });
  await p.waitForTimeout(2500);
  const r = await p.evaluate(() => ({
    broken: [...document.querySelectorAll('img')].filter(i=>i.naturalWidth===0).map(i=>i.src.split('/').pop()),
    imgs: document.querySelectorAll('img').length,
    vids: [...document.querySelectorAll('video')].map(v=>v.videoWidth>0?'ok':'FAIL:'+v.currentSrc.split('/').pop()),
  }));
  console.log(`P${id}    imgs ${r.imgs} | videos [${r.vids.join(', ')}] | broken`, r.broken);
}
console.log('\nnetwork/js failures:', failed.length ? failed : 'none');
await b.close();
