import React from 'react'

import { cn } from '@/utils/cn'

import { codeBlockVariants } from './code-block.types'
import type { CodeBlockProps, CodeBlockProviderState } from './code-block.types'

const FIRST_INDEX = 0,
  NEXT_OCCURRENCE = 1,
  CodeBlockContext = React.createContext<CodeBlockProviderState | undefined>(undefined)

function CodeBlock({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ref,
  ...props
}: CodeBlockProps) {
  let defaultId = items[FIRST_INDEX]?.id ?? ''
  if (typeof defaultValue === 'string') {
    defaultId = defaultValue
  } else if (defaultValue) {
    defaultId = defaultValue.id
  }

  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultId),
    selectedValue = value ?? uncontrolledValue,
    currentIndex = Math.max(
      items.findIndex((item) => item.id === selectedValue),
      FIRST_INDEX,
    ),
    currentValue = items[currentIndex],
    idOccurrences = new Map<string, number>(),
    itemKeys = items.map(({ id }) => {
      const occurrence = idOccurrences.get(id) ?? FIRST_INDEX
      idOccurrences.set(id, occurrence + NEXT_OCCURRENCE)
      if (occurrence === FIRST_INDEX) {
        return id
      }
      return `${id}-${occurrence}`
    }),
    setCurrentValue = (index: number) => {
      const selectedItem = items[index]
      if (!selectedItem) {
        return
      }

      if (value === undefined) {
        setUncontrolledValue(selectedItem.id)
      }
      if (selectedItem.id !== selectedValue) {
        onValueChange?.(selectedItem.id)
      }
    }

  React.useEffect(() => {
    const seenIds = new Set<string>(),
      duplicateIds = new Set<string>()

    for (const item of items) {
      if (seenIds.has(item.id)) {
        duplicateIds.add(item.id)
      }
      seenIds.add(item.id)
    }
    if (duplicateIds.size > FIRST_INDEX) {
      console.warn(`CodeBlock item IDs must be unique. Duplicates: ${[...duplicateIds].join(', ')}`)
    }
  }, [items])

  return (
    <CodeBlockContext.Provider
      value={{ currentIndex, currentValue, itemKeys, items, setCurrentValue }}
    >
      <div
        className={cn(
          codeBlockVariants({ variant: currentValue.windowVariant ?? 'primary' }),
          className,
        )}
        ref={ref}
        {...props}
      />
    </CodeBlockContext.Provider>
  )
}

function useCodeBlock() {
  const context = React.useContext(CodeBlockContext)

  if (!context) {
    throw new Error('useCodeBlock must be used within a CodeBlock')
  }

  return context
}

export { CodeBlock, useCodeBlock }
