import assert from 'node:assert/strict'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { bindTokens, tokenMatcher } from './bind.mjs'
import { extractCva } from './cva.mjs'
import { inferLayout, rootSizing } from './layout.mjs'

const color = (r, g, b, a = 1) => ({ a, b, g, r })

await test('reads cva variants and defaults from TypeScript sources', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'cartyx-cva-'))
  try {
    const file = join(directory, 'button.types.ts')
    await writeFile(
      file,
      `import { cva, type VariantProps } from 'class-variance-authority'
export const buttonVariants = cva('base', {
  variants: {
    size: { large: 'h-10', small: 'h-8' } satisfies Record<string, string>,
    disabled: { true: 'opacity-50', false: '' },
  },
  defaultVariants: { size: 'small', disabled: false },
})
export type ButtonProps = VariantProps<typeof buttonVariants>
`,
    )
    assert.deepEqual(await extractCva(file), {
      buttonVariants: {
        defaultVariants: { disabled: 'false', size: 'small' },
        variants: { disabled: ['true', 'false'], size: ['large', 'small'] },
      },
    })
    const empty = join(directory, 'empty.ts')
    await writeFile(empty, 'export const value = 1\n')
    assert.deepEqual(await extractCva(empty), {})
  } finally {
    await rm(directory, { force: true, recursive: true })
  }
})

await test('binds colors to the semantic token that matches both themes', () => {
  const match = tokenMatcher([
    {
      name: 'color/brand/default',
      type: 'COLOR',
      values: { dark: color(0.2, 0.6, 1), light: color(0, 0.3, 0.7) },
    },
    {
      name: 'color/error/default',
      type: 'COLOR',
      values: { dark: color(0.9, 0.1, 0.1), light: color(0, 0.3, 0.7) },
    },
    {
      name: 'color/neutral/default',
      type: 'COLOR',
      values: { dark: color(0.5, 0.5, 0.5), light: color(0.5, 0.5, 0.5) },
    },
    {
      name: 'color/accent/default',
      type: 'COLOR',
      values: { dark: color(0.5, 0.5, 0.5), light: color(0.5, 0.5, 0.5) },
    },
  ])
  assert.deepEqual(match(color(0, 0.3, 0.7), color(0.2, 0.6, 1)), { name: 'color/brand/default' })
  assert.deepEqual(match(color(0, 0.3, 0.7, 0.1), color(0.2, 0.6, 1, 0.1)), {
    name: 'color/brand/default',
    opacity: 0.1,
  })
  assert.equal(match(color(0, 0.3, 0.7), color(0, 0, 0)), undefined)
  assert.equal(
    match(color(0.5, 0.5, 0.5), color(0.5, 0.5, 0.5), 'accent').name,
    'color/accent/default',
  )

  const light = {
      children: [{ fill: color(0.5, 0.5, 0.5), kind: 'text' }],
      fill: color(0, 0.3, 0.7),
      kind: 'frame',
      stroke: color(0.1, 0.9, 0.1),
    },
    dark = {
      children: [{ fill: color(0.5, 0.5, 0.5), kind: 'text' }],
      fill: color(0.2, 0.6, 1),
      kind: 'frame',
      stroke: color(0.1, 0.9, 0.1),
    }
  assert.equal(bindTokens(light, dark, match, 'neutral'), 1)
  assert.deepEqual(light.fillToken, { name: 'color/brand/default' })
  assert.equal(light.strokeToken, undefined)
  assert.deepEqual(light.children[0].fillToken, { name: 'color/neutral/default' })
})

const box = (name, x, y, width, height, extra = {}) => ({
  children: [],
  height,
  kind: 'frame',
  name,
  opacity: 1,
  width,
  x,
  y,
  ...extra,
})

await test('maps flex containers to Auto Layout with hugging roots and fixed icons', () => {
  const layer = box('button', 0, 0, 96, 36, {
    children: [
      { height: 18, kind: 'text', name: 'Label', opacity: 1, width: 50, x: 34, y: 9 },
      { height: 16, kind: 'svg', name: 'svg', opacity: 1, width: 16, x: 12, y: 10 },
    ],
    css: {
      alignItems: 'center',
      columnGap: 6,
      direction: 'row',
      display: 'inline-flex',
      justifyContent: 'center',
      padding: [0, 11, 0, 11],
      rowGap: 0,
      wrap: 'nowrap',
    },
    strokeWidths: [1, 1, 1, 1],
  })
  rootSizing(layer)
  assert.deepEqual(layer.auto, {
    align: 'CENTER',
    gap: 6,
    justify: 'CENTER',
    mode: 'HORIZONTAL',
    padding: [1, 12, 1, 12],
    stretch: false,
  })
  assert.deepEqual(
    layer.children.map((child) => child.kind),
    ['svg', 'text'],
  )
  assert.deepEqual(layer.children[0].sizing, { h: 'FIXED', v: 'FIXED' })
  assert.deepEqual(layer.children[1].sizing, { h: 'HUG', v: 'HUG' })
  assert.deepEqual(layer.sizing, { h: 'HUG', v: 'FIXED' })
})

