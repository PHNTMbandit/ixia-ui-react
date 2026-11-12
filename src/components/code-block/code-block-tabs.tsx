import { cn } from '@/utils/cn'

import { Tabs, TabsList, TabsTab } from '../tabs'
import { useCodeBlock } from './code-block'
import type { CodeBlockTabsProps } from './code-block.types'

export function CodeBlockTabs({ className, children, ref, ...props }: CodeBlockTabsProps) {
  const { currentIndex, itemKeys, items, setCurrentValue } = useCodeBlock(),
    handleOnValueChange = (value: string) => {
      const index = Number(value)
      if (Number.isInteger(index)) {
        setCurrentValue(index)
      }
    }

  return (
    <Tabs
      value={String(currentIndex)}
      onValueChange={handleOnValueChange}
      className={cn('', className)}
      variant="underline"
      showBorder={false}
      ref={ref}
      {...props}
    >
      <TabsList data-slot="code-block-tabs">
        {items.map(({ label }, index) => (
          <TabsTab key={itemKeys[index]} value={String(index)}>
            {label}
          </TabsTab>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}
