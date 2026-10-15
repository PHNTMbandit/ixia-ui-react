import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'

import type { MenuGroupProps } from './menu.types'

export function MenuGroup({ className, ref, ...props }: MenuGroupProps) {
  return <BaseMenu.Group className={cn('', className)} ref={ref} {...props} />
}
