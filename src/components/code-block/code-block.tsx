import React from 'react'

import { cn } from '@/utils/cn'

import type { CodeBlockProps, CodeBlockProviderState, CodeBlockValue } from './code-block.types'

const CodeBlockContext = React.createContext<CodeBlockProviderState | undefined>(undefined)

function CodeBlock({ items, defaultValue, className, ref, ...props }: CodeBlockProps) {
  const [currentValue, setCurrentValue] = React.useState<CodeBlockValue>(defaultValue)

  return (
    <CodeBlockContext.Provider value={{ currentValue, items, setCurrentValue }}>
      <div
        className={cn('flex flex-col rounded-xl border border-border bg-surface', className)}
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
