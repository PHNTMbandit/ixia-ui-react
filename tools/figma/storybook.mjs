import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

import { chromium } from 'playwright'

import { safeAssetPath } from './export-utils.mjs'

const mime = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

// Serves the static Storybook build and drives a headless Chromium page for captures.
export async function openStorybook({ staticRoot, viewport, styles = '' }) {
  const server = createServer(async (request, response) => {
    try {
      const asset = safeAssetPath(new URL(request.url, 'http://localhost').pathname)
      if (!asset) {
        response.writeHead(400).end('Invalid asset path')
        return
      }
      const filename = path.join(staticRoot, asset),
        info = await stat(filename)
      if (!info.isFile()) {
        response.writeHead(404).end('Not found')
        return
      }
      response.writeHead(200, {
        'Content-Type': mime[path.extname(filename)] || 'application/octet-stream',
      })
      createReadStream(filename).pipe(response)
    } catch (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404).end('Not found')
      } else {
        console.error('Storybook asset error:', error)
        response.writeHead(500).end('Cannot read Storybook asset')
      }
    }
  })
  await new Promise((resolve, reject) => {
    server.once('error', reject)
    server.listen(0, '127.0.0.1', resolve)
  })
  const origin = `http://127.0.0.1:${server.address().port}`
  let browser
  try {
    browser = await chromium.launch({ headless: true })
  } catch (error) {
    server.close()
    throw error
  }
  const page = await browser.newPage({ deviceScaleFactor: 1, reducedMotion: 'reduce', viewport }),
    browserErrors = []
  page.on('pageerror', (error) => browserErrors.push(error.message))

  function storyUrl(id, extra = {}) {
    const url = new URL('/iframe.html', origin)
    url.searchParams.set('id', id)
    url.searchParams.set('viewMode', 'story')
    // Disable story play functions: importing should not submit forms or run test interactions.
    url.searchParams.set('embed', 'true')
    for (const [key, value] of Object.entries(extra)) {
      url.searchParams.set(key, value)
    }
    return url.href
  }

  async function load(id, theme, args = {}) {
    browserErrors.length = 0
    await page.goto(
      storyUrl(id, {
        args: Object.entries(args)
          .map(([key, value]) => `${key}:${value}`)
          .join(';'),
        globals: `theme:${theme}`,
      }),
      { timeout: 60_000, waitUntil: 'load' },
    )
    await page.waitForFunction(
      () =>
        document.body.classList.contains('sb-show-errordisplay') ||
        (document.body.classList.contains('sb-show-main') &&
          document.querySelector('#storybook-root')?.childElementCount),
      undefined,
      { timeout: 20_000 },
    )
    if (
      await page.locator('body').evaluate((body) => body.classList.contains('sb-show-errordisplay'))
    ) {
      throw new Error(await page.locator('#error-message').textContent())
    }
    await page.waitForFunction(
      (expected) => document.documentElement.getAttribute('data-theme') === expected,
      theme,
      { timeout: 10_000 },
    )
    await page.evaluate(() => document.fonts.ready)
    await page.addStyleTag({
      content: `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}${styles}`,
    })
    await page.mouse.move(0, 0)
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    })
    // Allow ResizeObserver-driven charts and layout effects to finish.
    await page.waitForTimeout(100)
    if (browserErrors.length) {
      throw new Error(browserErrors.join('\n'))
    }
  }

  // Reads story parameters through Storybook's preview store without rendering each story.
  async function readStories(ids, pick) {
    await page.goto(storyUrl(ids[0]), { timeout: 60_000, waitUntil: 'load' })
    // oxlint-disable-next-line no-underscore-dangle -- Storybook's global preview API.
    await page.waitForFunction(() => window.__STORYBOOK_PREVIEW__?.storyStoreValue, undefined, {
      timeout: 20_000,
    })
    return page.evaluate(
      async ({ storyIds, picker }) => {
        // oxlint-disable-next-line no-underscore-dangle -- Storybook's global preview API.
        const store = window.__STORYBOOK_PREVIEW__.storyStoreValue,
          // oxlint-disable-next-line no-new-func -- The picker is serialized from Node.
          select = new Function(`return (${picker})`)(),
          results = []
        for (const storyId of storyIds) {
          results.push(select(await store.loadStory({ storyId })))
        }
        return results
      },
      { picker: pick.toString(), storyIds: ids },
    )
  }

  async function close() {
    await browser.close()
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    )
  }

  return { browser, close, load, origin, page, readStories }
}
