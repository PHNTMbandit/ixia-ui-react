import { buildIcons, buildLayer, buildPart, defaultComponent, tag, tagOf } from './components'
import type { PartNode, BuildContext } from './components'
import { componentName, propName, valueName } from './naming'
import type {
  CollectionSpec,
  Color,
  Layer,
  Library,
  PartComponent,
  Sample,
  TextStyleSpec,
  Theme,
  VariableSpec,
  VariableValue,
} from './schema'

declare const CARTYX_LIBRARY: Library
declare const CARTYX_UI: string
declare const CARTYX_PACKAGE: { name: string; version: string }

const PREFIX = 'Cartyx UI',
  ROOT_PREFIX = `${PREFIX} · `,
  THEMES: Theme[] = ['light', 'dark'],
  groupOf = (family: string) => family.split('/')[0],
  pageName = (group: string) => `↳ ${group}`,
  bundled = CARTYX_LIBRARY

// The library can be replaced at runtime with "Load library.json…", so syncing new captures does
// Not require rebuilding or republishing the plugin.
let library = bundled,
  docs = library.docs || {},
  parts = library.parts?.components || [],
  groups: string[] = []

function setLibrary(next: Library) {
  library = { ...next, variables: next.variables || bundled.variables }
  docs = library.docs || {}
  parts = library.parts?.components || []
  const partGroups = new Set(parts.map((part) => part.group))
  groups = [
    ...new Set([...library.samples.map((sample) => groupOf(sample.family)), ...partGroups]),
    // oxlint-disable-next-line unicorn/no-array-sort -- the plugin targets ES2020, which has no toSorted.
  ].sort((a, b) => a.localeCompare(b))
}
setLibrary(bundled)

function announce(source: string) {
  figma.ui.postMessage(
    {
      components: groups,
      failures: library.failures,
      generatedAt: library.generatedAt,
      samples: library.samples.length,
      source,
      type: 'ready',
      version: CARTYX_PACKAGE.version,
      warnings: library.warnings,
    },
    { origin: '*' },
  )
}

figma.showUI(CARTYX_UI, { height: 720, themeColors: true, width: 420 })
announce('bundled')

const notices = new Set<string>(),
  fontLoads = new Map<string, Promise<void>>()
let fonts: FontName[] = [],
  importing = false,
  styleSpecs: { spec: TextStyleSpec; style: TextStyle }[] = [],
  variableState: VariableState | undefined

// ---------------------------------------------------------------------------
// Colors and paint helpers

function hex(value: string): RGB {
  const n = Number.parseInt(value.slice(1), 16)
  return { b: (n & 255) / 255, g: ((n >> 8) & 255) / 255, r: ((n >> 16) & 255) / 255 }
}

function solid(color: RGB, opacity = 1): SolidPaint {
  return { color, opacity, type: 'SOLID' }
}

function paint(color: Color): SolidPaint {
  return solid({ b: color.b, g: color.g, r: color.r }, color.a)
}

