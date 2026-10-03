import { chromium } from '../../../libraries/metal-assault/lab/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const destination = new URL('../../../output/rio-amazonas-qa/', import.meta.url);
await mkdir(destination, { recursive: true });
const served = JSON.parse(await readFile(new URL('../../../output/serve/prototypes__rio-amazonas.json', import.meta.url), 'utf8'));
const url = process.argv[2] || served.url;
const browser = await chromium.launch({ channel: 'chrome', headless: process.env.QA_HEADED !== '1', args: ['--use-angle=metal', '--ignore-gpu-blocklist'] });
const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
const page = await context.newPage();
const errors = [];
const checks = [];
const captures = [];
const resources = new Set();
const buildProof = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('requestfailed', request => errors.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText}`));
page.on('response', response => { resources.add(response.url()); if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
const observe = () => page.evaluate(() => window.__AMAZONAS__.observe());
async function check(name, action) { await action(); checks.push({ name, passed: true }); console.log(`OK ${name}`); }
async function capture(name) { await page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, destination)) }); captures.push(`${name}.png`); }
async function input(id, value) { await page.locator(`#${id}`).evaluate((element, next) => { element.value = next; element.dispatchEvent(new Event('input', { bubbles: true })); }, value); await page.waitForTimeout(180); }
async function view(name) { await page.getByRole('button', { name, exact: true }).click(); await page.waitForTimeout(2600); }
let report;
try {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__AMAZONAS__?.ready);
  await check('entrada HTTP 200 e renderização real', async () => { assert.equal(response.status(), 200); assert.equal(await page.title(), 'Amazonas — um rio vivo'); assert.ok((await observe()).rendered.triangles > 100000); });
  await check('o relógio avança em tempo real', async () => { const before = (await observe()).year; await page.waitForTimeout(500); assert.ok((await observe()).year > before); });
  await check('pausar congela a simulação', async () => { await page.getByRole('button', { name: 'Pausar simulação', exact: true }).click(); const before = (await observe()).year; await page.waitForTimeout(400); assert.equal((await observe()).year, before); });
  await input('year', 0);
  await capture('desktop-diorama-year-0');
  await check('retomar volta a avançar os anos', async () => { await page.getByRole('button', { name: 'Continuar simulação', exact: true }).click(); await page.waitForTimeout(400); assert.ok((await observe()).year > 0); await page.getByRole('button', { name: 'Pausar simulação', exact: true }).click(); });
  await check('linha do tempo muda a paisagem e pausa', async () => { await input('year', 240); assert.equal((await observe()).year, 240); assert.equal((await observe()).playing, false); });
  await capture('desktop-diorama-year-240');
  await check('retroceder recupera a geometria do mesmo ano', async () => { await input('year', 40); const earlier = await observe(); await input('year', 220); assert.notEqual((await observe()).sinuosity, earlier.sinuosity); await input('year', 40); assert.equal((await observe()).sinuosity, earlier.sinuosity); });
  await input('year', 100);
  await check('vazante, transição e cheia alteram a área alagada', async () => { await page.getByRole('button', { name: 'Vazante', exact: true }).click(); await page.waitForTimeout(250); const dry = (await observe()).flooded; await capture('desktop-dry'); await page.getByRole('button', { name: 'Transição', exact: true }).click(); await page.waitForTimeout(250); const normal = (await observe()).flooded; await page.getByRole('button', { name: 'Cheia', exact: true }).click(); await page.waitForTimeout(250); const flood = (await observe()).flooded; assert.ok(dry < normal && normal < flood); await capture('desktop-flood'); });
  await check('a corrente altera a migração', async () => { await input('flow', 10); const slow = (await observe()).migration; await input('flow', 100); assert.ok((await observe()).migration > slow); assert.equal(await page.locator('#flow-value').textContent(), '100%'); });
  await check('sedimentos respondem nos extremos do controle', async () => { await input('sediment', 0); assert.equal((await observe()).sediment, 0); await input('sediment', 100); assert.equal((await observe()).sediment, 100); });
  await check('todas as velocidades de tempo são selecionáveis', async () => { for (const speed of [2, 8, 24]) { await page.locator(`[data-speed="${speed}"]`).click(); assert.equal((await observe()).speed, speed); } });
  await check('legendas podem ser desligadas e religadas', async () => { await page.getByRole('button', { name: 'Legendas', exact: true }).click(); assert.equal((await observe()).labels, false); await page.waitForTimeout(250); assert.ok(await page.locator('.world-label').evaluateAll(elements => elements.every(e => getComputedStyle(e).opacity === '0'))); await page.getByRole('button', { name: 'Legendas', exact: true }).click(); assert.equal((await observe()).labels, true); });
  await check('áudio inicia apenas por ação e reproduz de fato', async () => { assert.equal((await observe()).audio.paused, true); await page.getByRole('button', { name: 'Ambiente', exact: true }).click(); await page.waitForTimeout(700); const info = await observe(); assert.equal(info.soundOn, true); assert.ok(!info.audio.paused && info.audio.currentTime > .2); await page.getByRole('button', { name: 'Ambiente', exact: true }).click(); assert.equal((await observe()).audio.paused, true); });
  await check('mapa enquadra o canal de cima', async () => { await view('Mapa'); const info = await observe(); assert.equal(info.view, 'map'); assert.ok(Math.abs(info.camera[0]) < .1 && info.camera[1] > 260); await capture('desktop-map'); });
  await check('corte expõe as camadas do solo', async () => { await view('Corte'); assert.equal((await observe()).view, 'section'); await capture('desktop-section'); });
  await view('Diorama');
  await check('arrastar orbita e rolar aproxima', async () => { const before = (await observe()).camera; await page.mouse.move(870, 470); await page.mouse.down(); await page.mouse.move(1010, 485, { steps: 12 }); await page.mouse.up(); await page.waitForTimeout(500); const rotated = (await observe()).camera; assert.notDeepEqual(rotated, before); await page.mouse.wheel(0, -200); await page.waitForTimeout(400); assert.notDeepEqual((await observe()).camera, rotated); });
  await check('explicação abre, contém fontes e fecha com Esc', async () => { await page.getByRole('button', { name: 'Sobre este rio', exact: false }).click(); assert.equal(await page.locator('#about').evaluate(e => e.open), true); assert.equal(await page.locator('#about a').count(), 3); await capture('desktop-about'); await page.keyboard.press('Escape'); assert.equal(await page.locator('#about').evaluate(e => e.open), false); });
  await check('reinício restaura o experimento', async () => { await page.getByRole('button', { name: 'Recomeçar o experimento', exact: false }).click(); const info = await observe(); assert.equal(info.flow, 55); assert.equal(info.sediment, 60); assert.equal(info.season, 'normal'); assert.equal(info.view, 'diorama'); assert.equal(info.speed, 8); assert.equal(info.playing, true); });
  await check('atalhos de teclado funcionam', async () => { await page.locator('button#reset').evaluate(e => e.blur()); await page.keyboard.press('Space'); assert.equal((await observe()).playing, false); await page.keyboard.press('ArrowRight'); const future = (await observe()).year; await page.keyboard.press('ArrowLeft'); assert.equal((await observe()).year, future - 10); await page.keyboard.press('n'); assert.equal((await observe()).labels, false); await page.keyboard.press('v'); assert.equal((await observe()).view, 'map'); await page.keyboard.press('r'); assert.equal((await observe()).view, 'diorama'); });
  await page.waitForTimeout(2600);
  await check('fim do experimento pausa no ano 300', async () => { await input('year', 300); await page.getByRole('button', { name: 'Continuar simulação', exact: true }).click(); assert.ok((await observe()).year < 300); await input('year', 299); await page.locator('[data-speed="24"]').click(); await page.getByRole('button', { name: 'Continuar simulação', exact: true }).click(); await page.waitForTimeout(300); assert.equal((await observe()).year, 300); assert.equal((await observe()).playing, false); });
  await page.keyboard.press('r');
  await page.waitForTimeout(2600);
  await page.keyboard.press('Space');
  await input('year', 100);
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.waitForTimeout(300);
  await check('tablet sem rolagem horizontal', async () => { assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await capture('tablet'); });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await check('celular sem rolagem horizontal', async () => { assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)); await capture('mobile-diorama'); });
  await check('controles móveis abrem e alteram o ciclo', async () => { await page.getByRole('button', { name: 'Ajustar o rio', exact: true }).click(); assert.equal(await page.locator('#controls').isVisible(), true); await page.getByRole('button', { name: 'Cheia', exact: true }).click(); await input('flow', 80); assert.equal((await observe()).season, 'flood'); assert.equal((await observe()).flow, 80); await capture('mobile-controls'); await page.getByRole('button', { name: 'Ajustar o rio', exact: true }).click(); assert.equal(await page.locator('#controls').isVisible(), false); await capture('mobile-flood'); });
  await view('Mapa');
  await capture('mobile-map');
  await view('Corte');
  await capture('mobile-section');
  await page.setViewportSize({ width: 844, height: 390 });
  await page.waitForTimeout(300);
  await check('celular em paisagem preserva título, observação e rodapé', async () => { assert.equal(await page.locator('#app').evaluate(e => e.clientHeight), 390); const header = await page.locator('.masthead').boundingBox(); const observation = await page.locator('.observation').boundingBox(); const footer = await page.locator('.footer').boundingBox(); assert.ok(header.y + header.height < observation.y); assert.ok(footer.y + footer.height <= 390); assert.equal(await page.locator('#controls').isVisible(), false); await capture('mobile-landscape'); });
  await check('movimento reduzido inicia pausado', async () => { const reduced = await context.newPage({ reducedMotion: 'reduce' }); await reduced.emulateMedia({ reducedMotion: 'reduce' }); await reduced.goto(url, { waitUntil: 'networkidle' }); await reduced.waitForFunction(() => window.__AMAZONAS__?.ready); assert.equal(await reduced.evaluate(() => window.__AMAZONAS__.observe().playing), false); await reduced.close(); });
  await check('recursos locais e console sem erros', async () => { assert.deepEqual(errors, []); assert.ok([...resources].every(resource => resource.startsWith(new URL(url).origin))); });
  await check('HTML e todos os assets servidos iguais à build de produção', async () => { for (const resource of resources) { const pathname = decodeURIComponent(new URL(resource).pathname); const path = pathname === '/' ? 'index.html' : pathname.slice(1); const local = await readFile(new URL(`../dist/${path}`, import.meta.url)); const remote = Buffer.from(await (await fetch(resource)).arrayBuffer()); const sha256 = createHash('sha256').update(local).digest('hex'); assert.equal(createHash('sha256').update(remote).digest('hex'), sha256, path); buildProof.push({ path, bytes: local.length, sha256 }); } });
  report = { status: 'passed', url, build: served.commit, checks: checks.length, passed: checks.length, cases: checks, errors, resources: resources.size, buildProof, captures, renderer: (await observe()).renderer, mobile: 'Emulado; não testado em um dispositivo físico.', performance: 'Sem alegação de FPS: não foi feito benchmark com três execuções intercaladas.' };
} catch (error) {
  report = { status: 'failed', url, checks: checks.length, cases: checks, errors, failure: error.stack, captures };
  process.exitCode = 1;
} finally {
  await writeFile(new URL('browser-report.json', destination), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(JSON.stringify({ status: report.status, checks: report.checks, errors: report.errors, failure: report.failure }));
