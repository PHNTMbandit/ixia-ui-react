import { cn } from '@/utils/cn'

import { formSetHeadingVariants } from './form.types'
import type { FormSetHeadingProps } from './form.types'

export function FormSetHeading({ size, className, ref, ...props }: FormSetHeadingProps) {
  return <span className={cn(formSetHeadingVariants({ className, size }))} ref={ref} {...props} />
}
