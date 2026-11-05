import { cva } from 'class-variance-authority'

const mapControlGroupVariants = cva(
  'absolute z-10 flex flex-col items-center justify-start gap-2xs',
  {
    defaultVariants: {
      position: 'bottom-right',
    },
    variants: {
      position: {
        'bottom-left': 'bottom-lg left-sm',
        'bottom-right': 'right-sm bottom-lg',
        'top-left': 'top-lg left-sm',
        'top-right': 'top-lg right-sm',
      },
    },
  },
)

export { mapControlGroupVariants }
