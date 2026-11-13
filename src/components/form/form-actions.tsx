import { cn } from '@/utils/cn'

import type { FormActionsProps } from './form.types'

export function FormActions({
  orientation = 'horizontal',
  className,
  ref,
  ...props
}: FormActionsProps) {
  return (
    <div
      className={cn(
        'flex gap-2xs',
        className,
        orientation === 'horizontal' && 'flex-row',
        orientation === 'vertical' && 'flex-col',
      )}
      ref={ref}
      {...props}
    />
  )
}
