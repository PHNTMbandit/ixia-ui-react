import type { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import type { Button } from '../button'

type CollapsibleProps = React.ComponentProps<typeof BaseCollapsible.Root>
type CollapsibleTriggerProps = React.ComponentProps<typeof Button>
type CollapsiblePanelProps = React.ComponentProps<typeof BaseCollapsible.Panel>

export type { CollapsibleProps, CollapsibleTriggerProps, CollapsiblePanelProps }
