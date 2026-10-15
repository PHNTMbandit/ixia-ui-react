import { Drawer as BaseDrawer } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { DrawerDescriptionProps } from './drawer.types'

export function DrawerDescription({ className, ref, ...props }: DrawerDescriptionProps) {
  return (
    <BaseDrawer.Description
      className={cn('style-text-prose-0 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
