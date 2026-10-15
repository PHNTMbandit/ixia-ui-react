import { CaretRightIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { CollapsibleTrigger } from '../collapsible'
import { PopoverTrigger } from '../popover'
import { useSidebar } from './sidebar-provider'
import type { SidebarMenuCollapsibleTriggerProps } from './sidebar.types'

export function SidebarMenuCollapsibleTrigger({
  className,
  children,
  ref,
  style: _style,
  ...props
}: SidebarMenuCollapsibleTriggerProps) {
  const { open, collapsible } = useSidebar(),
    showText = collapsible === 'none' || open

  if (!open) {
    return (
      <PopoverTrigger>
        <button
          type="button"
          className={cn(
            'flex size-xl items-center justify-center rounded-full shadow-none! transition-colors *:hidden hover:cursor-pointer hover:bg-neutral-container hover:text-neutral-on-container data-popup-open:bg-neutral-container [&>svg]:block',
          )}
        >
          {children}
          <CaretRightIcon
            weight="bold"
            className="absolute right-2xs size-xs text-on-surface-variant"
          />
        </button>
      </PopoverTrigger>
    )
  }

  return (
    <CollapsibleTrigger
      variant="ghost"
      className={cn(
        'inline-flex! w-full! animate-in! justify-start! overflow-hidden! text-left! whitespace-nowrap! fade-in-0! slide-in-from-left-2! [&>svg]:size-sm! [&>svg]:flex-none [&>svg]:shrink-0',
        !showText && 'mx-auto',
        !open && 'size-xl *:hidden [&>svg]:block',
        open && 'h-xl pl-sm',
        collapsible !== 'none' && open && 'animate-in slide-in-from-left-2',
        className,
      )}
      ref={ref}
      style={{ justifyContent: 'flex-start' }}
      {...props}
    >
      <span className="flex shrink-0 items-center gap-2xs [&>svg]:size-sm">{children}</span>
    </CollapsibleTrigger>
  )
}
