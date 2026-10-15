import { Select as BaseSelect } from '@base-ui/react/select'

import { cn } from '@/utils/cn'

import type { SelectValueProps } from './select.types'

export function SelectValue({ className, ref, ...props }: SelectValueProps) {
  return (
    <BaseSelect.Value
      data-value
      className={cn(
        'flex h-lg min-w-0 flex-1 items-center gap-2xs overflow-hidden text-left text-ellipsis whitespace-nowrap data-placeholder:opacity-70',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
