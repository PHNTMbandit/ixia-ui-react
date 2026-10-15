import { Drawer as BaseDrawer } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { DrawerContentProps } from './drawer.types'

export function DrawerContent({ className, ref, ...props }: DrawerContentProps) {
  return (
    <BaseDrawer.Content
      className={cn('mx-auto w-full max-w-[32rem] space-y-3xs', className)}
      ref={ref}
      {...props}
    />
  )
}
