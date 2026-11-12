import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import {
  Select,
  SelectIcon,
  SelectItem,
  SelectList,
  SelectPopup,
  SelectTitle,
  SelectTrigger,
  SelectValue,
} from '../select'
import { useCodeBlock } from './code-block'
import type { CodeBlockSelectProps } from './code-block.types'

export function CodeBlockSelect({ className, children, ref, ...props }: CodeBlockSelectProps) {
  const { currentIndex, itemKeys, setCurrentValue, items } = useCodeBlock(),
    handleChange = (value: unknown) => {
      const index = Number(value)
      if (Number.isInteger(index)) {
        setCurrentValue(index)
      }
    }

  return (
    <Select value={String(currentIndex)} onValueChange={handleChange}>
      <SelectTrigger
        aria-label="Select snippet"
        className={cn('', className)}
        ref={ref}
        {...props}
        variant="ghost"
      >
        <SelectValue>{(value: string) => items[Number(value)]?.label}</SelectValue>
        <SelectIcon>
          <Icon name="chevronsUpDown" />
        </SelectIcon>
      </SelectTrigger>
      <SelectPopup>
        <SelectList>
          {children}
          {items.map(({ label }, index) => (
            <SelectItem key={itemKeys[index]} value={String(index)}>
              <SelectTitle>{label}</SelectTitle>
            </SelectItem>
          ))}
        </SelectList>
      </SelectPopup>
    </Select>
  )
}
