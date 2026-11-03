// Infers Figma Auto Layout from captured CSS facts and geometry so exported components resize
// Like the code: flex containers map directly, block/grid containers are inferred from child
// Positions (synthesizing column/row wrappers for 2D grids), and anything else stays absolute.
const EPS = 1.5,
  ALIGN = {
    center: 'CENTER',
    end: 'MAX',
    'flex-end': 'MAX',
    'flex-start': 'MIN',
    'self-end': 'MAX',
    'self-start': 'MIN',
    start: 'MIN',
  },
  BLOCK = new Set(['block', 'list-item', 'flow-root']),
  isFlex = (layer) => ['flex', 'inline-flex'].includes(layer.css?.display),
  hasText = (layer) =>
    layer.kind === 'text' || (layer.children || []).some((child) => hasText(child)),
  // Block boxes holding text grow with it unless the CSS pins a height.
  growsWithText = (layer) =>
    BLOCK.has(layer.css?.display) && layer.auto?.mode !== 'NONE' && hasText(layer),
  isAbsolute = (layer) => ['absolute', 'fixed'].includes(layer.css?.position),
  near = (a, b, tolerance = EPS) => Math.abs(a - b) <= tolerance,
  horizontal = (mode) => mode === 'HORIZONTAL',
  main = (mode) => (horizontal(mode) ? { pos: 'x', size: 'width' } : { pos: 'y', size: 'height' }),
  cross = (mode) => (horizontal(mode) ? { pos: 'y', size: 'height' } : { pos: 'x', size: 'width' })

function synthetic(name, children) {
  const x = Math.min(...children.map((child) => child.x)),
    y = Math.min(...children.map((child) => child.y)),
    width = Math.max(...children.map((child) => child.x + child.width)) - x,
    height = Math.max(...children.map((child) => child.y + child.height)) - y
  return {
    children: children.map((child) => ({ ...child, x: child.x - x, y: child.y - y })),
    height,
    kind: 'frame',
    name,
    opacity: 1,
    synthetic: true,
    width,
    x,
    y,
  }
}

// Groups children whose projections on an axis overlap (columns for x, rows for y).
function bands(children, axis) {
  const size = axis === 'x' ? 'width' : 'height',
    sorted = children.toSorted((a, b) => a[axis] - b[axis]),
    groups = []
  for (const child of sorted) {
    const last = groups.at(-1)
    if (last && child[axis] < last.end - EPS) {
      last.items.push(child)
      last.end = Math.max(last.end, child[axis] + child[size])
    } else {
      groups.push({ end: child[axis] + child[size], items: [child] })
    }
  }
  return groups.map((group) => group.items)
}

function stackable(children, mode) {
  const { pos, size } = main(mode),
    sorted = children.toSorted((a, b) => a[pos] - b[pos])
  return sorted.every((child, index) => {
    if (!index) {
      return true
    }
    const previous = sorted[index - 1]
    return child[pos] >= previous[pos] + previous[size] - EPS
  })
}

function geometricMode(layer, flow) {
  if (flow.length === 1) {
    return { flow, mode: flow[0].width >= flow[0].height ? 'HORIZONTAL' : 'VERTICAL' }
  }
  if (stackable(flow, 'VERTICAL')) {
    return { flow, mode: 'VERTICAL' }
  }
  if (stackable(flow, 'HORIZONTAL')) {
    return { flow, mode: 'HORIZONTAL' }
  }
  for (const [mode, axis] of [
    ['HORIZONTAL', 'x'],
    ['VERTICAL', 'y'],
  ]) {
    const groups = bands(flow, axis)
    if (groups.length < 2) {
      continue
    }
    const inner = mode === 'HORIZONTAL' ? 'VERTICAL' : 'HORIZONTAL'
    if (groups.every((group) => group.length === 1 || stackable(group, inner))) {
      return {
        flow: groups.map((group, index) =>
          group.length === 1 ? group[0] : synthetic(`${humanAxis(axis)} ${index + 1}`, group),
        ),
        mode,
      }
    }
  }
  return null
}

const humanAxis = (axis) => (axis === 'x' ? 'Column' : 'Row')

function contentBox(layer, padding) {
  return {
    height: layer.height - padding[0] - padding[2],
    width: layer.width - padding[1] - padding[3],
    x: padding[3],
    y: padding[0],
  }
}

