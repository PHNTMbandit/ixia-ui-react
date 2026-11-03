import { cn } from '@/utils/cn'

import { Tabs, TabsList, TabsTab } from '../tabs'
import { useCodeBlock } from './code-block'
import type { CodeBlockTabsProps } from './code-block.types'

export function CodeBlockTabs({ className, children, ref, ...props }: CodeBlockTabsProps) {
  const { currentValue, items, setCurrentValue } = useCodeBlock(),
    handleOnValueChange = (value: string) => {
      const selectedValue = items.find((item) => item.id === value)
      if (selectedValue) {
        setCurrentValue(selectedValue)
      }
    }

  return (
    <Tabs
      value={currentValue.id}
      onValueChange={handleOnValueChange}
      className={cn('', className)}
      variant="underline"
      showBorder={false}
      ref={ref}
      {...props}
    >
      <TabsList data-slot="code-block-tabs">
        {items.map(({ id, label }) => (
          <TabsTab key={id} value={id}>
            {label}
          </TabsTab>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
