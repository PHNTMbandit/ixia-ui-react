import { componentName, iconName, looseKey, propName, titleCase, valueName } from './naming'
import type { Color, Layer, PartComponent, Parts, TokenRef } from './schema'

// Builds composable Figma components from src/tools/figma/parts.mjs output: Auto Layout frames,
// Variables bound to semantic tokens, and component properties that follow the library rules:
// Icons are BOOLEAN + INSTANCE_SWAP, text is TEXT, and content regions are native SLOTs.
export interface BuildContext {
  createLayer: (layer: Layer, parent: BaseNode & ChildrenMixin) => Promise<SceneNode>
  styleFrame: (frame: FrameNode | ComponentNode, layer: Layer) => void
  label: (
    parent: BaseNode & ChildrenMixin,
    text: string,
    options: LabelOptions,
  ) => Promise<TextNode>
  variables: Map<string, Variable>
  notices: Set<string>
  progress: (message: string) => void
  icons: Map<string, ComponentNode>
  iconKeys: Map<string, string>
  sets: Map<string, PartNode>
  defaults: Map<string, Record<string, string>>
}
export const NAMESPACE = 'cartyxui'

type Taggable = Pick<BaseNode, 'getSharedPluginData' | 'setSharedPluginData'>

export function tag(node: Taggable, key: string, value: string) {
  try {
    node.setSharedPluginData(NAMESPACE, key, value)
  } catch {
    // Tags only speed up matching; names are the fallback.
  }
}

export function tagOf(node: Taggable, key: string) {
  try {
    return node.getSharedPluginData(NAMESPACE, key)
  } catch {
    return ''
  }
}
// Parts with no variant axes (e.g. Dialog) are a single component rather than a one-variant set.
export type PartNode = ComponentSetNode | ComponentNode
export interface LabelOptions {
  size: number
  weight?: number
  color?: RGB
  opacity?: number
  upper?: boolean
  tracking?: number
  width?: number
}

type PropertyKind = 'TEXT' | 'BOOLEAN' | 'INSTANCE_SWAP' | 'SLOT'
interface Binding {
  node: SceneNode
  kind: PropertyKind
  // Code name (leadingIcon); the Figma property uses propName(code).
  code: string
  value?: string | boolean
}
type Container = BaseNode & ChildrenMixin

const FIELD: Record<PropertyKind, string> = {
    BOOLEAN: 'visible',
    INSTANCE_SWAP: 'mainComponent',
    SLOT: 'slotContentId',
    TEXT: 'characters',
  },
  KIND_ORDER: PropertyKind[] = ['TEXT', 'BOOLEAN', 'INSTANCE_SWAP', 'SLOT']

export const variantKey = (props: Record<string, string>) =>
  Object.entries(props)
    .map(([key, value]) => `${propName(key)}=${valueName(value)}`)
    .join(', ')

export function paintsFor(ctx: BuildContext, color?: Color, token?: TokenRef): Paint[] {
  if (!color || color.a < 0.01) {
    return []
  }
  const variable = token ? ctx.variables.get(token.name) : undefined
  if (!variable) {
    return [{ color: { b: color.b, g: color.g, r: color.r }, opacity: color.a, type: 'SOLID' }]
  }
  const base: SolidPaint = {
    color: { b: color.b, g: color.g, r: color.r },
    opacity: token?.opacity ?? 1,
    type: 'SOLID',
  }
  return [figma.variables.setBoundVariableForPaint(base, 'color', variable)]
}

function applyFrameTokens(ctx: BuildContext, frame: FrameNode | ComponentNode, layer: Layer) {
  if (layer.fillToken && layer.kind !== 'image') {
    // Keep embedded gradient bitmaps above the token-bound background color.
    const images =
      frame.fills === figma.mixed ? [] : frame.fills.filter((fill) => fill.type === 'IMAGE')
    frame.fills = [...paintsFor(ctx, layer.fill, layer.fillToken), ...images]
  }
  if (layer.strokeToken && layer.stroke && layer.strokeWidth) {
    frame.strokes = paintsFor(ctx, layer.stroke, layer.strokeToken)
  }
}

// ---------------------------------------------------------------------------
// Icons

