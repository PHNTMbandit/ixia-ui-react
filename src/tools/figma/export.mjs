import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { bindTokens, tokenMatcher } from './bind.mjs'
import { captureDocument } from './capture.mjs'
import { collectDocs, mergeTokens, retainedCaptures, selectStories } from './export-utils.mjs'
import { rootSizing } from './layout.mjs'
import { openStorybook } from './storybook.mjs'

// Captures every Storybook story in both themes and keeps one light layer tree whose colors are
// Bound to semantic tokens, so the Figma examples follow the Light/Dark variable mode.

const root = fileURLToPath(new URL('../../..', import.meta.url)),
  output = fileURLToPath(new URL('generated', import.meta.url)),
  staticRoot = path.join(root, 'storybook-static'),
  { values } = parseArgs({
    options: {
      'docs-only': { default: false, type: 'boolean' },
      family: { default: [], multiple: true, type: 'string' },
      merge: { default: false, type: 'boolean' },
    },
  }),
  docsOnly = values['docs-only'],
  themes = ['light', 'dark'],
  storyIndex = JSON.parse(await readFile(path.join(staticRoot, 'index.json'), 'utf8')),
  stories = selectStories(storyIndex.entries, values.family),
  css = await readFile(path.join(root, 'src', 'styles', 'input.css'), 'utf8'),
  tokenNames = [
    ...new Set(
      [...css.matchAll(/--(?:color|spacing|radius|text|font)-[\w-]+(?=:)/g)].map(([name]) => name),
    ),
  ],
  viewport = { height: 1000, width: 1440 },
  library = {
    docs: {},
    failures: [],
    generatedAt: new Date().toISOString(),
    samples: [],
    tokens: [],
    version: 3,
    viewport,
    warnings: [],
  },
  tokens = new Map(),
  warnings = new Set(),
  capturedTokenThemes = new Set()
let previous
if (values.merge || docsOnly) {
  previous = JSON.parse(await readFile(path.join(output, 'library.json'), 'utf8'))
  library.docs = previous.docs || {}
}
if (docsOnly) {
  Object.assign(library, previous, { docs: library.docs })
  for (const token of previous.tokens) {
    tokens.set(token.name, token)
  }
  for (const warning of previous.warnings) {
    warnings.add(warning)
  }
} else if (values.merge) {
  Object.assign(library, retainedCaptures(previous, stories, viewport))
  for (const token of previous.tokens) {
    tokens.set(token.name, token)
  }
  for (const warning of previous.warnings) {
    if (!stories.some((story) => warning.startsWith(`${story.title}:`))) {
      warnings.add(warning)
    }
  }
}
const storybook = await openStorybook({ staticRoot, viewport }),
  { browser, page, load } = storybook
