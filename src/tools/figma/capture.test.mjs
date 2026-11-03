import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'

import { chromium } from 'playwright'

import { captureDocument } from './capture.mjs'

let browser, page
before(async () => {
  browser = await chromium.launch({ headless: true })
  page = await browser.newPage({ viewport: { height: 1000, width: 1440 } })
})
after(async () => {
  await browser?.close()
})

void test('captures editable text, flex layout, SVG colors, borders, shadows, and resolved tokens', async () => {
  await page.setContent(`
    <style>
      :root { --color-brand-default: oklch(0.5 0.1 240); --spacing-md: clamp(10px, 2vw, 40px); --font-body: 'Noto Sans JP', sans-serif; }
      button { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 16px;
        color: var(--color-brand-default); background: white; border: 0; border-bottom: 2px solid red;
        box-shadow: rgba(0,0,0,.2) 1px 2px 6px 1px; border-radius: 12px; font: 500 16px/24px sans-serif; }
      svg { width: 16px; height: 16px; fill: currentColor; }
    </style>
    <div id="storybook-root"><button><svg viewBox="0 0 16 16"><path d="M0 0h16v16H0z"/></svg>Save changes</button></div>
  `)
  const result = await page.evaluate(captureDocument, {
      theme: 'light',
      tokenNames: ['--color-brand-default', '--spacing-md', '--font-body'],
    }),
    [button] = result.layer.children
  assert.equal(button.layout.direction, 'HORIZONTAL')
  assert.equal(button.layout.gap, 8)
  assert.deepEqual(button.layout.padding, [8, 16, 8, 16])
  assert.deepEqual(button.strokeWidths, [0, 0, 2, 0])
  assert.equal(button.shadows[0].blur, 6)
  assert.equal(button.shadows[0].spread, 1)
  assert.equal(button.children[0].kind, 'svg')
  assert.match(button.children[0].svg, /fill: rgba?\(/)
  assert.equal(button.children[1].kind, 'text')
  assert.equal(button.children[1].text, 'Save changes')
  assert.equal(result.tokens.find((token) => token.name === 'spacing/md').value, 28.7969)
  assert.equal(result.tokens.find((token) => token.name === 'font/body').value, 'Noto Sans JP')
})

void test('keeps canvas/media identifiable and includes visible portals while excluding hidden nodes', async () => {
  await page.setContent(`
    <div id="storybook-root"><span style="display:none">Hidden</span><canvas width="40" height="20"></canvas></div>
    <div role="dialog" style="position:fixed;top:10px;left:20px">Portal content</div>
  `)
  const result = await page.evaluate(captureDocument, { theme: 'dark', tokenNames: [] })
  assert.equal(result.layer.children[0].kind, 'image')
  assert.ok(result.layer.children[0].imageKey)
  assert.equal(result.layer.children[1].children[0].text, 'Portal content')
  assert.ok(result.warnings.some((warning) => warning.includes('bitmap')))
  assert.doesNotMatch(JSON.stringify(result.layer), /Hidden/)
})

void test('reports unsupported CSS and excludes Google Maps imagery', async () => {
  await page.setContent(`
    <style>
      #gradient { width:40px;height:20px;background:linear-gradient(red,blue) }
      #gradient::before { content:'generated' }
    </style>
    <div id="storybook-root"><div id="gradient"></div><div class="gm-style"><canvas width="40" height="20"></canvas></div></div>
  `)
  const result = await page.evaluate(captureDocument, { theme: 'light', tokenNames: [] })
  assert.ok(result.warnings.some((warning) => warning.includes('gradients')))
  assert.match(result.layer.children[0].backgroundGradient.image, /linear-gradient/)
  assert.ok(result.warnings.some((warning) => warning.includes('pseudo-element')))
  assert.ok(result.warnings.some((warning) => warning.includes('Google Maps')))
  assert.equal(result.layer.children[1].children[0].name, 'Map imagery (not exported)')
  assert.equal(result.layer.children[1].children[0].imageKey, undefined)
})

void test('fails explicitly when the story root is empty', async () => {
  await page.setContent('<div id="storybook-root"></div>')
  await assert.rejects(
    page.evaluate(captureDocument, { theme: 'light', tokenNames: [] }),
    /no visible content|empty/,
  )
})

void test('captures zero-sized portal wrappers and expands the artboard to include their bounds', async () => {
  await page.setContent(`
    <div id="storybook-root" style="position:absolute;left:300px;top:300px;width:50px;height:40px"><button>Open</button></div>
    <div data-base-ui-portal style="width:0;height:0"><div style="position:fixed;left:100px;top:100px;width:400px;height:500px;background:white">Dialog</div></div>
  `)
  const result = await page.evaluate(captureDocument, { theme: 'light', tokenNames: [] })
  assert.equal(result.layer.width, 400)
  assert.equal(result.layer.height, 500)
  assert.equal(result.layer.children[1].width, 400)
  assert.equal(result.layer.children[1].x, 0)
  assert.equal(result.layer.children[1].y, 0)
})
