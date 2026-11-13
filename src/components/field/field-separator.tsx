import { cn } from '@/utils/cn'

export function FieldSeparator({ className, ref, ...props }: React.ComponentProps<'hr'>) {
  return (
    <hr
      className={cn('border-surface', className)}
      data-slot="field-separator"
      ref={ref}
      {...props}
    />
  )
}
