import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import type { TabsTabProps } from './tabs.types'

export function TabsTab({ className, ...props }: TabsTabProps) {
  return (
    <SwitchTabs.Tab
      className={cn(
        'inline-flex items-center justify-center gap-xs text-center break-keep whitespace-nowrap text-on-surface transition-colors duration-300 outline-none select-none hover:cursor-pointer focus-visible:relative focus-visible:before:absolute focus-visible:before:outline',
        className,
      )}
      {...props}
    />
  )
}
