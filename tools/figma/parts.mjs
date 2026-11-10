import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

import { bindTokens, tokenMatcher } from './bind.mjs'
import { captureDocument } from './capture.mjs'
import { extractCva } from './cva.mjs'
import {
  assertAtomicFallback,
  combinations,
  compoundParts,
  DOCUMENTATION_ONLY_FAMILIES,
  partAxes,
  partDefaults,
  pruneAxes,
  storyAxes,
} from './export-utils.mjs'
import { rootSizing } from './layout.mjs'
import { orderParts } from './order.ts'
import { openStorybook } from './storybook.mjs'

// Exports composable Figma components from the fixture stories in tools/figma/fixtures. Each
// Fixture renders every variant combination of one component; this script captures them in both
// Themes, binds colors to tokens, infers Auto Layout and stores the result in library.parts.
// Families without a fixture get a component generated from their Playground story: its visual
// Controls (tone, variant, size...) become variant properties, plus a Hover state when it reacts.
// Compound families must have explicit fixtures; a flat story capture is not a reusable asset.
const root = fileURLToPath(new URL('../..', import.meta.url)),
  output = fileURLToPath(new URL('generated/', import.meta.url)),
  staticRoot = path.join(root, 'storybook-static'),
  { values } = parseArgs({
    options: { component: { default: [], multiple: true, type: 'string' } },
  }),
  libraryFile = path.join(output, 'library.json'),
  library = JSON.parse(await readFile(libraryFile, 'utf8'))
if (!library.tokens?.length) {
  throw new Error('Run vp run figma:export first to capture tokens')
}
const match = tokenMatcher(library.tokens),
  storyIndex = JSON.parse(await readFile(path.join(staticRoot, 'index.json'), 'utf8')),
  fixtures = Object.values(storyIndex.entries).filter(
    (entry) => entry.type === 'story' && entry.title.startsWith('Figma/'),
  )
