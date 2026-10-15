import { cn } from '@/utils/cn'

import { inputVariants } from '../input/input.types'
import type { InputGroupProps } from './input-group.types'

export function InputGroup({ variant, size, className, ref, ...props }: InputGroupProps) {
  return <div className={cn(inputVariants({ size, variant }), className)} ref={ref} {...props} />
}
