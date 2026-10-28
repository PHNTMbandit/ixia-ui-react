import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Icon } from '../icon'
import type { DialogCloseProps } from './dialog.types'

export function DialogClose({ className, children, ref, ...props }: DialogCloseProps) {
  return (
    <BaseDialog.Close
      className={cn('absolute top-xs right-xs', className)}
      ref={ref}
      {...props}
      render={
        <Button aria-label="Close" variant="ghost" size="extraSmall" tone="error">
          {children ?? <Icon name="close" />}
        </Button>
      }
    />
  )
}