export async function buildIcons(
  ctx: BuildContext,
  icons: Parts['icons'],
  parentFor: (name: string) => Container,
) {
  for (const icon of icons) {
    const component = figma.createComponent()
    parentFor(icon.name).appendChild(component)
    tag(component, 'icon', icon.name)
    component.name = iconName(icon.name)
    component.resize(24, 24)
    component.fills = []
    component.clipsContent = false
    component.description = `${titleCase(icon.name)} icon. Use it through the icon swap properties of any component.`
    const svg = figma.createNodeFromSvg(
      icon.layer.svg || '<svg xmlns="http://www.w3.org/2000/svg"/>',
    )
    component.appendChild(svg)
    svg.x = 0
    svg.y = 0
    svg.resize(24, 24)
    const shapes = svg.findAll(
      (node) =>
        ['VECTOR', 'BOOLEAN_OPERATION', 'ELLIPSE', 'POLYGON', 'STAR', 'LINE'].includes(node.type) ||
        (node.type === 'RECTANGLE' && Array.isArray(node.fills) && node.fills.length > 0),
    )
    if (shapes.length) {
      const glyph = figma.flatten(shapes, component)
      glyph.name = 'Glyph'
      glyph.constraints = { horizontal: 'SCALE', vertical: 'SCALE' }
      glyph.fills = paintsFor(ctx, icon.layer.color, icon.layer.colorToken)
      glyph.strokes = []
    }
    svg.remove()
    ctx.icons.set(icon.name, component)
    if (icon.svgKey) {
      ctx.iconKeys.set(icon.svgKey, icon.name)
    }
  }
}

function iconNode(ctx: BuildContext, layer: Layer, parent: Container): SceneNode {
  const name = layer.svgKey ? ctx.iconKeys.get(layer.svgKey) : undefined,
    icon = name ? ctx.icons.get(name) : undefined
  if (!icon) {
    const vector = figma.createNodeFromSvg(layer.svg || '<svg xmlns="http://www.w3.org/2000/svg"/>')
    parent.appendChild(vector)
    vector.resize(layer.width, layer.height)
    if (layer.figma?.swap) {
      ctx.notices.add(
        `The ${layer.figma.swap} icon is not in the icon registry, so it stays a vector without a swap property.`,
      )
    }
    return vector
  }
  const instance = icon.createInstance()
  parent.appendChild(instance)
  instance.resize(layer.width, layer.height)
  const glyph = instance.findOne((node) => node.name === 'Glyph')
  if (glyph && 'fills' in glyph) {
    glyph.fills = paintsFor(ctx, layer.color, layer.colorToken)
  }
  instance.name = layer.figma?.swap ? propName(layer.figma.swap) : name ? titleCase(name) : 'Icon'
  return instance
}

// ---------------------------------------------------------------------------
// Layers

// Positioned layers follow the edges they were attached to in CSS, so they stay in place when
// The component is resized (an indicator spanning the tab stretches with it).
function constraintFor(start: number, size: number, total: number): ConstraintType {
  const end = total - start - size
  if (Math.abs(start) <= 1.5 && Math.abs(end) <= 1.5) {
    return 'STRETCH'
  }
  if (Math.abs(start + size / 2 - total / 2) <= 1.5 && Math.abs(start) > 1.5) {
    return 'CENTER'
  }
  return Math.abs(end) < Math.abs(start) ? 'MAX' : 'MIN'
}

function constraintsFor(layer: Layer, parent: { width: number; height: number }): Constraints {
  return {
    horizontal: constraintFor(layer.x, layer.width, parent.width),
    vertical: constraintFor(layer.y, layer.height, parent.height),
  }
}

function place(node: SceneNode, layer: Layer, parent: Container) {
  const autoParent = 'layoutMode' in parent && parent.layoutMode !== 'NONE' ? parent : undefined
  if (!autoParent || layer.absolute) {
    if (autoParent && 'layoutPositioning' in node) {
      node.layoutPositioning = 'ABSOLUTE'
    }
    node.x = layer.x
    node.y = layer.y
    if ('constraints' in node && 'width' in parent) {
      node.constraints = constraintsFor(layer, parent)
    }
    return
  }
  if (!layer.sizing || !('layoutSizingHorizontal' in node)) {
    return
  }
  if (node.type === 'TEXT') {
    if (layer.sizing.h === 'HUG') {
      node.textAutoResize = 'WIDTH_AND_HEIGHT'
    } else if (layer.sizing.h === 'FILL') {
      node.layoutSizingHorizontal = 'FILL'
    }
    return
  }
  for (const [axis, value] of [
    ['layoutSizingHorizontal', layer.sizing.h],
    ['layoutSizingVertical', layer.sizing.v],
  ] as const) {
    if (value === 'FIXED') {
      continue
    }
    try {
      node[axis] = value
    } catch {
      // HUG is only valid on Auto Layout frames; keep the captured size otherwise.
    }
  }
}

