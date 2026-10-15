import { PercentIcon } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { Popover, PopoverTrigger, PopoverContent, PopoverPanel } from '../popover'
import { Separator } from '../separator'
import { useColorPicker } from './color-picker'
import type { ColorPickerInputProps } from './color-picker.types'

const TRANSPARENCY_MULTIPLIER = 100

export function ColorPickerInput({
  showPopover = false,
  showTransparencyField = true,
  className,
  children,
  ref,
  ...props
}: ColorPickerInputProps) {
  const { color, setColor, valueType } = useColorPicker(),
    [inputValue, setInputValue] = React.useState<string>(String(valueType.getValue(color))),
    [transparency, setTransparency] = React.useState<string>(
      Math.round(color.alpha() * TRANSPARENCY_MULTIPLIER).toString(),
    ),
    [prevColor, setPrevColor] = React.useState(color),
    [prevValueType, setPrevValueType] = React.useState(valueType),
    handleValueChange = (value: string) => {
      setInputValue(value)
    },
    handleTransparencyChange = (value: string) => {
      setTransparency(value)
    },
    handleValueBlur = () => {
      const newColor = valueType.parseValue(inputValue)
      if (newColor) {
        setColor(newColor)
      }
    },
    handleTransparencyBlur = () => {
      const alpha = parseFloat(transparency)
      if (!Number.isNaN(alpha)) {
        setColor(color.alpha(alpha / TRANSPARENCY_MULTIPLIER))
      }
    },
    handleValueKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleValueBlur()
      }
    },
    handleTransparencyKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleTransparencyBlur()
      }
    }

  if (color !== prevColor || valueType !== prevValueType) {
    setPrevColor(color)
    setPrevValueType(valueType)
    setInputValue(String(valueType.getValue(color)))
    setTransparency(Math.round(color.alpha() * TRANSPARENCY_MULTIPLIER).toString())
  }

  return (
    <InputGroup variant="secondary" className={cn('', className)} ref={ref} {...props}>
      {showPopover && (
        <Popover>
          <PopoverTrigger aria-label="Open color picker" nativeButton={false}>
            <InputGroupAddon
              style={{
                backgroundColor: color.hex(),
              }}
              className="aspect-square h-1/2 rounded-lg hover:cursor-pointer"
            />
          </PopoverTrigger>
          <PopoverPanel>
            <PopoverContent className="flex w-[300px] flex-col gap-sm">{children}</PopoverContent>
          </PopoverPanel>
        </Popover>
      )}
      {!showPopover && (
        <InputGroupAddon
          style={{
            backgroundColor: color.hex(),
          }}
          className="aspect-square size-md rounded-lg"
        />
      )}
      <InputGroupInput
        aria-label="Color value"
        onBlur={handleValueBlur}
        onKeyDown={handleValueKeyDown}
        onValueChange={handleValueChange}
        value={inputValue}
        className="uppercase"
      />
      {showTransparencyField && (
        <>
          <Separator orientation="vertical" className="h-md" />
          <InputGroupAddon>
            <PercentIcon weight="bold" />
          </InputGroupAddon>
          <InputGroupInput
            aria-label="Transparency percentage"
            type="number"
            min={0}
            max={100}
            value={transparency}
            onValueChange={handleTransparencyChange}
            onBlur={handleTransparencyBlur}
            onKeyDown={handleTransparencyKeyDown}
            className="w-xl"
          />
        </>
      )}
    </InputGroup>
  )
}
