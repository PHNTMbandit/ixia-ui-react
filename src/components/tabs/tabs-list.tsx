import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import type { TabsListProps } from './tabs.types'

export function TabsList({ className, ...props }: TabsListProps) {
  return <SwitchTabs.List className={cn('relative z-0 flex', className)} {...props} />
}
