import { cn } from '@/utils/cn'

import { useCodeBlock } from './code-block'
import type { CodeBlockNameProps } from './code-block.types'

export function CodeBlockName({ className, children, ref, ...props }: CodeBlockNameProps) {
  const { currentValue } = useCodeBlock()

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2xs px-xs style-text-strong-0 text-on-surface-variant [&>svg]:size-sm',
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      {currentValue?.icon}
      {currentValue.name}
    </div>
  )
}
