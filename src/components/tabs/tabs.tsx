import { Tabs as SwitchTabs } from '@base-ui/react/tabs'

import { cn } from '@/utils/cn'

import type { TabsProps } from '.'
import { tabsVariants } from './tabs.types'

export function Tabs({ variant, size, tone, fill, className, ref, ...props }: TabsProps) {
  return (
    <SwitchTabs.Root
      className={cn(tabsVariants({ fill, size, tone, variant }), className)}
      ref={ref}
      {...props}
    />
  )
}
