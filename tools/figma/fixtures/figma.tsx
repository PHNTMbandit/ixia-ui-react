import type { ReactNode } from 'react'

// Shared helpers for Figma fixture stories. The exporter stores the variant combinations to
// Render in sessionStorage ('ixia-figma') and reads the data-figma-* annotations below to build
// Component properties: text, booleans, instance swaps, slots and nested component instances.

export type Combo = Record<string, string>

export interface SlotSpec {
  description: string
  preferred?: string[]
  only?: boolean
  min?: number
  max?: number
}

export interface FigmaSpec {
  component: string
  group: string
  order: number
  description: string
  cva?: { file: string; name: string; axes?: string[] }
  axes?: Record<string, string[]>
  states?: string[]
  defaults?: Combo
  interactive?: Record<string, 'hover' | 'press' | 'focus'>
  interactions?: { from: Combo; trigger: 'ON_HOVER' | 'ON_PRESS' | 'ON_CLICK'; to: Combo }[]
  slots?: Record<string, SlotSpec>
  // Adds data-figma-* attributes (and inline styles, e.g. a fixed width) to rendered elements.
  annotate?: { selector: string; attrs?: Record<string, string>; style?: Record<string, string> }[]
  adopt?: string
  properties?: Record<string, string>
  usage?: string
  icons?: boolean
}

export const combos = (): Combo[] => {
  const stored = sessionStorage.getItem('ixia-figma')
  return stored ? (JSON.parse(stored) as Combo[]) : [{}]
}

export const target = (index: number) => ({ 'data-figma-target': String(index) })

export const text = (name: string) => ({ 'data-figma-text': name })

export const show = (name: string, visible = true) => ({ 'data-figma-show': `${name}=${visible}` })

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

// Every icon is a visibility toggle plus an instance swap restricted to the Icon components.
export const swap = (name: string, visible = true) => ({
  'data-figma-show': `show${capitalize(name)}=${visible}`,
  'data-figma-swap': name,
})

export const slot = (name: string) => ({ 'data-figma-slot': name })

export const part = (component: string, variant: Combo) => ({
  'data-figma-part': component,
  'data-figma-variant': JSON.stringify(variant),
})

export const flag = (value: string | undefined) => value === 'true'

export function Matrix({ render }: { render: (combo: Combo, index: number) => ReactNode }) {
  return (
    <div
      style={{
        alignItems: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        padding: 32,
      }}
    >
      {combos().map((combo, index) => (
        <div key={index}>{render(combo, index)}</div>
      ))}
    </div>
  )
}
