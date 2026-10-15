import { Menu as BaseMenu } from '@base-ui/react/menu'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import { cn } from '@/utils/cn'

import type { MenuTriggerProps } from './menu.types'

export function MenuTrigger({ className, children, ref, ...props }: MenuTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return (
    <BaseMenu.Trigger
      className={cn('data-popup-open:pointer-events-none', className)}
      ref={ref}
      render={render}
      {...props}
    />
  )
}
