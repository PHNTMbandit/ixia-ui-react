import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import '@/styles/themes/hogarth.css'
import '@/styles/themes/mabel.css'
import '@/styles/themes/maculata.css'
import '@/styles/themes/monadelpha.css'
import '@/styles/themes/venus.css'
import '@/styles/themes/viridiflora.css'

import { Button } from '@/components/button'

import { formatLc, formatRatio, measure } from './color-palette.contrast'
import { matrixParameters, ROLES, ThemeFrame, token, useComputed } from './color-palette.shared'
import type { Brand } from './color-palette.shared'

const PROFILES = [
    { family: 'body', name: 'Small text', size: 14, weight: 400, target: 90 },
    { family: 'body', name: 'Body', size: 18, weight: 400, target: 75 },
    { family: 'heading', name: 'Bold UI label', size: 16, weight: 700, target: 60 },
    { family: 'heading', name: 'Heading', size: 24, weight: 700, target: 45 },
  ] as const,
  CONTAINERS = ['container-low', 'container', 'container-high'] as const,
  SURFACES = ['surface-background', 'surface', 'surface-2', 'surface-3', 'surface-low'] as const,
  BRANDS: Brand[] = ['maculata', 'mabel', 'viridiflora', 'hogarth', 'venus', 'monadelpha'],
  BRAND_FAMILIES: Record<Brand, { brand: string; accent: string }> = {
    maculata: { brand: 'orange', accent: 'teal' },
    mabel: { brand: 'rose', accent: 'teal' },
    viridiflora: { brand: 'teal', accent: 'orange' },
    hogarth: { brand: 'yellow', accent: 'rose' },
    venus: { brand: 'pink', accent: 'emerald' },
    monadelpha: { brand: 'indigo', accent: 'teal' },
  },
  STATUS_FAMILIES = { error: 'red', info: 'blue', success: 'green', warning: 'amber' }

function expectedContainer(
  family: string,
  level: (typeof CONTAINERS)[number],
  mode: 'light' | 'dark',
) {
  if (level === 'container-low') {
    return `var(--${family}-${mode === 'light' ? '50' : '950'})`
  }
  if (level === 'container') {
    return `var(--${family}-${mode === 'light' ? '100' : '900'})`
  }
  return `var(--${family}-${mode === 'light' ? '200' : '800'})`
}

function checkContainerColors(
  scope: HTMLElement,
  brand: Brand,
  mode: 'light' | 'dark',
  checkRendered: boolean,
) {
  const swatch = scope.ownerDocument.createElement('span'),
    families = { ...STATUS_FAMILIES, ...BRAND_FAMILIES[brand] },
    lowColors = new Set<string>(),
    highColors = new Set<string>()
  scope.append(swatch)
  try {
    for (const [role, family] of Object.entries(families)) {
      const colors = CONTAINERS.map((level) => {
        swatch.style.backgroundColor = `var(--color-${role}-${level})`
        const actual = getComputedStyle(swatch).backgroundColor
        swatch.style.backgroundColor = expectedContainer(family, level, mode)
        expect(actual, `${brand}/${mode}/${role}/${level}`).toBe(
          getComputedStyle(swatch).backgroundColor,
        )
        if (checkRendered) {
          const sample = scope.querySelector<HTMLElement>(
            `[data-palette-role="${role}"] [data-palette-level="${level}"]`,
          )
          if (!sample) {
            throw new Error(`Missing ${brand}/${mode}/${role}/${level} specimen`)
          }
          expect(getComputedStyle(sample).backgroundColor).toBe(actual)
        }
        return actual
      })
      const contrasts = colors.map(
        (background) => measure({ background, color: 'rgb(0, 0, 0)' }).ratio,
      )
      if (mode === 'light') {
        expect(contrasts[0]).toBeGreaterThan(contrasts[1])
        expect(contrasts[1]).toBeGreaterThan(contrasts[2])
      } else {
        expect(contrasts[0]).toBeLessThan(contrasts[1])
        expect(contrasts[1]).toBeLessThan(contrasts[2])
      }
      lowColors.add(colors[0])
      highColors.add(colors[2])
    }
    expect(lowColors.size).toBe(Object.keys(families).length)
    expect(highColors.size).toBe(Object.keys(families).length)
  } finally {
    swatch.remove()
  }
}