function toHex(color: Color) {
  const value = [color.r, color.g, color.b]
    .map((channel) =>
      Math.round(channel * 255)
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')
    .toUpperCase()
  return color.a < 1 ? `#${value} ${Math.round(color.a * 100)}%` : `#${value}`
}

function tokenColor(name: string, theme: Theme): Color | undefined {
  const value = library.tokens.find((token) => token.name === name)?.values[theme]
  return value && typeof value === 'object' ? value : undefined
}

function rgb(color: Color | undefined, fallback: string): RGB {
  return color ? { b: color.b, g: color.g, r: color.r } : hex(fallback)
}

const ink = hex('#0F1115'),
  muted = hex('#575C66'),
  subtle = hex('#8A8F99'),
  hairline = hex('#E3E5EA'),
  white = hex('#FFFFFF'),
  pageBackground = hex('#EEF0F3'),
  brand = rgb(tokenColor('color/brand/default', 'light'), '#005BA7'),
  brandBright = rgb(tokenColor('color/brand/default', 'dark'), '#30ACFF'),
  accent = rgb(tokenColor('color/accent/default', 'dark'), '#7C5CFF'),
  surface = (theme: Theme) =>
    rgb(tokenColor('color/surface/background', theme), theme === 'light' ? '#FFFFFF' : '#0B0B0B')

// ---------------------------------------------------------------------------
// Fonts

function weightOf(style: string) {
  const normalized = style.toLowerCase().replace(/[\s-]/g, '')
  if (normalized.includes('thin')) {
    return 100
  }
  if (normalized.includes('extralight') || normalized.includes('ultralight')) {
    return 200
  }
  if (normalized.includes('light')) {
    return 300
  }
  if (normalized.includes('medium')) {
    return 500
  }
  if (normalized.includes('semibold') || normalized.includes('demibold')) {
    return 600
  }
  if (normalized.includes('extrabold') || normalized.includes('ultrabold')) {
    return 800
  }
  if (normalized.includes('black') || normalized.includes('heavy')) {
    return 900
  }
  if (normalized.includes('bold')) {
    return 700
  }
  return 400
}

async function loadFont(font: FontName) {
  const key = JSON.stringify(font)
  let loading = fontLoads.get(key)
  if (!loading) {
    loading = figma.loadFontAsync(font)
    fontLoads.set(key, loading)
  }
  await loading
}

async function fontFor(layer: Layer): Promise<FontName> {
  const italic = layer.fontStyle === 'italic'
  let matches = fonts.filter((font) => font.family === layer.fontFamily)
  if (!matches.length) {
    notices.add(
      `Missing font "${layer.fontFamily}"; install it and regenerate for accurate typography. Inter was used.`,
    )
    matches = fonts.filter((font) => font.family === 'Inter')
  }
  if (!matches.length) {
    throw new Error('Neither the source font nor Inter is available in Figma')
  }
  const distance = (font: FontName) =>
      Math.abs(weightOf(font.style) - (layer.fontWeight || 400)) +
      (font.style.toLowerCase().includes('italic') === italic ? 0 : 1000),
    font = matches.reduce((best, candidate) =>
      distance(candidate) < distance(best) ? candidate : best,
    )
  if (
    weightOf(font.style) !== layer.fontWeight ||
    font.style.toLowerCase().includes('italic') !== italic
  ) {
    notices.add(
      `Font style ${layer.fontFamily} ${layer.fontWeight} ${layer.fontStyle} approximated with ${font.family} ${font.style}.`,
    )
  }
  await loadFont(font)
  return font
}

function brandFont(role: 'heading' | 'body') {
  const value = library.tokens.find((token) => token.name === `font/${role}`)?.values.light
  return typeof value === 'string' ? value : ''
}

async function docFont(role: 'heading' | 'body', weight: number): Promise<FontName> {
  for (const family of [brandFont(role), 'Inter', fonts[0]?.family]) {
    const matches = fonts.filter(
      (font) => font.family === family && !font.style.toLowerCase().includes('italic'),
    )
    if (!matches.length) {
      continue
    }
    const font = matches.reduce((best, candidate) =>
      Math.abs(weightOf(candidate.style) - weight) < Math.abs(weightOf(best.style) - weight)
        ? candidate
        : best,
    )
    await loadFont(font)
    return font
  }
  throw new Error('Neither the source font nor Inter is available in Figma')
}

// ---------------------------------------------------------------------------
// Documentation building blocks

interface TextOptions {
  role?: 'heading' | 'body'
  weight?: number
  size: number
  color?: RGB
  opacity?: number
  width?: number
  lineHeight?: number
  tracking?: number
  upper?: boolean
  name?: string
}

async function addText(parent: BaseNode & ChildrenMixin, content: string, options: TextOptions) {
  const node = figma.createText()
  parent.appendChild(node)
  node.fontName = await docFont(options.role || 'body', options.weight || 400)
  node.fontSize = options.size
  node.characters = content
  node.fills = [solid(options.color || ink, options.opacity ?? 1)]
  node.lineHeight = {
    unit: 'PIXELS',
    value: options.lineHeight || Math.round(options.size * 1.45),
  }
  if (options.tracking) {
    node.letterSpacing = { unit: 'PERCENT', value: options.tracking }
  }
  if (options.upper) {
    node.textCase = 'UPPER'
  }
  if (options.width) {
    node.resize(options.width, Math.max(node.height, 1))
    node.textAutoResize = 'HEIGHT'
  } else {
    node.textAutoResize = 'WIDTH_AND_HEIGHT'
  }
  node.name = options.name || content.slice(0, 48)
  return node
}

interface StackOptions {
  gap?: number
  padding?: number | [number, number, number, number]
  fill?: RGB
  fillOpacity?: number
  radius?: number
  stroke?: RGB
  width?: number
  align?: 'MIN' | 'CENTER' | 'MAX'
  wrap?: boolean
}

function stack(
  parent: BaseNode & ChildrenMixin,
  name: string,
  direction: 'VERTICAL' | 'HORIZONTAL',
  options: StackOptions = {},
) {
  const frame = figma.createFrame()
  parent.appendChild(frame)
  frame.name = name
  frame.layoutMode = direction
  frame.itemSpacing = options.gap || 0
  const [top, right, bottom, left] =
    typeof options.padding === 'number'
      ? [options.padding, options.padding, options.padding, options.padding]
      : options.padding || [0, 0, 0, 0]
  frame.paddingTop = top
  frame.paddingRight = right
  frame.paddingBottom = bottom
  frame.paddingLeft = left
  frame.fills = options.fill ? [solid(options.fill, options.fillOpacity ?? 1)] : []
  frame.cornerRadius = options.radius || 0
  if (options.stroke) {
    frame.strokes = [solid(options.stroke)]
    frame.strokeWeight = 1
    frame.strokeAlign = 'INSIDE'
  }
  frame.counterAxisAlignItems = options.align || 'MIN'
  if (options.wrap) {
    frame.layoutWrap = 'WRAP'
    frame.counterAxisSpacing = options.gap || 0
  }
  const fixedWidth = Boolean(options.width)
  // Resize() switches Auto Layout axes to FIXED, so sizing modes must be applied afterwards.
  if (options.width) {
    frame.resize(options.width, Math.max(frame.height, 1))
  }
  frame.primaryAxisSizingMode = direction === 'HORIZONTAL' && fixedWidth ? 'FIXED' : 'AUTO'
  frame.counterAxisSizingMode = direction === 'VERTICAL' && fixedWidth ? 'FIXED' : 'AUTO'
  frame.clipsContent = false
  return frame
}

async function chips(parent: BaseNode & ChildrenMixin, labels: string[], onDark = false) {
  const row = stack(parent, 'Tags', 'HORIZONTAL', { gap: 8 })
  for (const label of labels) {
    const chip = stack(row, label, 'HORIZONTAL', {
      fill: onDark ? white : brand,
      fillOpacity: onDark ? 0.14 : 0.08,
      padding: [6, 12, 6, 12],
      radius: 999,
    })
    await addText(chip, label, { color: onDark ? white : brand, size: 13, weight: 500 })
  }
  return row
}

interface Doc {
  page: PageNode
  root: FrameNode
  body: FrameNode
  contentWidth: number
}

async function docPage(
  page: PageNode,
  title: string,
  eyebrow: string,
  description: string,
  tags: string[],
): Promise<Doc> {
  page.backgrounds = [solid(pageBackground)]
  const root = stack(page, `${ROOT_PREFIX}${title}`, 'VERTICAL', { fill: white, width: 1600 }),
    header = stack(root, 'Header', 'VERTICAL', {
      fill: ink,
      gap: 20,
      padding: [96, 120, 80, 120],
    })
  header.layoutSizingHorizontal = 'FILL'
  await addText(header, `${PREFIX}  /  ${eyebrow}`, {
    color: brandBright,
    size: 14,
    tracking: 8,
    upper: true,
    weight: 600,
  })
  await addText(header, title, { color: white, role: 'heading', size: 72, weight: 800 })
  if (description) {
    await addText(header, description, {
      color: white,
      lineHeight: 32,
      opacity: 0.78,
      size: 20,
      width: 960,
    })
  }
  if (tags.length) {
    await chips(header, tags, true)
  }
  const body = stack(root, 'Content', 'VERTICAL', { gap: 112, padding: [96, 120, 96, 120] })
  body.layoutSizingHorizontal = 'FILL'
  return { body, contentWidth: 1360, page, root }
}

async function finishDoc(doc: Doc) {
  const footer = stack(doc.body, 'Footer', 'VERTICAL', { gap: 8, padding: [32, 0, 0, 0] })
  footer.strokes = [solid(hairline)]
  footer.strokeTopWeight = 1
  footer.strokeRightWeight = 0
  footer.strokeBottomWeight = 0
  footer.strokeLeftWeight = 0
  footer.layoutSizingHorizontal = 'FILL'
  await addText(
    footer,
    `Generated from ${CARTYX_PACKAGE.name} v${CARTYX_PACKAGE.version} on ${new Date(library.generatedAt).toLocaleDateString('en', { dateStyle: 'long' })}. Components are rendered from the React source via Storybook. Change the code and regenerate instead of editing components by hand.`,
    { color: subtle, size: 13, width: 960 },
  )
  doc.root.resize(Math.max(1600, doc.contentWidth + 240), Math.max(doc.root.height, 1))
  doc.root.primaryAxisSizingMode = 'AUTO'
  doc.page.flowStartingPoints = [
    { name: doc.root.name.slice(ROOT_PREFIX.length), nodeId: doc.root.id },
  ]
}

async function docSection(
  doc: Doc,
  title: string,
  description: string,
  tags: string[] = [],
): Promise<FrameNode> {
  const frame = stack(doc.body, title, 'VERTICAL', { gap: 32 }),
    intro = stack(frame, 'Intro', 'VERTICAL', { gap: 12 })
  await addText(intro, title, { lineHeight: 44, role: 'heading', size: 36, weight: 700 })
  if (description) {
    await addText(intro, description, { color: muted, lineHeight: 28, size: 17, width: 880 })
  }
  if (tags.length) {
    await chips(intro, tags)
  }
  return frame
}

const humanize = (value: string) =>
  value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (first) => first.toUpperCase())
    .replace(/ ([A-Z])(?=[a-z])/g, (_, letter: string) => ` ${letter.toLowerCase()}`)

// ---------------------------------------------------------------------------
// Captured component layers

function styleFrame(frame: FrameNode | ComponentNode, layer: Layer) {
  frame.fills = layer.fill && layer.fill.a > 0 ? [paint(layer.fill)] : []
  if (layer.backgroundBitmap) {
    const image = figma.createImage(figma.base64Decode(layer.backgroundBitmap))
    frame.fills = [...frame.fills, { imageHash: image.hash, scaleMode: 'FILL', type: 'IMAGE' }]
  }
  if (layer.kind === 'image' && layer.image) {
    const image = figma.createImage(figma.base64Decode(layer.image))
    frame.fills = [{ imageHash: image.hash, scaleMode: 'FILL', type: 'IMAGE' }]
  }
  frame.clipsContent = layer.clips || false
  if (layer.stroke && layer.strokeWidth) {
    frame.strokes = [paint(layer.stroke)]
    frame.strokeWeight = layer.strokeWidth
    frame.strokeAlign = layer.strokeAlign || 'INSIDE'
    if (layer.strokeWidths) {
      const [top, right, bottom, left] = layer.strokeWidths
      frame.strokeTopWeight = top
      frame.strokeRightWeight = right
      frame.strokeBottomWeight = bottom
      frame.strokeLeftWeight = left
    }
  }
  const shadows = (withSpread: boolean): Effect[] =>
    (layer.shadows || []).map(({ inset, color, x, y, blur, spread }) => {
      const effect: DropShadowEffect | InnerShadowEffect = {
        type: inset ? 'INNER_SHADOW' : 'DROP_SHADOW',
        color,
        offset: { x, y },
        radius: blur,
        visible: color.a > 0,
        blendMode: 'NORMAL',
      }
      if (withSpread && spread) {
        return Object.assign(effect, { spread })
      }
      return effect
    })
  try {
    frame.effects = shadows(true)
  } catch {
    // Figma only allows spread on frames with a visible fill that clip their content.
    frame.effects = shadows(false)
    notices.add('Some shadow spreads are not supported by Figma on their layer and were omitted.')
  }
  if (layer.radii) {
    const [topLeft, topRight, bottomRight, bottomLeft] = layer.radii.map((radius) =>
      Math.min(radius, layer.width / 2, layer.height / 2),
    )
    frame.topLeftRadius = topLeft
    frame.topRightRadius = topRight
    frame.bottomRightRadius = bottomRight
    frame.bottomLeftRadius = bottomLeft
  }
}

