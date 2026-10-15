import { useId } from 'react'

import { cn } from '@/utils/cn'

import type { ProgressProps } from './progress.types'

const CURRENT_CHILD_DECREMENT = 1,
  CURRENT_CHILD_INCREMENT = 2

export function Progress({ currentIndex, className, ref, ...props }: ProgressProps) {
  const uid = useId().replace(/:/g, ''),
    scope = `progress-${uid}`,
    current = currentIndex * CURRENT_CHILD_INCREMENT - CURRENT_CHILD_DECREMENT

  return (
    <>
      <style>
        {`
		  .${scope} > :nth-child(${current}) > :first-child {
			background-color: var(--color-accent-container);
			border: 1px solid var(--color-accent-border-strong);
			color: var(--color-accent-on-container);
		  }
		  .${scope} > :nth-child(-n+${current - CURRENT_CHILD_DECREMENT}) > :first-child {
			background-color: var(--color-accent-default);
			border: none;
			color: var(--color-accent-on-default);
			box-shadow: none;
		  }
		`}
      </style>

      <div
        className={cn('flex w-full items-center justify-center gap-2xs', scope, className)}
        ref={ref}
        {...props}
      />
    </>
  )
}
