import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarMenuButtonProps } from './sidebar.types'

export function SidebarMenuButton({ isActive, className, ref, ...props }: SidebarMenuButtonProps) {
  const { open, collapsible } = useSidebar(),
    showText = collapsible === 'none' || open

  return (
    <button
      type="button"
      data-active={String(Boolean(isActive))}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2xs rounded-full border border-transparent style-text-default-0 whitespace-nowrap transition-all duration-200 ease-out select-none active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&>svg]:shrink-0',
        isActive && 'pointer-events-none bg-surface text-on-surface shadow-2xs',
        !isActive &&
          'text-neutral-default hover:bg-neutral-container hover:text-neutral-on-container',
        isActive && !open && 'bg-neutral-container',
        !showText && 'mx-auto',
        !open && 'size-xl justify-center *:hidden [&>svg]:block',
        open && 'h-xl w-full pl-sm',
        collapsible !== 'none' && open && 'animate-in fade-in-0 slide-in-from-left-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
