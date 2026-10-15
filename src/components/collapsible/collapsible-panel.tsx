import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'

import { cn } from '@/utils/cn'

import type { CollapsiblePanelProps } from './collapsible.types'

export function CollapsiblePanel({ className, ref, ...props }: CollapsiblePanelProps) {
  return (
    <BaseCollapsible.Panel
      className={cn(
        'mb-3xs ml-md flex h-(--collapsible-panel-height) flex-col justify-end gap-3xs overflow-hidden border-l border-border-strong pl-sm transition-all duration-150 ease-out data-ending-style:h-0 data-starting-style:h-0 [&[hidden]:not([hidden="until-found"])]:hidden',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
