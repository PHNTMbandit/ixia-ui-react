export interface Color {
  r: number
  g: number
  b: number
  a: number
}
export type Theme = 'light' | 'dark'
export interface Token {
  name: string
  type: 'COLOR' | 'FLOAT' | 'STRING'
  values: Partial<Record<Theme, Color | number | string>>
}
export interface Layer {
  kind: 'frame' | 'text' | 'svg' | 'image'
  name: string
  x: number
  y: number
  width: number
  height: number
  opacity: number
  fill?: Color
  stroke?: Color
  strokeWidth?: number
  strokeWidths?: number[]
  shadows?: { color: Color; x: number; y: number; blur: number; spread: number; inset: boolean }[]
  radii?: number[]
  clips?: boolean
  text?: string
  fontFamily?: string
  fontWeight?: number
  fontStyle?: string
  fontSize?: number
  lineHeight?: number
  letterSpacing?: number
  textAlign?: string
  decoration?: string
  svg?: string
  image?: string
  backgroundBitmap?: string
  children?: Layer[]
  layout?: {
    direction: 'HORIZONTAL' | 'VERTICAL'
    gap: number
    padding: number[]
    align: 'MIN' | 'CENTER' | 'MAX'
    justify: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'
  }
  // Composable component data (tools/figma/parts.mjs).
  figma?: Record<string, string>
  multiline?: boolean
  placeholder?: boolean
  rotation?: number
  color?: Color
  svgKey?: string
  fillToken?: TokenRef
  strokeToken?: TokenRef
  colorToken?: TokenRef
  synthetic?: boolean
  absolute?: boolean
  underlay?: boolean
  strokeAlign?: 'INSIDE' | 'OUTSIDE'
  auto?: {
    mode: 'HORIZONTAL' | 'VERTICAL' | 'NONE'
    gap?: number
    padding?: number[]
    align?: 'MIN' | 'CENTER' | 'MAX'
    justify?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN'
  }
  sizing?: { h: Sizing; v: Sizing }
}
export type Sizing = 'FIXED' | 'HUG' | 'FILL'
export interface TokenRef {
  name: string
  opacity?: number
}
export interface SlotSpec {
  description: string
  preferred?: string[]
  only?: boolean
  min?: number
  max?: number
}
export interface PartComponent {
  component: string
  // Generated from a Storybook Playground story rather than a hand-written fixture.
  auto?: boolean
  // Sub-components of a compound family (Item, Link…) that an auto part flattens into one
  // Component; they need a fixture before designers can compose them.
  flattened?: string[]
  group: string
  order: number
  description: string
  usage?: string
  properties: Record<string, string>
  slots: Record<string, SlotSpec>
  interactions: {
    from: Record<string, string>
    trigger: 'ON_HOVER' | 'ON_PRESS' | 'ON_CLICK'
    to: Record<string, string>
  }[]
  axes: Record<string, string[]>
  defaults: Record<string, string>
  variants: { props: Record<string, string>; layer: Layer }[]
}
export interface Parts {
  icons: { name: string; svgKey?: string; layer: Layer }[]
  components: PartComponent[]
}
// A Storybook story captured once, with colors bound to tokens so it follows the variable mode.
export interface Sample {
  id: string
  family: string
  name: string
  state: 'Default' | 'Open'
  layer: Layer
}
export type Docs = Record<string, { description: string; examples: Record<string, string> }>
// Figma variables generated from src/styles/input.css by tools/figma/tokens.mjs.
// References use "Collection::Variable name".
export type VariableValue = Color | number | string | { alias: string }
export interface VariableSpec {
  name: string
  type: 'COLOR' | 'FLOAT' | 'STRING'
  scopes: VariableScope[]
  values: Record<string, VariableValue>
  description?: string
  codeSyntax?: string
  hidden?: boolean
}
export interface CollectionSpec {
  name: string
  modes: string[]
  variables: VariableSpec[]
}
export interface TextStyleSpec {
  name: string
  description: string
  family: string
  weight: number
  style: string
  // Font size at the 1440px capture viewport (the fluid maximum).
  size: number
  // Percent line height; omitted means auto ("normal" in CSS).
  lineHeight?: number
  refs: { fontFamily: string; fontStyle: string; fontSize: string }
}
export interface Variables {
  collections: CollectionSpec[]
  // Internal token names (color/brand/default) to variable references.
  tokens: Record<string, string>
  // The collection whose modes switch light and dark.
  theme: { collection: string; modes: Record<Theme, string> }
  textStyles: TextStyleSpec[]
}
export interface Library {
  version: 3
  generatedAt: string
  viewport: { width: number; height: number }
  tokens: Token[]
  samples: Sample[]
  warnings: string[]
  failures: { id: string; theme?: Theme; error: string }[]
  docs?: Docs
  parts?: Parts
  variables?: Variables
}
