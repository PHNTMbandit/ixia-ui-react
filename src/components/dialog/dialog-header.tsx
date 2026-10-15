import { cn } from '@/utils/cn'

import type { DialogHeaderProps } from './dialog.types'

export function DialogHeader({ className, ref, ...props }: DialogHeaderProps) {
  return (
    <div
      className={cn(
        'grid auto-rows-min items-center gap-x-sm has-data-[slot=dialog-description]:grid-rows-[auto_auto] has-data-[slot=dialog-icon]:grid-cols-[auto_1fr] has-data-[slot=dialog-description]:**:data-[slot=dialog-icon]:row-span-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
