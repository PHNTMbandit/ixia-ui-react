import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useFormContext } from './form-contexts'
import type { FormResetProps } from './form.types'

export function FormReset({ className, ref, ...props }: FormResetProps) {
  const form = useFormContext(),
    handleClick = () => {
      form.reset()
    }

  return (
    <form.Subscribe selector={(state) => state}>
      {(state) => (
        <Button
          className={cn('w-full', className)}
          disabled={!state.values}
          onClick={handleClick}
          ref={ref}
          variant="outline"
          tone="neutral"
          type="reset"
          {...props}
        />
      )}
    </form.Subscribe>
  )
}
