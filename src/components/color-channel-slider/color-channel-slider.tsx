import { Slider as BaseSlider } from '@base-ui/react'

import { cn } from '@/utils/cn'

import { colorChannelSliderVariants } from './color-channel-slider.types'
import type { ColorChannelSliderProps } from './color-channel-slider.types'

const PRIMARY_THUMB_INDEX = 0

export function ColorChannelSlider({
  size,
  trackStyle,
  className,
  children,
  'aria-label': ariaLabel = 'Color value',
  ref,
  ...props
}: ColorChannelSliderProps) {
  const hasTransparency = trackStyle.some(
      (color: string) => color.includes('rgba') || color.includes('hsla') || color.includes('/'),
    ),
    baseGradient = `linear-gradient(to right, ${trackStyle.join(', ')})`,
    checkerboard =
      'linear-gradient(45deg, #d4d4d8 25%, transparent 25%, transparent 75%, #d4d4d8 75%, #d4d4d8)'
  let backgroundImage = baseGradient,
    backgroundPosition = 'auto',
    backgroundSize = 'auto'
  if (hasTransparency) {
    backgroundImage = [baseGradient, checkerboard, checkerboard].join(', ')
    backgroundPosition = '0 0, 0 0, 5px 5px'
    backgroundSize = '100% 100%, 10px 10px, 10px 10px'
  }

  return (
    <BaseSlider.Root
      className={cn(colorChannelSliderVariants({ size }), className)}
      data-slot="slider-root"
      thumbAlignment="edge"
      ref={ref}
      {...props}
    >
      <BaseSlider.Control className="shrink-0 hover:cursor-pointer data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full">
        <BaseSlider.Track
          data-slot="slider-track"
          className={cn('relative size-full rounded-full')}
          style={{
            backgroundColor: '#ffffff',
            backgroundImage,
            backgroundPosition,
            backgroundSize,
          }}
        >
          {children}
          <BaseSlider.Indicator data-slot="slider-indicator" className="rounded-full" />
          <BaseSlider.Thumb
            data-slot="slider-thumb"
            aria-label={ariaLabel}
            className={cn(
              'absolute aspect-square rounded-full border-white shadow-xs transition-[width,height,opacity] data-dragging:cursor-grabbing hover:[&:not([data-dragging])]:cursor-pointer',
            )}
            render={(thumbProps, state) => (
              <div
                {...thumbProps}
                style={{
                  ...thumbProps.style,
                  backgroundColor: trackStyle[state.values[PRIMARY_THUMB_INDEX]],
                }}
              />
            )}
          />
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  )
}
