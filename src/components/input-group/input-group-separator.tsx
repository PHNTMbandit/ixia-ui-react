import { cn } from '@/utils/cn'

import { Separator } from '../separator'
import type { InputGroupSeparatorProps } from './input-group.types'

export function InputGroupSeparator({ className, ref, ...props }: InputGroupSeparatorProps) {
  return <Separator className={cn('h-2/4', className)} ref={ref} {...props} />
}