if (!fixtures.length) {
  throw new Error('No Figma fixtures found; rebuild Storybook')
}
const families = Map.groupBy(
    Object.values(storyIndex.entries).filter(
      (entry) => entry.type === 'story' && entry.title.startsWith('Components/'),
    ),
    (entry) => entry.title.replace(/^Components\//, ''),
  ),
  themes = ['light', 'dark'],
  warnings = new Set(),
  failures = [],
  storybook = await openStorybook({
    staticRoot,
    viewport: { height: 1200, width: 1600 },
    // Pressed buttons scale down in code; capture their true geometry instead.
    styles: '*{scale:none!important}',
  }),
  { page, load } = storybook,
  parts = { components: [], icons: [] },
  previous = library.parts,
  capture = (targets, adopt) =>
    page.evaluate(captureDocument, { adopt, figma: true, targets, theme: '', tokenNames: [] })
try {
  const specs = (
      await storybook.readStories(
        fixtures.map((fixture) => fixture.id),
        (story) => ({ id: story.id, spec: story.parameters?.figma }),
      )
    )
      .filter((entry) => entry.spec)
      .toSorted((a, b) => a.spec.order - b.spec.order),
    selected = values.component.length
      ? specs.filter(({ spec }) => spec.icons || values.component.includes(spec.component))
      : specs,
    cvaCache = new Map()

  for (const { id, spec } of selected) {
    console.log(`Exporting ${spec.component}`)
    try {
      if (spec.icons) {
        const captured = {}
        for (const theme of themes) {
          await load(id, theme)
          captured[theme] = await capture('[data-figma-icon-def]')
        }
        parts.icons = captured.light.parts.map(({ key, layer }, index) => {
          bindTokens(layer, captured.dark.parts[index].layer, match)
          return { layer, name: key, svgKey: layer.svgKey }
        })
        continue
      }
      if (spec.cva && !cvaCache.has(spec.cva.file)) {
        cvaCache.set(spec.cva.file, await extractCva(path.join(root, spec.cva.file)))
      }
      const extracted = spec.cva ? cvaCache.get(spec.cva.file) : {},
        axes = partAxes(spec, extracted),
        all = combinations(axes),
        interactive = spec.interactive || {},
        rendered = all.filter((combo) => !interactive[combo.State]),
        renderedIndex = new Map(rendered.map((combo, index) => [comboKey(combo), index])),
        layers = { dark: new Map(), light: new Map() }
      for (const theme of themes) {
        await page.evaluate((combos) => {
          sessionStorage.setItem('ixia-figma', JSON.stringify(combos))
        }, rendered)
        await load(id, theme)
        if (spec.annotate) {
          await page.evaluate((rules) => {
            for (const { selector, attrs = {}, style = {} } of rules) {
              for (const element of document.querySelectorAll(selector)) {
                for (const [name, value] of Object.entries(attrs)) {
                  element.setAttribute(`data-figma-${name}`, value)
                }
                Object.assign(element.style, style)
              }
            }
          }, spec.annotate)
        }
        const captured = await capture('[data-figma-target]', spec.adopt)
        for (const warning of captured.warnings) {
          warnings.add(`${spec.component}: ${warning}`)
        }
        for (const { key: index, layer } of captured.parts) {
          layers[theme].set(comboKey(rendered[Number(index)]), layer)
        }
        for (const combo of all) {
          const action = interactive[combo.State]
          if (!action) {
            continue
          }
          const index = renderedIndex.get(comboKey({ ...combo, State: 'Default' }))
          if (index === undefined) {
            throw new Error(`${spec.component}: no Default state to ${action}`)
          }
          const selector = `[data-figma-target="${index}"]`,
            element = page.locator(selector).first()
          if (action === 'focus') {
            await element.focus()
          } else {
            await element.hover()
          }
          if (action === 'press') {
            await page.mouse.down()
          }
          try {
            const result = await capture(selector, spec.adopt)
            if (!result.parts[0]) {
              throw new Error(`${spec.component}: ${combo.State} not captured`)
            }
            layers[theme].set(comboKey(combo), result.parts[0].layer)
          } finally {
            if (action === 'press') {
              await page.mouse.up()
            }
            await page.mouse.move(0, 0)
            await page.evaluate(() => {
              if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur()
              }
            })
          }
        }
      }
      let unbound = 0
      const variants = all.map((combo) => {
        const light = layers.light.get(comboKey(combo))
        if (!light) {
          throw new Error(`${spec.component}: missing ${comboKey(combo)}`)
        }
        unbound += bindTokens(light, layers.dark.get(comboKey(combo)), match, combo.tone)
        return { layer: rootSizing(light), props: combo }
      })
      if (unbound) {
        warnings.add(`${spec.component}: ${unbound} colors have no matching token and stay raw.`)
      }
      parts.components.push({
        axes,
        component: spec.component,
        defaults: partDefaults(spec, axes, extracted),
        description: spec.description,
        group: spec.group,
        interactions: spec.interactions || [],
        order: spec.order,
        properties: spec.properties || {},
        slots: spec.slots || {},
        usage: spec.usage,
        variants,
      })
      console.log(`  ${variants.length} variants`)
    } catch (error) {
      failures.push({ error: error.message, id })
      console.error(`Part export failed: ${spec.component}: ${error.message}`)
    }
  }
  const covered = new Set(specs.map(({ spec }) => spec.group)),
    autoFamilies = [...families.keys()].filter((family) => {
      if (covered.has(family.split('/')[0])) {
        return false
      }
      const limitation = DOCUMENTATION_ONLY_FAMILIES[family.split('/')[0]]
      if (limitation) {
        warnings.add(limitation)
        return false
      }
      return !values.component.length || values.component.includes(family)
    }),
    bases = autoFamilies.map((family) => {
      const stories = families.get(family)
      return stories.find((story) => story.name === 'Playground') || stories[0]
    }),
    controls = bases.length
      ? await storybook.readStories(
          bases.map((base) => base.id),
          (story) => ({ args: story.initialArgs || {}, argTypes: story.argTypes || {} }),
        )
      : []
  for (const [index, family] of autoFamilies.entries()) {
    console.log(`Generating ${family}`)
    try {
      const part = await autoPart(
        family,
        bases[index],
        controls[index],
        [...families.keys()].toSorted((a, b) => a.localeCompare(b)).indexOf(family),
      )
      parts.components.push(part)
      console.log(
        `  ${part.variants.length} variants (${Object.keys(part.axes).join(', ') || 'single'})`,
      )
    } catch (error) {
      failures.push({ error: error.message, id: bases[index].id })
      console.error(`Part export failed: ${family}: ${error.message}`)
    }
  }
} finally {
  await storybook.close()
}