await test('infers stacks and grids from geometry and keeps absolute children', () => {
  const stackLayer = inferLayout(
    box('card', 0, 0, 200, 120, {
      children: [
        box('Header', 16, 16, 168, 24),
        box('Body', 16, 48, 168, 40),
        box('Badge', 180, -6, 12, 12, { css: { position: 'absolute' } }),
      ],
    }),
  )
  assert.equal(stackLayer.auto.mode, 'VERTICAL')
  assert.equal(stackLayer.auto.gap, 8)
  assert.deepEqual(stackLayer.auto.padding, [16, 16, 32, 16])
  assert.ok(stackLayer.children.at(-1).absolute)
  assert.equal(stackLayer.children[0].sizing.h, 'FILL')

  const grid = inferLayout(
    box('grid', 0, 0, 220, 100, {
      children: [
        box('A', 0, 0, 100, 40),
        box('B', 0, 60, 100, 40),
        box('C', 120, 0, 100, 40),
        box('D', 120, 60, 100, 40),
      ],
    }),
  )
  assert.equal(grid.auto.mode, 'HORIZONTAL')
  assert.equal(grid.auto.gap, 20)
  assert.deepEqual(
    grid.children.map((child) => [child.name, child.synthetic, child.auto.mode]),
    [
      ['Column 1', true, 'VERTICAL'],
      ['Column 2', true, 'VERTICAL'],
    ],
  )
  assert.deepEqual(
    grid.children[1].children.map((child) => [child.name, child.x, child.y]),
    [
      ['C', 0, 0],
      ['D', 0, 60],
    ],
  )
  const overlapping = inferLayout(
    box('overlap', 0, 0, 100, 100, {
      children: [box('A', 0, 0, 80, 80), box('B', 20, 20, 80, 80)],
    }),
  )
  assert.deepEqual(overlapping.auto, { mode: 'NONE' })
})

const blockCss = (extra = {}) => ({
  display: 'block',
  grow: 0,
  padding: [0, 0, 0, 0],
  position: 'static',
  ...extra,
})

await test('block boxes keep CSS padding and let text and content wrap at their width', () => {
  const dialog = rootSizing(
    box('dialog', 0, 0, 480, 120, {
      children: [
        box('Title', 24, 24, 432, 26, {
          children: [
            { height: 24, kind: 'text', name: 'Title', opacity: 1, width: 116, x: 0, y: 0 },
          ],
          css: blockCss(),
        }),
        box('Separator', 24, 60, 432, 1, { css: blockCss() }),
        box('Underlay', 0, 0, 480, 120, {
          css: blockCss({ position: 'absolute' }),
          underlay: true,
        }),
      ],
      css: { ...blockCss({ padding: [24, 24, 24, 24] }), fixedWidth: true },
    }),
  )
  assert.deepEqual(dialog.sizing, { h: 'FIXED', v: 'FIXED' })
  assert.deepEqual(dialog.auto.padding, [24, 24, 24, 24])
  assert.deepEqual(
    dialog.children.map((child) => child.name),
    ['Underlay', 'Title', 'Separator'],
  )
  const [, title, separator] = dialog.children
  // The block grows with its text; the trailing space after the text is not padding.
  assert.deepEqual(title.auto.padding, [0, 0, 0, 0])
  assert.deepEqual(title.sizing, { h: 'FILL', v: 'HUG' })
  assert.equal(title.children[0].sizing.h, 'FILL')
  assert.deepEqual(separator.sizing, { h: 'FILL', v: 'FIXED' })

  const hugging = rootSizing(
    box('label', 0, 0, 80, 24, {
      children: [{ height: 24, kind: 'text', name: 'Label', opacity: 1, width: 80, x: 0, y: 0 }],
      css: blockCss(),
    }),
  )
  // Without an explicit width the root hugs, so its text cannot fill it.
  assert.equal(hugging.sizing.h, 'HUG')
  assert.equal(hugging.children[0].sizing.h, 'HUG')
})

await test('grid text columns and lone stretched children fill their parent', () => {
  const item = rootSizing(
    box('item', 0, 0, 228, 50, {
      children: [
        box('Text', 6, 3, 195, 44, {
          children: [
            { height: 24, kind: 'text', name: 'Label', opacity: 1, width: 52, x: 0, y: 0 },
          ],
          css: blockCss(),
        }),
        box('Check', 210, 19, 12, 12),
      ],
      css: {
        display: 'grid',
        fixedWidth: true,
        grow: 0,
        padding: [3, 6, 3, 6],
        position: 'static',
      },
    }),
  )
  assert.equal(item.children[0].sizing.h, 'FILL')
  assert.equal(item.children[1].sizing.h, 'FIXED')

  const heading = rootSizing(
    box('h3', 0, 0, 400, 64, {
      children: [
        box('Trigger', 0, 0, 400, 64, {
          children: [
            { height: 20, kind: 'text', name: 'Title', opacity: 1, width: 100, x: 12, y: 22 },
            { height: 16, kind: 'svg', name: 'svg', opacity: 1, width: 16, x: 372, y: 24 },
          ],
          css: {
            alignItems: 'center',
            columnGap: 12,
            direction: 'row',
            display: 'flex',
            grow: 0,
            justifyContent: 'space-between',
            padding: [12, 12, 12, 12],
            position: 'static',
            rowGap: 0,
            wrap: 'nowrap',
          },
        }),
      ],
      css: { ...blockCss(), fixedWidth: true },
    }),
  )
  assert.equal(heading.children[0].sizing.h, 'FILL')
})
