export const DOCUMENTATION_ONLY_FAMILIES = {
  Map: 'Map canvases depend on live Google Maps/DeckGL rendering and providers. Documentation only; no flattened map Assets are generated.',
}

export function selectStories(entries, families) {
  // Only component stories become examples; token stories duplicate the foundation pages.
  const stories = Object.values(entries).filter(
    (entry) => entry.type === 'story' && entry.title.startsWith('Components/'),
  )
  if (!families.length) {
    return stories
  }
  const selected = stories.filter((entry) =>
    families.some((family) => entry.title.toLowerCase() === `components/${family.toLowerCase()}`),
  )
  for (const family of families) {
    if (
      !selected.some((entry) => entry.title.toLowerCase() === `components/${family.toLowerCase()}`)
    ) {
      throw new Error(`Unknown component family: ${family}`)
    }
  }
  return selected
}

const NATURAL = [
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge',
  'brand',
  'accent',
  'neutral',
  'error',
  'info',
  'success',
  'warning',
  'false',
  'true',
]

// Orders variant values the way designers read them (small < medium < large) instead of the
// Alphabetical order used in source.
export function orderValues(values) {
  const rank = (value) => {
    const index = NATURAL.findIndex((known) => value.toLowerCase().endsWith(known.toLowerCase()))
    return index === -1 ? NATURAL.length : index
  }
  return values.toSorted((a, b) => rank(a) - rank(b) || values.indexOf(a) - values.indexOf(b))
}

export function partAxes(spec, extracted) {
  const axes = {}
  if (spec.cva) {
    const info = extracted[spec.cva.name]
    if (!info) {
      throw new Error(`${spec.component}: ${spec.cva.name} not found in ${spec.cva.file}`)
    }
    for (const axis of spec.cva.axes ?? Object.keys(info.variants)) {
      if (!info.variants[axis]) {
        throw new Error(`${spec.component}: unknown cva axis ${axis}`)
      }
      axes[axis] = orderValues(info.variants[axis])
    }
  }
  Object.assign(axes, spec.axes)
  if (spec.states) {
    axes.State = spec.states
  }
  return axes
}

// Story controls that change a component's appearance become Figma variant properties, in this
// Priority order; behavior controls (mode, type, defaultValue...) stay out of the library.
export const VISUAL_ARGS = ['variant', 'tone', 'size', 'shape', 'orientation', 'style', 'weight']

export function storyAxes(argTypes, args, limit = 200) {
  const axes = {},
    defaults = {},
    skipped = []
  let total = 1
  for (const name of VISUAL_ARGS) {
    const options = argTypes[name]?.options
    if (
      !Array.isArray(options) ||
      options.length < 2 ||
      !options.every((option) => typeof option === 'string')
    ) {
      continue
    }
    if (total * options.length > limit) {
      skipped.push(name)
      continue
    }
    total *= options.length
    axes[name] = orderValues(options)
    defaults[name] = options.includes(args[name]) ? args[name] : axes[name][0]
  }
  return { axes, defaults, skipped }
}

// Drops axes whose values render identically (the story ignores that control), keeping only the
// Variants with the default value.
export function pruneAxes(axes, defaults, variants) {
  const kept = { ...axes }
  let current = variants
  for (const axis of Object.keys(axes)) {
    const groups = new Map()
    for (const variant of current) {
      const { [axis]: _value, ...rest } = variant.props,
        key = JSON.stringify(rest)
      groups.set(key, [...(groups.get(key) || []), JSON.stringify(variant.layer)])
    }
    if ([...groups.values()].every((layers) => new Set(layers).size === 1)) {
      delete kept[axis]
      current = current
        .filter((variant) => variant.props[axis] === defaults[axis])
        .map((variant) => {
          const { [axis]: _value, ...props } = variant.props
          return { ...variant, props }
        })
    }
  }
  return { axes: kept, variants: current }
}

export function combinations(axes) {
  return Object.entries(axes).reduce(
    (result, [axis, values]) =>
      result.flatMap((combo) => values.map((value) => ({ ...combo, [axis]: value }))),
    [{}],
  )
}

// Sub-components a compound component attaches to its root in index.ts
// (`Object.assign(BreadcrumbRoot, { Item: BreadcrumbItem, ... })`), sorted by name.
export function compoundParts(source) {
  const match = /Object\.assign\(\s*\w+\s*,\s*\{([^}]*)\}/.exec(source)
  if (!match) {
    return []
  }
  return match[1]
    .split(',')
    .map((entry) => entry.split(':')[0].trim())
    .filter((name) => /^[A-Z]\w*$/.test(name))
    .toSorted((a, b) => a.localeCompare(b))
}

export function assertAtomicFallback(family, parts) {
  if (parts.length) {
    throw new Error(
      `${family} requires a composable fixture for ${parts.join(', ')}; refusing to generate a flattened asset.`,
    )
  }
}

export function partDefaults(spec, axes, extracted) {
  const defaults = {
    ...(spec.cva ? extracted[spec.cva.name]?.defaultVariants : {}),
    ...spec.defaults,
  }
  return Object.fromEntries(
    Object.entries(axes).map(([axis, values]) => [
      axis,
      values.includes(String(defaults[axis])) ? String(defaults[axis]) : values[0],
    ]),
  )
}

export function plainText(markdown) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function collectDocs(previous, described) {
  const docs = { ...previous },
    refreshed = new Set()
  for (const entry of described) {
    const family = entry.title.replace(/^Components\//, '')
    if (!refreshed.has(family)) {
      refreshed.add(family)
      docs[family] = { description: '', examples: {} }
    }
    if (entry.component) {
      docs[family].description = plainText(entry.component)
    }
    if (entry.story) {
      docs[family].examples[entry.name] = plainText(entry.story)
    }
  }
  return docs
}

export function mergeTokens(target, tokens, theme) {
  for (const token of tokens) {
    const existing = target.get(token.name)
    if (existing && existing.type !== token.type) {
      throw new Error(`Conflicting token: ${token.name}`)
    }
    if (existing) {
      existing.values[theme] = token.value
    } else {
      target.set(token.name, {
        name: token.name,
        type: token.type,
        values: { [theme]: token.value },
      })
    }
  }
}

export function safeAssetPath(pathname) {
  const decoded = decodeURIComponent(pathname).replaceAll('\\', '/')
  if (decoded.split('/').includes('..') || decoded.includes('\0')) {
    return null
  }
  return decoded === '/' ? 'index.html' : decoded.replace(/^\/+/, '')
}

export function retainedCaptures(previous, stories, viewport) {
  if (
    previous.version !== 3 ||
    previous.viewport.width !== viewport.width ||
    previous.viewport.height !== viewport.height
  ) {
    throw new Error('Cannot merge exports with incompatible schemas or viewports')
  }
  const families = new Set(stories.map((story) => story.title.replace(/^Components\//, ''))),
    ids = stories.map((story) => story.id)
  return {
    failures: previous.failures.filter(
      (failure) => !ids.some((id) => failure.id === id || failure.id.startsWith(`${id}/`)),
    ),
    samples: previous.samples.filter((sample) => !families.has(sample.family)),
  }
}
