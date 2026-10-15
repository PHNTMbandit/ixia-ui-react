import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'

import type { MenuRadioGroupProps } from './menu.types'

export function MenuRadioGroup({ className, ref, ...props }: MenuRadioGroupProps) {
  return <BaseMenu.RadioGroup className={cn('', className)} ref={ref} {...props} />
}
