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

await test('exports chromatic container levels with the same sRGB colors as CSS', () => {
  const roles = {
      accent: 'teal',
      brand: 'orange',
      error: 'red',
      info: 'blue',
      success: 'green',
      warning: 'amber',
    },
    primitive = (family, step) => {
      const variable = palette.variables.find((entry) => entry.name === `${family}/${step}`)
      assert.ok(variable, `Missing ${family}/${step}`)
      return variable.values.Default
    },
    black = palette.variables.find((entry) => entry.name === 'black').values.Default,
    assertMix = (actual, first, second, weight) => {
      for (const channel of ['r', 'g', 'b', 'a']) {
        const expected = first[channel] * weight + second[channel] * (1 - weight)
        assert.ok(Math.abs(actual[channel] - expected) < 1e-10, `${channel}: ${actual[channel]}`)
      }
    }

  for (const [role, family] of Object.entries(roles)) {
    const name = role[0].toUpperCase() + role.slice(1),
      low = semantics.variables.find((entry) => entry.name === `${name}/${name} Container Low`),
      high = semantics.variables.find((entry) => entry.name === `${name}/${name} Container High`)
    assert.ok(low, `Missing ${role} container low`)
    assert.ok(high, `Missing ${role} container high`)
    assert.deepEqual(low.values.Light, { alias: `${COLLECTIONS.palette}::${family}/50` })
    assertMix(low.values.Dark, primitive(family, 950), black, 0.7)
    assertMix(high.values.Light, primitive(family, 200), primitive(family, 300), 0.9)
    assertMix(high.values.Dark, primitive(family, 900), primitive(family, 800), 0.5)
  }
})

await test('rejects unsupported color-mix spaces instead of exporting the wrong color', () => {
  const invalid = css.replace('color-mix(in srgb,', 'color-mix(in lch,')
  assert.notEqual(invalid, css)
  assert.throws(() => buildVariables(invalid), /Cannot resolve --ixia-brand-container-low/)
})

await test('rejects a flat color token that does not resolve to a primitive', () => {
  const invalid = css.replace('--ixia-white: var(--white-50);', '--ixia-white: var(--missing);')
  assert.notEqual(invalid, css)
  assert.throws(() => buildVariables(invalid), /--ixia-white must resolve to a color primitive/)
})