async function layoutChildren(
  ctx: BuildContext,
  frame: FrameNode | ComponentNode,
  layer: Layer,
  bindings: Binding[],
) {
  const { auto } = layer
  if (auto && auto.mode !== 'NONE') {
    frame.layoutMode = auto.mode
    frame.itemSpacing = auto.gap || 0
    const [top, right, bottom, left] = auto.padding || [0, 0, 0, 0]
    frame.paddingTop = top
    frame.paddingRight = right
    frame.paddingBottom = bottom
    frame.paddingLeft = left
    frame.primaryAxisAlignItems = auto.justify || 'MIN'
    frame.counterAxisAlignItems = auto.align || 'MIN'
    frame.primaryAxisSizingMode = 'FIXED'
    frame.counterAxisSizingMode = 'FIXED'
  }
  for (const child of layer.children || []) {
    const node = await buildNode(ctx, child, frame, bindings)
    if (node) {
      place(node, child, frame)
    }
  }
}

async function buildNode(
  ctx: BuildContext,
  layer: Layer,
  parent: Container,
  bindings: Binding[],
): Promise<SceneNode | undefined> {
  const annotations = layer.figma || {}
  let node: SceneNode
  if (annotations.part) {
    node = await partInstance(ctx, layer, parent)
  } else if (layer.kind === 'svg') {
    node = iconNode(ctx, layer, parent)
  } else if (layer.kind === 'text') {
    node = await ctx.createLayer(layer, parent)
    if (node.type === 'TEXT' && layer.fillToken) {
      node.fills = paintsFor(ctx, layer.fill, layer.fillToken)
    }
  } else if (layer.kind === 'image') {
    node = await ctx.createLayer(layer, parent)
  } else {
    const frame = figma.createFrame()
    parent.appendChild(frame)
    frame.resize(layer.width, layer.height)
    ctx.styleFrame(frame, layer)
    if (layer.synthetic) {
      frame.fills = []
    }
    applyFrameTokens(ctx, frame, layer)
    await layoutChildren(ctx, frame, layer, bindings)
    node = frame
  }
  if (annotations.slot) {
    node.name = propName(annotations.slot)
  } else if (node.type === 'FRAME' && !annotations.part) {
    node.name = layer.name
  }
  if ('opacity' in node) {
    node.opacity = layer.opacity
  }
  if (layer.rotation && Math.abs(layer.rotation) > 0.5 && 'rotation' in node) {
    node.rotation = -layer.rotation
  }
  if (annotations.text && node.type === 'TEXT') {
    bindings.push({ code: annotations.text, kind: 'TEXT', node, value: node.characters })
  }
  if (annotations.show) {
    const [name, value] = annotations.show.split('=')
    node.visible = value !== 'false'
    bindings.push({ code: name, kind: 'BOOLEAN', node, value: value !== 'false' })
  }
  if (annotations.swap && node.type === 'INSTANCE') {
    const main = await node.getMainComponentAsync()
    if (main) {
      bindings.push({ code: annotations.swap, kind: 'INSTANCE_SWAP', node, value: main.id })
    }
  }
  if (annotations.slot && node.type === 'FRAME') {
    bindings.push({ code: annotations.slot, kind: 'SLOT', node })
  }
  return node
}

// ---------------------------------------------------------------------------
// Nested component instances

const display = (props: Record<string, string>) =>
  Object.entries(props).map(([key, value]) => [propName(key), valueName(value)] as const)

