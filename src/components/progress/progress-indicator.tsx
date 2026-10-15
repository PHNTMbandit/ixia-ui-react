import { Children, isValidElement } from 'react'

import { cn } from '@/utils/cn'

import { ProgressDescription } from './progress-description'
import { ProgressTitle } from './progress-title'
import type { ProgressIndicatorProps } from './progress.types'

const META_TYPES = new Set<unknown>([ProgressTitle, ProgressDescription]),
  EMPTY = 0

export function ProgressIndicator({ className, children, ref, ...props }: ProgressIndicatorProps) {
  const items = Children.toArray(children),
    isMeta = (child: (typeof items)[number]) => isValidElement(child) && META_TYPES.has(child.type),
    meta = items.filter(isMeta),
    inner = items.filter((child) => !isMeta(child))

  return (
    <div className="relative flex shrink-0 flex-col items-center">
      <div
        className={cn(
          'flex size-md shrink-0 flex-col items-center justify-center rounded-full border border-neutral-border bg-neutral-container text-center style-text-default--2 text-accent-default transition-colors ease-in-out [&_svg]:size-xs',
          className,
        )}
        ref={ref}
        {...props}
      >
        {inner}
      </div>
      {meta.length > EMPTY && (
        <div className="absolute top-full left-1/2 flex w-3xl -translate-x-1/2 translate-y-2xs flex-col gap-3xs">
          {meta}
        </div>
      )}
    </div>
  )
}
