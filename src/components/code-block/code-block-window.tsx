import { cn } from '@/utils/cn'

import { useCodeBlock } from './code-block'
import type { CodeBlockWindowProps } from './code-block.types'

export function CodeBlockWindow({ className, children, ref, ...props }: CodeBlockWindowProps) {
  const { currentValue } = useCodeBlock()
  let { content } = currentValue

  if (content === undefined && currentValue.code !== undefined) {
    content = (
      <pre>
        <code>{currentValue.code}</code>
      </pre>
    )
  }

  return (
    <div
      className={cn('relative overflow-auto rounded-lg px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
      {content}
    </div>
  )
}