function findVariant(ctx: BuildContext, component: string, wanted: Record<string, string>) {
  const set = ctx.sets.get(component)
  if (!set) {
    return undefined
  }
  if (set.type === 'COMPONENT') {
    return set
  }
  const defaults = ctx.defaults.get(component) || {}
  let best: { node: ComponentNode; score: number } | undefined
  for (const child of set.children) {
    if (child.type !== 'COMPONENT') {
      continue
    }
    const props = child.variantProperties || {}
    if (display(wanted).some(([key, value]) => props[key] !== value)) {
      continue
    }
    const score = display(defaults).filter(([key, value]) => props[key] === value).length
    if (!best || score > best.score) {
      best = { node: child, score }
    }
  }
  return best?.node
}

interface Overrides {
  props: Record<string, string | boolean>
  slots: Map<string, Layer>
}

function collectOverrides(ctx: BuildContext, layer: Layer, result: Overrides, root = true) {
  const annotations = layer.figma || {}
  if (!root) {
    if (annotations.part) {
      return
    }
    if (annotations.text && layer.kind === 'text') {
      result.props[annotations.text] = layer.text || ''
    }
    if (annotations.show) {
      const [name, value] = annotations.show.split('=')
      result.props[name] = value !== 'false'
    }
    if (annotations.swap && layer.svgKey) {
      const icon = ctx.icons.get(ctx.iconKeys.get(layer.svgKey) || '')
      if (icon) {
        result.props[annotations.swap] = icon.id
      }
    }
    if (annotations.slot) {
      result.slots.set(annotations.slot, layer)
      return
    }
  }
  for (const child of layer.children || []) {
    collectOverrides(ctx, child, result, false)
  }
}

function variantProperties(value: string | undefined): Record<string, string> {
  if (!value) {
    return {}
  }
  const parsed: unknown = JSON.parse(value)
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    Array.isArray(parsed) ||
    !Object.values(parsed).every((entry) => typeof entry === 'string')
  ) {
    throw new Error('Figma variant properties must be an object with string values')
  }
  return Object.fromEntries(
    Object.entries(parsed).map(([key, entry]) => {
      if (typeof entry !== 'string') {
        throw new Error(`Invalid Figma variant property: ${key}`)
      }
      return [key, entry]
    }),
  )
}

async function partInstance(ctx: BuildContext, layer: Layer, parent: Container) {
  const annotations = layer.figma || {},
    component = annotations.part || '',
    wanted = variantProperties(annotations.variant),
    main = findVariant(ctx, component, wanted)
  if (!main) {
    ctx.notices.add(
      `${componentName(component)} is not built yet, so it was drawn as plain layers. Import its page first, then re-import this page.`,
    )
    const frame = figma.createFrame()
    parent.appendChild(frame)
    frame.resize(layer.width, layer.height)
    ctx.styleFrame(frame, layer)
    applyFrameTokens(ctx, frame, layer)
    await layoutChildren(ctx, frame, layer, [])
    frame.name = componentName(component)
    return frame
  }
  const instance = main.createInstance()
  parent.appendChild(instance)
  instance.name = componentName(component)
  const overrides: Overrides = { props: {}, slots: new Map() }
  collectOverrides(ctx, layer, overrides)
  const definitions = instance.componentProperties,
    values: Record<string, string | boolean> = {}
  for (const [name, value] of Object.entries(overrides.props)) {
    const key = Object.keys(definitions).find(
      (candidate) => candidate.split('#')[0] === propName(name),
    )
    if (key && definitions[key].value !== value) {
      values[key] = value
    }
  }
  if (Object.keys(values).length) {
    try {
      instance.setProperties(values)
    } catch (error) {
      ctx.notices.add(`Could not set ${componentName(component)} properties: ${String(error)}`)
    }
  }
  for (const [name, slotLayer] of overrides.slots) {
    const slot = instance.findOne((node) => node.type === 'SLOT' && node.name === propName(name))
    if (!slot || !('children' in slot)) {
      continue
    }
    try {
      // Copy first: the loop removes children.
      // oxlint-disable-next-line unicorn/no-useless-spread
      for (const child of [...slot.children]) {
        child.remove()
      }
      for (const child of slotLayer.children || []) {
        const node = await buildNode(ctx, child, slot, [])
        if (node) {
          place(node, child, slot)
        }
      }
    } catch (error) {
      ctx.notices.add(
        `Could not fill the ${componentName(component)} ${propName(name)} slot: ${String(error)}`,
      )
    }
  }
  return instance
}

