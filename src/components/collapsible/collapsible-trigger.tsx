import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { CaretRightIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { CollapsibleTriggerProps } from './collapsible.types'

export function CollapsibleTrigger({
  className,
  children,
  ref,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <BaseCollapsible.Trigger
      render={(renderProps) => (
        <Button
          {...renderProps}
          tone="neutral"
          variant="elevated"
          className={cn('group/trigger', className)}
          ref={ref}
          {...props}
        >
          {children}
          <CaretRightIcon
            weight="bold"
            className="ml-auto transition-all ease-out group-data-panel-open/trigger:rotate-90"
          />
        </Button>
      )}
    />
  )
}
