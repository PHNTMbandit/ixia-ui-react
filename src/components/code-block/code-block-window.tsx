import { cn } from '@/utils/cn'

import { useCodeBlock } from './code-block'
import type { CodeBlockWindowProps } from './code-block.types'

export function CodeBlockWindow({ className, children, ref, ...props }: CodeBlockWindowProps) {
  const { currentValue } = useCodeBlock()

  return (
    <div
      className={cn('relative overflow-auto rounded-lg px-md py-sm', className)}
      ref={ref}
      {...props}
    >
      {children}
      {typeof currentValue.content === 'string' && (
        <div dangerouslySetInnerHTML={{ __html: currentValue.content }} />
      )}
      {typeof currentValue.content !== 'string' && currentValue.content}
    </div>
  )
}