// ---------------------------------------------------------------------------
// Component sets

function rootSizing(component: FrameNode | ComponentNode, layer: Layer) {
  component.resize(layer.width, layer.height)
  if (component.layoutMode === 'NONE' || !layer.sizing) {
    return
  }
  const horizontal = component.layoutMode === 'HORIZONTAL',
    primary = horizontal ? layer.sizing.h : layer.sizing.v,
    counter = horizontal ? layer.sizing.v : layer.sizing.h
  component.primaryAxisSizingMode = primary === 'HUG' ? 'AUTO' : 'FIXED'
  component.counterAxisSizingMode = counter === 'HUG' ? 'AUTO' : 'FIXED'
}

// Builds a captured story as plain token-bound frames (documentation examples, not components).
export async function buildLayer(ctx: BuildContext, layer: Layer, parent: Container) {
  const node = await buildNode(ctx, { ...layer, x: 0, y: 0 }, parent, [])
  if (node?.type === 'FRAME') {
    rootSizing(node, layer)
  }
  return node
}

function sortVariants(part: PartComponent) {
  const axes = Object.keys(part.axes),
    rank = (props: Record<string, string>) =>
      axes.map((axis) => {
        const values = part.axes[axis],
          index = values.indexOf(props[axis])
        // The default value sorts first so the default variant is the set's top-left variant.
        return props[axis] === part.defaults[axis] ? -1 : index
      })
  return (
    part.variants
      .map((variant) => ({ rank: rank(variant.props), variant }))
      // oxlint-disable-next-line unicorn/no-array-sort -- ES2020 has no toSorted.
      .sort((a, b) => {
        for (let index = 0; index < a.rank.length; index++) {
          if (a.rank[index] !== b.rank[index]) {
            return a.rank[index] - b.rank[index]
          }
        }
        return 0
      })
      .map(({ variant }) => variant)
  )
}

const matches = (props: Record<string, string>, subset: Record<string, string>) =>
  Object.entries(subset).every(([key, value]) => props[key] === value)

async function wire(
  ctx: BuildContext,
  part: PartComponent,
  variants: PartComponent['variants'],
  components: ComponentNode[],
) {
  if (!part.interactions.length) {
    return
  }
  const byKey = new Map(
      variants.map((variant, index) => [variantKey(variant.props), components[index]]),
    ),
    axes = Object.keys(part.axes)
  for (const [index, variant] of variants.entries()) {
    const reactions = (transition: Transition | null): Reaction[] =>
      part.interactions.flatMap((rule) => {
        if (!matches(variant.props, rule.from)) {
          return []
        }
        const target = { ...variant.props, ...rule.to },
          ordered = Object.fromEntries(axes.map((axis) => [axis, target[axis]])),
          destination = byKey.get(variantKey(ordered))
        if (!destination) {
          return []
        }
        return [
          {
            actions: [
              {
                destinationId: destination.id,
                navigation: 'CHANGE_TO',
                resetScrollPosition: false,
                transition,
                type: 'NODE',
              },
            ],
            trigger: { type: rule.trigger },
          },
        ]
      })
    if (!reactions(null).length) {
      continue
    }
    try {
      await components[index].setReactionsAsync(
        reactions({ duration: 0.15, easing: { type: 'EASE_OUT' }, type: 'SMART_ANIMATE' }),
      )
    } catch {
      try {
        await components[index].setReactionsAsync(reactions(null))
      } catch (error) {
        ctx.notices.add(
          `${componentName(part.component)}: interactions skipped (${String(error)}).`,
        )
        return
      }
    }
  }
}

function preferredValues(ctx: BuildContext, names: string[] = []): InstanceSwapPreferredValue[] {
  return names.flatMap((name): InstanceSwapPreferredValue[] => {
    if (name === 'Icon') {
      return [...ctx.icons.values()].map((icon) => ({ key: icon.key, type: 'COMPONENT' as const }))
    }
    const set = ctx.sets.get(name)
    return set ? [{ key: set.key, type: set.type }] : []
  })
}

