import { cn } from '@/utils/cn'

import { Tabs, TabsIndicator, TabsList, TabsTab } from '../tabs'
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
      variant="ghost"
      ref={ref}
      {...props}
    >
      <TabsList>
        {items.map(({ id, label }) => (
          <TabsTab key={id} value={id}>
            {label}
          </TabsTab>
        ))}
        <TabsIndicator />
      </TabsList>
      {children}
    </Tabs>
  )
}