async function autoPart(family, base, { args, argTypes }, index) {
  assertAtomicFallback(family, await subcomponents(base))
  const { axes, defaults, skipped } = storyAxes(argTypes, args)
  if (skipped.length) {
    warnings.add(`${family}: ${skipped.join(', ')} kept at the default to limit the variant count.`)
  }
  const combos = combinations(axes),
    layers = { dark: new Map(), light: new Map() }
  let hover = false
  for (const theme of themes) {
    for (const combo of combos) {
      await load(base.id, theme, combo)
      const interactive = await page.evaluate(() => {
        const root = document.querySelector('#storybook-root'),
          children = [...root.children].filter((child) => child.getBoundingClientRect().width > 0),
          target = children.length === 1 ? children[0] : root
        target.setAttribute('data-figma-target', '0')
        return (
          target.matches(
            'button, a[href], [role="button"], [role="tab"], [role="switch"], [role="checkbox"], [role="radio"], [role="link"]',
          ) && !target.matches(':disabled, [aria-disabled="true"], [data-disabled]')
        )
      })
      const captured = await capture('[data-figma-target]')
      for (const warning of captured.warnings) {
        warnings.add(`${family}: ${warning}`)
      }
      if (!captured.parts[0]) {
        throw new Error(`${comboKey(combo)} rendered nothing`)
      }
      layers[theme].set(comboKey({ ...combo, State: 'Default' }), captured.parts[0].layer)
      if (interactive) {
        await page.locator('[data-figma-target]').first().hover()
        const hovered = await capture('[data-figma-target]')
        await page.mouse.move(0, 0)
        // Animated roots differ between any two captures; only a stable baseline proves hover styles.
        const reset = await capture('[data-figma-target]'),
          stable = JSON.stringify(reset.parts[0]?.layer) === JSON.stringify(captured.parts[0].layer)
        if (hovered.parts[0] && stable) {
          layers[theme].set(comboKey({ ...combo, State: 'Hover' }), hovered.parts[0].layer)
          hover ||=
            JSON.stringify(hovered.parts[0].layer) !== JSON.stringify(captured.parts[0].layer)
        }
      }
    }
  }
  hover &&= combos.every((combo) =>
    themes.every((theme) => layers[theme].has(comboKey({ ...combo, State: 'Hover' }))),
  )
  const states = hover ? ['Default', 'Hover'] : ['Default'],
    all = combinations({ ...axes, State: states }).map((props) => ({
      layer: layers.light.get(comboKey(props)),
      props,
      source: props,
    })),
    pruned = pruneAxes(axes, defaults, all)
  let unbound = 0
  // Pruned props omit axes that never change the render; the captures are keyed by the full props.
  const variants = pruned.variants.map(({ props, source }) => {
    const light = layers.light.get(comboKey(source))
    unbound += bindTokens(light, layers.dark.get(comboKey(source)), match, source.tone)
    return { layer: rootSizing(light), props: hover ? props : withoutState(props) }
  })
  if (unbound) {
    warnings.add(`${family}: ${unbound} colors have no matching token and stay raw.`)
  }
  const partAxesFinal = hover ? { ...pruned.axes, State: states } : pruned.axes
  return {
    auto: true,
    axes: partAxesFinal,
    component: family,
    defaults: Object.fromEntries(
      Object.keys(partAxesFinal).map((axis) => [
        axis,
        axis === 'State' ? 'Default' : defaults[axis],
      ]),
    ),
    description: library.docs?.[family]?.description || '',
    group: family.split('/')[0],
    interactions: hover
      ? [{ from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' }]
      : [],
    order: 1000 + index,
    properties: {},
    slots: {},
    variants,
  }
}

function comboKey(combo) {
  return JSON.stringify(combo)
}

async function subcomponents(story) {
  if (!story.importPath) {
    return []
  }
  try {
    return compoundParts(
      await readFile(path.join(root, path.dirname(story.importPath), 'index.ts'), 'utf8'),
    )
  } catch (error) {
    if (error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

function withoutState({ State: _state, ...props }) {
  return props
}
if (values.component.length && previous) {
  const replaced = new Set(parts.components.map((component) => component.component))
  parts.components = [
    ...previous.components.filter((component) => !replaced.has(component.component)),
    ...parts.components,
  ].toSorted((a, b) => a.order - b.order)
}
if (failures.length) {
  throw new Error(
    `${failures.length} components failed; library.json was not updated.\n${failures.map(({ id, error }) => `${id}: ${error}`).join('\n')}`,
  )
}
orderParts(parts.components)
library.parts = parts
const flattened = parts.components.filter((component) => component.flattened?.length)
if (flattened.length) {
  warnings.add(
    `${flattened.length} compound components have no fixture and are flattened into one component: ${flattened.map((component) => component.component).join(', ')}.`,
  )
}
library.warnings = [
  ...new Set([
    ...library.warnings.filter((warning) => !warning.startsWith('Parts: ')),
    ...[...warnings].map((warning) => `Parts: ${warning}`),
  ]),
]
await writeFile(libraryFile, JSON.stringify(library))
console.log(
  `Exported ${parts.icons.length} icons and ${parts.components.length} composable components.`,
)
