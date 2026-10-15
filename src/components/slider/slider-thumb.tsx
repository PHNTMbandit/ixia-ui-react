import { Slider as BaseSlider } from '@base-ui/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip'
import type { SliderThumbProps } from './slider.types'

export function SliderThumb({ className, ref, hide, ...props }: SliderThumbProps) {
  const [isHovering, setIsHovering] = React.useState(false),
    [isDragging, setIsDragging] = React.useState(false),
    thumbRef = React.useRef<HTMLDivElement>(null),
    setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        thumbRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ;(ref as { current: HTMLDivElement | null }).current = node
        }
      },
      [ref],
    )
  React.useEffect(() => {
    if (!thumbRef.current) {
      return undefined
    }
    const node = thumbRef.current,
      update = () => setIsDragging(node.hasAttribute('data-dragging')),
      observer = new MutationObserver(update)
    update()
    observer.observe(node, { attributeFilter: ['data-dragging'], attributes: true })
    return () => observer.disconnect()
  }, [])

  return (
    <Tooltip open={isHovering || isDragging} disabled={hide}>
      <TooltipTrigger delay={0}>
        <BaseSlider.Thumb
          data-slot="slider-thumb"
          className={cn(
            'absolute aspect-square rounded-full bg-surface transition-[width,height,opacity] outline-none data-dragging:cursor-grabbing data-dragging:shadow-sm hover:[&:not([data-dragging])]:cursor-pointer',
            className,
          )}
          onPointerEnter={() => setIsHovering(true)}
          onPointerLeave={() => setIsHovering(false)}
          ref={setRefs}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <BaseSlider.Value />
      </TooltipContent>
    </Tooltip>
  )
}
