import { Drawer as BaseDrawer } from '@base-ui/react'

import type { DrawerProps } from './drawer.types'

export function Drawer({ ...props }: DrawerProps) {
  return <BaseDrawer.Root {...props} />
}