async function createLayer(layer: Layer, parent: ChildrenMixin): Promise<SceneNode> {
  let node: SceneNode
  if (layer.kind === 'svg' && layer.svg) {
    node = figma.createNodeFromSvg(layer.svg)
    node.resize(layer.width, layer.height)
  } else if (layer.kind === 'text') {
    const font = await fontFor(layer),
      text = figma.createText()
    parent.appendChild(text)
    text.fontName = font
    text.fontSize = layer.fontSize || 16
    text.characters = layer.text || ''
    text.lineHeight = { unit: 'PIXELS', value: layer.lineHeight || (layer.fontSize || 16) * 1.5 }
    text.letterSpacing = { unit: 'PIXELS', value: layer.letterSpacing || 0 }
    text.textAlignHorizontal =
      layer.textAlign === 'center'
        ? 'CENTER'
        : ['right', 'end'].includes(layer.textAlign || '')
          ? 'RIGHT'
          : 'LEFT'
    text.textDecoration = layer.decoration?.includes('underline')
      ? 'UNDERLINE'
      : layer.decoration?.includes('line-through')
        ? 'STRIKETHROUGH'
        : 'NONE'
    text.fills = layer.fill ? [paint(layer.fill)] : []
    text.resize(layer.width + 0.5, Math.max(layer.height, 1))
    text.textAutoResize = 'HEIGHT'
    await applyTextStyle(text, layer)
    node = text
  } else {
    const frame = figma.createFrame()
    parent.appendChild(frame)
    frame.resize(layer.width, layer.height)
    styleFrame(frame, layer)
    for (const child of layer.children || []) {
      await createLayer(child, frame)
    }
    if (layer.layout) {
      frame.layoutMode = layer.layout.direction
      frame.primaryAxisSizingMode = 'FIXED'
      frame.counterAxisSizingMode = 'FIXED'
      frame.itemSpacing = layer.layout.gap
      const [top, right, bottom, left] = layer.layout.padding
      frame.paddingTop = top
      frame.paddingRight = right
      frame.paddingBottom = bottom
      frame.paddingLeft = left
      frame.primaryAxisAlignItems = layer.layout.justify
      frame.counterAxisAlignItems = layer.layout.align
    }
    node = frame
  }
  parent.appendChild(node)
  node.name = layer.name
  node.x = layer.x
  node.y = layer.y
  node.opacity = layer.opacity
  return node
}

const round = (value: number) => Math.round(value * 100) / 100,
  modeNamed = (target: VariableCollection, name: string, first: boolean) => {
    const existing = target.modes.find((mode) => mode.name === name)
    if (existing) {
      return existing.modeId
    }
    if (first && target.modes.length === 1) {
      target.renameMode(target.defaultModeId, name)
      return target.defaultModeId
    }
    return target.addMode(name)
  }

// ---------------------------------------------------------------------------
// Variables and foundations

interface VariableState {
  // Variables by "Collection::Name".
  refs: Map<string, Variable>
  // Variables by internal token name (color/brand/default), used by component bindings.
  tokens: Map<string, Variable>
  collections: Map<string, VariableCollection>
  modeIds: Map<string, Map<string, string>>
  modes: Modes
  count: number
}

const isAlias = (value: VariableValue | undefined): value is { alias: string } =>
    typeof value === 'object' && value !== null && 'alias' in value,
  isColor = (value: unknown): value is Color =>
    typeof value === 'object' && value !== null && 'r' in value

function specFor(ref: string) {
  const [collectionName, name] = ref.split('::'),
    collection = library.variables?.collections.find((entry) => entry.name === collectionName),
    variable = collection?.variables.find((entry) => entry.name === name)
  return collection && variable ? { collection, variable } : undefined
}

// Resolves aliases in the spec, so documentation can print values without reading Figma back.
function resolveSpec(
  collection: CollectionSpec,
  variable: VariableSpec,
  mode: string,
  depth = 0,
): Color | number | string | undefined {
  const value = variable.values[mode] ?? variable.values[collection.modes[0]]
  if (!isAlias(value)) {
    return value
  }
  const target = specFor(value.alias)
  if (!target || depth > 8) {
    return undefined
  }
  return resolveSpec(
    target.collection,
    target.variable,
    target.collection.modes.includes(mode) ? mode : target.collection.modes[0],
    depth + 1,
  )
}

// Collections, modes and variables are matched by name (case-insensitively) and updated in place,
// So bindings in existing designs survive. Variables this plugin does not know about are kept.
async function upsertVariables(): Promise<VariableState> {
  const spec = library.variables
  if (!spec) {
    throw new Error('library.json has no variables. Run "vp run figma:build" first')
  }
  const collections = await figma.variables.getLocalVariableCollectionsAsync(),
    locals = await figma.variables.getLocalVariablesAsync(),
    refs = new Map<string, Variable>(),
    collectionNodes = new Map<string, VariableCollection>(),
    modeIds = new Map<string, Map<string, string>>(),
    pending: { variable: Variable; spec: VariableSpec; collection: string }[] = []
  for (const wanted of spec.collections) {
    const collection =
      collections.find((candidate) => candidate.name.toLowerCase() === wanted.name.toLowerCase()) ||
      figma.variables.createVariableCollection(wanted.name)
    collection.name = wanted.name
    tag(collection, 'collection', wanted.name)
    const ids = new Map<string, string>()
    for (const [index, mode] of wanted.modes.entries()) {
      try {
        ids.set(mode, modeNamed(collection, mode, index === 0))
      } catch {
        notices.add(
          `Your Figma plan limits variable modes, so "${wanted.name}" only has its ${wanted.modes[0]} mode.`,
        )
      }
    }
    collectionNodes.set(wanted.name, collection)
    modeIds.set(wanted.name, ids)
    const existing = new Map(
      locals
        .filter((variable) => variable.variableCollectionId === collection.id)
        .map((variable) => [variable.name.toLowerCase(), variable] as const),
    )
    for (const variableSpec of wanted.variables) {
      let variable = existing.get(variableSpec.name.toLowerCase())
      if (variable && variable.resolvedType !== variableSpec.type) {
        variable.remove()
        variable = undefined
      }
      if (!variable) {
        variable = figma.variables.createVariable(variableSpec.name, collection, variableSpec.type)
      }
      variable.name = variableSpec.name
      refs.set(`${wanted.name}::${variableSpec.name}`, variable)
      pending.push({ collection: wanted.name, spec: variableSpec, variable })
    }
  }
  // Values are set in a second pass so aliases can point anywhere, including later collections.
  for (const { collection, spec: variableSpec, variable } of pending) {
    for (const [mode, modeId] of modeIds.get(collection) || []) {
      const value = variableSpec.values[mode]
      if (value === undefined) {
        continue
      }
      if (isAlias(value)) {
        const target = refs.get(value.alias)
        if (target) {
          variable.setValueForMode(modeId, figma.variables.createVariableAlias(target))
        } else {
          notices.add(`${collection} / ${variableSpec.name}: missing alias ${value.alias}.`)
        }
      } else {
        variable.setValueForMode(modeId, value)
      }
    }
    variable.description = variableSpec.description || ''
    variable.hiddenFromPublishing = Boolean(variableSpec.hidden)
    try {
      variable.scopes = variableSpec.scopes
    } catch {
      notices.add(`${variableSpec.name}: scopes could not be set.`)
    }
    if (variableSpec.codeSyntax) {
      try {
        variable.setVariableCodeSyntax('WEB', variableSpec.codeSyntax)
      } catch {
        // Code syntax is documentation only.
      }
    }
  }
  const tokens = new Map<string, Variable>()
  for (const [token, ref] of Object.entries(spec.tokens)) {
    const variable = refs.get(ref)
    if (variable) {
      tokens.set(token, variable)
    }
  }
  const themeCollection = collectionNodes.get(spec.theme.collection),
    themeModes = modeIds.get(spec.theme.collection)
  if (!themeCollection || !themeModes) {
    throw new Error(`The theme collection "${spec.theme.collection}" is missing`)
  }
  return {
    collections: collectionNodes,
    count: pending.length,
    modeIds,
    modes: {
      collection: themeCollection,
      dark: themeModes.get(spec.theme.modes.dark),
      light: themeModes.get(spec.theme.modes.light),
    },
    refs,
    tokens,
  }
}

async function specFont(spec: TextStyleSpec) {
  let matches = fonts.filter(
    (font) => font.family === spec.family && !font.style.toLowerCase().includes('italic'),
  )
  if (!matches.length) {
    const fallback = fonts.some((font) => font.family === 'Inter') ? 'Inter' : fonts[0]?.family
    notices.add(`Missing font "${spec.family}"; text styles use ${fallback} until it is installed.`)
    matches = fonts.filter((font) => font.family === fallback)
  }
  if (!matches.length) {
    throw new Error('No fonts are available in Figma')
  }
  const font =
    matches.find((candidate) => candidate.style === spec.style) ||
    matches.reduce((best, candidate) =>
      Math.abs(weightOf(candidate.style) - spec.weight) <
      Math.abs(weightOf(best.style) - spec.weight)
        ? candidate
        : best,
    )
  await loadFont(font)
  return font
}

