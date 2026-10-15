import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useSidebar } from './sidebar-provider'
import type { SidebarToggleProps } from './sidebar.types'

function renderToggleChildren(children: SidebarToggleProps['children'], open?: boolean) {
  if (typeof children === 'function') {
    return children(open)
  }
  return children
}

export function SidebarToggle({ className, children, ref, ...props }: SidebarToggleProps) {
  const { trigger, open, collapsible } = useSidebar(),
    handleClick = (event: React.MouseEvent) => {
      event.stopPropagation()
      if (trigger) {
        trigger()
      }
    }

  if (!trigger || collapsible === 'none') {
    return undefined
  }

  return (
    <Button
      aria-label="Toggle sidebar"
      className={cn('shrink-0 border-none', className)}
      ref={ref}
      size="iconMedium"
      variant="ghost"
      onClick={handleClick}
      {...props}
    >
      {renderToggleChildren(children, open)}
    </Button>
  )
}
