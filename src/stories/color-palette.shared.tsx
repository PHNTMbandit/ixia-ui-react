import { useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

import {
  formatLc,
  formatRatio,
  measure,
  targetLabel,
  toHex,
  verdict,
} from './color-palette.contrast'
import type { Computed, Pair } from './color-palette.contrast'

type Brand = 'maculata' | 'mabel' | 'viridiflora' | 'hogarth' | 'venus' | 'monadelpha'

const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const,
  FAMILIES = [
    'neutral',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'pink',
    'rose',
  ] as const,
  ROLES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  ROLE_SUFFIXES = [
    'default',
    'muted',
    'subtle',
    'on-default',
    'container',
    'container-high',
    'on-container',
    'on-container-muted',
    'border',
    'border-strong',
    'shadow',
  ] as const,
  SURFACE_TOKENS = [
    'surface-background',
    'surface',
    'surface-2',
    'surface-3',
    'surface-low',
    'on-surface',
    'on-surface-variant',
    'on-surface-muted',
    'on-surface-disabled',
    'border',
    'border-strong',
    'surface-inverse',
    'on-surface-inverse',
    'surface-focus-ring',
    'scrim',
    'shadow',
    'shadow-strong',
  ] as const,
  GRADIENT_TOKENS = ['brand-gradient', 'brand-gradient-subtle'] as const,
  THEMES = ['light', 'dark'] as const,
  PAIRS: Pair[] = [
    ...ROLES.flatMap((role): Pair[] => [
      {
        bg: `${role}-default`,
        fg: `${role}-on-default`,
        kind: 'text',
        target: 60,
        usage: 'Filled button / badge label',
      },
      {
        bg: `${role}-muted`,
        fg: `${role}-on-default`,
        kind: 'text',
        target: 60,
        usage: 'Filled button label (hover)',
      },
      {
        bg: 'surface',
        fg: `${role}-default`,
        kind: 'text',
        target: 60,
        usage: 'Coloured UI text, icons, links',
      },
      {
        bg: 'surface',
        fg: `${role}-muted`,
        kind: 'text',
        target: 60,
        usage: 'Coloured secondary text',
      },
      {
        bg: `${role}-container`,
        fg: `${role}-on-container`,
        kind: 'text',
        target: 75,
        usage: 'Alert / callout body',
      },
      {
        bg: `${role}-container-high`,
        fg: `${role}-on-container`,
        kind: 'text',
        target: 75,
        usage: 'Selected container',
      },
      {
        bg: `${role}-subtle`,
        fg: `${role}-on-container`,
        kind: 'text',
        target: 75,
        usage: 'Outline button hover',
      },
      {
        bg: `${role}-container`,
        fg: `${role}-on-container-muted`,
        kind: 'text',
        target: 60,
        usage: 'Alert description',
      },
      {
        bg: 'surface',
        fg: `${role}-border-strong`,
        kind: 'non-text',
        target: 30,
        usage: 'Control boundary',
      },
      {
        bg: `${role}-container`,
        fg: `${role}-border`,
        kind: 'decorative',
        target: 15,
        usage: 'Alert outline',
      },
      {
        bg: 'surface',
        fg: `${role}-border-strong`,
        kind: 'text',
        target: 75,
        usage: 'Do not use: body text',
      },
    ]),
    ...['surface-background', 'surface', 'surface-2', 'surface-3'].flatMap((bg): Pair[] => [
      { bg, fg: 'on-surface', kind: 'text', target: 75, usage: 'Body text (Lc 90 preferred)' },
      { bg, fg: 'on-surface-variant', kind: 'text', target: 75, usage: 'Secondary body text' },
      { bg, fg: 'on-surface-muted', kind: 'text', target: 60, usage: 'Placeholder, captions' },
      { bg, fg: 'on-surface-disabled', kind: 'disabled', target: 0, usage: 'Disabled text' },
      { bg, fg: 'border', kind: 'decorative', target: 15, usage: 'Dividers, card outlines' },
      { bg, fg: 'border-strong', kind: 'non-text', target: 30, usage: 'Input boundary' },
    ]),
    {
      bg: 'surface-inverse',
      fg: 'on-surface-inverse',
      kind: 'text',
      target: 75,
      usage: 'Tooltip / snackbar',
    },
    {
      bg: 'surface',
      fg: 'surface-focus-ring',
      kind: 'non-text',
      target: 30,
      usage: 'Focus indicator',
    },
  ],
  token = (name: string) => `var(--ixia-${name})`,
  grid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))`,
  },
  // Rendering intentionally includes failing pairs (rows marked "No") to document what not to do.
  matrixParameters = {
    a11y: { config: { rules: [{ enabled: false, id: 'color-contrast' }] } },
  }

function useComputed<Host extends HTMLElement>() {
  const ref = useRef<Host>(null),
    [style, setStyle] = useState<Computed | undefined>(undefined)
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const computed = getComputedStyle(ref.current)
    setStyle({ background: computed.backgroundColor, color: computed.color })
  }, [])
  return [ref, style] as const
}

function ThemeFrame({
  theme,
  brand,
  children,
}: {
  theme: (typeof THEMES)[number]
  brand: Brand
  children: ReactNode
}) {
  return (
    <section
      data-theme={theme}
      data-brand={brand}
      className="flex flex-col gap-md rounded-xl p-md"
      style={{ background: token('surface-background'), color: token('on-surface') }}
    >
      <h2 className="style-text-strong-1 capitalize">{theme} theme</h2>
      {children}
    </section>
  )
}

function PrimitiveSwatch({ family, step }: { family: string; step: string }) {
  const [ref, computed] = useComputed<HTMLDivElement>()
  return (
    <div className="flex min-w-0 flex-col gap-3xs">
      <div
        ref={ref}
        className="h-xl rounded-md"
        style={{ background: `var(--${family}-${step})`, border: `1px solid ${token('border')}` }}
      />
      <span className="style-text-default--2">{step}</span>
      <code className="style-text-default--2" style={{ color: token('on-surface-variant') }}>
        {toHex(computed?.background)}
      </code>
    </div>
  )
}

function SemanticRow({ name }: { name: string }) {
  const [ref, computed] = useComputed<HTMLDivElement>()
  return (
    <div className="flex items-center gap-xs">
      <div
        ref={ref}
        className="size-lg shrink-0 rounded-md"
        style={{ background: token(name), border: `1px solid ${token('border')}` }}
      />
      <div className="flex min-w-0 flex-col">
        <code className="style-text-default--1">--ixia-{name}</code>
        <code className="style-text-default--2" style={{ color: token('on-surface-variant') }}>
          {toHex(computed?.background)}
        </code>
      </div>
    </div>
  )
}

function RolePreview({ role }: { role: string }) {
  return (
    <div className="flex flex-wrap items-center gap-xs">
      <span
        className="rounded-md px-sm py-2xs style-text-strong--1"
        style={{ background: token(`${role}-default`), color: token(`${role}-on-default`) }}
      >
        Filled
      </span>
      <span
        className="rounded-md px-sm py-2xs style-text-strong--1"
        style={{ background: token(`${role}-muted`), color: token(`${role}-on-default`) }}
      >
        Hover
      </span>
      <span
        className="rounded-md px-sm py-2xs style-text-strong--1"
        style={{ border: `1px solid ${token(`${role}-border`)}`, color: token(`${role}-default`) }}
      >
        Outline
      </span>
      <span
        className="rounded-md px-sm py-2xs style-text-default--1"
        style={{
          background: token(`${role}-container`),
          border: `1px solid ${token(`${role}-border`)}`,
          color: token(`${role}-on-container`),
        }}
      >
        Container <span style={{ color: token(`${role}-on-container-muted`) }}>muted</span>
      </span>
    </div>
  )
}

function MatrixSample({ pair }: { pair: Pair }) {
  if (pair.kind === 'text' || pair.kind === 'disabled') {
    return 'Aa Ixia'
  }
  return (
    <span
      aria-hidden
      className="block h-sm w-xl rounded-sm"
      style={{ border: `2px solid ${token(pair.fg)}` }}
    />
  )
}

function MatrixRow({ pair }: { pair: Pair }) {
  const [ref, computed] = useComputed<HTMLTableCellElement>(),
    { lc, ratio } = measure(computed),
    result = verdict(pair, lc, ratio)
  return (
    <tr style={{ borderTop: `1px solid ${token('border')}` }}>
      <td
        ref={ref}
        className="px-xs py-2xs style-text-default-0"
        style={{ background: token(pair.bg), color: token(pair.fg) }}
      >
        <MatrixSample pair={pair} />
      </td>
      <td className="px-xs py-2xs">
        <code className="style-text-default--2">{pair.fg}</code>
      </td>
      <td className="px-xs py-2xs">
        <code className="style-text-default--2">{pair.bg}</code>
      </td>
      <td className="px-xs py-2xs text-right tabular-nums">{formatLc(lc)}</td>
      <td className="px-xs py-2xs text-right tabular-nums">{formatRatio(ratio)}</td>
      <td className="px-xs py-2xs">{targetLabel(pair)}</td>
      <td className="px-xs py-2xs">{pair.usage}</td>
      <td className="px-xs py-2xs style-text-strong--1" style={{ color: token(result.tone) }}>
        {result.label}
      </td>
    </tr>
  )
}

function PrimitivesView() {
  return (
    <div className="flex flex-col gap-sm">
      {FAMILIES.map((family) => (
        <div key={family} className="flex flex-col gap-2xs">
          <h3 className="style-text-strong-0 capitalize">{family}</h3>
          <div className="gap-xs" style={grid}>
            {STEPS.map((step) => (
              <PrimitiveSwatch key={step} family={family} step={step} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function SemanticTokensView({ brand }: { brand: Brand }) {
  return (
    <div className="grid gap-md lg:grid-cols-2">
      {THEMES.map((theme) => (
        <ThemeFrame key={theme} theme={theme} brand={brand}>
          {ROLES.map((role) => (
            <div key={role} className="flex flex-col gap-xs">
              <h3 className="style-text-strong-0 capitalize">{role}</h3>
              <RolePreview role={role} />
              <div className="grid grid-cols-2 gap-xs">
                {ROLE_SUFFIXES.map((suffix) => (
                  <SemanticRow key={suffix} name={`${role}-${suffix}`} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-xs">
            <h3 className="style-text-strong-0">Surfaces</h3>
            <div className="grid grid-cols-2 gap-xs">
              {SURFACE_TOKENS.map((name) => (
                <SemanticRow key={name} name={name} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <h3 className="style-text-strong-0">Gradients</h3>
            {GRADIENT_TOKENS.map((name) => (
              <div key={name} className="flex flex-col gap-3xs">
                <div className="h-xl rounded-md" style={{ background: token(name) }} />
                <code className="style-text-default--1">--ixia-{name}</code>
              </div>
            ))}
          </div>
        </ThemeFrame>
      ))}
    </div>
  )
}

function AccessibilityMatrixView({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col gap-md">
      {THEMES.map((theme) => (
        <ThemeFrame key={theme} theme={theme} brand={brand}>
          <table className="w-full border-collapse style-text-default--1">
            <thead>
              <tr className="text-left">
                <th className="px-xs py-2xs">Sample</th>
                <th className="px-xs py-2xs">Foreground</th>
                <th className="px-xs py-2xs">Background</th>
                <th className="px-xs py-2xs text-right">APCA Lc</th>
                <th className="px-xs py-2xs text-right">WCAG</th>
                <th className="px-xs py-2xs">Target</th>
                <th className="px-xs py-2xs">Usage</th>
                <th className="px-xs py-2xs">Recommended</th>
              </tr>
            </thead>
            <tbody>
              {PAIRS.map((pair) => (
                <MatrixRow key={`${pair.fg}/${pair.bg}/${pair.usage}`} pair={pair} />
              ))}
            </tbody>
          </table>
        </ThemeFrame>
      ))}
    </div>
  )
}

export { AccessibilityMatrixView, matrixParameters, PrimitivesView, SemanticTokensView }
