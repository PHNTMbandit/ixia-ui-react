import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { cn } from '@/utils/cn'

import type { DialogDescriptionProps } from './dialog.types'

export function DialogDescription({ className, ref, ...props }: DialogDescriptionProps) {
  return (
    <BaseDialog.Description
      data-slot="dialog-description"
      className={cn('style-text-prose-0 text-on-surface-variant', className)}
      ref={ref}
      {...props}
    />
  )
}
