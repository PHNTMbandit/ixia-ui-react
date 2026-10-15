import { Drawer as BaseDrawer } from '@base-ui/react'

import type { DrawerProviderProps } from './drawer.types'

export function DrawerProvider({ children, ...props }: DrawerProviderProps) {
  return (
    <BaseDrawer.Provider {...props}>
      <BaseDrawer.IndentBackground />
      <BaseDrawer.Indent>{children}</BaseDrawer.Indent>
    </BaseDrawer.Provider>
  )
}
