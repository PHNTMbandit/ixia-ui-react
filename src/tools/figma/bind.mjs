const close = (a, b) =>
  Math.abs(a.r - b.r) < 0.012 && Math.abs(a.g - b.g) < 0.012 && Math.abs(a.b - b.b) < 0.012

// Finds the semantic token whose light *and* dark values reproduce a captured color pair, so the
// Figma paint can be bound to a variable and follow the Light/Dark mode switch. Alpha-scaled
// Utilities such as bg-brand/10 match with a paint opacity.
export function tokenMatcher(tokens) {
  const colors = tokens.filter(
    (token) => token.type === 'COLOR' && token.values.light && token.values.dark,
  )
  return function match(light, dark, hint) {
    if (!light || !dark || light.a < 0.01) {
      return undefined
    }
    let best
    for (const token of colors) {
      const { light: lightValue, dark: darkValue } = token.values
      if (!close(lightValue, light) || !close(darkValue, dark)) {
        continue
      }
      if (lightValue.a < 0.01 || darkValue.a < 0.01) {
        continue
      }
      const lightScale = light.a / lightValue.a,
        darkScale = dark.a / darkValue.a
      if (Math.abs(lightScale - darkScale) > 0.03 || lightScale > 1.02) {
        continue
      }
      const score =
        (Math.abs(lightScale - 1) < 0.02 ? 4 : 0) +
        (hint && token.name.split('/').includes(hint) ? 2 : 0) -
        token.name.split('/').length * 0.01
      if (!best || score > best.score) {
        best = { name: token.name, opacity: lightScale, score }
      }
    }
    if (!best) {
      return undefined
    }
    return Math.abs(best.opacity - 1) > 0.02
      ? { name: best.name, opacity: Math.round(best.opacity * 1000) / 1000 }
      : { name: best.name }
  }
}

// Walks the light and dark captures of the same element in parallel and records token names.
export function bindTokens(light, dark, match, hint) {
  if (!light || !dark || light.kind !== dark.kind) {
    return 0
  }
  let unbound = 0
  for (const [key, tokenKey] of [
    ['fill', 'fillToken'],
    ['stroke', 'strokeToken'],
    ['color', 'colorToken'],
  ]) {
    if (!light[key] || light[key].a < 0.01) {
      continue
    }
    const token = match(light[key], dark[key], hint)
    if (token) {
      light[tokenKey] = token
    } else {
      unbound++
    }
  }
  const lightChildren = light.children || [],
    darkChildren = dark.children || []
  if (lightChildren.length === darkChildren.length) {
    lightChildren.forEach((child, index) => {
      unbound += bindTokens(child, darkChildren[index], match, hint)
    })
  }
  return unbound
}
