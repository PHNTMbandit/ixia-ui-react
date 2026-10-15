import chroma from 'chroma-js'

import { cn } from '@/utils/cn'

import { useColorPicker } from './color-picker'
import type { ColorPickerAreaProps } from './color-picker.types'

const PERCENTAGE_SCALE = 100,
  MIN_NORMALIZED_VALUE = 0,
  MAX_NORMALIZED_VALUE = 1

export function ColorPickerArea({ className, ref, ...props }: ColorPickerAreaProps) {
  const { color, hue, saturation, value, setSaturationValue } = useColorPicker(),
    hueColor = chroma.hsv(hue, MAX_NORMALIZED_VALUE, MAX_NORMALIZED_VALUE).hex(),
    updateColor = (event: React.PointerEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect(),
        nextSaturation = Math.min(
          Math.max((event.clientX - bounds.left) / bounds.width, MIN_NORMALIZED_VALUE),
          MAX_NORMALIZED_VALUE,
        ),
        nextValue = Math.min(
          Math.max(
            MAX_NORMALIZED_VALUE - (event.clientY - bounds.top) / bounds.height,
            MIN_NORMALIZED_VALUE,
          ),
          MAX_NORMALIZED_VALUE,
        )

      setSaturationValue(nextSaturation, nextValue)
    },
    handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId)
      updateColor(event)
    }

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        'relative aspect-square grow touch-none rounded-lg active:cursor-grabbing',
        className,
      )}
      style={{
        background: `
          linear-gradient(to top, black, transparent),
          linear-gradient(to right, white, ${hueColor})
        `,
        ...props.style,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          updateColor(event)
        }
      }}
    >
      <div
        className="pointer-events-none absolute size-md -translate-x-1/2 -translate-y-1/2 rounded-full border-3 border-white"
        style={{
          backgroundColor: color.hex(),
          left: `${saturation * PERCENTAGE_SCALE}%`,
          top: `${(MAX_NORMALIZED_VALUE - value) * PERCENTAGE_SCALE}%`,
        }}
      />
    </div>
  )
}
