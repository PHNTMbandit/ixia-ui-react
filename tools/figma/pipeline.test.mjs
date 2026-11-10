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
  const directory = await mkdtemp(join(tmpdir(), 'ixia-cva-'))
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
export const handle = UnrelatedDialog.createHandle()
export const mention = "notACall = cva("
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

await test('resolves plain constants shared locally and through relative imports in cva configs', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'ixia-cva-shared-'))
  try {
    await writeFile(
      join(directory, 'tone.ts'),
      `export const baseClasses = 'flex gap-xs'
export const toneClasses = { accent: 'text-accent', brand: 'text-brand' }
export const handle = Unrelated.createHandle()
`,
    )
    const file = join(directory, 'menu.types.ts')
    await writeFile(
      file,
      `import { cva } from 'class-variance-authority'
import { baseClasses, toneClasses } from './tone'
const sizes = { large: 'h-10', small: 'h-8' }
export const menuVariants = cva(\`flex \${baseClasses}\`, {
  variants: { size: sizes, tone: toneClasses },
  defaultVariants: { size: 'small', tone: 'brand' },
})
`,
    )
    assert.deepEqual(await extractCva(file), {
      menuVariants: {
        defaultVariants: { size: 'small', tone: 'brand' },
        variants: { size: ['large', 'small'], tone: ['accent', 'brand'] },
      },
    })
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
      children: [{ kind: 'text', fill: color(0.5, 0.5, 0.5) }],
      fill: color(0, 0.3, 0.7),
      kind: 'frame',
      stroke: color(0.1, 0.9, 0.1),
    },
    dark = {
      children: [{ kind: 'text', fill: color(0.5, 0.5, 0.5) }],
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
      { kind: 'text', name: 'Label', x: 34, y: 9, width: 50, height: 18, opacity: 1 },
      { kind: 'svg', name: 'svg', x: 12, y: 10, width: 16, height: 16, opacity: 1 },
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

await test('grid columns align left and center on the main axis like an items-center grid', () => {
  const header = inferLayout(
    box('header', 0, 0, 160, 40, {
      children: [
        box('icon', 0, 14, 12, 12),
        box('title', 20, 0, 140, 20),
        box('subtitle', 20, 20, 140, 20),
      ],
      css: { alignItems: 'center', display: 'grid', padding: [0, 0, 0, 0] },
    }),
  )
  const column = header.children.find((child) => child.synthetic)
  assert.equal(column.name, 'Column 2')
  assert.equal(column.auto.align, 'MIN')
  assert.equal(column.auto.justify, 'CENTER')
})

await test('wrapping flex rows keep align-items instead of offset wrappers', () => {
  const row = inferLayout(
    box('swatches', 0, 0, 48, 24, {
      children: [box('swatch', 0, 3, 18, 18), box('add', 24, 0, 24, 24)],
      css: {
        alignItems: 'center',
        columnGap: 6,
        direction: 'row',
        display: 'flex',
        justifyContent: 'normal',
        padding: [0, 0, 0, 0],
        rowGap: 6,
        wrap: 'wrap',
      },
    }),
  )
  assert.equal(row.auto.align, 'CENTER')
  assert.deepEqual(
    row.children.map((child) => child.name),
    ['swatch', 'add'],
  )
})

await test('block boxes keep CSS padding and let text and content wrap at their width', () => {
  const dialog = rootSizing(
    box('dialog', 0, 0, 480, 120, {
      children: [
        box('Title', 24, 24, 432, 26, {
          css: blockCss(),
          children: [
            { kind: 'text', name: 'Title', x: 0, y: 0, width: 116, height: 24, opacity: 1 },
          ],
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
      children: [{ kind: 'text', name: 'Label', x: 0, y: 0, width: 80, height: 24, opacity: 1 }],
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
          css: blockCss(),
          children: [
            { kind: 'text', name: 'Label', x: 0, y: 0, width: 52, height: 24, opacity: 1 },
          ],
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
          css: {
            display: 'flex',
            wrap: 'nowrap',
            direction: 'row',
            columnGap: 12,
            rowGap: 0,
            padding: [12, 12, 12, 12],
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'static',
            grow: 0,
          },
          children: [
            { kind: 'text', name: 'Title', x: 12, y: 22, width: 100, height: 20, opacity: 1 },
            { kind: 'svg', name: 'svg', x: 372, y: 24, width: 16, height: 16, opacity: 1 },
          ],
        }),
      ],
      css: { ...blockCss(), fixedWidth: true },
    }),
  )
  assert.equal(heading.children[0].sizing.h, 'FILL')
})

await test('auto margins become a filling child so trailing content stays at the end', () => {
  const flexCss = (extra = {}) => ({
    alignItems: 'center',
    columnGap: 6,
    direction: 'row',
    display: 'flex',
    grow: 0,
    justifyContent: 'normal',
    padding: [3, 9, 3, 9],
    position: 'static',
    rowGap: 6,
    wrap: 'nowrap',
    ...extra,
  })
  // A Menu.Item: icon, label, then a Menu.Shortcut with ml-auto at the right edge.
  const item = rootSizing(
    box('item', 0, 0, 200, 30, {
      children: [
        { kind: 'svg', name: 'svg', x: 9, y: 9, width: 12, height: 12, opacity: 1 },
        box('Label', 27, 3, 39, 24, {
          css: blockCss({ display: 'inline' }),
          // Captured frames carry a transparent fill; only a visible one keeps its size.
          fill: { a: 0, b: 0, g: 0, r: 0 },
          children: [{ kind: 'text', name: 'Copy', x: 0, y: 0, width: 39, height: 24, opacity: 1 }],
        }),
        box('Shortcut', 131, 6, 60, 18, {
          css: flexCss({ autoMargin: [false, false, false, true], padding: [0, 0, 0, 0] }),
        }),
      ],
      css: { ...flexCss(), fixedWidth: true },
    }),
  )
  assert.deepEqual(
    item.children.map((child) => child.sizing.h),
    ['FIXED', 'FILL', 'FIXED'],
  )

  // A bare text label fills too: its fill is the text color.
  const bare = rootSizing(
    box('item', 0, 0, 200, 30, {
      children: [
        {
          fill: { a: 1, b: 0, g: 0, r: 0 },
          height: 24,
          kind: 'text',
          name: 'Copy',
          opacity: 1,
          width: 39,
          x: 9,
          y: 3,
        },
        box('Shortcut', 131, 6, 60, 18, {
          css: flexCss({ autoMargin: [false, false, false, true], padding: [0, 0, 0, 0] }),
        }),
      ],
      css: { ...flexCss(), fixedWidth: true },
    }),
  )
  assert.equal(bare.children[0].sizing.h, 'FILL')

  // Decorated children keep their size; only an undecorated one stands in for the margin.
  const decorated = rootSizing(
    box('item', 0, 0, 200, 30, {
      children: [
        box('Label', 9, 3, 39, 24, {
          css: blockCss({ display: 'inline' }),
          fill: { a: 1, b: 0, g: 0, r: 1 },
        }),
        box('Shortcut', 131, 6, 60, 18, {
          css: flexCss({ autoMargin: [false, false, false, true], padding: [0, 0, 0, 0] }),
        }),
      ],
      css: { ...flexCss(), fixedWidth: true },
    }),
  )
  assert.equal(decorated.children[0].sizing.h, 'FIXED')

  // A fixed margin (mt-6) in a hugging column also leaves its last child flush with the end, but
  // Is not an auto margin.
  const column = flexCss({ alignItems: 'stretch', direction: 'column', padding: [24, 24, 24, 24] })
  const nav = rootSizing(
    box('nav', 0, 0, 300, 372, {
      children: [
        box('Title', 24, 24, 252, 24, { css: blockCss() }),
        box('List', 24, 72, 252, 276, { css: blockCss() }),
      ],
      css: { ...column, columnGap: 0, rowGap: 0 },
    }),
  )
  assert.notEqual(nav.children[0].sizing.v, 'FILL')
})