// Text styles mirror the style-text-* utilities: Default|Prose|Strong/Step N, with size, family and
// Weight bound to the typography variables so they follow the Min/Max modes.
async function upsertTextStyles(state: VariableState) {
  const locals = await figma.getLocalTextStylesAsync()
  styleSpecs = []
  for (const spec of library.variables?.textStyles || []) {
    const style =
      locals.find((candidate) => candidate.name.toLowerCase() === spec.name.toLowerCase()) ||
      figma.createTextStyle()
    style.name = spec.name
    style.fontName = await specFont(spec)
    style.fontSize = spec.size
    style.lineHeight = spec.lineHeight
      ? { unit: 'PERCENT', value: spec.lineHeight }
      : { unit: 'AUTO' }
    style.letterSpacing = { unit: 'PIXELS', value: 0 }
    style.description = spec.description
    for (const [field, ref] of [
      ['fontFamily', spec.refs.fontFamily],
      ['fontStyle', spec.refs.fontStyle],
      ['fontSize', spec.refs.fontSize],
    ] as const) {
      const variable = state.refs.get(ref)
      if (!variable) {
        continue
      }
      try {
        style.setBoundVariable(field, variable)
      } catch {
        notices.add('Some text style properties could not be bound to variables.')
      }
    }
    tag(style, 'style', spec.name)
    styleSpecs.push({ spec, style })
  }
}

// Captured text uses the matching text style; line height, tracking and decoration that differ
// From the style are kept as overrides so the layer still matches the browser.
async function applyTextStyle(text: TextNode, layer: Layer) {
  const size = layer.fontSize || 16,
    ratio = layer.lineHeight ? (layer.lineHeight / size) * 100 : undefined,
    sameHeight = (spec: TextStyleSpec) =>
      spec.lineHeight !== undefined && ratio !== undefined && Math.abs(spec.lineHeight - ratio) < 1,
    candidates = styleSpecs.filter(
      ({ spec }) =>
        spec.family === layer.fontFamily &&
        spec.weight === (layer.fontWeight || 400) &&
        Math.abs(spec.size - size) < 0.6,
    ),
    match =
      candidates.find(({ spec }) => sameHeight(spec)) ||
      candidates.find(({ spec }) => spec.lineHeight === undefined) ||
      candidates[0]
  if (!match) {
    const step = styleSpecs.find(({ spec }) => Math.abs(spec.size - size) < 0.6),
      variable = step && variableState?.refs.get(step.spec.refs.fontSize)
    if (variable) {
      try {
        text.setBoundVariable('fontSize', variable)
      } catch {
        // The raw size is already set.
      }
    }
    return
  }
  const { letterSpacing, lineHeight, textDecoration } = text
  await loadFont(match.style.fontName)
  await text.setTextStyleIdAsync(match.style.id)
  if (!sameHeight(match.spec)) {
    text.lineHeight = lineHeight
  }
  if (layer.letterSpacing) {
    text.letterSpacing = letterSpacing
  }
  if (textDecoration !== 'NONE') {
    text.textDecoration = textDecoration
  }
}

async function coverPage(page: PageNode, stats: [string, string][]) {
  page.backgrounds = [solid(ink)]
  const cover = figma.createFrame()
  page.appendChild(cover)
  cover.name = `${ROOT_PREFIX}Cover`
  cover.resize(1920, 1080)
  cover.fills = [solid(ink)]
  cover.clipsContent = true
  for (const [color, x, y, size, opacity] of [
    [brandBright, 1080, -320, 1100, 0.45],
    [accent, 1460, 420, 900, 0.3],
  ] as const) {
    const glow = figma.createEllipse()
    cover.appendChild(glow)
    glow.name = 'Glow'
    glow.resize(size, size)
    glow.x = x
    glow.y = y
    glow.fills = [
      {
        gradientStops: [
          { color: { ...color, a: opacity }, position: 0 },
          { color: { ...color, a: 0 }, position: 1 },
        ],
        gradientTransform: [
          [1, 0, 0],
          [0, 1, 0],
        ],
        type: 'GRADIENT_RADIAL',
      },
    ]
  }
  const content = stack(cover, 'Title', 'VERTICAL', { gap: 28 })
  content.x = 160
  content.y = 220
  await addText(content, 'Design system', {
    color: brandBright,
    size: 20,
    tracking: 10,
    upper: true,
    weight: 600,
  })
  await addText(content, PREFIX, {
    color: white,
    lineHeight: 176,
    role: 'heading',
    size: 168,
    weight: 800,
  })
  await addText(
    content,
    'Component library generated directly from the production React code, so design and code stay in sync.',
    { color: white, lineHeight: 44, opacity: 0.72, size: 30, width: 1000 },
  )
  const statRow = stack(cover, 'Stats', 'HORIZONTAL', { gap: 96 })
  statRow.x = 160
  statRow.y = 780
  for (const [value, label] of stats) {
    const stat = stack(statRow, label, 'VERTICAL', { gap: 4 })
    await addText(stat, value, {
      color: white,
      lineHeight: 64,
      role: 'heading',
      size: 56,
      weight: 700,
    })
    await addText(stat, label, { color: white, opacity: 0.6, size: 16, tracking: 4, upper: true })
  }
  const footer = await addText(
    cover,
    `v${CARTYX_PACKAGE.version}  ·  ${new Date(library.generatedAt).toLocaleDateString('en', { dateStyle: 'long' })}  ·  Light & dark themes`,
    { color: white, opacity: 0.45, size: 16 },
  )
  footer.x = 160
  footer.y = 980
  page.flowStartingPoints = [{ name: 'Cover', nodeId: cover.id }]
  try {
    await figma.setFileThumbnailNodeAsync(cover)
  } catch {
    notices.add(
      'Set the Cover frame as the file thumbnail manually (right-click > Set as thumbnail).',
    )
  }
  return cover
}

async function gettingStarted(page: PageNode, stats: [string, string][]) {
  const doc = await docPage(
      page,
      'Getting started',
      'Overview',
      'How to use the Cartyx UI Figma library, what it contains, and how it stays in sync with the code.',
      stats.map(([value, label]) => `${value} ${label.toLowerCase()}`),
    ),
    frame = await docSection(doc, 'Using this library', ''),
    grid = stack(frame, 'Cards', 'HORIZONTAL', { gap: 24, width: 1360, wrap: true }),
    failed = library.failures.map((failure) => `${failure.id} (${failure.theme})`),
    cards: [string, string][] = [
      [
        'Insert components',
        `Open the Assets panel and search "${PREFIX}". Pick variants (tone, variant, size, state) in the properties panel. Never detach: every label, icon and content region is a property.`,
      ],
      [
        'Icons, text and slots',
        'Icons are a show/hide toggle plus an instance swap limited to the icon set. Labels are text properties. Content regions (accordion content, dialog body, actions) are slots: select the slot in an instance and drop in any layers or components.',
      ],
      [
        'Light and dark themes',
        `Colors are bound to variables in the "${PREFIX}" collection. Switch a frame between the Light and Dark modes (Appearance → variable mode) instead of picking different components.`,
      ],
      [
        'Interactive states',
        'Buttons, toggles, tabs and accordion items have hover, pressed and open states wired as interactive components. Press Present (▶) to try them in any prototype.',
      ],
      [
        'Code is the source of truth',
        `Everything here is generated from ${CARTYX_PACKAGE.name} via Storybook. Change the React code and regenerate rather than editing components by hand.`,
      ],
      [
        'Known gaps',
        failed.length
          ? `${failed.length} example(s) could not be captured automatically and are not included: ${failed.slice(0, 6).join(', ')}${failed.length > 6 ? ', …' : ''}.`
          : 'All Storybook examples were captured.',
      ],
      [
        'Updating the library',
        'Run "vp run figma" in the repository, then run the Cartyx UI plugin again with "Replace pages from previous runs" enabled. Variables and text styles are updated by name.',
      ],
    ]
  for (const [index, [title, body]] of cards.entries()) {
    const card = stack(grid, title, 'VERTICAL', {
      fill: hex('#F7F8FA'),
      gap: 12,
      padding: 32,
      radius: 20,
      stroke: hairline,
      width: 437,
    })
    await addText(card, String(index + 1).padStart(2, '0'), {
      color: brand,
      role: 'heading',
      size: 14,
      weight: 700,
    })
    await addText(card, title, { lineHeight: 30, role: 'heading', size: 22, weight: 700 })
    await addText(card, body, { color: muted, lineHeight: 24, size: 15, width: 373 })
  }
  await finishDoc(doc)
  return doc.root
}

