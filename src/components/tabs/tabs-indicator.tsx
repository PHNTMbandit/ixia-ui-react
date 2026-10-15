import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import type { TabsIndicatorProps } from './tabs.types'

export function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  return (
    <SwitchTabs.Indicator
      className={cn(
        'absolute left-[0px] z-[-1] h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-1/2 transition-all duration-300',
        className,
      )}
      {...props}
    />
  )
}
