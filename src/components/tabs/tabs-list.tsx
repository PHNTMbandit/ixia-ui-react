import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import { TabsIndicator } from './tabs-indicator'
import type { TabsListProps } from './tabs.types'

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <SwitchTabs.List className={cn('relative z-0 flex', className)} {...props}>
      {children}
      <TabsIndicator />
    </SwitchTabs.List>
  )
}