// Offsets that one cross-axis alignment cannot express are kept with a padded wrapper.
function offsetWrapper(child, padding) {
  return {
    auto: { align: 'MIN', gap: 0, justify: 'MIN', mode: 'HORIZONTAL', padding },
    children: [{ ...child, x: padding[3], y: padding[0] }],
    height: child.height + padding[0] + padding[2],
    kind: 'frame',
    name: 'Offset',
    opacity: 1,
    sizing: { h: 'HUG', v: 'HUG' },
    synthetic: true,
    width: child.width + padding[1] + padding[3],
    x: child.x - padding[3],
    y: child.y - padding[0],
  }
}

export function inferLayout(layer) {
  if (layer.kind !== 'frame') {
    return layer
  }
  const children = layer.children || []
  if (layer.auto) {
    if (layer.auto.mode === 'NONE') {
      return layer
    }
    const box = contentBox(layer, layer.auto.padding)
    for (const child of children) {
      inferLayout(child)
      child.sizing ||= childSizing(child, layer, box)
    }
    return layer
  }
  for (const child of children) {
    if (isAbsolute(child)) {
      child.absolute = true
    }
  }
  let flow = children.filter((child) => !child.absolute)
  const { css } = layer,
    border = layer.strokeWidths || [0, 0, 0, 0]
  let auto
  if (
    css &&
    ['flex', 'inline-flex'].includes(css.display) &&
    css.wrap === 'nowrap' &&
    flow.length
  ) {
    const mode = css.direction.startsWith('row') ? 'HORIZONTAL' : 'VERTICAL',
      { pos } = main(mode)
    flow = flow.toSorted((a, b) => a[pos] - b[pos])
    auto = {
      align: ALIGN[css.alignItems] || 'MIN',
      gap: horizontal(mode) ? css.columnGap : css.rowGap,
      justify:
        css.justifyContent === 'space-between'
          ? 'SPACE_BETWEEN'
          : ALIGN[css.justifyContent] || 'MIN',
      mode,
      padding: css.padding.map((value, index) => value + border[index]),
      stretch: ['normal', 'stretch'].includes(css.alignItems),
    }
  } else if (flow.length) {
    const result = geometricMode(layer, flow)
    if (result) {
      const { mode } = result,
        { pos, size } = main(mode)
      flow = result.flow.toSorted((a, b) => a[pos] - b[pos])
      const top = Math.min(...flow.map((child) => child.y)),
        left = Math.min(...flow.map((child) => child.x)),
        bottom = layer.height - Math.max(...flow.map((child) => child.y + child.height)),
        right = layer.width - Math.max(...flow.map((child) => child.x + child.width)),
        gaps = flow
          .slice(1)
          .map((child, index) => child[pos] - (flow[index][pos] + flow[index][size]))
      auto = {
        mode,
        gap: gaps.length ? Math.max(0, Math.min(...gaps)) : 0,
        // Block content starts at the content box; trailing space is leftover, not padding.
        padding: (css && BLOCK.has(css.display)
          ? [top, css.padding[1] + border[1], css.padding[2] + border[2], left]
          : [top, right, bottom, left]
        ).map((value) => Math.max(0, value)),
        align: 'MIN',
        justify: 'MIN',
        stretch: true,
      }
      // Larger gaps than the shared spacing become leading padding on that child's wrapper.
      flow = flow.map((child, index) => {
        const extra = index ? gaps[index - 1] - auto.gap : 0
        if (extra <= EPS) {
          return child
        }
        const padding = horizontal(mode) ? [0, 0, 0, extra] : [extra, 0, 0, 0]
        return offsetWrapper(child, padding)
      })
    }
  }
  if (!auto) {
    layer.auto = { mode: 'NONE' }
    for (const child of children) {
      inferLayout(child)
    }
    return layer
  }
  const box = contentBox(layer, auto.padding),
    { pos: crossPos, size: crossSize } = cross(auto.mode),
    offsets = flow.map((child) => child[crossPos] - box[crossPos]),
    space = flow.map((child) => box[crossSize] - child[crossSize])
  if (!css || !['flex', 'inline-flex'].includes(css.display)) {
    if (flow.every((_, index) => near(offsets[index], space[index] / 2))) {
      auto.align = 'CENTER'
    } else if (flow.every((_, index) => near(offsets[index], space[index]))) {
      auto.align = 'MAX'
    }
  }
  flow = flow.map((child, index) => {
    const expected =
        auto.align === 'CENTER' ? space[index] / 2 : auto.align === 'MAX' ? space[index] : 0,
      spans = near(child[crossSize], box[crossSize])
    if (spans || near(offsets[index], expected) || child.absolute) {
      return child
    }
    const padding = horizontal(auto.mode)
      ? [Math.max(0, offsets[index]), 0, 0, 0]
      : [0, 0, 0, Math.max(0, offsets[index])]
    return offsetWrapper(child, padding)
  })
  layer.auto = auto
  // Underlays stay below the content; other positioned children stay on top.
  layer.children = [
    ...children.filter((child) => child.absolute && child.underlay),
    ...flow,
    ...children.filter((child) => child.absolute && !child.underlay),
  ]
  for (const child of layer.children) {
    inferLayout(child)
  }
  for (const child of flow) {
    child.sizing ||= childSizing(child, layer, box)
  }
  return layer
}

