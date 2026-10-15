import { cn } from '@/utils/cn'

import { inputVariants } from '../input/input.types'
import type { AutocompleteInputGroupProps } from './autocomplete.types'

export function AutocompleteInputGroup({
  variant,
  className,
  ref,
  ...props
}: AutocompleteInputGroupProps) {
  return <div className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />
}
