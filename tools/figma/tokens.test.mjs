import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

import { buildVariables, COLLECTIONS } from './tokens.mjs'

const css = await readFile(new URL('../../src/styles/input.css', import.meta.url), 'utf8'),
  output = buildVariables(css),
  palette = output.collections.find((collection) => collection.name === COLLECTIONS.palette),
  semantics = output.collections.find((collection) => collection.name === COLLECTIONS.colors),
  primitives = [...css.matchAll(/--(white|black)-(\d+):\s*(#[\da-fA-F]{6});/g)]

function color(hex) {
  return {
    a: 1,
    b: Number.parseInt(hex.slice(5, 7), 16) / 255,
    g: Number.parseInt(hex.slice(3, 5), 16) / 255,
    r: Number.parseInt(hex.slice(1, 3), 16) / 255,
  }
}

await test('exports the achromatic primitives declared by this theme', () => {
  for (const [, family, step, hex] of primitives) {
    const primitive = palette.variables.find((variable) => variable.name === `${family}/${step}`)
    assert.ok(primitive, `Missing ${family}/${step}`)
    assert.deepEqual(primitive.values.Default, color(hex))
  }
  assert.ok(primitives.length > 0)
  assert.equal(output.tokens['color/white'], `${COLLECTIONS.palette}::white/50`)
  assert.equal(output.tokens['color/black'], `${COLLECTIONS.palette}::black`)
})

await test('exports subtle and error-on-surface semantic tokens', () => {
  for (const tone of ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning']) {
    const alias = output.tokens[`color/${tone}/subtle`],
      variable = semantics.variables.find((entry) => `${semantics.name}::${entry.name}` === alias)
    assert.ok(variable, `Missing color/${tone}/subtle`)
    assert.ok(variable.values.Light)
    assert.ok(variable.values.Dark)
  }
  assert.ok(output.tokens['color/error/on/surface'])
})

await test('rejects a flat color token that does not resolve to a primitive', () => {
  const invalid = css.replace('--ixia-white: var(--white-50);', '--ixia-white: var(--missing);')
  assert.notEqual(invalid, css)
  assert.throws(() => buildVariables(invalid), /--ixia-white must resolve to a color primitive/)
})
