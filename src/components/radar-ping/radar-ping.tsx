import { cn } from '@/utils/cn'

import { radarPingVariants } from './radar-ping.types'
import type { RadarPingProps } from './radar-ping.types'

export function RadarPing({
  hidePing = false,
  tone = 'brand',
  size = 'medium',
  className,
  children,
  ref,
  ...props
}: RadarPingProps) {
  return (
    <div className={cn(radarPingVariants({ className, size, tone }))} ref={ref} {...props}>
      {!hidePing && (
        <span
          className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
          data-radar-ping
        />
      )}
      <span
        className="relative flex items-center justify-center rounded-full text-surface"
        data-dot
      >
        {children}
      </span>
    </div>
  )
}
