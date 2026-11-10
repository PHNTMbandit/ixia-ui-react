import { cn } from '@/utils/cn'

import type { DialogIconProps } from './dialog.types'

export function DialogIcon({ className, ref, ...props }: DialogIconProps) {
  return (
    <div
      data-slot="dialog-icon"
      className={cn('row-span-2 self-start [&>svg]:shrink-0 [:where(&)>svg]:size-xl', className)}
      ref={ref}
      {...props}
    />
  )
}
