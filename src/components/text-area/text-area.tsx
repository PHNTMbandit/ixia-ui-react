import React from 'react'

import { cn } from '@/utils/cn'

import { textAreaVariants } from './text-area.types'
import type { TextAreaProps } from './text-area.types'

function getValue(
  isControlled: boolean,
  value: TextAreaProps['value'],
  internalValue: string,
): string {
  if (!isControlled) {
    return internalValue
  }
  if (value === undefined || value === null) {
    return ''
  }
  return String(value)
}

export function TextArea({ variant, className, ref, ...props }: TextAreaProps) {
  const isControlled = props.value !== undefined,
    [internalValue, setInternalValue] = React.useState(String(props.defaultValue ?? '')),
    value = getValue(isControlled, props.value, internalValue),
    { maxLength } = props,
    hasMaxLength = typeof maxLength === 'number',
    isMaxLengthExceeded = hasMaxLength && value.length >= maxLength,
    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(event.target.value)
      }

      props.onChange?.(event)
    }

  return (
    <div
      className={cn(
        textAreaVariants({ className, variant }),
        isMaxLengthExceeded && 'outline-error-border-strong',
        !isMaxLengthExceeded && 'focus-within:outline-brand-border-strong',
      )}
      data-disabled={props.disabled || undefined}
    >
      <textarea
        className="grow resize-none px-sm py-xs style-text-prose-0 outline-none focus-within:caret-brand-border-strong disabled:cursor-not-allowed disabled:opacity-50"
        ref={ref}
        {...props}
        onChange={handleChange}
        value={value}
      />
      {hasMaxLength && (
        <span
          className={cn(
            'w-full px-xs py-2xs text-right style-text-default--1 text-on-surface-variant',
            isMaxLengthExceeded && 'text-error-default',
          )}
        >
          {value.length} / {maxLength}
        </span>
      )}
    </div>
  )
}
