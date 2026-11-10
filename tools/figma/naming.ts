// Display names for Figma: code identifiers stay in the generated data, and are only turned
// Into designer-facing names when nodes and properties are created.

const words = (value: string) =>
  value
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/[-_]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

// `leadingIcon` → `Leading icon`, `showLeadingIcon` → `Show leading icon`, `inSurface` → `In surface`.
export function sentence(value: string) {
  const list = words(value)
  if (!list.length) {
    return value
  }
  return list
    .map((word, index) => {
      if (/^\d*[A-Z]{2,}$/.test(word)) {
        return word
      }
      const lower = word.toLowerCase()
      return index === 0 ? lower.charAt(0).toUpperCase() + lower.slice(1) : lower
    })
    .join(' ')
}

// `chevronDown` → `Chevron Down`, `3d` → `3D`.
export function titleCase(value: string) {
  return words(value)
    .map((word) =>
      /^\d+[a-z]$/i.test(word) ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ')
}

export const propName = sentence,
  valueName = sentence,
  iconName = (name: string) => `Icon / ${titleCase(name)}`

// `Accordion/Item` → `Accordion Item`, `Button/Icon only` → `Icon Button`,
// `Tabs/Tab` → `Tab`, `Map/Google Map` → `Google Map`.
export function componentName(component: string) {
  const [parent, ...rest] = component.split('/'),
    child = rest.join(' ')
  if (!child) {
    return parent
  }
  if (child.toLowerCase() === 'icon only') {
    return `Icon ${parent}`
  }
  const singular = parent.replace(/s$/, '')
  if (child.includes(parent) || child === singular) {
    return child
  }
  return `${parent} ${child}`
}

// Loose key for matching nodes created by earlier versions (`tone=brand` vs `Tone=Brand`).
export const looseKey = (value: string) => value.toLowerCase().replace(/[\s_-]+/g, '')
