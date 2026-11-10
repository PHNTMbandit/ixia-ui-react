import assert from 'node:assert/strict'
import { test } from 'node:test'

import { orderParts } from './order.ts'

const part = (component, dependencies = [], preferred = []) => ({
  component,
  order: 0,
  slots: { items: { preferred } },
  variants: [{ layer: { children: dependencies.map((name) => ({ figma: { part: name } })) } }],
})

await test('builds shared parts before parents, independent of page and numeric order', () => {
  const list = [
    part('Form', ['Form/Submit', 'Input']),
    part('Form/Submit', ['Button']),
    part('Input', ['Button']),
    part('Button'),
  ]
  assert.deepEqual(
    orderParts(list).map((entry) => entry.component),
    ['Button', 'Form/Submit', 'Input', 'Form'],
  )
})

await test('orders preferred components even when the default slot is empty', () => {
  assert.deepEqual(
    orderParts([part('Root', [], ['Item', 'Icon']), part('Item')]).map((entry) => entry.component),
    ['Item', 'Root'],
  )
})

await test('rejects unresolved, cyclic and duplicate component dependencies', () => {
  assert.throws(() => orderParts([part('Root', ['Missing'])]), /requires missing.*Missing/)
  assert.throws(() => orderParts([part('A', ['B']), part('B', ['A'])]), /Cyclic.*A -> B -> A/)
  assert.throws(() => orderParts([part('A'), part('A')]), /Duplicate/)
})

await test('rejects mixed property types before capture or import mutates its destination', () => {
  const root = part('Root'),
    text = { kind: 'text', figma: { text: 'content' } },
    slot = { kind: 'frame', figma: { slot: 'content' }, children: [text] }
  root.variants = [{ layer: slot }]
  assert.throws(() => orderParts([root]), /Root: property "content" is both SLOT and TEXT/)
  root.variants = [{ layer: { ...slot, children: [] } }, { layer: text }]
  assert.throws(() => orderParts([root]), /both SLOT and TEXT/)
})

await test('scopes properties to their owning component, not nested part overrides', () => {
  const root = part('Root'),
    child = part('Child')
  child.variants = [{ layer: { kind: 'text', figma: { text: 'content' } } }]
  root.variants = [
    {
      layer: {
        kind: 'frame',
        figma: { slot: 'content' },
        children: [{ figma: { part: 'Child' }, children: [child.variants[0].layer] }],
      },
    },
  ]
  assert.deepEqual(
    orderParts([root, child]).map((item) => item.component),
    ['Child', 'Root'],
  )
})