function addProperties(
  ctx: BuildContext,
  part: PartComponent,
  set: PartNode,
  bindings: Binding[][],
) {
  const definitions = new Map<string, { kind: PropertyKind; value?: string | boolean }>()
  for (const list of bindings) {
    for (const binding of list) {
      if (!definitions.has(binding.code)) {
        definitions.set(binding.code, { kind: binding.kind, value: binding.value })
      }
    }
  }
  const ids = new Map<string, string>(),
    // Properties from an earlier sync keep their ids, so overrides in designs survive.
    previous = new Map(
      Object.entries(set.componentPropertyDefinitions)
        .filter(([, definition]) => definition.type !== 'VARIANT')
        .map(([id, definition]) => [looseKey(id.split('#')[0]), { id, type: definition.type }]),
    ),
    used = new Set<string>(),
    label = componentName(part.component),
    // oxlint-disable-next-line unicorn/no-array-sort -- ES2020 has no toSorted.
    ordered = [...definitions].sort(
      (a, b) => KIND_ORDER.indexOf(a[1].kind) - KIND_ORDER.indexOf(b[1].kind),
    )
  for (const [code, { kind, value }] of ordered) {
    const name = propName(code),
      spec = part.slots[code],
      options =
        kind === 'INSTANCE_SWAP'
          ? { preferredValues: preferredValues(ctx, ['Icon']) }
          : kind === 'SLOT'
            ? {
                description: spec?.description || '',
                preferredValues: preferredValues(ctx, spec?.preferred),
                slotSettings: {
                  allowPreferredValuesOnly: Boolean(spec?.only && spec.preferred?.length),
                  maxChildren: spec?.max ?? null,
                  minChildren: spec?.min ?? null,
                },
              }
            : undefined,
      defaultValue =
        kind === 'BOOLEAN' ? value !== false : kind === 'SLOT' ? '' : String(value ?? ''),
      old = previous.get(looseKey(name))
    if (old && old.type === kind) {
      try {
        ids.set(
          code,
          set.editComponentProperty(old.id, {
            name,
            ...(kind === 'SLOT' ? {} : { defaultValue }),
            ...(kind === 'INSTANCE_SWAP' && options ? options : {}),
          }),
        )
        used.add(old.id)
        continue
      } catch {
        // Fall through and recreate the property.
      }
    }
    try {
      ids.set(code, set.addComponentProperty(name, kind, defaultValue, options))
    } catch (error) {
      ctx.notices.add(
        `${label}: the ${name} ${kind.toLowerCase().replace('_', ' ')} property could not be created (${String(error)}).`,
      )
    }
  }
  for (const [, { id }] of previous) {
    if (!used.has(id) && ![...ids.values()].includes(id)) {
      try {
        set.deleteComponentProperty(id)
      } catch {
        // Already removed with its layers.
      }
    }
  }
  for (const list of bindings) {
    for (const binding of list) {
      const id = ids.get(binding.code)
      if (!id) {
        continue
      }
      try {
        binding.node.componentPropertyReferences = {
          ...binding.node.componentPropertyReferences,
          [FIELD[binding.kind]]: id,
        } as SceneNode['componentPropertyReferences']
      } catch (error) {
        ctx.notices.add(`${label}: could not bind ${propName(binding.code)} (${String(error)}).`)
      }
    }
  }
}

