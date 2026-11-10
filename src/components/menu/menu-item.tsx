import { Menu as BaseMenu } from '@base-ui/react/menu'

import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import { menuItemVariants } from './menu.types'
import type { MenuItemProps } from './menu.types'

export function MenuItem({ tone, className, children, ref, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(menuItemVariants({ tone }), className)}
      nativeButton
      ref={ref}
      render={(renderProps) => (
        <button type="button" {...renderProps} className={cn('w-full', renderProps.className)}>
          {trimTextChildren(children)}
        </button>
      )}
      {...props}
    />
  )
}
