import { NumberField as BaseNumberField } from '@base-ui/react/number-field'
import { MinusIcon, PlusIcon } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { numberFieldVariants } from './number-field.types'
import type { NumberFieldTypesProps } from './number-field.types'

function getCurrentValue(value: number | null | undefined, uncontrolledValue: number | undefined) {
  if (typeof value === 'number' || value === null) {
    return value
  }
  return uncontrolledValue
}

function getInvalidAttribute(isInvalid: boolean): string | undefined {
  if (isInvalid) {
    return ''
  }
  return undefined
}

function getInputLabel(label: React.ReactNode): string {
  if (typeof label === 'string') {
    return label
  }
  return 'Number value'
}

function NumberField({
  size,
  variant,
  children,
  label,
  disableInput: disabledInput = false,
  className,
  ref,
  ...props
}: NumberFieldTypesProps) {
  const id = React.useId(),
    {
      min,
      max,
      value,
      defaultValue,
      onValueChange,
      'aria-invalid': ariaInvalid,
      ...restProps
    } = props,
    [uncontrolledValue, setUncontrolledValue] = React.useState<number | undefined>(() => {
      if (typeof defaultValue === 'number') {
        return defaultValue
      }

      return undefined
    }),
    currentValue = getCurrentValue(value, uncontrolledValue),
    isOutOfRange =
      typeof currentValue === 'number' &&
      ((typeof min === 'number' && currentValue < min) ||
        (typeof max === 'number' && currentValue > max)),
    mergedAriaInvalid = Boolean(ariaInvalid || isOutOfRange),
    handleValueChange: NumberFieldTypesProps['onValueChange'] = (...args) => {
      const [nextValue] = args

      if (typeof value !== 'number' && value !== null) {
        setUncontrolledValue(nextValue ?? undefined)
      }

      onValueChange?.(...args)
    },
    getButtonSize = () => {
      switch (size) {
        case 'small': {
          return 'iconSmall'
        }
        case 'medium': {
          return 'iconMedium'
        }
        case 'large': {
          return 'iconLarge'
        }
        default: {
          return 'iconMedium'
        }
      }
    }

  return (
    <BaseNumberField.Root
      className={cn(numberFieldVariants({ className, size, variant }))}
      ref={ref}
      aria-invalid={mergedAriaInvalid}
      data-invalid={getInvalidAttribute(mergedAriaInvalid)}
      defaultValue={defaultValue}
      id={id}
      max={max}
      min={min}
      onValueChange={handleValueChange}
      value={value}
      {...restProps}
    >
      {label && (
        <BaseNumberField.ScrubArea className="cursor-ew-resize">
          <label className="cursor-ew-resize style-text-default--1" htmlFor={id}>
            {label}
          </label>
          <BaseNumberField.ScrubAreaCursor>
            <CursorGrowIcon />
          </BaseNumberField.ScrubAreaCursor>
        </BaseNumberField.ScrubArea>
      )}
      <BaseNumberField.Group className="relative flex w-full items-center gap-3xs">
        <BaseNumberField.Decrement
          render={(stepperProps) => (
            <Button
              {...stepperProps}
              tone="error"
              variant="ghost"
              size={getButtonSize()}
              className="shrink-0 rounded-r-none"
            >
              <MinusIcon weight="bold" />
            </Button>
          )}
        />
        <BaseNumberField.Input
          aria-label={getInputLabel(label)}
          disabled={disabledInput}
          className={cn('w-full text-center focus:outline-none', children && 'text-right')}
        />
        {children && (
          <div
            className={cn(
              'w-full text-left text-on-surface-variant',
              size === 'small' && 'style-text-default--1',
              size === 'medium' && 'style-text-default-0',
              size === 'large' && 'style-text-default-1',
            )}
          >
            {children}
          </div>
        )}
        <BaseNumberField.Increment
          render={(stepperProps) => (
            <Button
              {...stepperProps}
              tone="success"
              variant="ghost"
              size={getButtonSize()}
              className="shrink-0 rounded-l-none"
            >
              <PlusIcon weight="bold" />
            </Button>
          )}
        />
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  )
}

function CursorGrowIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="black"
      height="14"
      stroke="white"
      viewBox="0 0 24 14"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Resize cursor</title>
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  )
}

export { NumberField }
