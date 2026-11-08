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
  for (const tone of ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning']) {
    assert.ok(variables.tokens[`color/${tone}/container`])
    assert.equal(variables.tokens[`color/${tone}/subtle`], undefined)
  }
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

await test('exports white and black palettes and preserves semantic neutral aliases', () => {
  const colors = collection(COLLECTIONS.colors),
    container = colors.variables.find(
      (entry) => entry.codeSyntax === 'var(--color-neutral-container)',
    ),
    palette = collection(COLLECTIONS.palette)
  assert.ok(container)
  assert.deepEqual(container.values.Light, { alias: `${COLLECTIONS.palette}::white/400` })
  assert.deepEqual(container.values.Dark, { alias: `${COLLECTIONS.palette}::black/600` })
  assert.ok(!palette.variables.some((entry) => entry.name.startsWith('neutral/')))
  assert.ok(!palette.variables.some((entry) => entry.name === 'white'))
  assert.equal(variables.tokens['color/white'], `${COLLECTIONS.palette}::white/50`)
  for (const family of ['white', 'black']) {
    for (const step of [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      '950',
    ]) {
      const primitive = palette.variables.find((entry) => entry.name === `${family}/${step}`)
      assert.ok(primitive, `Missing primitive: ${family}/${step}`)
      assert.equal(primitive.codeSyntax, `var(--${family}-${step})`)
    }
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
