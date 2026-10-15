import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'

import type { MenuGroupLabelProps } from './menu.types'

export function MenuGroupLabel({ className, ref, ...props }: MenuGroupLabelProps) {
  return (
    <BaseMenu.GroupLabel
      className={cn(
        'cursor-default px-2xs py-3xs style-text-default--2 text-on-surface-variant select-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
