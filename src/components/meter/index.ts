import { Meter as MeterRoot } from './meter'
import { MeterFooter } from './meter-footer'
import { MeterHeader } from './meter-header'
import { MeterIndicator } from './meter-indicator'
import { MeterLabel } from './meter-label'
import { MeterSubtitle } from './meter-subtitle'
import { MeterTrack } from './meter-track'
import { MeterValue } from './meter-value'

const Meter = Object.assign(MeterRoot, {
  Footer: MeterFooter,
  Header: MeterHeader,
  Indicator: MeterIndicator,
  Label: MeterLabel,
  Subtitle: MeterSubtitle,
  Track: MeterTrack,
  Value: MeterValue,
})

export type {
  MeterHeaderProps,
  MeterIndicatorProps,
  MeterLabelProps,
  MeterProps,
  MeterTrackProps,
  MeterValueProps,
  MeterFooterProps,
  MeterSubtitleProps,
} from './meter.types'
export { MeterHeader } from './meter-header'
export { MeterIndicator } from './meter-indicator'
export { MeterLabel } from './meter-label'
export { MeterTrack } from './meter-track'
export { MeterValue } from './meter-value'
export { MeterFooter } from './meter-footer'
export { MeterSubtitle } from './meter-subtitle'
export { Meter }