function TextSample({
  foreground,
  background,
  profile,
  required,
}: {
  foreground: string
  background: string
  profile: (typeof PROFILES)[number]
  required: boolean
}) {
  const [ref, computed] = useComputed<HTMLParagraphElement>(),
    { lc, ratio } = measure(computed),
    ratioTarget = profile.size >= 24 ? 3 : 4.5,
    supported = Math.abs(lc) >= profile.target && ratio >= ratioTarget
  return (
    <div className="flex flex-col gap-3xs">
      <p
        ref={ref}
        data-contrast-sample="text"
        data-required={required}
        data-target={profile.target}
        data-ratio-target={ratioTarget}
        data-font-size={profile.size}
        data-font-weight={profile.weight}
        style={{
          background: token(background),
          color: token(foreground),
          fontFamily: `var(--font-${profile.family})`,
          fontSize: profile.size,
          fontWeight: profile.weight,
          lineHeight: 1.5,
        }}
      >
        {profile.name}: The quick brown fox
      </p>
      <span className="rounded-sm bg-surface p-2xs style-text-default--1 text-on-surface">
        {foreground} / {profile.size}px {profile.weight} / {profile.family}
        {' · '}
        {computed
          ? `${formatLc(lc)} Lc (needs ${profile.target}), ${formatRatio(ratio)} · ${supported ? 'Supported' : 'Unsupported at this size/weight'}`
          : 'Measuring contrast'}
      </span>
    </div>
  )
}

function BorderSample({
  foreground,
  strong,
  required = false,
}: {
  foreground: string
  strong: boolean
  required?: boolean
}) {
  const [ref, computed] = useComputed<HTMLDivElement>(),
    { lc, ratio } = measure(computed),
    target = strong ? 30 : 15,
    supported = Math.abs(lc) >= target && (!strong || ratio >= 3)
  return (
    <div className="flex flex-col gap-2xs rounded-lg bg-surface p-sm text-on-surface">
      <div
        ref={ref}
        data-contrast-sample="border"
        data-required={required}
        data-target={target}
        data-ratio-target={strong ? 3 : 1}
        className="h-lg rounded-md border-2"
        style={{
          background: token('surface'),
          borderColor: token(foreground),
          color: token(foreground),
        }}
      />
      <span className="style-text-default--1">
        {foreground}: {formatLc(lc)} Lc / {formatRatio(ratio)}
        {' · '}
        {supported ? 'Supported' : 'Decorative only; not a control boundary'}
      </span>
    </div>
  )
}

