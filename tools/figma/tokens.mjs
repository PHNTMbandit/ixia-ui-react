import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Turns src/styles/input.css into Figma variable collections and text styles that follow the
// Primitives → Semantics structure (with Utopia fluid min/max modes) and writes them into
// Generated/library.json. Runs on every plugin build, so token changes need no re-capture.
// Every semantic variable aliases a primitive, so switching a semantic mode resolves through it.

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'],
  SIZES = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
  STEPS = { '2xl': 3, '3xl': 4, '4xl': 5, base: 0, lg: 1, sm: -1, xl: 2, xs: -2 },
  WEIGHTS = { 400: 'Regular', 500: 'Medium', 700: 'Bold' },
  PX = 16,
  round = (value, digits = 2) => Math.round(value * 10 ** digits) / 10 ** digits,
  title = (value) =>
    value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  sizeName = (size) => ({ lg: 'L', md: 'M', sm: 'S' })[size] || size.toUpperCase(),
  ref = (collection, name) => ({ alias: `${collection}::${name}` })

export const COLLECTIONS = {
  border: 'Semantics: Border',
  colors: 'Semantics: Colours',
  palette: 'Primitives: Colours',
  shape: 'Primitives: Border',
  space: 'Primitives: Spacing',
  spacing: 'Semantics: Spacing',
  type: 'Primitives: Typography',
  typography: 'Semantics: Typography',
}

function declarations(css) {
  const result = new Map(),
    pattern = /--([\w-]+)\s*:\s*([^;]+);/g
  for (const match of css.matchAll(pattern)) {
    if (!result.has(match[1])) {
      result.set(match[1], match[2].replace(/\s+/g, ' ').trim())
    }
  }
  return result
}

