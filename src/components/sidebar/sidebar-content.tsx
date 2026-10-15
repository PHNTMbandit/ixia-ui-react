import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area'

import { cn } from '@/utils/cn'

import { useSidebar } from './sidebar-provider'
import type { SidebarContentProps } from './sidebar.types'

export function SidebarContent({ className, children, ref, ...props }: SidebarContentProps) {
  const { open } = useSidebar()

  return (
    <BaseScrollArea.Root
      className={cn(
        'min-h-0 flex-1 overflow-hidden rounded-xl transition-all duration-300 ease-in-out',
        !open && 'w-fit self-center',
        className,
      )}
      ref={ref}
      {...props}
    >
      <BaseScrollArea.Viewport
        className={cn(
          'flex h-full scrollbar-none flex-col items-center divide-y divide-border overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden',
          'before:pointer-events-none before:absolute before:top-0 before:left-0 before:block before:h-[min(40px,var(--scroll-area-overflow-y-start))] before:w-full before:bg-linear-to-b before:from-shadow/35 before:to-transparent before:transition-[height] before:duration-100 before:ease-out before:content-[""] before:[--scroll-area-overflow-y-start:inherit]',
          'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:block after:h-[min(40px,var(--scroll-area-overflow-y-end,40px))] after:w-full after:bg-linear-to-t after:from-shadow/35 after:to-transparent after:transition-[height] after:duration-100 after:ease-out after:content-[""] after:[--scroll-area-overflow-y-end:inherit]',
          open && 'gap-md',
          !open && 'gap-xs px-3xs pt-3xs',
        )}
      >
        {children}
      </BaseScrollArea.Viewport>
    </BaseScrollArea.Root>
  )
}
