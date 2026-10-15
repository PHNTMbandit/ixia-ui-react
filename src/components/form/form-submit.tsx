import { CircleNotchIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useFormContext } from './form-contexts'
import type { FormSubmitProps } from './form.types'

export function FormSubmit({ className, children, ref, ...props }: FormSubmitProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => state}>
      {(state) => (
        <Button
          className={cn('w-full', className)}
          disabled={state.isSubmitting || !state.canSubmit}
          ref={ref}
          type="submit"
          {...props}
        >
          {state.isSubmitting && <CircleNotchIcon className="animate-spin" weight="bold" />}
          {!state.isSubmitting && children}
        </Button>
      )}
    </form.Subscribe>
  )
}
