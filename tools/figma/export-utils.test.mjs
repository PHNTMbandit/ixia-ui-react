import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  assertAtomicFallback,
  collectDocs,
  combinations,
  compoundParts,
  mergeTokens,
  orderValues,
  partAxes,
  partDefaults,
  retainedCaptures,
  safeAssetPath,
  selectStories,
} from './export-utils.mjs'

await test('finds the sub-components a compound component attaches to its root', () => {
  assert.deepEqual(
    compoundParts(`const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link,
})`),
    ['Ellipsis', 'Item', 'Link', 'Separator'],
  )
  assert.deepEqual(compoundParts('export { Badge } from "./badge"'), [])
})

await test('rejects automatic flattened compound assets, including nested story families', () => {
  assert.doesNotThrow(() => assertAtomicFallback('Badge', []))
  for (const family of ['Breadcrumb', 'Breadcrumb/Examples']) {
    assert.throws(
      () => assertAtomicFallback(family, ['Item', 'Separator']),
      /requires a composable fixture for Item, Separator; refusing to generate a flattened asset/,
    )
  }
})

await test('collects plain-text Storybook docs and refreshes only described families', () => {
  const docs = collectDocs(
    {
      Badge: { description: 'Kept', examples: {} },
      Button: { description: 'Stale', examples: { Old: 'Removed' } },
    },
    [
      {
        component: 'Supports `size` and [links](https://x.test) with **bold** text.',
        name: 'Tone / Brand',
        story: 'Primary\n  action.',
        title: 'Components/Button',
      },
    ],
  )
  assert.equal(docs.Badge.description, 'Kept')
  assert.deepEqual(docs.Button, {
    description: 'Supports size and links with bold text.',
    examples: { 'Tone / Brand': 'Primary action.' },
  })
})

await test('selects story entries and validates exact family filters', () => {
  const entries = {
    button: { title: 'Components/Button', type: 'story' },
    docs: { title: 'Components/Button', type: 'docs' },
    fixture: { title: 'Figma/Button', type: 'story' },
    group: { title: 'Components/Button Group', type: 'story' },
    palette: { title: 'Color Palette/Core/Semantics', type: 'story' },
  }
  assert.equal(selectStories(entries, []).length, 2)
  assert.deepEqual(selectStories(entries, ['button']), [entries.button])
  assert.throws(() => selectStories(entries, ['missing']), /Unknown component family/)
})

await test('orders variant values the way designers read them', () => {
  assert.deepEqual(orderValues(['large', 'medium', 'small', 'extraSmall']), [
    'extraSmall',
    'small',
    'medium',
    'large',
  ])
  assert.deepEqual(orderValues(['warning', 'brand', 'custom', 'error']), [
    'brand',
    'error',
    'warning',
    'custom',
  ])
  assert.deepEqual(orderValues(['true', 'false']), ['false', 'true'])
})

await test('derives part axes, combinations and defaults from cva and fixture specs', () => {
  const extracted = {
      buttonVariants: {
        defaultVariants: { size: 'small', tone: 'error' },
        variants: {
          size: ['large', 'small'],
          tone: ['brand', 'error'],
          variant: ['ghost', 'solid'],
        },
      },
    },
    spec = {
      axes: { filled: ['false', 'true'] },
      component: 'Button',
      cva: { axes: ['tone', 'size'], file: 'button.tsx', name: 'buttonVariants' },
      states: ['Default', 'Hover'],
    },
    axes = partAxes(spec, extracted)
  assert.deepEqual(axes, {
    State: ['Default', 'Hover'],
    filled: ['false', 'true'],
    size: ['small', 'large'],
    tone: ['brand', 'error'],
  })
  const combos = combinations(axes)
  assert.equal(combos.length, 16)
  assert.equal(new Set(combos.map((combo) => JSON.stringify(combo))).size, 16)
  assert.deepEqual(partDefaults(spec, axes, extracted), {
    State: 'Default',
    filled: 'false',
    size: 'small',
    tone: 'error',
  })
  // Fixtures can override the cva defaults, e.g. a size axis limited to icon sizes.
  assert.deepEqual(partDefaults({ ...spec, defaults: { size: 'large' } }, axes, extracted), {
    State: 'Default',
    filled: 'false',
    size: 'large',
    tone: 'error',
  })
  assert.throws(
    () => partAxes({ ...spec, cva: { ...spec.cva, axes: ['shape'] } }, extracted),
    /shape/,
  )
  assert.throws(
    () => partAxes({ ...spec, cva: { ...spec.cva, name: 'missing' } }, extracted),
    /missing/,
  )
  assert.deepEqual(combinations({}), [{}])
})

await test('merges native variable values by theme without losing zero values', () => {
  const tokens = new Map()
  mergeTokens(tokens, [{ name: 'spacing/0', type: 'FLOAT', value: 0 }], 'light')
  mergeTokens(tokens, [{ name: 'spacing/0', type: 'FLOAT', value: 0 }], 'dark')
  assert.deepEqual(tokens.get('spacing/0').values, { dark: 0, light: 0 })
  assert.throws(
    () => mergeTokens(tokens, [{ name: 'spacing/0', type: 'STRING', value: '0' }], 'light'),
    /Conflicting token/,
  )
})

await test('serves only paths within the static Storybook directory', () => {
  assert.equal(safeAssetPath('/'), 'index.html')
  assert.equal(safeAssetPath('/assets/story.js'), 'assets/story.js')
  assert.equal(safeAssetPath('/%2e%2e/secret'), null)
  assert.equal(safeAssetPath('/..%5csecret'), null)
  assert.equal(safeAssetPath('/%00secret'), null)
})

await test('merging replaces selected families without losing other captures or failures', () => {
  const viewport = { height: 1000, width: 1440 },
    previous = {
      failures: [
        { id: 'button/open', theme: 'light' },
        { id: 'input', theme: 'dark' },
      ],
      samples: [
        { family: 'Button', state: 'Default' },
        { family: 'Button', state: 'Open' },
        { family: 'Button Group', state: 'Default' },
        { family: 'Input', state: 'Default' },
      ],
      version: 3,
      viewport,
    },
    retained = retainedCaptures(previous, [{ id: 'button', title: 'Components/Button' }], viewport)
  assert.deepEqual(retained.samples, previous.samples.slice(2))
  assert.deepEqual(retained.failures, [previous.failures[1]])
  assert.throws(() => retainedCaptures({ ...previous, version: 2 }, [], viewport), /incompatible/)
})
