import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

import { buildVariables, COLLECTIONS } from './tokens.mjs'

const css = await readFile(new URL('../../styles/input.css', import.meta.url), 'utf8'),
  variables = buildVariables(css),
  collection = (name) => {
    const result = variables.collections.find((entry) => entry.name === name)
    assert.ok(result, `Missing collection: ${name}`)
    return result
  }

await test('exports current ixia semantic aliases without treating gradients as color variables', () => {
  const colors = collection(COLLECTIONS.colors)
  assert.ok(colors.variables.length > 0)
  assert.ok(variables.tokens['color/neutral/subtle'])
  assert.ok(!colors.variables.some((entry) => /gradient/i.test(entry.name)))
  for (const entry of colors.variables) {
    assert.equal(entry.type, 'COLOR')
    assert.ok(entry.values.Light)
    assert.ok(entry.values.Dark)
    for (const value of Object.values(entry.values)) {
      if (value.alias) {
        const [name, variable] = value.alias.split('::')
        assert.ok(collection(name).variables.some((candidate) => candidate.name === variable))
      }
    }
  }
})

await test('preserves the dark neutral sRGB mix and its light primitive alias', () => {
  const colors = collection(COLLECTIONS.colors),
    subtle = colors.variables.find((entry) => entry.codeSyntax === 'var(--color-neutral-subtle)'),
    palette = collection(COLLECTIONS.palette),
    primitive = (name) => palette.variables.find((entry) => entry.name === name).values.Default,
    first = primitive('neutral/900'),
    second = primitive('neutral/800')
  assert.deepEqual(subtle.values.Light, { alias: `${COLLECTIONS.palette}::neutral/200` })
  for (const channel of ['r', 'g', 'b', 'a']) {
    assert.ok(
      Math.abs(subtle.values.Dark[channel] - (first[channel] * 0.2 + second[channel] * 0.8)) <
        1e-10,
    )
  }
})

await test('exports current editable font families and typography styles', () => {
  const type = collection(COLLECTIONS.type),
    family = (role) =>
      type.variables.find((entry) => entry.name === `Font family/${role}`).values['Mode 1']
  assert.equal(family('Body'), 'Inter')
  assert.equal(family('Heading'), 'Manrope')
  assert.ok(variables.textStyles.length > 0)
  assert.ok(variables.textStyles.every((style) => ['Inter', 'Manrope'].includes(style.family)))
})
