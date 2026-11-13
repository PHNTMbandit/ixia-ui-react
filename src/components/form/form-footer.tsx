import { cn } from '@/utils/cn'

import type { FormFooterProps } from './form.types'

export function FormFooter({
  orientation = 'horizontal',
  className,
  ref,
  ...props
}: FormFooterProps) {
  return (
    <div
      className={cn(
        'flex gap-sm',
        className,
        orientation === 'horizontal' && 'flex-row',
        orientation === 'vertical' && 'flex-col',
      )}
      ref={ref}
      {...props}
    />
  )
}
