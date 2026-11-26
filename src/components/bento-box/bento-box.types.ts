import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const bentoBoxVariants = cva('group/box flex min-h-0 w-full flex-col overflow-hidden', {
  defaultVariants: {
    elevation: 'medium',
    fill: false,
    size: 'medium',
  },
  variants: {
    elevation: {
      high: 'bg-surface-2 shadow-sm',
      low: 'bg-surface-low inset-shadow-2xs',
      medium: 'bg-surface shadow-xs',
      none: 'bg-surface',
      veryHigh: 'bg-surface-3 shadow-md',
    },
    fill: {
      false: '',
      true: 'p-0! has-[>[data-slot=bento-box-overlay]]:grid',
    },
    size: {
      large: 'gap-md rounded-3xl p-lg',
      medium: 'gap-sm rounded-2xl p-md',
      small: 'gap-xs rounded-xl p-sm',
    },
    span: {
      full: 'col-span-full',
    },
  },
})

type BentoBoxProps = React.ComponentProps<'div'> & VariantProps<typeof bentoBoxVariants>
type BentoBoxGridProps = React.ComponentProps<'div'>
type BentoBoxHeaderProps = React.ComponentProps<'div'>
type BentoBoxTitleProps = React.ComponentProps<'span'>
type BentoBoxValueProps = React.ComponentProps<'span'>
type BentoBoxContentProps = React.ComponentProps<'div'>
type BentoBoxDescriptionProps = React.ComponentProps<'span'>
type BentoBoxHeaderAsideProps = React.ComponentProps<'div'>
type BentoBoxFooterProps = React.ComponentProps<'div'>
type BentoBoxImageProps = Omit<React.ComponentProps<'img'>, 'alt'> & { alt: string }
type BentoBoxOverlayProps = React.ComponentProps<'div'>

export type {
  BentoBoxProps,
  BentoBoxGridProps,
  BentoBoxHeaderProps,
  BentoBoxTitleProps,
  BentoBoxValueProps,
  BentoBoxContentProps,
  BentoBoxDescriptionProps,
  BentoBoxHeaderAsideProps,
  BentoBoxFooterProps,
  BentoBoxImageProps,
  BentoBoxOverlayProps,
}
export { bentoBoxVariants }
