import { CaretUpDownIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from '../select'
import { useColorPicker } from './color-picker'
import { VALUE_TYPES } from './color-picker.types'
import type { ColorPickerValueTypeProps } from './color-picker.types'

const [defaultValueType] = VALUE_TYPES

export function ColorPickerValueType({
  className,
  children,
  ref,
  ...props
}: ColorPickerValueTypeProps) {
  const { valueType, setValueType } = useColorPicker(),
    handleChange = (value: unknown) => {
      setValueType(VALUE_TYPES.find((type) => type.value === value) ?? defaultValueType)
    }

  return (
    <Select value={valueType.value} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Color value format"
        variant="secondary"
        className={cn('', className)}
        ref={ref}
        {...props}
      >
        {children}
        <SelectValue>
          {(value: string) => VALUE_TYPES.find((type) => type.value === value)?.label ?? value}
        </SelectValue>
        <SelectIcon>
          <CaretUpDownIcon weight="bold" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup sideOffset={8}>
        <SelectList>
          {VALUE_TYPES.map(({ label, value }) => (
            <SelectItem key={label} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
