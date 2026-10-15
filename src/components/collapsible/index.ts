import { Collapsible as CollapsibleRoot } from './collapsible'
import { CollapsiblePanel } from './collapsible-panel'
import { CollapsibleTrigger } from './collapsible-trigger'

const Collapsible = Object.assign(CollapsibleRoot, {
  Panel: CollapsiblePanel,
  Trigger: CollapsibleTrigger,
})

export type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsiblePanelProps,
} from './collapsible.types'
export { CollapsiblePanel } from './collapsible-panel'
export { CollapsibleTrigger } from './collapsible-trigger'

export { Collapsible }