function splitArgs(value) {
  const args = []
  let depth = 0,
    current = ''
  for (const char of value) {
    if (char === '(') {
      depth++
    } else if (char === ')') {
      depth--
    }
    if (char === ',' && depth === 0) {
      args.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  args.push(current.trim())
  return args
}

function call(value, name) {
  const trimmed = value.trim()
  if (!trimmed.startsWith(`${name}(`) || !trimmed.endsWith(')')) {
    return undefined
  }
  return splitArgs(trimmed.slice(name.length + 1, -1))
}

function parseHex(value) {
  const match = /^#([\da-f]{3,8})$/i.exec(value.trim())
  if (!match) {
    return undefined
  }
  let digits = match[1]
  if (digits.length <= 4) {
    digits = Array.from(digits, (digit) => digit + digit).join('')
  }
  const channel = (index) => Number.parseInt(digits.slice(index, index + 2), 16) / 255
  return {
    a: digits.length === 8 ? round(channel(6), 4) : 1,
    b: channel(4),
    g: channel(2),
    r: channel(0),
  }
}

function parseColor(value) {
  const named = { black: '#000000', transparent: '#00000000', white: '#ffffff' }[value.trim()]
  if (named) {
    return parseHex(named)
  }
  const rgba = call(value, 'rgba') || call(value, 'rgb')
  if (rgba) {
    const [r, g, b, a = '1'] = rgba.map(Number)
    return { a: Number(a), b: b / 255, g: g / 255, r: r / 255 }
  }
  return parseHex(value)
}

// Color-mix in OKLab, matching what the browser renders for color-mix(in oklab, …).
const toLinear = (value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4),
  toGamma = (value) =>
    value <= 0.0031308 ? value * 12.92 : 1.055 * Math.max(value, 0) ** (1 / 2.4) - 0.055

function toOklab({ r, g, b }) {
  const [lr, lg, lb] = [r, g, b].map(toLinear),
    l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb),
    m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb),
    s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

const clamp = (value) => Math.min(1, Math.max(0, toGamma(value)))

function fromOklab([L, A, B]) {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3,
    m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3,
    s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3
  return {
    b: clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
    g: clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    r: clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
  }
}

function mix(first, second, weight) {
  const a = toOklab(first),
    b = toOklab(second)
  return {
    ...fromOklab(a.map((value, index) => value * weight + b[index] * (1 - weight))),
    a: first.a * weight + second.a * (1 - weight),
  }
}

function clampPx(value) {
  const args = call(value, 'clamp')
  if (!args) {
    const single = /^(-?[\d.]+)(rem|px)$/.exec(value)
    if (!single) {
      return undefined
    }
    const px = Number(single[1]) * (single[2] === 'rem' ? PX : 1)
    return { max: px, min: px }
  }
  const px = (part) => Number.parseFloat(part) * (part.endsWith('rem') ? PX : 1),
    preferred = /(-?[\d.]+)rem\s*\+\s*(-?[\d.]+)vw/.exec(args[1])
  return {
    intercept: preferred ? Number(preferred[1]) * PX : undefined,
    max: round(px(args[2])),
    min: round(px(args[0])),
    slope: preferred ? Number(preferred[2]) / 100 : undefined,
  }
}

function semanticName(suffix) {
  const tone = TONES.find((candidate) => suffix.startsWith(`${candidate}-`))
  return tone
    ? `${title(tone)}/${title(tone)} ${title(suffix.slice(tone.length + 1))}`
    : `Surface/${title(suffix)}`
}

const valueOf = (side) => (side.alias ? { alias: side.alias } : side.color)

export function buildVariables(css) {
  const vars = declarations(css),
    collections = [],
    tokens = {},
    collection = (name, modes) => {
      const entry = { modes, name, variables: [] }
      collections.push(entry)
      return entry
    },
    needs = (name) => {
      const value = vars.get(name)
      if (value === undefined) {
        throw new Error(`input.css has no --${name}; update tools/figma/tokens.mjs`)
      }
      return value
    }

  // Primitives: Colours
  const palette = collection(COLLECTIONS.palette, ['Default']),
    primitive = new Map()
  for (const [name, value] of vars) {
    const match = /^([a-z]+)-(\d{2,3})$/.exec(name),
      plain = ['white', 'black'].includes(name)
    if (!match && !plain) {
      continue
    }
    const color = parseColor(value)
    if (!color) {
      continue
    }
    const figmaName = plain ? name : `${match[1]}/${match[2]}`
    primitive.set(name, { color, name: figmaName })
    palette.variables.push({
      codeSyntax: `var(--${name})`,
      name: figmaName,
      scopes: plain ? ['ALL_SCOPES'] : ['ALL_FILLS', 'STROKE_COLOR', 'EFFECT_COLOR'],
      type: 'COLOR',
      values: { Default: color },
    })
  }
  // Semantics: Colours (Light / Dark)
  const colors = collection(COLLECTIONS.colors, ['Light', 'Dark']),
    semantic = [...vars.keys()].filter(
      (name) =>
        name.startsWith('ixia-') &&
        !['ixia-white', 'ixia-black'].includes(name) &&
        (TONES.some((tone) => name.startsWith(`ixia-${tone}-`)) ||
          /^ixia-(surface|on-surface|border|scrim|shadow)(-[\w-]+)?$/.test(name)) &&
        !/^ixia-(shadow|border)-(\dxs|xs|sm|md|lg|\dxl|xl|width)/.test(name) &&
        !/-gradient(?:-|$)/.test(name),
    ),
    resolveSide = (value, depth = 0) => {
      const variable = /^var\(--([\w-]+)\)$/.exec(value)
      if (variable) {
        const target = variable[1]
        if (primitive.has(target)) {
          return {
            alias: `${COLLECTIONS.palette}::${primitive.get(target).name}`,
            color: primitive.get(target).color,
          }
        }
        if (semantic.includes(target)) {
          return {
            alias: `${COLLECTIONS.colors}::${semanticName(target.slice('ixia-'.length))}`,
            semantic: target,
          }
        }
        if (depth < 4 && vars.has(target)) {
          return resolveSide(vars.get(target), depth + 1)
        }
        return undefined
      }
      const mixed = call(value, 'color-mix')
      if (mixed) {
        const [, first, second] = mixed,
          side = (part) => {
            const [color, percent] = part.split(/\s+(?=[\d.]+%$)/)
            return {
              color: resolveSide(color, depth + 1)?.color,
              weight: percent ? Number.parseFloat(percent) / 100 : undefined,
            }
          },
          a = side(first),
          b = side(second)
        if (!a.color || !b.color) {
          return undefined
        }
        const weight = a.weight ?? (b.weight === undefined ? 0.5 : 1 - b.weight)
        return { color: mix(a.color, b.color, weight) }
      }
      const color = parseColor(value)
      return color ? { color } : undefined
    }
  for (const name of ['white', 'black']) {
    const alias = resolveSide(needs(`ixia-${name}`))?.alias
    if (!alias?.startsWith(`${COLLECTIONS.palette}::`)) {
      throw new Error(`--ixia-${name} must resolve to a color primitive`)
    }
    tokens[`color/${name}`] = alias
  }
  for (const name of semantic) {
    const value = vars.get(name),
      sides = call(value, 'light-dark') || [value, value],
      [light, dark] = sides.map((side) => resolveSide(side))
    if (!light || !dark) {
      throw new Error(`Cannot resolve --${name}: ${value}`)
    }
    const suffix = name.slice('ixia-'.length),
      figmaName = semanticName(suffix)
    colors.variables.push({
      codeSyntax: `var(--color-${suffix})`,
      description: `--color-${suffix} (Tailwind: bg-${suffix}, text-${suffix}, border-${suffix})`,
      name: figmaName,
      scopes: ['ALL_SCOPES'],
      type: 'COLOR',
      values: { Dark: valueOf(dark), Light: valueOf(light) },
    })
    tokens[`color/${suffix.replace(/-/g, '/')}`] = `${COLLECTIONS.colors}::${figmaName}`
  }

  // Spacing: primitives per viewport extreme, semantics with Max/Min modes (Utopia style).
  const space = collection(COLLECTIONS.space, ['Mode 1']),
    spacing = collection(COLLECTIONS.spacing, ['Max', 'Min']),
    spaces = new Map()
  for (const size of SIZES) {
    const values = clampPx(needs(`ixia-spacing-${size}`)),
      label = sizeName(size)
    spaces.set(size, values)
    for (const edge of ['min', 'max']) {
      space.variables.push({
        hidden: true,
        name: `Space @${edge}/${label}`,
        scopes: [],
        type: 'FLOAT',
        values: { 'Mode 1': values[edge] },
      })
    }
    spacing.variables.push({
      codeSyntax: `var(--spacing-${size})`,
      description: `--spacing-${size}: ${values.min}px at 360px → ${values.max}px at 1240px`,
      name: `Space size/${label}`,
      scopes: ['WIDTH_HEIGHT', 'GAP'],
      type: 'FLOAT',
      values: {
        Max: ref(COLLECTIONS.space, `Space @max/${label}`),
        Min: ref(COLLECTIONS.space, `Space @min/${label}`),
      },
    })
    tokens[`spacing/${size}`] = `${COLLECTIONS.spacing}::Space size/${label}`
  }
  const pairs = [...vars.keys()].filter((name) => {
    const parts = /^ixia-spacing-([\w]+)-([\w]+)$/.exec(name)
    return parts && SIZES.includes(parts[1]) && SIZES.includes(parts[2])
  })
  // Pairs alias the primitives of their two sizes; a pair that departs from them gets its own.
  const spacePrimitive = (edge, px, fallback) => {
    const size = SIZES.find((candidate) => spaces.get(candidate)[edge] === px)
    if (size) {
      return ref(COLLECTIONS.space, `Space @${edge}/${sizeName(size)}`)
    }
    space.variables.push({
      hidden: true,
      name: `Space @${edge}/${fallback}`,
      scopes: [],
      type: 'FLOAT',
      values: { 'Mode 1': px },
    })
    return ref(COLLECTIONS.space, `Space @${edge}/${fallback}`)
  }
  for (const name of pairs) {
    const [lower, upper] = name.slice('ixia-spacing-'.length).split('-'),
      values = clampPx(vars.get(name)),
      adjacent = SIZES.indexOf(upper) - SIZES.indexOf(lower) === 1,
      pair = `${sizeName(lower)}—${sizeName(upper)}`,
      label = `${adjacent ? '' : 'Custom pairs/'}${pair}`
    spacing.variables.push({
      codeSyntax: `var(--spacing-${lower}-${upper})`,
      description: `--spacing-${lower}-${upper}: ${values.min}px at 360px → ${values.max}px at 1240px`,
      name: `Space size pairs/${label}`,
      scopes: ['WIDTH_HEIGHT', 'GAP'],
      type: 'FLOAT',
      values: {
        Max: spacePrimitive('max', values.max, `Pairs/${pair}`),
        Min: spacePrimitive('min', values.min, `Pairs/${pair}`),
      },
    })
    tokens[`spacing/${lower}/${upper}`] = `${COLLECTIONS.spacing}::Space size pairs/${label}`
  }

  // Typography: fluid font size steps plus the families and weights the text styles use.
  const type = collection(COLLECTIONS.type, ['Mode 1']),
    typography = collection(COLLECTIONS.typography, ['Max', 'Min']),
    steps = new Map()
  // oxlint-disable-next-line unicorn/no-array-sort -- sorting a fresh array.
  for (const [size, step] of Object.entries(STEPS).sort((a, b) => b[1] - a[1])) {
    const values = clampPx(needs(`ixia-text-${size}`))
    steps.set(step, { ...values, size })
    for (const edge of ['min', 'max']) {
      type.variables.push({
        hidden: true,
        name: `Font size @${edge}/Step ${step}`,
        scopes: [],
        type: 'FLOAT',
        values: { 'Mode 1': values[edge] },
      })
    }
    typography.variables.push({
      codeSyntax: `var(--text-${size})`,
      description: `--text-${size} (text-${size}): ${values.min}px at 360px → ${values.max}px at 1240px`,
      name: `Font size/Step ${step}`,
      scopes: ['FONT_SIZE'],
      type: 'FLOAT',
      values: {
        Max: ref(COLLECTIONS.type, `Font size @max/Step ${step}`),
        Min: ref(COLLECTIONS.type, `Font size @min/Step ${step}`),
      },
    })
    tokens[`text/${size}`] = `${COLLECTIONS.typography}::Font size/Step ${step}`
  }
  for (const weight of Object.values(WEIGHTS).toReversed()) {
    type.variables.push({
      name: `Font weight/${weight}`,
      scopes: ['ALL_SCOPES'],
      type: 'STRING',
      values: { 'Mode 1': weight },
    })
  }
  const family = (role) => needs(`ixia-font-${role}`).split(',')[0].replace(/['"]/g, '').trim()
  for (const role of ['body', 'heading']) {
    type.variables.push({
      codeSyntax: `var(--font-${role})`,
      name: `Font family/${title(role)}`,
      scopes: ['ALL_SCOPES'],
      type: 'STRING',
      values: { 'Mode 1': family(role) },
    })
    tokens[`font/${role}`] = `${COLLECTIONS.type}::Font family/${title(role)}`
  }

  // Border: fixed values, so one primitive per pixel value and semantics that alias them.
  const shape = collection(COLLECTIONS.shape, ['Mode 1']),
    border = collection(COLLECTIONS.border, ['Mode 1']),
    shapePrimitive = (group, px) => {
      const name = `${group}/${px}`
      if (!shape.variables.some((entry) => entry.name === name)) {
        shape.variables.push({
          hidden: true,
          name,
          scopes: [],
          type: 'FLOAT',
          values: { 'Mode 1': px },
        })
      }
      return ref(COLLECTIONS.shape, name)
    }
  for (const [name, value] of vars) {
    const radius = /^ixia-radius-([\w]+)$/.exec(name),
      stroke = /^ixia-border-width-([\w]+)$/.exec(name)
    if (radius) {
      border.variables.push({
        codeSyntax: `var(--radius-${radius[1]})`,
        name: `Radius/${radius[1]}`,
        scopes: ['CORNER_RADIUS'],
        type: 'FLOAT',
        values: { 'Mode 1': shapePrimitive('Radius', clampPx(value).max) },
      })
      tokens[`radius/${radius[1]}`] = `${COLLECTIONS.border}::Radius/${radius[1]}`
    } else if (stroke) {
      border.variables.push({
        codeSyntax: `var(--border-width-${stroke[1]})`,
        name: `Stroke/${stroke[1]}`,
        scopes: ['STROKE_FLOAT'],
        type: 'FLOAT',
        values: { 'Mode 1': shapePrimitive('Stroke', clampPx(value).max) },
      })
    }
  }

  return {
    collections,
    textStyles: textStyles(css, steps, family),
    theme: { collection: COLLECTIONS.colors, modes: { dark: 'Dark', light: 'Light' } },
    tokens,
  }
}

function textStyles(css, steps, family) {
  const styles = [],
    pattern = /@utility style-text-([a-z]+)-(-?\d+)\s*\{([^}]*)\}/g
  for (const [, category, stepText, body] of css.matchAll(pattern)) {
    const props = Object.fromEntries(
        [...body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map(([, key, value]) => [key, value.trim()]),
      ),
      step = Number(stepText),
      role = /--font-(\w+)/.exec(props['font-family'] || '')?.[1] || 'body',
      weight = Number(props['font-weight'] || 400),
      size = /--text-([\w]+)/.exec(props['font-size'] || '')?.[1],
      lineHeight = props['line-height'],
      percent = lineHeight?.endsWith('%')
        ? Number.parseFloat(lineHeight)
        : lineHeight && lineHeight !== 'normal'
          ? Number(lineHeight) * 100
          : undefined,
      values = steps.get(step)
    if (!values || STEPS[size] !== step) {
      throw new Error(`style-text-${category}-${step} does not use the step ${step} font size`)
    }
    const style = WEIGHTS[weight] ?? 'Regular' // oxlint-disable-line tailwindcss/no-unknown-classes
    styles.push({
      description: `style-text-${category}-${step} · ${family(role)} ${style} · ${values.min}–${values.max}px${percent ? ` · ${round(percent)}% line height` : ''}`,
      family: family(role),
      lineHeight: percent === undefined ? undefined : round(percent),
      name: `${title(category)}/Step ${step}`,
      refs: {
        fontFamily: `${COLLECTIONS.type}::Font family/${title(role)}`,
        fontSize: `${COLLECTIONS.typography}::Font size/Step ${step}`,
        fontStyle: `${COLLECTIONS.type}::Font weight/${style}`,
      },
      size: values.max,
      style,
      weight,
    })
  }
  return styles
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const css = readFileSync(new URL('../../src/styles/input.css', import.meta.url), 'utf8'),
    file = new URL('generated/library.json', import.meta.url),
    library = JSON.parse(readFileSync(file, 'utf8')),
    variables = buildVariables(css),
    count = variables.collections.reduce((sum, entry) => sum + entry.variables.length, 0)
  library.variables = variables
  writeFileSync(file, JSON.stringify(library))
  console.log(
    `Wrote ${count} variables in ${variables.collections.length} collections and ${variables.textStyles.length} text styles.`,
  )
}