function collectionSpec(name: string) {
  const collection = library.variables?.collections.find((entry) => entry.name === name)
  if (!collection) {
    throw new Error(`The variable collection "${name}" is missing from library.json`)
  }
  return collection
}

const TONE_DESCRIPTIONS: Record<string, string> = {
  Surface: 'Backgrounds, text on surfaces, borders, focus, scrim and shadow colours.',
}

async function colorsPage(page: PageNode, state: VariableState, themes: Theme[]) {
  const theme = library.variables?.theme
  if (!theme) {
    throw new Error('library.json has no theme collection')
  }
  const semantic = collectionSpec(theme.collection),
    primitives = collectionSpec('Primitives: Colours'),
    collection = state.collections.get(semantic.name),
    modeIds = state.modeIds.get(semantic.name),
    doc = await docPage(
      page,
      'Colors',
      'Foundations',
      `Semantic colour variables live in "${semantic.name}" with ${semantic.modes.join(' and ')} modes, and alias the palette in "${primitives.name}". Each swatch shows both modes and is bound to its variable: set a frame's "${semantic.name}" mode to switch appearance.`,
      [
        `${semantic.variables.length} semantic colours`,
        `${primitives.variables.length} primitives`,
        themes.map(humanize).join(' + '),
      ],
    ),
    groupNames = [...new Set(semantic.variables.map((variable) => variable.name.split('/')[0]))]
  for (const group of groupNames) {
    const variables = semantic.variables.filter(
        (variable) => variable.name.split('/')[0] === group,
      ),
      frame = await docSection(
        doc,
        group,
        TONE_DESCRIPTIONS[group] ||
          `Default, muted, container, on-colour and border roles for the ${group.toLowerCase()} tone. Use them through the Tone property of components.`,
        [`${variables.length} variables`],
      ),
      grid = stack(frame, 'Swatches', 'HORIZONTAL', { gap: 20, width: 1360, wrap: true })
    for (const variableSpec of variables) {
      const label = variableSpec.name.split('/').slice(1).join('/'),
        card = stack(grid, label, 'VERTICAL', {
          fill: white,
          gap: 0,
          radius: 16,
          stroke: hairline,
          width: 210,
        }),
        variable = state.refs.get(`${semantic.name}::${variableSpec.name}`)
      card.clipsContent = true
      const swatch = stack(card, 'Swatch', 'HORIZONTAL', {})
      swatch.layoutSizingHorizontal = 'FILL'
      const values: [Theme, Color][] = []
      for (const mode of themes) {
        const value = resolveSpec(semantic, variableSpec, theme.modes[mode])
        if (!isColor(value)) {
          continue
        }
        values.push([mode, value])
        const half = figma.createFrame()
        swatch.appendChild(half)
        half.name = theme.modes[mode]
        half.resize(210 / themes.length, 96)
        half.fills = [
          variable
            ? figma.variables.setBoundVariableForPaint(paint(value), 'color', variable)
            : paint(value),
        ]
        const modeId = modeIds?.get(theme.modes[mode])
        if (collection && modeId) {
          half.setExplicitVariableModeForCollection(collection, modeId)
        }
      }
      const caption = stack(card, 'Caption', 'VERTICAL', { gap: 4, padding: 16 })
      caption.layoutSizingHorizontal = 'FILL'
      await addText(caption, label, { lineHeight: 20, size: 14, weight: 600, width: 178 })
      if (variableSpec.codeSyntax) {
        await addText(caption, variableSpec.codeSyntax, {
          color: brand,
          lineHeight: 16,
          size: 11,
          width: 178,
        })
      }
      for (const [mode, value] of values) {
        await addText(caption, `${theme.modes[mode]}  ${toHex(value)}`, {
          color: muted,
          lineHeight: 18,
          size: 12,
          width: 178,
        })
      }
    }
  }
  const palette = await docSection(
      doc,
      'Palette',
      `Primitive colours in "${primitives.name}". Semantic variables alias these; prefer the semantic variables in designs.`,
      [`${primitives.variables.length} primitives`],
    ),
    rows = stack(palette, 'Palette', 'VERTICAL', { gap: 16, width: 1360 }),
    hues = [...new Set(primitives.variables.map((variable) => variable.name.split('/')[0]))]
  for (const hue of hues) {
    const variables = primitives.variables.filter(
        (variable) => variable.name.split('/')[0] === hue,
      ),
      row = stack(rows, hue, 'HORIZONTAL', { align: 'CENTER', gap: 8 })
    await addText(row, humanize(hue), { size: 13, weight: 600, width: 96 })
    for (const variableSpec of variables) {
      const value = resolveSpec(primitives, variableSpec, primitives.modes[0]),
        variable = state.refs.get(`${primitives.name}::${variableSpec.name}`)
      if (!isColor(value)) {
        continue
      }
      const chip = stack(row, variableSpec.name, 'VERTICAL', { gap: 4, width: 104 }),
        fill = figma.createFrame()
      chip.appendChild(fill)
      fill.name = 'Colour'
      fill.resize(104, 48)
      fill.cornerRadius = 8
      fill.fills = [
        variable
          ? figma.variables.setBoundVariableForPaint(paint(value), 'color', variable)
          : paint(value),
      ]
      fill.strokes = [solid(hairline)]
      await addText(chip, variableSpec.name.split('/')[1] || variableSpec.name, {
        size: 11,
        weight: 600,
      })
      await addText(chip, toHex(value), { color: muted, size: 10 })
    }
  }
  await finishDoc(doc)
  return doc.root
}

const STYLE_GROUPS: Record<string, string> = {
  Default: 'Interface text: labels, controls, navigation and short copy. Uses the body typeface.',
  Prose: 'Long-form reading text with a relaxed 160% line height. Uses the body typeface.',
  Strong: 'Headings and display text with a tight 120% line height. Uses the heading typeface.',
}

async function typographyPage(page: PageNode) {
  const typography = collectionSpec('Semantics: Typography'),
    doc = await docPage(
      page,
      'Typography',
      'Foundations',
      `Text styles mirror the style-text-* utilities in code and are named <Group>/Step <n>. Sizes are fluid: each style is bound to "${typography.name}", whose ${typography.modes.join(' and ')} modes match the largest and smallest viewports.`,
      [
        `${styleSpecs.length} text styles`,
        ...[brandFont('heading'), brandFont('body')].filter(Boolean),
      ],
    ),
    faces = await docSection(doc, 'Typefaces', ''),
    row = stack(faces, 'Typefaces', 'HORIZONTAL', { gap: 24 })
  for (const [role, label, usage] of [
    ['heading', 'Heading', 'Titles, headings and display text'],
    ['body', 'Body', 'Body copy, labels and UI text'],
  ] as const) {
    const card = stack(row, label, 'VERTICAL', {
      fill: hex('#F7F8FA'),
      gap: 12,
      padding: 40,
      radius: 20,
      stroke: hairline,
      width: 668,
    })
    await addText(card, 'Aa', { lineHeight: 132, role, size: 120, weight: 700 })
    const { family } = await docFont(role, 400)
    await addText(card, family, {
      role,
      size: 28,
      weight: 600,
    })
    await addText(card, `${label} · ${usage}`, { color: muted, size: 15 })
  }
  for (const group of new Set(styleSpecs.map(({ spec }) => spec.name.split('/')[0]))) {
    const entries = styleSpecs.filter(({ spec }) => spec.name.split('/')[0] === group),
      frame = await docSection(doc, group, STYLE_GROUPS[group] || '', [`${entries.length} styles`]),
      list = stack(frame, group, 'VERTICAL', { gap: 0, width: 1360 })
    for (const { spec, style } of entries) {
      const item = stack(list, spec.name, 'HORIZONTAL', {
        align: 'CENTER',
        gap: 32,
        padding: [20, 0, 20, 0],
      })
      item.layoutSizingHorizontal = 'FILL'
      item.strokes = [solid(hairline)]
      item.strokeTopWeight = 0
      item.strokeLeftWeight = 0
      item.strokeRightWeight = 0
      item.strokeBottomWeight = 1
      const meta = stack(item, 'Style', 'VERTICAL', { gap: 2, width: 260 }),
        variable = typography.variables.find(
          (entry) => `${typography.name}::${entry.name}` === spec.refs.fontSize,
        ),
        sizes = variable
          ? typography.modes
              .map((mode) => resolveSpec(typography, variable, mode))
              .filter((value): value is number => typeof value === 'number')
          : [spec.size]
      await addText(meta, spec.name, { size: 14, weight: 600 })
      await addText(
        meta,
        `${spec.family} ${spec.style} · ${[...new Set(sizes.map(round))].join('–')}px · ${spec.lineHeight ? `${spec.lineHeight}%` : 'auto'}`,
        { color: muted, size: 12, width: 260 },
      )
      const specimen = await addText(item, 'Maps your team can rely on', {
        size: spec.size,
        width: 1060,
      })
      await loadFont(style.fontName)
      await specimen.setTextStyleIdAsync(style.id)
    }
  }
  await finishDoc(doc)
  return doc.root
}

