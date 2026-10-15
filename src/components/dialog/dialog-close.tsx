import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { XIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import type { DialogCloseProps } from './dialog.types'

export function DialogClose({ className, ref, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={cn('absolute top-2xs right-2xs', className)}
      ref={ref}
      {...props}
      render={
        <Button aria-label="Close" variant="ghost" size="iconExtraSmall" tone="error">
          <XIcon weight="bold" />
        </Button>
      }
    />
  )
}