try {
  let gradientPage
  const docStories = docsOnly ? selectStories(storyIndex.entries, []) : stories
  if (docStories.length) {
    console.log(`Reading Storybook descriptions for ${docStories.length} stories`)
    const described = await storybook.readStories(
      docStories.map((story) => story.id),
      (story) => {
        const description = story.parameters?.docs?.description || {}
        return {
          component: typeof description.component === 'string' ? description.component : '',
          name: story.name,
          story: typeof description.story === 'string' ? description.story : '',
          title: story.title,
        }
      },
    )
    library.docs = collectDocs(library.docs, described)
  }
  async function capture(story, theme) {
    const captured = await page.evaluate(captureDocument, { figma: true, theme, tokenNames })
    async function embedImages(layer) {
      // Bitmaps are taken from the light capture only; the dark tree just supplies token pairs.
      if (theme !== 'light') {
        return
      }
      if (layer.backgroundGradient) {
        gradientPage ||= await browser.newPage({ deviceScaleFactor: 1, viewport })
        await gradientPage.setContent('<html><body style="margin:0"></body></html>')
        await gradientPage.evaluate(
          ({ width, height, background }) => {
            const element = document.createElement('div')
            element.style.width = `${width}px`
            element.style.height = `${height}px`
            element.style.backgroundImage = background.image
            element.style.backgroundSize = background.size
            element.style.backgroundPosition = background.position
            element.style.backgroundRepeat = background.repeat
            document.body.append(element)
          },
          { background: layer.backgroundGradient, height: layer.height, width: layer.width },
        )
        const bitmap = await gradientPage.locator('div').screenshot({ omitBackground: true })
        layer.backgroundBitmap = bitmap.toString('base64')
        delete layer.backgroundGradient
      }
      if (layer.imageKey) {
        const bitmap = await page
          .locator(`[data-cartyx-export-image="${layer.imageKey}"]`)
          .screenshot({ animations: 'disabled', timeout: 10_000 })
        layer.image = bitmap.toString('base64')
        delete layer.imageKey
      }
      for (const child of layer.children || []) {
        await embedImages(child)
      }
    }
    await embedImages(captured.layer)
    if (!capturedTokenThemes.has(theme)) {
      mergeTokens(tokens, captured.tokens, theme)
      capturedTokenThemes.add(theme)
    }
    for (const warning of captured.warnings) {
      warnings.add(`${story.title}: ${warning}`)
    }
    return captured.layer
  }
  async function captureOpen(story, theme) {
    const family = story.title.replace(/^Components\//, ''),
      clickFamilies = [
        'Dialog',
        'Alert Dialog',
        'Drawer',
        'Popover',
        'Menu',
        'Select',
        'Combobox',
        'Autocomplete',
        'Navigation Menu',
        'Toast',
      ],
      hoverFamilies = ['Tooltip', 'Preview Card']
    if (![...clickFamilies, ...hoverFamilies, 'Context Menu'].includes(family)) {
      return undefined
    }
    let trigger
    if (family === 'Context Menu') {
      trigger = page.locator('#storybook-root > *').first()
    } else if (hoverFamilies.includes(family)) {
      trigger = page
        .locator('#storybook-root button, #storybook-root a, #storybook-root [tabindex]')
        .first()
    } else {
      trigger = page
        .locator(
          '#storybook-root button[aria-haspopup], #storybook-root [role="combobox"], #storybook-root button',
        )
        .first()
    }
    if (!(await trigger.count())) {
      throw new Error(`No ${family} trigger found for open-state capture`)
    }
    if (await trigger.isDisabled()) {
      return undefined
    }
    if (family === 'Context Menu') {
      await trigger.click({ button: 'right' })
    } else if (hoverFamilies.includes(family)) {
      await trigger.hover()
    } else if (await trigger.evaluate((element) => element.tagName === 'INPUT')) {
      await trigger.focus()
      await trigger.press('ArrowDown')
    } else {
      await trigger.click()
    }
    await page.waitForFunction(
      () =>
        [
          ...document.querySelectorAll(
            '[role="dialog"], [role="alertdialog"], [role="menu"], [role="listbox"], [role="tooltip"], [role="status"], [role="alert"], [data-base-ui-portal] [data-open][data-side], [data-base-ui-portal] [style*="--toast-index"]',
          ),
        ].some((element) => {
          const rect = element.getBoundingClientRect()
          return (
            rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility === 'visible'
          )
        }),
      undefined,
      { timeout: 5000 },
    )
    await page.waitForTimeout(100)
    return capture(story, theme)
  }
  const captures = []
  for (const [index, story] of (docsOnly ? [] : stories).entries()) {
    console.log(`[${index + 1}/${stories.length}] ${story.title} / ${story.name}`)
    const pair = { Default: {}, Open: {} }
    for (const theme of themes) {
      try {
        await load(story.id, theme)
        pair.Default[theme] = await capture(story, theme)
        try {
          pair.Open[theme] = await captureOpen(story, theme)
        } catch (error) {
          library.failures.push({ error: error.message, id: `${story.id}/open`, theme })
          console.error(`Open-state export failed: ${story.id} (${theme}): ${error.message}`)
        }
      } catch (error) {
        library.failures.push({ error: error.message, id: story.id, theme })
        console.error(`Export failed: ${story.id} (${theme}): ${error.message}`)
      }
    }
    for (const [state, layers] of Object.entries(pair)) {
      if (layers.light) {
        captures.push({ dark: layers.dark, light: layers.light, state, story })
      }
    }
  }
  library.tokens = [...tokens.values()]
  const match = tokenMatcher(library.tokens),
    unbound = new Map()
  for (const { story, state, light, dark } of captures) {
    const family = story.title.replace(/^Components\//, ''),
      count = bindTokens(light, dark, match)
    if (count) {
      unbound.set(family, (unbound.get(family) || 0) + count)
    }
    library.samples.push({
      family,
      id: story.id,
      layer: rootSizing(light),
      name: story.name,
      state,
    })
  }
  for (const [family, count] of unbound) {
    warnings.add(
      `Components/${family}: ${count} colors have no token that matches both themes and stay raw.`,
    )
  }
  library.warnings = [...warnings].toSorted((a, b) => a.localeCompare(b))
  if (!library.samples.length) {
    throw new Error('No components exported; no plugin data was written')
  }
  await mkdir(output, { recursive: true })
  await writeFile(path.join(output, 'library.json'), JSON.stringify(library))
  await writeFile(
    path.join(output, 'report.json'),
    JSON.stringify(
      {
        failures: library.failures,
        families: [...new Set(library.samples.map((sample) => sample.family))],
        generatedAt: library.generatedAt,
        samples: library.samples.length,
        tokens: library.tokens.length,
        viewport,
        warnings: library.warnings,
      },
      null,
      2,
    ),
  )
  console.log(
    docsOnly
      ? `Updated documentation for ${Object.keys(library.docs).length} component families.`
      : `Exported ${library.samples.length} variants and ${tokens.size} tokens. Report: src\\tools\\figma\\generated\\report.json`,
  )
  if (library.failures.length && !docsOnly) {
    console.error(
      `${library.failures.length} captures failed. Review report.json before building a partial library.`,
    )
    process.exitCode = 1
  }
} finally {
  await storybook.close()
}
