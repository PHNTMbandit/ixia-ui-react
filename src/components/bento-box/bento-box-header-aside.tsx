import { cn } from '@/utils/cn'

import type { BentoBoxHeaderAsideProps } from './bento-box.types'

export function BentoBoxHeaderAside({ className, ref, ...props }: BentoBoxHeaderAsideProps) {
  return (
    <div
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end pl-lg',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
