import { Progress as ProgressRoot } from './progress'
import { ProgressBar } from './progress-bar'
import { ProgressDescription } from './progress-description'
import { ProgressIndicator } from './progress-indicator'
import { ProgressLabel } from './progress-label'
import { ProgressTitle } from './progress-title'

const Progress = Object.assign(ProgressRoot, {
  Bar: ProgressBar,
  Description: ProgressDescription,
  Indicator: ProgressIndicator,
  Label: ProgressLabel,
  Title: ProgressTitle,
})

export type {
  ProgressBarProps,
  ProgressDescriptionProps,
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressProps,
  ProgressTitleProps,
} from './progress.types'
export { ProgressBar } from './progress-bar'
export { ProgressDescription } from './progress-description'
export { ProgressIndicator } from './progress-indicator'
export { ProgressLabel } from './progress-label'
export { ProgressTitle } from './progress-title'
export { Progress }
