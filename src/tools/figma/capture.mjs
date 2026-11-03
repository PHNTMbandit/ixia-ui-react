/* oxlint-disable unicorn/consistent-function-scoping -- Helpers must travel with the serialized browser function. */
// This function runs inside the Storybook iframe; keep it independent of Node imports.
export function captureDocument({
  tokenNames,
  theme,
  selector = '#storybook-root',
  targets,
  adopt,
  figma = false,
}) {
  const warnings = new Set(),
    root = document.querySelector(targets ? 'body' : selector)
  if (!root) {
    throw new Error(`Missing capture root: ${selector}`)
  }
  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = 1
  colorCanvas.height = 1
  const context = colorCanvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    throw new Error('Cannot resolve CSS colors without a 2D context')
  }

  function color(value) {
    context.clearRect(0, 0, 1, 1)
    context.fillStyle = value
    context.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data
    return { a: a / 255, b: b / 255, g: g / 255, r: r / 255 }
  }

  const number = (value) => Number.parseFloat(value) || 0,
    bounds = (rect, origin) => ({
      height: Math.max(0.01, rect.height),
      width: Math.max(0.01, rect.width),
      x: rect.x - origin.x,
      y: rect.y - origin.y,
    })

  function typography(style) {
    return {
      decoration: style.textDecorationLine,
      fill: color(style.color),
      fontFamily: style.fontFamily.split(',')[0].replaceAll(/['"]/g, '').trim(),
      fontSize: number(style.fontSize),
      fontStyle: style.fontStyle,
      fontWeight: number(style.fontWeight) || 400,
      letterSpacing: number(style.letterSpacing),
      lineHeight: number(style.lineHeight) || number(style.fontSize) * 1.5,
      textAlign: style.textAlign,
    }
  }

  function textLayer(node, parentRect, style) {
    const range = document.createRange()
    range.selectNodeContents(node)
    const rect = range.getBoundingClientRect()
    if (!rect.width || !rect.height) {
      return null
    }
    const text =
      style.whiteSpace.startsWith('pre') || style.whiteSpace === 'break-spaces'
        ? node.textContent
        : node.textContent.replaceAll(/\s+/g, ' ')
    if (!text.trim()) {
      return null
    }
    return {
      kind: 'text',
      name: text.slice(0, 60),
      ...bounds(rect, parentRect),
      opacity: 1,
      text:
        style.textTransform === 'uppercase'
          ? text.toUpperCase()
          : style.textTransform === 'lowercase'
            ? text.toLowerCase()
            : text,
      ...typography(style),
      ...(figma && {
        multiline: rect.height > (number(style.lineHeight) || number(style.fontSize) * 1.5) * 1.4,
      }),
    }
  }

  let nodeCount = 0
  function walk(element, origin) {
    const style = getComputedStyle(element)
    let rect = element.getBoundingClientRect()
    if (
      style.display === 'none' ||
      style.visibility !== 'visible' ||
      number(style.opacity) === 0 ||
      ['SCRIPT', 'STYLE', 'LINK'].includes(element.tagName) ||
      element.classList.contains('sb-sr-only') ||
      (figma && element.hasAttribute('data-figma-ignore')) ||
      (style.clip === 'rect(0px, 0px, 0px, 0px)' && rect.width <= 1)
    ) {
      return null
    }
    // Portals and display:contents wrappers can have no box of their own.
    if (!rect.width || !rect.height) {
      const visibleRects = [...element.querySelectorAll('*')]
        .filter((child) => getComputedStyle(child).visibility === 'visible')
        .map((child) => child.getBoundingClientRect())
        .filter((childRect) => childRect.width > 0 && childRect.height > 0)
      if (!visibleRects.length) {
        return null
      }
      const x = Math.min(...visibleRects.map((childRect) => childRect.x)),
        y = Math.min(...visibleRects.map((childRect) => childRect.y))
      rect = {
        height: Math.max(...visibleRects.map((childRect) => childRect.bottom)) - y,
        width: Math.max(...visibleRects.map((childRect) => childRect.right)) - x,
        x,
        y,
      }
    }
    if (++nodeCount > 15_000) {
      throw new Error('Story exceeds the 15,000-layer safety limit')
    }
    const layer = {
      kind: 'frame',
      name:
        element.getAttribute('data-slot') ||
        element.getAttribute('aria-label') ||
        element.tagName.toLowerCase(),
      ...bounds(rect, origin),
      opacity: number(style.opacity),
      fill: color(style.backgroundColor),
      radii: [
        style.borderTopLeftRadius,
        style.borderTopRightRadius,
        style.borderBottomRightRadius,
        style.borderBottomLeftRadius,
      ].map((value) =>
        value.endsWith('%')
          ? (number(value) / 100) * Math.min(rect.width, rect.height)
          : number(value),
      ),
      clips: ['hidden', 'clip', 'scroll', 'auto'].includes(style.overflow),
      children: [],
    }
    if (figma) {
      const annotations = {}
      for (const attribute of element.attributes) {
        if (attribute.name.startsWith('data-figma-')) {
          annotations[
            attribute.name.slice(11).replaceAll(/-(\w)/g, (_, letter) => letter.toUpperCase())
          ] = attribute.value
        }
      }
      if (Object.keys(annotations).length) {
        layer.figma = annotations
      }
      layer.css = {
        alignItems: style.alignItems,
        alignSelf: style.alignSelf,
        columnGap: number(style.columnGap),
        direction: style.flexDirection,
        display: style.display,
        fixedWidth: Boolean(element.style.width),
        grow: number(style.flexGrow),
        justifyContent: style.justifyContent,
        padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map(
          number,
        ),
        position: style.position,
        rowGap: number(style.rowGap),
        wrap: style.flexWrap,
      }
      const rotate = style.rotate === 'none' ? 0 : number(style.rotate),
        matrix = /^matrix\(([^,]+),\s*([^,]+)/.exec(style.transform),
        rotation =
          rotate + (matrix ? (Math.atan2(number(matrix[2]), number(matrix[1])) * 180) / Math.PI : 0)
      if (Math.abs(rotation) > 0.5) {
        layer.rotation = rotation
      }
    }
    const borderWidths = [
      style.borderTopWidth,
      style.borderRightWidth,
      style.borderBottomWidth,
      style.borderLeftWidth,
    ].map(number)
    if (borderWidths.some((width) => width > 0)) {
      const borderColors = [
        style.borderTopColor,
        style.borderRightColor,
        style.borderBottomColor,
        style.borderLeftColor,
      ]
      layer.stroke = color(borderColors[borderWidths.findIndex((width) => width > 0)])
      layer.strokeWidth = Math.max(...borderWidths)
      layer.strokeWidths = borderWidths
      if (new Set(borderColors.filter((_, index) => borderWidths[index] > 0)).size > 1) {
        warnings.add('Multi-colored CSS borders use the first visible edge color.')
      }
    }
    // Focus and hover rings are CSS outlines; they become outside strokes on the component.
    if (
      figma &&
      !layer.stroke &&
      style.outlineStyle !== 'none' &&
      number(style.outlineWidth) > 0 &&
      color(style.outlineColor)?.a > 0.01
    ) {
      layer.stroke = color(style.outlineColor)
      layer.strokeWidth = number(style.outlineWidth)
      layer.strokeAlign = 'OUTSIDE'
    }
    if (style.boxShadow !== 'none') {
      layer.shadows = []
      for (const shadow of style.boxShadow.split(/,(?![^()]*\))/)) {
        const colorMatch = /(?:rgba?|color|oklch|oklab|lab|lch)\([^)]*\)/.exec(shadow)
        if (!colorMatch) {
          warnings.add(`Unsupported CSS shadow: ${shadow}`)
          continue
        }
        const [x = 0, y = 0, blur = 0, spread = 0] = [
          ...shadow.replace(colorMatch[0], '').matchAll(/-?[\d.]+px/g),
        ].map(([value]) => number(value))
        layer.shadows.push({
          blur,
          color: color(colorMatch[0]),
          inset: shadow.includes('inset'),
          spread,
          x,
          y,
        })
      }
    }
    if (style.backgroundImage.includes('gradient(') && !style.backgroundImage.includes('url(')) {
      layer.backgroundGradient = {
        image: style.backgroundImage,
        position: style.backgroundPosition,
        repeat: style.backgroundRepeat,
        size: style.backgroundSize,
      }
      warnings.add('CSS gradients are embedded as bitmap fills, not editable gradient stops.')
    } else if (style.backgroundImage !== 'none') {
      warnings.add('CSS URL background images are not exported.')
    }
    for (const pseudo of ['::before', '::after']) {
      const { content } = getComputedStyle(element, pseudo)
      if (content && !['none', 'normal', '""', "''"].includes(content)) {
        warnings.add('Generated CSS pseudo-element content is not exported.')
      }
    }
    if (element instanceof SVGSVGElement) {
      const clone = element.cloneNode(true),
        // Inline computed SVG paint: Figma cannot resolve the page's CSS variables/currentColor.
        originals = [element, ...element.querySelectorAll('*')],
        copies = [clone, ...clone.querySelectorAll('*')]
      originals.forEach((original, index) => {
        const computed = getComputedStyle(original)
        for (const property of [
          'fill',
          'stroke',
          'stroke-width',
          'fill-opacity',
          'stroke-opacity',
          'stop-color',
          'stop-opacity',
          'opacity',
          'font-family',
          'font-size',
          'font-weight',
        ]) {
          let value = computed.getPropertyValue(property)
          if (
            ['fill', 'stroke', 'stop-color'].includes(property) &&
            value !== 'none' &&
            !value.startsWith('url(')
          ) {
            const resolved = color(value)
            value = `rgba(${Math.round(resolved.r * 255)},${Math.round(resolved.g * 255)},${Math.round(resolved.b * 255)},${resolved.a})`
          }
          copies[index].style.setProperty(property, value)
        }
      })
      clone.style.opacity = '1'
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.setAttribute('width', String(rect.width))
      clone.setAttribute('height', String(rect.height))
      layer.kind = 'svg'
      layer.svg = new XMLSerializer().serializeToString(clone)
      if (figma) {
        layer.color = color(style.color)
        let hash = 5381
        const shape = `${element.getAttribute('viewBox')}|${[...element.querySelectorAll('path')]
          .map((path) => path.getAttribute('d'))
          .join('|')}`
        for (let index = 0; index < shape.length; index++) {
          hash = (hash * 33 + shape.charCodeAt(index)) % 2_147_483_647
        }
        layer.svgKey = String(hash)
      }
      delete layer.children
      return layer
    }
    if (element instanceof HTMLCanvasElement || element instanceof HTMLImageElement) {
      if (element.closest('.gm-style')) {
        warnings.add('Google Maps imagery is omitted; map containers and controls remain editable.')
        layer.name = 'Map imagery (not exported)'
        return layer
      }
      if (element instanceof HTMLCanvasElement) {
        warnings.add('Canvas content is embedded as a bitmap, not editable vector layers.')
      }
      layer.kind = 'image'
      element.setAttribute('data-cartyx-export-image', String(nodeCount))
      layer.imageKey = String(nodeCount)
      return layer
    }
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
      const value = element.value || element.placeholder
      if (value) {
        const textStyle = element.value ? style : getComputedStyle(element, '::placeholder')
        layer.children.push({
          kind: 'text',
          name: 'Value',
          x: number(style.paddingLeft),
          y: Math.max(number(style.paddingTop), (rect.height - number(style.lineHeight)) / 2),
          width: Math.max(1, rect.width - number(style.paddingLeft) - number(style.paddingRight)),
          height: number(style.lineHeight) || rect.height,
          opacity: element.value ? 1 : number(textStyle.opacity || '1'),
          stretch: true,
          text: value,
          ...typography(style),
          fill: color(textStyle.color),
          ...(figma &&
            layer.figma?.text && {
              figma: { text: layer.figma.text },
              placeholder: !element.value,
            }),
        })
      }
      return layer
    }
    for (const child of element.childNodes) {
      const childLayer =
        child.nodeType === Node.TEXT_NODE
          ? textLayer(child, rect, style)
          : child instanceof Element
            ? walk(child, rect)
            : null
      if (childLayer) {
        layer.children.push(childLayer)
      }
    }
    // Text properties bind to the element's first direct text node.
    if (layer.figma?.text) {
      const textChild = layer.children.find((child) => child.kind === 'text')
      if (textChild) {
        textChild.figma = { text: layer.figma.text }
      }
    }
    // Only straightforward flex layouts map safely to Figma Auto Layout.
    if (
      ['flex', 'inline-flex'].includes(style.display) &&
      style.flexWrap === 'nowrap' &&
      ['row', 'column'].includes(style.flexDirection) &&
      [...element.children].every(
        (child) => !['absolute', 'fixed'].includes(getComputedStyle(child).position),
      ) &&
      layer.children.length > 0
    ) {
      const alignments = {
        center: 'CENTER',
        end: 'MAX',
        'flex-end': 'MAX',
        'flex-start': 'MIN',
        start: 'MIN',
      }
      layer.layout = {
        align: alignments[style.alignItems] || 'MIN',
        direction: style.flexDirection === 'row' ? 'HORIZONTAL' : 'VERTICAL',
        gap: number(style.flexDirection === 'row' ? style.columnGap : style.rowGap),
        justify:
          style.justifyContent === 'space-between'
            ? 'SPACE_BETWEEN'
            : alignments[style.justifyContent] || 'MIN',
        padding: [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].map(
          number,
        ),
      }
    }
    return layer
  }

  if (targets) {
    const parts = [],
      underlays = adopt ? [...document.querySelectorAll(adopt)] : []
    for (const element of document.querySelectorAll(targets)) {
      const rect = element.getBoundingClientRect(),
        part = walk(element, rect)
      // Some libraries draw a target's background as a separate positioned sibling (for example
      // The Base UI tabs indicator). Adopt it as the first, absolutely positioned child.
      for (const underlay of underlays) {
        const box = underlay.getBoundingClientRect(),
          // Underline indicators sit just outside the target, so match horizontally and allow a
          // Small vertical gap.
          overlap = Math.max(0, Math.min(box.right, rect.right) - Math.max(box.left, rect.left)),
          gap = Math.max(0, box.top - rect.bottom, rect.top - box.bottom)
        if (!part || !box.width || overlap < box.width * 0.5 || gap > 8) {
          continue
        }
        const layer = walk(underlay, rect)
        if (!layer) {
          continue
        }
        layer.name = 'Indicator'
        layer.absolute = true
        layer.underlay = true
        part.children = [layer, ...(part.children || [])]
      }
      if (part) {
        parts.push({
          key:
            element.getAttribute('data-figma-target') ??
            element.getAttribute('data-figma-icon-def'),
          layer: part,
        })
      }
    }
    return { parts, theme, warnings: [...warnings] }
  }
  const rootRect = root.getBoundingClientRect(),
    layer = walk(root, rootRect)
  if (!layer) {
    throw new Error('Story rendered no visible content')
  }
  // Portals (dialogs, menus, tooltips) live outside Storybook's root.
  for (const child of document.body.children) {
    if (child === root || child.contains(root) || child.tagName === 'SCRIPT') {
      continue
    }
    if (child.id.startsWith('storybook-') || child.classList.contains('sb-preparing-story')) {
      continue
    }
    const portal = walk(child, rootRect)
    if (portal) {
      layer.children.push(portal)
    }
  }
  if (!layer.children?.length && layer.kind === 'frame') {
    throw new Error('Story root is empty; check required providers or configuration')
  }
  if (selector === '#storybook-root' && layer.children?.length) {
    const left = Math.min(0, ...layer.children.map((child) => child.x)),
      top = Math.min(0, ...layer.children.map((child) => child.y)),
      right = Math.max(layer.width, ...layer.children.map((child) => child.x + child.width)),
      bottom = Math.max(layer.height, ...layer.children.map((child) => child.y + child.height))
    if (left !== 0 || top !== 0 || right !== layer.width || bottom !== layer.height) {
      for (const child of layer.children) {
        child.x -= left
        child.y -= top
      }
      layer.width = right - left
      layer.height = bottom - top
      delete layer.layout
    }
  }
  const probe = document.createElement('span')
  probe.style.cssText = 'position:fixed;visibility:hidden;pointer-events:none'
  document.body.append(probe)
  const tokens = []
  for (const name of tokenNames) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    if (!value) {
      continue
    }
    if (name.startsWith('--color-')) {
      probe.style.color = `var(${name})`
      tokens.push({
        name: name.slice(2).replaceAll('-', '/'),
        type: 'COLOR',
        value: color(getComputedStyle(probe).color),
      })
    } else if (/^--(spacing|radius|text)-/.test(name)) {
      probe.style.width = `var(${name})`
      tokens.push({
        name: name.slice(2).replaceAll('-', '/'),
        type: 'FLOAT',
        value: number(getComputedStyle(probe).width),
      })
    } else if (name.startsWith('--font-')) {
      tokens.push({
        name: name.slice(2).replaceAll('-', '/'),
        type: 'STRING',
        value: value.split(',')[0].replaceAll(/['"]/g, '').trim(),
      })
    }
  }
  probe.remove()
  return { layer, theme, tokens, warnings: [...warnings] }
}
