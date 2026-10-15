import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { NavigationMenuContentProps } from './navigation-menu.types'

export function NavigationMenuContent({ className, ref, ...props }: NavigationMenuContentProps) {
  return (
    <BaseNavigationMenu.Content
      className={cn(
        'h-full w-[calc(100vw-40px)] rounded-xl bg-surface p-2xs transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] min-[500px]:w-max min-[500px]:max-w-[400px]',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
