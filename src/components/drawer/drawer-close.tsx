import { Drawer as BaseDrawer } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { DrawerCloseProps } from './drawer.types'

export function DrawerClose({ className, ref, ...props }: DrawerCloseProps) {
  return <BaseDrawer.Close className={cn('shrink-0', className)} ref={ref} {...props} />
}
