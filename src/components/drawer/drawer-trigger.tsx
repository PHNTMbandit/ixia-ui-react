import { Drawer as BaseDrawer } from '@base-ui/react'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import { cn } from '@/utils/cn'

import type { DrawerTriggerProps } from './drawer.types'

export function DrawerTrigger({ className, children, ref, ...props }: DrawerTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return <BaseDrawer.Trigger className={cn('', className)} ref={ref} {...props} render={render} />
}