async function spacingPage(page: PageNode, state: VariableState) {
  const spacing = collectionSpec('Semantics: Spacing'),
    border = collectionSpec('Semantics: Border'),
    doc = await docPage(
      page,
      'Spacing & radius',
      'Foundations',
      `Fluid spacing from Utopia (utopia.fyi). "${spacing.name}" has ${spacing.modes.join(' and ')} modes for the largest and smallest viewports; pairs interpolate between two sizes. Bars are bound to the variables, so they follow the mode.`,
      [
        `${spacing.variables.length} spacing variables`,
        `${border.variables.length} border variables`,
      ],
    ),
    [maxMode, minMode] = spacing.modes
  for (const [group, description] of [
    ['Space size', 'One size that scales with the viewport. Use for padding and gaps.'],
    [
      'Space size pairs',
      'Ranges between two sizes (for example S—L) for layouts that need more change across viewports.',
    ],
  ] as const) {
    const frame = await docSection(doc, group, description),
      list = stack(frame, group, 'VERTICAL', { gap: 0, width: 1360 })
    for (const variableSpec of spacing.variables.filter((entry) =>
      entry.name.startsWith(`${group}/`),
    )) {
      const max = resolveSpec(spacing, variableSpec, maxMode),
        min = resolveSpec(spacing, variableSpec, minMode),
        item = stack(list, variableSpec.name, 'HORIZONTAL', {
          align: 'CENTER',
          gap: 32,
          padding: [14, 0, 14, 0],
        })
      item.layoutSizingHorizontal = 'FILL'
      const meta = stack(item, 'Variable', 'VERTICAL', { gap: 2, width: 240 })
      await addText(meta, variableSpec.name.slice(group.length + 1), { size: 14, weight: 600 })
      await addText(
        meta,
        `${typeof min === 'number' ? round(min) : '?'}–${typeof max === 'number' ? round(max) : '?'}px  ·  ${variableSpec.codeSyntax || ''}`,
        { color: muted, size: 12 },
      )
      if (typeof max === 'number' && max > 0) {
        const bar = figma.createFrame(),
          variable = state.refs.get(`${spacing.name}::${variableSpec.name}`)
        item.appendChild(bar)
        bar.name = 'Size'
        bar.resize(max, 24)
        bar.fills = [solid(brand)]
        bar.cornerRadius = 2
        if (variable) {
          try {
            bar.setBoundVariable('width', variable)
          } catch {
            // The bar keeps the Max width.
          }
        }
      }
    }
  }
  const radius = await docSection(doc, 'Radius', 'Corner radius variables in "Semantics: Border".'),
    grid = stack(radius, 'Radius', 'HORIZONTAL', { gap: 24, width: 1360, wrap: true })
  for (const variableSpec of border.variables.filter((entry) => entry.name.startsWith('Radius/'))) {
    const value = Number(resolveSpec(border, variableSpec, border.modes[0])),
      card = stack(grid, variableSpec.name, 'VERTICAL', { align: 'CENTER', gap: 12 }),
      shape = figma.createFrame()
    card.appendChild(shape)
    shape.name = 'Shape'
    shape.resize(120, 120)
    shape.cornerRadius = Math.min(value, 60)
    shape.fills = [solid(brand, 0.08)]
    shape.strokes = [solid(brand)]
    shape.strokeWeight = 2
    await addText(card, variableSpec.name.slice(7), { size: 14, weight: 600 })
    await addText(card, value >= 9999 ? 'full' : `${value}px`, { color: muted, size: 13 })
  }
  const strokes = await docSection(doc, 'Stroke', 'Border width variables in "Semantics: Border".'),
    strokeList = stack(strokes, 'Stroke', 'HORIZONTAL', { gap: 32, width: 1360, wrap: true })
  for (const variableSpec of border.variables.filter((entry) => entry.name.startsWith('Stroke/'))) {
    const value = Number(resolveSpec(border, variableSpec, border.modes[0])),
      card = stack(strokeList, variableSpec.name, 'VERTICAL', { align: 'CENTER', gap: 12 }),
      shape = figma.createFrame()
    card.appendChild(shape)
    shape.name = 'Shape'
    shape.resize(120, 72)
    shape.cornerRadius = 12
    shape.fills = [solid(white)]
    shape.strokes = [solid(brand)]
    shape.strokeWeight = Math.max(value, 0.5)
    await addText(card, variableSpec.name.slice(7), { size: 14, weight: 600 })
    await addText(card, `${value}px`, { color: muted, size: 13 })
  }
  await finishDoc(doc)
  return doc.root
}

function familiesOf(group: string, samples: Sample[]) {
  // oxlint-disable-next-line unicorn/no-array-sort -- the plugin targets ES2020, which has no toSorted.
  return [...new Set(samples.map((sample) => sample.family))].sort((a, b) =>
    a === group ? -1 : b === group ? 1 : a.localeCompare(b),
  )
}

interface Modes {
  collection: VariableCollection
  light?: string
  dark?: string
}

function modePanel(parent: FrameNode, theme: Theme, modes: Modes, name: string) {
  const panel = stack(parent, name, 'VERTICAL', {
      fill: surface(theme),
      gap: 16,
      padding: 32,
      radius: 16,
      stroke: theme === 'light' ? hairline : undefined,
    }),
    modeId = theme === 'light' ? modes.light : modes.dark
  if (modeId) {
    try {
      panel.setExplicitVariableModeForCollection(modes.collection, modeId)
    } catch {
      notices.add('Variable modes could not be set on the example panels.')
    }
  }
  return panel
}

