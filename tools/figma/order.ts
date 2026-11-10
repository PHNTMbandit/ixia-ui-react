import type { Layer, PartComponent } from './schema'

export function orderParts(parts: PartComponent[]): PartComponent[] {
  const byName = new Map(parts.map((part) => [part.component, part])),
    active = new Set<string>(),
    complete = new Set<string>(),
    result: PartComponent[] = []
  if (byName.size !== parts.length) {
    throw new Error('Duplicate Figma component names')
  }
  const visit = (part: PartComponent, trail: string[] = []) => {
    if (complete.has(part.component)) {
      return
    }
    if (active.has(part.component)) {
      throw new Error(`Cyclic Figma components: ${[...trail, part.component].join(' -> ')}`)
    }
    active.add(part.component)
    const dependencies = new Set<string>(),
      properties = new Map<string, string>(),
      register = (code: string, kind: string) => {
        const previous = properties.get(code)
        if (previous && previous !== kind) {
          throw new Error(
            `${part.component}: property "${code}" is both ${previous} and ${kind}. Use distinct property names.`,
          )
        }
        properties.set(code, kind)
      },
      walk = (layer: Layer, owned = true) => {
        const annotations = layer.figma || {}
        if (annotations.part) {
          dependencies.add(annotations.part)
        }
        if (owned) {
          if (annotations.show) {
            register(annotations.show.split('=')[0], 'BOOLEAN')
          }
          if (annotations.swap) {
            register(annotations.swap, 'INSTANCE_SWAP')
          }
          if (!annotations.part) {
            if (annotations.text && layer.kind === 'text') {
              register(annotations.text, 'TEXT')
            }
            if (annotations.slot && layer.kind === 'frame') {
              register(annotations.slot, 'SLOT')
            }
          }
        }
        for (const child of layer.children || []) {
          walk(child, owned && !annotations.part)
        }
      }
    for (const variant of part.variants) {
      walk(variant.layer)
    }
    for (const slot of Object.values(part.slots)) {
      for (const preferred of slot.preferred || []) {
        // Preferred values may include the owner, but its default content cannot contain itself.
        if (preferred !== 'Icon' && preferred !== part.component) {
          dependencies.add(preferred)
        }
      }
    }
    for (const name of dependencies) {
      const dependency = byName.get(name)
      if (!dependency) {
        throw new Error(`${part.component} requires missing Figma component ${name}`)
      }
      visit(dependency, [...trail, part.component])
    }
    active.delete(part.component)
    complete.add(part.component)
    result.push(part)
  }
  for (const part of [...parts].sort((a, b) => a.order - b.order)) {
    visit(part)
  }
  return result
}