function Specimens({ brand }: { brand: Brand }) {
  return (
    <div className="flex flex-col gap-lg">
      <h1 className="style-text-strong-3">Theme contrast specimens</h1>
      <p className="style-text-prose-0">
        APCA screening by text size and weight, plus WCAG AA. Supported pairs are regression-tested.
        Unsupported examples are intentional: use a stronger foreground or larger, heavier text.
        Disabled text and decorative borders are not essential content. Font rendering still needs
        visual review; APCA is not a WCAG conformance claim.
      </p>
      {(['light', 'dark'] as const).map((mode) => (
        <ThemeFrame key={`${brand}-${mode}`} brand={brand} theme={mode}>
          <div className="grid gap-md xl:grid-cols-2">
            {ROLES.map((role) => (
              <article key={role} data-palette-role={role} className="flex min-w-0 flex-col gap-md">
                <h3 className="style-text-strong-2 capitalize">{role}</h3>
                <div className="flex flex-wrap gap-xs">
                  {(['fill', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
                    <Button key={variant} tone={role} variant={variant}>
                      {variant}
                    </Button>
                  ))}
                </div>
                {['default', 'muted', ...CONTAINERS].map((suffix) => {
                  const filled = suffix === 'default' || suffix === 'muted',
                    background = `${role}-${suffix}`,
                    foregrounds = filled
                      ? [`${role}-on-default`]
                      : [`${role}-on-container`, `${role}-on-container-muted`]
                  return (
                    <div
                      key={suffix}
                      data-palette-level={suffix}
                      className="flex flex-col gap-sm rounded-xl border p-md"
                      style={{
                        background: token(background),
                        borderColor: token(`${role}-border`),
                      }}
                    >
                      <h4
                        className="style-text-strong-1"
                        style={{
                          color: token(foregrounds[0]),
                          fontSize: 18,
                          fontWeight: 700,
                        }}
                      >
                        {background}
                      </h4>
                      {foregrounds.map((foreground) =>
                        PROFILES.map((profile) => (
                          <TextSample
                            key={`${foreground}-${profile.name}`}
                            background={background}
                            foreground={foreground}
                            profile={profile}
                            required={
                              profile.target <= (filled || foreground.endsWith('-muted') ? 60 : 75)
                            }
                          />
                        )),
                      )}
                    </div>
                  )
                })}
                <BorderSample foreground={`${role}-border`} strong={false} />
                <BorderSample foreground={`${role}-border-strong`} strong required />
              </article>
            ))}
          </div>
          <h3 className="style-text-strong-2">Global boundaries and inverse surface</h3>
          <div className="grid gap-md xl:grid-cols-2">
            <BorderSample foreground="border" strong={false} />
            <BorderSample foreground="border-strong" strong />
            <BorderSample foreground="surface-focus-ring" strong required />
            <div
              className="flex flex-col gap-sm rounded-xl p-md"
              style={{ background: token('surface-inverse') }}
            >
              {PROFILES.map((profile) => (
                <TextSample
                  key={profile.name}
                  background="surface-inverse"
                  foreground="on-surface-inverse"
                  profile={profile}
                  required={profile.target <= 75}
                />
              ))}
            </div>
          </div>
          <h3 className="style-text-strong-2">Surface text hierarchy</h3>
          <div className="grid gap-md xl:grid-cols-2">
            {SURFACES.map((background) => (
              <div
                key={background}
                className="flex flex-col gap-sm rounded-xl p-md"
                style={{ background: token(background) }}
              >
                <h4 style={{ color: token('on-surface'), fontSize: 18, fontWeight: 700 }}>
                  {background}
                </h4>
                {['on-surface', 'on-surface-variant', 'on-surface-muted'].map((foreground) =>
                  PROFILES.map((profile) => (
                    <TextSample
                      key={`${foreground}-${profile.name}`}
                      background={background}
                      foreground={foreground}
                      profile={profile}
                      required={foreground === 'on-surface' && profile.target <= 75}
                    />
                  )),
                )}
              </div>
            ))}
          </div>
        </ThemeFrame>
      ))}
    </div>
  )
}

export default {
  title: 'Color Palette/Contrast Specimens',
  args: { brand: 'maculata' },
  argTypes: { brand: { control: 'select', options: BRANDS } },
  parameters: { ...matrixParameters, layout: 'padded' },
  render: ({ brand }) => <Specimens brand={brand} />,
  play: async ({ canvasElement, args: { brand } }) => {
    const samples = canvasElement.querySelectorAll<HTMLElement>('[data-required="true"]')
    expect(samples.length).toBeGreaterThan(300)
    for (const sample of samples) {
      const style = getComputedStyle(sample),
        { lc, ratio } = measure({ background: style.backgroundColor, color: style.color })
      if (sample.dataset.contrastSample === 'text') {
        expect(style.fontSize).toBe(`${sample.dataset.fontSize}px`)
        expect(style.fontWeight).toBe(sample.dataset.fontWeight)
      }
      expect(Math.abs(lc), sample.outerHTML).toBeGreaterThanOrEqual(Number(sample.dataset.target))
      expect(ratio, sample.outerHTML).toBeGreaterThanOrEqual(Number(sample.dataset.ratioTarget))
    }
    for (const mode of ['light', 'dark'] as const) {
      const scope = canvasElement.querySelector<HTMLElement>(
        `[data-brand="${brand}"][data-theme="${mode}"]`,
      )
      if (!scope) {
        throw new Error(`Missing ${brand}/${mode} theme scope`)
      }
      checkContainerColors(scope, brand, mode, true)
      if (brand === 'maculata') {
        const unscoped = canvasElement.ownerDocument.createElement('div')
        unscoped.dataset.theme = mode
        canvasElement.append(unscoped)
        try {
          checkContainerColors(unscoped, brand, mode, false)
        } finally {
          unscoped.remove()
        }
      }
    }
  },
} satisfies Meta<{ brand: Brand }>

type Story = StoryObj<{ brand: Brand }>

export const Maculata: Story = {}
export const Mabel: Story = { args: { brand: 'mabel' } }
export const Viridiflora: Story = { args: { brand: 'viridiflora' } }
export const Hogarth: Story = { args: { brand: 'hogarth' } }
export const Venus: Story = { args: { brand: 'venus' } }
export const Monadelpha: Story = { args: { brand: 'monadelpha' } }
