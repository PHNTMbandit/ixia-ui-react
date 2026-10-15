import { labelVariants } from './label.types'
import type { LabelProps } from './label.types'

export function Label({ className, ref, size, ...props }: LabelProps) {
  return (
    <label
      className={labelVariants({ className, size })}
      data-slot="label"
      htmlFor={props.htmlFor}
      ref={ref}
      {...props}
    />
  )
}
