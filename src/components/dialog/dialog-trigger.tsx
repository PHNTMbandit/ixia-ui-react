import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { isValidElement } from 'react'
import type { ReactElement } from 'react'

import { cn } from '@/utils/cn'

import type { DialogTriggerProps } from './dialog.types'

export function DialogTrigger({ className, children, ref, ...props }: DialogTriggerProps) {
  let render: ReactElement | undefined = undefined
  if (isValidElement(children)) {
    render = children
  }

  return <BaseDialog.Trigger className={cn('', className)} ref={ref} {...props} render={render} />
}
