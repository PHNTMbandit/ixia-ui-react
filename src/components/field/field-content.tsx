import { cn } from '@/utils/cn'

export function FieldContent({ className, ref, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2xs', className)}
      data-slot="field-content"
      ref={ref}
      {...props}
    />
  )
}
