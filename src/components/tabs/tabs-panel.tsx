import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import type { TabsPanelProps } from './tabs.types'

export function TabsPanel({ className, ...props }: TabsPanelProps) {
  return (
    <SwitchTabs.Panel
      className={cn('relative flex grow items-center justify-start overflow-auto p-3xs', className)}
      {...props}
    />
  )
}
