import { cn } from '@/utils/cn'

import { inputVariants } from '../input/input.types'
import type { AutocompleteInputGroupProps } from './autocomplete.types'

export function AutocompleteInputGroup({
  size,
  variant,
  className,
  ref,
  ...props
}: AutocompleteInputGroupProps) {
  return <div className={cn(inputVariants({ size, variant }), className)} ref={ref} {...props} />
}
