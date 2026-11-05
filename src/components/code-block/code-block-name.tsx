import { cn } from '@/utils/cn'
import { trimTextChildren } from '@/utils/trim-text-children'

import { useCodeBlock } from './code-block'
import type { CodeBlockNameProps } from './code-block.types'

export function CodeBlockName({ className, children, ref, ...props }: CodeBlockNameProps) {
  const { currentValue } = useCodeBlock()

  if (!currentValue?.name) {
    return undefined
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-2xs px-xs font-heading text-base leading-none font-bold text-on-surface-variant [&>svg]:size-md',
        className,
      )}
      ref={ref}
      {...props}
    >
      {trimTextChildren(children)}
      {currentValue?.icon}
      {trimTextChildren(currentValue.name)}
    </div>
  )
}