// Story examples are plain frames bound to the same variables as the components, so one capture
// Renders in both panels: the dark panel only switches the variable mode.
async function exampleSections(
  doc: Doc,
  group: string,
  samples: Sample[],
  ctx: BuildContext,
  modes: Modes,
  themes: Theme[],
) {
  for (const family of familiesOf(group, samples)) {
    const familySamples = samples.filter((sample) => sample.family === family),
      name = family === group ? 'Examples' : `Examples: ${family.slice(group.length + 1)}`,
      frame = await docSection(
        doc,
        name,
        `Storybook stories for reference, in ${themes.map((theme) => `${theme} mode`).join(' and ')}. Use the components above in designs; examples are not published as components.`,
        [`${familySamples.length} example${familySamples.length === 1 ? '' : 's'}`],
      )
    progress(`Building ${family} examples`)
    for (const [index, sample] of familySamples.entries()) {
      const title = sample.state === 'Open' ? `${sample.name} · Open` : sample.name,
        card = stack(frame, title, 'VERTICAL', { gap: 16, width: 1360 }),
        description = docs[family]?.examples[sample.name]
      await addText(card, title, { lineHeight: 26, size: 18, weight: 600 })
      if (description && sample.state === 'Default') {
        await addText(card, description, { color: muted, lineHeight: 22, size: 14, width: 880 })
      }
      const sideBySide = sample.layer.width * 2 + 64 * 2 + 24 <= 1360,
        row = stack(card, 'Preview', sideBySide ? 'HORIZONTAL' : 'VERTICAL', { gap: 24 })
      let built: SceneNode | undefined
      for (const theme of themes) {
        const panel = modePanel(row, theme, modes, `${humanize(theme)} mode`)
        await addText(panel, `${humanize(theme)} mode`, {
          color: theme === 'light' ? subtle : white,
          opacity: theme === 'light' ? 1 : 0.6,
          size: 11,
          tracking: 8,
          upper: true,
          weight: 600,
        })
        if (built) {
          const copy = built.clone()
          panel.appendChild(copy)
        } else {
          built = await buildLayer(ctx, sample.layer, panel)
          if (built) {
            built.name = sample.name
          }
        }
      }
      doc.contentWidth = Math.max(doc.contentWidth, row.width)
      if (index % 10 === 0) {
        progress(`${family}: ${index + 1}/${familySamples.length} examples`)
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Composable components (tools/figma/parts.mjs)

function buildContext(variables: Map<string, Variable>): BuildContext {
  return {
    createLayer,
    defaults: new Map(),
    iconKeys: new Map(),
    icons: new Map(),
    label: (parent, text, options) => addText(parent, text, options),
    notices,
    progress: (message) => progress(message),
    sets: new Map(),
    styleFrame,
    variables,
  }
}

async function iconsPage(page: PageNode, ctx: BuildContext) {
  const icons = library.parts?.icons || [],
    doc = await docPage(
      page,
      'Icons',
      'Foundations',
      'The icon registry used by every component. Icon properties in the library are instance swaps limited to this set, so designers can only pick real icons that exist in code.',
      [`${icons.length} icons`, '24 × 24', 'Phosphor (regular)'],
    ),
    frame = await docSection(
      doc,
      'Icon set',
      'Each icon is a component with a single Glyph layer bound to the on-surface color. Swap icons in any component with its icon properties, then change the Glyph fill if needed.',
    ),
    grid = stack(frame, 'Icons', 'HORIZONTAL', { gap: 16, width: 1360, wrap: true }),
    cards = new Map<string, FrameNode>()
  for (const icon of icons) {
    const card = stack(grid, icon.name, 'VERTICAL', {
      align: 'CENTER',
      fill: hex('#F7F8FA'),
      gap: 14,
      padding: [24, 12, 18, 12],
      radius: 16,
      stroke: hairline,
      width: 154,
    })
    cards.set(icon.name, card)
  }
  await buildIcons(ctx, icons, (name) => cards.get(name) || grid)
  for (const icon of icons) {
    const card = cards.get(icon.name)
    if (card) {
      await addText(card, icon.name, { color: muted, size: 13, weight: 500 })
    }
  }
  await finishDoc(doc)
  return doc.root
}

const PROPERTY_TYPES: Record<string, string> = {
  BOOLEAN: 'Boolean',
  INSTANCE_SWAP: 'Instance swap',
  SLOT: 'Slot',
  TEXT: 'Text',
  VARIANT: 'Variant',
}

async function propertyTable(parent: FrameNode, part: PartComponent, set: PartNode) {
  const table = stack(parent, `${componentName(part.component)} properties`, 'VERTICAL', {
    radius: 16,
    stroke: hairline,
    width: 1360,
  })
  table.clipsContent = true
  const widths = [260, 160, 520, 420],
    row = async (cells: string[], heading = false) => {
      const line = stack(table, cells[0] || 'Header', 'HORIZONTAL', {
        fill: heading ? hex('#F7F8FA') : white,
        padding: [14, 24, 14, 24],
      })
      line.layoutSizingHorizontal = 'FILL'
      line.strokes = [solid(hairline)]
      line.strokeTopWeight = heading ? 0 : 1
      line.strokeRightWeight = 0
      line.strokeBottomWeight = 0
      line.strokeLeftWeight = 0
      for (const [index, cell] of cells.entries()) {
        await addText(line, cell || '—', {
          color: heading ? subtle : index === 0 ? ink : muted,
          size: heading ? 11 : 14,
          tracking: heading ? 8 : 0,
          upper: heading,
          weight: heading || index === 0 ? 600 : 400,
          width: widths[index] - (index === cells.length - 1 ? 48 : 0),
        })
      }
    },
    // Figma shows display names (Leading icon); the Code column keeps the React prop names.
    codeOf = (name: string) =>
      [...Object.keys(part.properties), ...Object.keys(part.slots)].find(
        (code) => code === name || propName(code) === name,
      ) || ''
  await row(['Property', 'Type', 'Values and default', 'Code'], true)
  for (const [axis, values] of Object.entries(part.axes)) {
    await row([
      propName(axis),
      PROPERTY_TYPES.VARIANT,
      `${values.map(valueName).join(' · ')}  (default: ${valueName(part.defaults[axis])})`,
      part.properties[axis] ||
        (axis === 'State'
          ? 'Interaction state (disabled is a prop)'
          : `${axis}="${part.defaults[axis]}"`),
    ])
  }
  for (const [key, definition] of Object.entries(set.componentPropertyDefinitions)) {
    if (definition.type === 'VARIANT') {
      continue
    }
    const [name] = key.split('#')
    let value = String(definition.defaultValue ?? '')
    if (definition.type === 'INSTANCE_SWAP') {
      const node = await figma.getNodeByIdAsync(value)
      value = `Icon set (default: ${node?.name.split('/').pop()?.trim() || 'icon'})`
    }
    if (definition.type === 'SLOT') {
      value = part.slots[codeOf(name)]?.description || 'Any content'
    }
    if (definition.type === 'BOOLEAN') {
      value = `true · false  (default: ${value})`
    }
    await row([
      name,
      PROPERTY_TYPES[definition.type] || definition.type,
      value,
      part.properties[codeOf(name)] || '',
    ])
  }
}

async function partsPage(
  page: PageNode,
  group: string,
  samples: Sample[],
  ctx: BuildContext,
  modes: Modes,
  themes: Theme[],
) {
  const components = parts.filter((part) => part.group === group),
    variants = components.reduce((sum, part) => sum + part.variants.length, 0),
    doc = await docPage(
      page,
      group,
      'Components',
      docs[group]?.description || components[0]?.description || '',
      [
        ...(components.length
          ? [
              `${components.length} component${components.length === 1 ? '' : 's'}`,
              `${variants} variant${variants === 1 ? '' : 's'}`,
            ]
          : []),
        ...(samples.length ? [`${samples.length} example${samples.length === 1 ? '' : 's'}`] : []),
        'Light + Dark modes',
        'Auto Layout',
      ],
    )
  if (components.length) {
    await componentSections(doc, components, ctx, modes, themes)
  }
  if (samples.length) {
    await exampleSections(doc, group, samples, ctx, modes, themes)
  }
  await finishDoc(doc)
  return doc.root
}

async function componentSections(
  doc: Doc,
  components: PartComponent[],
  ctx: BuildContext,
  modes: Modes,
  themes: Theme[],
) {
  const usage = await docSection(
      doc,
      'Usage',
      'Live instances of each component on light and dark surfaces. Both panels use the same components: the dark panel only switches the variable mode.',
    ),
    reference = await docSection(
      doc,
      'Properties',
      'Everything you can change without detaching. Variant properties pick the style, text properties edit labels, booleans show or hide optional parts, instance swaps change icons, and slots accept any content.',
    ),
    built: { part: PartComponent; set: PartNode }[] = []
  for (const part of components) {
    const axes = Object.keys(part.axes),
      frame = await docSection(doc, componentName(part.component), part.description, [
        axes.length ? `${part.variants.length} variants` : 'Single component',
        axes.length ? `Properties: ${axes.map(propName).join(', ')}` : 'No variant properties',
      ])
    progress(`Building ${componentName(part.component)}`)
    const { set, canvas } = await buildPart(ctx, part, frame)
    doc.contentWidth = Math.max(doc.contentWidth, canvas.width)
    built.push({ part, set })
  }
  for (const theme of themes) {
    const panel = modePanel(usage, theme, modes, `${humanize(theme)} mode`)
    panel.itemSpacing = 24
    panel.paddingTop = 40
    panel.paddingRight = 40
    panel.paddingBottom = 40
    panel.paddingLeft = 40
    panel.cornerRadius = 20
    panel.resize(1360, Math.max(panel.height, 1))
    panel.primaryAxisSizingMode = 'AUTO'
    panel.counterAxisSizingMode = 'FIXED'
    await addText(panel, `${humanize(theme)} mode`, {
      color: theme === 'light' ? subtle : white,
      opacity: theme === 'light' ? 1 : 0.6,
      size: 11,
      tracking: 8,
      upper: true,
      weight: 600,
    })
    const row = stack(panel, 'Components', 'HORIZONTAL', { gap: 40, width: 1280, wrap: true })
    for (const { part } of built) {
      const main = defaultComponent(ctx, part)
      if (!main) {
        continue
      }
      const cell = stack(row, componentName(part.component), 'VERTICAL', { gap: 12 })
      cell.appendChild(main.createInstance())
      await addText(cell, componentName(part.component), {
        color: theme === 'light' ? muted : white,
        opacity: theme === 'light' ? 1 : 0.6,
        size: 12,
        weight: 500,
      })
    }
  }
  const snippets = components.filter((part) => part.usage)
  if (snippets.length) {
    const code = stack(usage, 'Code', 'VERTICAL', {
      fill: ink,
      gap: 16,
      padding: 32,
      radius: 16,
      width: 1360,
    })
    for (const part of snippets) {
      await addText(code, part.usage || '', {
        color: white,
        lineHeight: 22,
        name: `${part.component} code`,
        opacity: 0.85,
        size: 14,
        width: 1296,
      })
    }
  }
  for (const { part, set } of built) {
    if (components.length > 1) {
      await addText(reference, part.component, { role: 'heading', size: 20, weight: 700 })
    }
    await propertyTable(reference, part, set)
  }
}

// ---------------------------------------------------------------------------
// Replacing output from previous runs

const FOUNDATION_PAGES = [pageName('Colors'), pageName('Typography'), pageName('Spacing & radius')]

async function previousPages(names: Set<string>) {
  const pages: PageNode[] = []
  for (const page of figma.root.children) {
    if (/^Cartyx UI \/ \d{4}-/.test(page.name)) {
      pages.push(page)
      continue
    }
    // Pages tagged by earlier versions of the plugin.
    if (tagOf(page, 'section')) {
      pages.push(page)
      continue
    }
    if (!names.has(page.name)) {
      continue
    }
    await page.loadAsync()
    // Untagged pages are only replaced when they contain nothing but output from this plugin.
    if (
      page.children.every(
        (child) =>
          child.name.startsWith(ROOT_PREFIX) ||
          (child.type === 'COMPONENT' && child.name.startsWith('Theme=')),
      )
    ) {
      pages.push(page)
    }
  }
  return pages
}

// Assets from earlier versions of this plugin; only removed when replacing previous pages.
async function removeLegacyAssets() {
  for (const collection of await figma.variables.getLocalVariableCollectionsAsync()) {
    if (
      /^Cartyx UI \/ \d{4}-/.test(collection.name) ||
      collection.name === PREFIX ||
      THEMES.some((theme) => collection.name === `${ROOT_PREFIX}${humanize(theme)}`)
    ) {
      collection.remove()
    }
  }
  for (const style of await figma.getLocalTextStylesAsync()) {
    if (style.name.startsWith(`${PREFIX}/`)) {
      style.remove()
    }
  }
}

function yieldToFigma() {
  return new Promise<void>((resolve) => setTimeout(resolve, 0))
}

function progress(message: string, value?: number) {
  figma.ui.postMessage({ message, type: 'progress', value }, { origin: '*' })
}

function isLibrary(value: unknown): value is Library {
  return (
    typeof value === 'object' &&
    value !== null &&
    'version' in value &&
    value.version === 3 &&
    'samples' in value &&
    Array.isArray(value.samples) &&
    'tokens' in value &&
    Array.isArray(value.tokens)
  )
}

function loadLibrary(next: unknown) {
  if (!isLibrary(next)) {
    figma.ui.postMessage(
      { message: 'That file is not a Cartyx UI library.json (version 3).', type: 'error' },
      { origin: '*' },
    )
    return
  }
  setLibrary(next)
  announce('file')
}

interface ImportMessage {
  type: string
  themes?: Theme[]
  replace?: boolean
  library?: unknown
}

// oxlint-disable-next-line unicorn/prefer-add-event-listener -- Figma exposes onmessage, not addEventListener.
figma.ui.onmessage = async (message: ImportMessage) => {
  if (importing) {
    return
  }
  if (message.type === 'load') {
    loadLibrary(message.library)
    return
  }
  if (message.type !== 'import') {
    return
  }
  if (!message.themes?.length || message.themes.some((theme) => !THEMES.includes(theme))) {
    figma.ui.postMessage(
      { message: 'Select at least one valid theme.', type: 'error' },
      { origin: '*' },
    )
    return
  }
  const themes = THEMES.filter((theme) => message.themes?.includes(theme)),
    { samples } = library
  importing = true
  notices.clear()
  fontLoads.clear()
  try {
    const availableFonts = await figma.listAvailableFontsAsync()
    fonts = availableFonts.map((font) => font.fontName)
    progress('Updating variables and text styles')
    const state = await upsertVariables()
    variableState = state
    await upsertTextStyles(state)
    const allVariants = parts.reduce((sum, part) => sum + part.variants.length, 0),
      stats: [string, string][] = [
        [String(groups.length), 'Components'],
        [String(allVariants), 'Variants'],
        [String(state.count), 'Variables'],
        [String(styleSpecs.length), 'Text styles'],
      ],
      ctx = buildContext(state.tokens),
      { modes } = state,
      // Pages are created in reading order but built by dependency: icons first, then composable
      // Components by fixture order (so nested instances exist), then everything else.
      plan: {
        name: string
        order?: number
        build?: (page: PageNode) => Promise<SceneNode>
      }[] = []
    plan.push(
      { build: (page) => coverPage(page, stats), name: 'Cover' },
      { build: (page) => gettingStarted(page, stats), name: 'Getting started' },
      { name: '---' },
      { name: 'FOUNDATIONS' },
      { build: (page) => colorsPage(page, state, themes), name: FOUNDATION_PAGES[0] },
      { build: typographyPage, name: FOUNDATION_PAGES[1] },
      { build: (page) => spacingPage(page, state), name: FOUNDATION_PAGES[2] },
    )
    if (library.parts?.icons.length) {
      plan.push({ build: (page) => iconsPage(page, ctx), name: pageName('Icons'), order: -1 })
    }
    plan.push({ name: '---' }, { name: 'COMPONENTS' })
    for (const group of groups) {
      const groupSamples = samples.filter((sample) => groupOf(sample.family) === group),
        groupParts = parts.filter((part) => part.group === group)
      plan.push({
        build: (page) => partsPage(page, group, groupSamples, ctx, modes, themes),
        name: pageName(group),
        order: groupParts.length ? Math.min(...groupParts.map((part) => part.order)) : undefined,
      })
    }
    const replaced = message.replace
      ? await previousPages(new Set(plan.map((item) => item.name)))
      : []
    let insertAt = 0
    const created: { page: PageNode; node?: SceneNode }[] = [],
      pending: { item: (typeof plan)[number]; page: PageNode }[] = []
    for (const item of plan) {
      const page = figma.createPage()
      page.name = item.name
      figma.root.insertChild(Math.min(insertAt++, figma.root.children.length), page)
      if (item.build) {
        pending.push({ item, page })
      }
    }
    const rank = (item: (typeof plan)[number]) => item.order ?? Number.MAX_SAFE_INTEGER,
      // oxlint-disable-next-line unicorn/no-array-sort -- the plugin targets ES2020, which has no toSorted.
      queue = [...pending].sort((a, b) => rank(a.item) - rank(b.item)),
      nodes = new Map<PageNode, SceneNode>()
    for (const [index, { item, page }] of queue.entries()) {
      progress(
        `Building ${item.name.replace('↳ ', '')} (${index + 1}/${queue.length})`,
        index / queue.length,
      )
      // Let Figma repaint and deliver progress between pages, so long builds don't look frozen.
      await yieldToFigma()
      await figma.setCurrentPageAsync(page)
      if (item.build) {
        nodes.set(page, await item.build(page))
      }
    }
    for (const { page } of pending) {
      created.push({ node: nodes.get(page), page })
    }
    const [first] = created
    if (first) {
      await figma.setCurrentPageAsync(first.page)
      if (first.node) {
        figma.viewport.scrollAndZoomIntoView([first.node])
      }
    }
    for (const page of replaced) {
      page.remove()
    }
    if (message.replace) {
      await removeLegacyAssets()
    }
    figma.ui.postMessage(
      {
        failures: library.failures,
        message: `Updated ${state.count} variables and ${styleSpecs.length} text styles. Built ${groups.length} component pages with ${parts.length} components (${allVariants} variants) and ${samples.length} examples, foundations and cover.${replaced.length ? ` Replaced ${replaced.length} previous page${replaced.length === 1 ? '' : 's'}.` : ''}`,
        type: 'done',
        warnings: [...library.warnings, ...notices],
      },
      { origin: '*' },
    )
    figma.notify('Cartyx UI Sync finished. Review the import report before publishing.')
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error)
    figma.ui.postMessage(
      {
        message: `Import stopped: ${detail}. Partial results were kept; previous pages were not removed.`,
        type: 'error',
      },
      { origin: '*' },
    )
    figma.notify(`Cartyx UI import failed: ${detail}`, { error: true })
  } finally {
    importing = false
  }
}