export async function buildPart(ctx: BuildContext, part: PartComponent, parent: FrameNode) {
  const variants = sortVariants(part),
    axes = Object.keys(part.axes),
    name = componentName(part.component),
    canvas = figma.createFrame()
  parent.appendChild(canvas)
  canvas.name = 'Variants'
  canvas.fills = []
  canvas.clipsContent = false
  const components: ComponentNode[] = [],
    bindings: Binding[][] = []
  for (const [index, variant] of variants.entries()) {
    const component = figma.createComponent()
    canvas.appendChild(component)
    component.name = variantKey(variant.props)
    component.resize(variant.layer.width, variant.layer.height)
    ctx.styleFrame(component, variant.layer)
    applyFrameTokens(ctx, component, variant.layer)
    const list: Binding[] = []
    await layoutChildren(ctx, component, variant.layer, list)
    rootSizing(component, variant.layer)
    components.push(component)
    bindings.push(list)
    if (index % 40 === 0) {
      ctx.progress(`${name}: ${index + 1}/${variants.length} variants`)
    }
  }

  if (!axes.length) {
    if (components.length !== 1) {
      throw new Error(
        `${name} has ${components.length} variants but no variant properties to tell them apart.`,
      )
    }
    const [single] = components
    single.name = name
    single.description = part.description
    tag(single, 'component', part.component)
    single.x = 0
    single.y = 0
    canvas.resize(single.width, single.height)
    ctx.sets.set(part.component, single)
    ctx.defaults.set(part.component, part.defaults)
    addProperties(ctx, part, single, bindings)
    await wire(ctx, part, variants, components)
    return { canvas, components: new Map([['', single]]), set: single as PartNode }
  }
  const columnAxis = axes.includes('State') ? 'State' : axes[axes.length - 1],
    columnValues = sortedValues(part, columnAxis),
    rowKey = (props: Record<string, string>) =>
      variantKey(
        Object.fromEntries(
          axes.filter((axis) => axis !== columnAxis).map((axis) => [axis, props[axis]]),
        ),
      ),
    rows = [...new Set(variants.map((variant) => rowKey(variant.props)))],
    gutter = rows.length > 1 || rows[0] ? 260 : 0,
    header = 48,
    pad = 32,
    gap = 32,
    widths = columnValues.map(() => 1),
    heights = rows.map(() => 24),
    cellOf = (props: Record<string, string>) => {
      const column = columnValues.indexOf(props[columnAxis])
      if (column === -1) {
        throw new Error(
          `${name}: variant "${variantKey(props)}" has a ${columnAxis} value that is not one of ${columnValues.join(', ')}.`,
        )
      }
      return { column, row: rows.indexOf(rowKey(props)) }
    }
  for (const [index, variant] of variants.entries()) {
    const { column, row } = cellOf(variant.props)
    widths[column] = Math.max(widths[column], components[index].width)
    heights[row] = Math.max(heights[row], components[index].height)
  }
  const columnX: number[] = []
  let x = pad
  for (const width of widths) {
    columnX.push(x)
    x += width + gap
  }
  const rowY: number[] = []
  let y = pad
  for (const height of heights) {
    rowY.push(y)
    y += height + gap
  }
  const set = figma.combineAsVariants(components, canvas)
  set.name = name
  set.description = part.description
  tag(set, 'component', part.component)
  set.x = gutter
  set.y = header
  for (const [index, variant] of variants.entries()) {
    const { column, row } = cellOf(variant.props)
    components[index].x = columnX[column]
    components[index].y = rowY[row] + (heights[row] - components[index].height) / 2
  }
  set.resizeWithoutConstraints(x - gap + pad, y - gap + pad)
  for (const [index, value] of columnValues.entries()) {
    const text = await ctx.label(
      canvas,
      columnAxis === 'State' ? valueName(value) : `${propName(columnAxis)}: ${valueName(value)}`,
      {
        opacity: 0.55,
        size: 11,
        tracking: 8,
        upper: true,
        weight: 600,
      },
    )
    text.x = gutter + columnX[index]
    text.y = 16
  }
  for (const [index, row] of rows.entries()) {
    if (!row) {
      continue
    }
    const text = await ctx.label(canvas, row.replace(/=/g, ': ').replace(/, /g, '  ·  '), {
      opacity: 0.75,
      size: 12,
      weight: 500,
      width: gutter - 24,
    })
    text.x = 0
    text.y = header + rowY[index] + (heights[index] - text.height) / 2
  }
  canvas.resize(gutter + set.width, header + set.height)
  ctx.sets.set(part.component, set)
  ctx.defaults.set(part.component, part.defaults)
  addProperties(ctx, part, set, bindings)
  await wire(ctx, part, variants, components)
  return {
    canvas,
    components: new Map(
      variants.map((variant, index) => [variantKey(variant.props), components[index]]),
    ),
    set: set as PartNode,
  }
}

function sortedValues(part: PartComponent, axis: string) {
  const values = part.axes[axis] || [],
    first = part.defaults[axis]
  return first && values.includes(first)
    ? [first, ...values.filter((value) => value !== first)]
    : values
}

export function defaultComponent(ctx: BuildContext, part: PartComponent) {
  return findVariant(ctx, part.component, part.defaults)
}
