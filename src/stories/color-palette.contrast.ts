// oxlint-disable eslint/no-magic-numbers
// APCA-W3 0.0.98G-4g and WCAG 2.x are defined by these constants.

type Rgb = [number, number, number]
type Kind = 'text' | 'non-text' | 'decorative' | 'disabled'

interface Pair {
  fg: string
  bg: string
  target: number
  kind: Kind
  usage: string
}

interface Computed {
  background: string
  color: string
}

interface Verdict {
  label: string
  tone: 'success-default' | 'error-default'
}

const APCA_BLACK_THRESHOLD = 0.022,
  // APCA specifies 1.414 (a tuned exponent, not √2); written as a fraction to avoid the approx-constant lint.
  APCA_BLACK_CLAMP = 1414 / 1000,
  APCA_DARK_BACKGROUND_EXPONENT = 0.62,
  APCA_DARK_TEXT_EXPONENT = 0.65,
  APCA_LIGHT_BACKGROUND_EXPONENT = 0.57,
  APCA_LIGHT_TEXT_EXPONENT = 0.56,
  APCA_LOW_CLAMP = 0.1,
  APCA_MIN_DELTA = 0.0005,
  APCA_OFFSET = 0.027,
  APCA_POLARITY_THRESHOLD = -0.1,
  APCA_SCALE = 100,
  APCA_SLOPE = 1.14,
  CHANNEL_SEPARATOR = /[\s,/]+/,
  GAMMA = 2.4,
  HEX_PAD = 2,
  HEX_RADIX = 16,
  NON_TEXT_MIN_RATIO = 3,
  NO_CONTRAST = 0,
  PREFERRED_LC = 90,
  RGB_CHANNELS = /rgba?\((?<channels>[^)]+)\)/,
  RGB_MAX = 255,
  SRGB_LINEAR_CUTOFF = 0.04045

function parseRgb(value: string): Rgb | undefined {
  const channels = RGB_CHANNELS.exec(value)?.groups?.channels?.split(CHANNEL_SEPARATOR).map(Number)
  return channels && [channels[0], channels[1], channels[2]]
}

function toHex(value?: string) {
  if (!value) {
    return ''
  }
  const rgb = parseRgb(value)
  if (!rgb) {
    return value
  }
  return `#${rgb.map((channel) => Math.round(channel).toString(HEX_RADIX).padStart(HEX_PAD, '0')).join('')}`
}

function apcaLuminance([red, green, blue]: Rgb) {
  return (
    0.2126729 * (red / RGB_MAX) ** GAMMA +
    0.7151522 * (green / RGB_MAX) ** GAMMA +
    0.072175 * (blue / RGB_MAX) ** GAMMA
  )
}

function apcaClamp(luminance: number) {
  if (luminance > APCA_BLACK_THRESHOLD) {
    return luminance
  }
  return luminance + (APCA_BLACK_THRESHOLD - luminance) ** APCA_BLACK_CLAMP
}

function darkTextOnLight(backgroundLuminance: number, textLuminance: number) {
  const contrast =
    (backgroundLuminance ** APCA_LIGHT_TEXT_EXPONENT -
      textLuminance ** APCA_LIGHT_BACKGROUND_EXPONENT) *
    APCA_SLOPE
  if (contrast < APCA_LOW_CLAMP) {
    return NO_CONTRAST
  }
  return (contrast - APCA_OFFSET) * APCA_SCALE
}

function lightTextOnDark(backgroundLuminance: number, textLuminance: number) {
  const contrast =
    (backgroundLuminance ** APCA_DARK_TEXT_EXPONENT -
      textLuminance ** APCA_DARK_BACKGROUND_EXPONENT) *
    APCA_SLOPE
  if (contrast > APCA_POLARITY_THRESHOLD) {
    return NO_CONTRAST
  }
  return (contrast + APCA_OFFSET) * APCA_SCALE
}

function apca(fg: Rgb, bg: Rgb) {
  const textLuminance = apcaClamp(apcaLuminance(fg)),
    backgroundLuminance = apcaClamp(apcaLuminance(bg))
  if (Math.abs(backgroundLuminance - textLuminance) < APCA_MIN_DELTA) {
    return NO_CONTRAST
  }
  if (backgroundLuminance > textLuminance) {
    return darkTextOnLight(backgroundLuminance, textLuminance)
  }
  return lightTextOnDark(backgroundLuminance, textLuminance)
}

function linearize(channel: number) {
  const normalized = channel / RGB_MAX
  if (normalized <= SRGB_LINEAR_CUTOFF) {
    return normalized / 12.92
  }
  return ((normalized + 0.055) / 1.055) ** GAMMA
}

function relativeLuminance(rgb: Rgb) {
  const [red, green, blue] = rgb.map(linearize)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function wcag(foreground: Rgb, background: Rgb) {
  const [hi, lo] = [relativeLuminance(foreground), relativeLuminance(background)].toSorted(
    (first, second) => second - first,
  )
  return (hi + 0.05) / (lo + 0.05)
}

function measure(computed?: Computed) {
  const fg = computed && parseRgb(computed.color),
    bg = computed && parseRgb(computed.background)
  if (!fg || !bg) {
    return { lc: NO_CONTRAST, ratio: NO_CONTRAST }
  }
  return { lc: apca(fg, bg), ratio: wcag(fg, bg) }
}

function pass(label: string): Verdict {
  return { label, tone: 'success-default' }
}

function fail(label: string): Verdict {
  return { label, tone: 'error-default' }
}

function verdict(pair: Pair, lc: number, ratio: number) {
  const abs = Math.abs(lc)
  if (pair.kind === 'disabled') {
    return pass('Exempt: never for essential text')
  }
  if (pair.kind === 'non-text') {
    if (abs >= pair.target && ratio >= NON_TEXT_MIN_RATIO) {
      return pass('Yes (non-text)')
    }
    return fail('No')
  }
  if (pair.kind === 'decorative') {
    if (abs >= pair.target) {
      return pass('Yes (decorative only)')
    }
    return fail('No: use border-strong')
  }
  if (abs < pair.target) {
    return fail('No: not for text')
  }
  if (abs >= PREFERRED_LC) {
    return pass('Yes (preferred)')
  }
  return pass('Yes')
}

function targetLabel(pair: Pair) {
  if (pair.kind === 'disabled') {
    return '—'
  }
  if (pair.kind === 'non-text') {
    return `Lc ${pair.target} + 3:1`
  }
  return `Lc ${pair.target}`
}

function formatLc(lc: number) {
  return lc.toFixed(1)
}

function formatRatio(ratio: number) {
  return `${ratio.toFixed(2)}:1`
}

export { formatLc, formatRatio, measure, targetLabel, toHex, verdict, type Computed, type Pair }
