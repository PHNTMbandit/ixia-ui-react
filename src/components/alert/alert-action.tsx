import { cn } from '@/utils/cn'

import type { AlertActionProps } from './alert.types'

export function AlertAction({ className, ref, ...props }: AlertActionProps) {
  return (
    <div
      data-slot="alert-action"
      className={cn('col-[-2/-1] row-span-2 row-start-1 ml-md self-start', className)}
      ref={ref}
      {...props}
    />
  )
}
