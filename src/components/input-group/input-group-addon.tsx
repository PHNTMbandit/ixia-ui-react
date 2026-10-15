import { cn } from '@/utils/cn'

import { inputGroupAddonVariants } from './input-group.types'
import type { InputGroupAddonProps } from './input-group.types'

export function InputGroupAddon({ size, className, ref, ...props }: InputGroupAddonProps) {
  return <div className={cn(inputGroupAddonVariants({ size }), className)} ref={ref} {...props} />
}
