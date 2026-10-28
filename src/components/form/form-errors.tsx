import { cn } from '@/utils/cn'

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '../alert'
import { Icon } from '../icon'
import { useFormContext } from './form-contexts'
import type { FormErrorsProps } from './form.types'

const collectObjectMessages = (value: object, acc: Set<string>) => {
    const { message } = value as { message?: unknown }
    if (typeof message === 'string') {
      acc.add(message)
      return
    }
    Object.values(value).forEach((nestedValue) => collectMessages(nestedValue, acc))
  },
  collectStringMessage = (value: string, acc: Set<string>) => {
    if (value.trim()) {
      acc.add(value)
    }
  },
  collectMessages = (value: unknown, acc: Set<string>) => {
    if (value == undefined) {
      return
    }
    if (typeof value === 'string') {
      collectStringMessage(value, acc)
      return
    }
    if (Array.isArray(value)) {
      value.forEach((inputValue) => collectMessages(inputValue, acc))
      return
    }
    if (typeof value === 'object') {
      collectObjectMessages(value, acc)
    }
  }

export function FormErrors({ className, children, ref, ...props }: FormErrorsProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.errors, state.fieldMeta]}>
      {([errors, fieldMeta]) => {
        const messages = new Set<string>()
        collectMessages(errors, messages)
        Object.values(fieldMeta as Record<string, { errors?: unknown }>).forEach((meta) =>
          collectMessages(meta.errors, messages),
        )

        if (!messages.size) {
          return undefined
        }

        return (
          <Alert className={cn('', className)} ref={ref} tone="error" {...props}>
            <AlertIcon>
              <Icon name="fieldError" />
            </AlertIcon>
            <AlertTitle>{children}</AlertTitle>
            <AlertDescription>
              <ul className="list-inside list-disc has-[>:only-child]:list-none">
                {[...messages].map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )
      }}
    </form.Subscribe>
  )
}
