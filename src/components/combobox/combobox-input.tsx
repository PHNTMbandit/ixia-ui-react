import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { CaretDownIcon, XIcon } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { InputGroup, InputGroupAddon } from '../input-group'
import { Separator } from '../separator'
import type { ComboboxInputProps } from './combobox.types'

function getChipsMinHeightClass(size: ComboboxInputProps['size']): string {
  if (size === 'small') {
    return '[&:has([data-chips]:not(:empty))]:min-h-lg'
  }
  if (size === 'large') {
    return '[&:has([data-chips]:not(:empty))]:min-h-2xl'
  }
  return '[&:has([data-chips]:not(:empty))]:min-h-xl'
}

function getTriggerVariant(isOpen: boolean): 'fill' | 'ghost' {
  if (isOpen) {
    return 'fill'
  }
  return 'ghost'
}

export function ComboboxInput({
  inline = false,
  variant,
  size = 'medium',
  className,
  children,
  ref,
  ...props
}: ComboboxInputProps) {
  const id = React.useId(),
    chipsMinHeightClass = getChipsMinHeightClass(size)

  if (inline) {
    return (
      <div className="h-(--input-container-height) py-2xs pr-2xs">
        <BaseCombobox.Input
          className={cn(
            'h-xl w-full rounded-lg bg-surface-low px-sm outline-border transition-all not-active:outline-1 focus-within:outline-2 hover:outline-2 focus:caret-brand-default focus:outline-brand-border data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
            'placeholder:opacity-60',
            'disabled:cursor-not-allowed',
            'text-ellipsis',
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    )
  }

  return (
    <InputGroup
      variant={variant}
      size={size}
      className={cn(
        'flex-col items-start justify-center [&:has([data-chips]:empty)>[role=separator]]:hidden [&:has([data-chips]:h-fit)]:flex [&:has([data-chips]:h-fit)]:flex-wrap [&:has([data-chips]:h-fit)]:py-xs [&:has([data-chips]:not(:empty))]:h-auto [&:has([data-chips]:not(:empty))]:rounded-xl [&:not(:has([data-chips]))>[role=separator]]:hidden',
        chipsMinHeightClass,
        className,
      )}
    >
      {children}
      <Separator weight="thinnest" />
      <BaseCombobox.InputGroup className="relative flex w-full items-center justify-between [&>input]:pr-[2rem] has-[.combobox-clear]:[&>input]:pr-[calc(0.5rem+1.5rem*2)]">
        <BaseCombobox.Input
          className={cn(
            'w-full text-ellipsis outline-none placeholder:opacity-60 disabled:cursor-not-allowed',
            className,
          )}
          id={id}
          ref={ref}
          {...props}
        />
        <InputGroupAddon>
          <BaseCombobox.Clear
            aria-label="Clear selection"
            keepMounted
            render={({ onClick }) => (
              <Button
                aria-label="Clear selection"
                onClick={onClick}
                size="iconExtraSmall"
                variant="ghost"
                tone="error"
              >
                <XIcon weight="bold" />
              </Button>
            )}
          />
          <BaseCombobox.Trigger
            aria-label="Open popup"
            render={({ onClick }, state) => (
              <Button
                aria-label="Open popup"
                onClick={onClick}
                size="iconExtraSmall"
                variant={getTriggerVariant(state.open)}
                tone="brand"
              >
                <CaretDownIcon weight="bold" />
              </Button>
            )}
          />
        </InputGroupAddon>
      </BaseCombobox.InputGroup>
    </InputGroup>
  )
}