function hugSize(layer, axis) {
  const { auto } = layer
  if (layer.kind === 'text') {
    return axis === 'width' ? layer.width : layer.height
  }
  if (!auto || auto.mode === 'NONE' || !layer.children?.length) {
    return Number.NaN
  }
  const flow = layer.children.filter((child) => !child.absolute),
    along = main(auto.mode).size === axis,
    padding =
      axis === 'width' ? auto.padding[1] + auto.padding[3] : auto.padding[0] + auto.padding[2]
  return along
    ? flow.reduce((sum, child) => sum + child[axis], 0) +
        auto.gap * Math.max(0, flow.length - 1) +
        padding
    : Math.max(...flow.map((child) => child[axis])) + padding
}

function childSizing(child, parent, box) {
  const along = main(parent.auto.mode).size,
    result = {}
  for (const [key, axis] of [
    ['h', 'width'],
    ['v', 'height'],
  ]) {
    if (child.kind === 'svg' || child.kind === 'image') {
      result[key] = 'FIXED'
      continue
    }
    if (child.kind === 'text') {
      // Text in a block (or a text input) wraps at the container width like in CSS.
      const fills =
        child.stretch ||
        (parent.css &&
          BLOCK.has(parent.css.display) &&
          parent.children.filter((sibling) => !sibling.absolute).length === 1)
      if (fills && axis === 'width') {
        result[key] = 'FILL'
        continue
      }
      result[key] =
        child.multiline && axis === 'width'
          ? near(child.width, box.width, 4)
            ? 'FILL'
            : 'FIXED'
          : 'HUG'
      continue
    }
    if (axis === 'height' && growsWithText(child)) {
      result[key] = 'HUG'
    } else if (axis === along && child.css?.grow > 0 && isFlex(parent)) {
      result[key] = 'FILL'
    }
    // A lone child spanning its parent (a block box or width: 100%) fills it.
    else if (
      axis === along &&
      (isFlex(parent) || BLOCK.has(parent.css?.display) || parent.css?.display === 'grid') &&
      parent.children.filter((sibling) => !sibling.absolute).length === 1 &&
      near(child[axis], box[axis])
    ) {
      result[key] = 'FILL'
    }
    // The text column of a grid (icon | text | action) is its 1fr track.
    else if (axis === along && parent.css?.display === 'grid' && hasText(child)) {
      result[key] = 'FILL'
    } else if (
      axis !== along &&
      near(child[axis], box[axis]) &&
      (parent.auto.stretch || child.css?.alignSelf === 'stretch')
    ) {
      result[key] = 'FILL'
    } else if (near(child[axis], hugSize(child, axis))) {
      result[key] = 'HUG'
    } else {
      result[key] = 'FIXED'
    }
  }
  return result
}

// Root components hug their content when the captured size matches it.
export function rootSizing(layer) {
  inferLayout(layer)
  // An explicit width in the fixture marks a component that is sized by its container.
  layer.sizing = {
    h: !layer.css?.fixedWidth && near(layer.width, hugSize(layer, 'width')) ? 'HUG' : 'FIXED',
    v: near(layer.height, hugSize(layer, 'height')) ? 'HUG' : 'FIXED',
  }
  resolveConflicts(layer)
  return layer
}

// Prefer hugging over a fixed size when a child cannot fill a hugging parent.
function fallback(child, axis) {
  if (child.kind === 'text') {
    return child.multiline ? 'FIXED' : 'HUG'
  }
  if (axis === 'height' && growsWithText(child)) {
    return 'HUG'
  }
  return near(child[axis], hugSize(child, axis)) ? 'HUG' : 'FIXED'
}

// Figma cannot fill a child along an axis where the parent hugs; pin those children instead.
function resolveConflicts(layer) {
  for (const child of layer.children || []) {
    if (child.sizing) {
      for (const [key, axis] of [
        ['h', 'width'],
        ['v', 'height'],
      ]) {
        if (layer.sizing?.[key] === 'HUG' && child.sizing[key] === 'FILL') {
          child.sizing[key] = fallback(child, axis)
        }
      }
    }
    resolveConflicts(child)
  }
}
