import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const bentoBoxVariants = cva(
  'group/box flex size-full min-h-0 flex-col overflow-hidden border border-border bg-surface',
  {
    defaultVariants: {
      elevation: 'medium',
      fill: false,
      size: 'medium',
    },
    variants: {
      elevation: {
        high: 'shadow-sm',
        low: 'shadow-2xs',
        medium: 'shadow-xs',
        none: '',
        veryHigh: 'shadow-md',
      },
      fill: {
        false: '',
        true: 'p-0!',
      },
      size: {
        large: 'gap-md rounded-3xl p-md',
        medium: 'gap-sm rounded-2xl p-sm',
        small: 'gap-xs rounded-xl p-xs',
      },
    },
  },
)

type BentoBoxProps = React.ComponentProps<'div'> & VariantProps<typeof bentoBoxVariants>
type BentoBoxHeaderProps = React.ComponentProps<'div'>
type BentoBoxTitleProps = React.ComponentProps<'span'>
type BentoBoxContentProps = React.ComponentProps<'div'>
type BentoBoxDescriptionProps = React.ComponentProps<'span'>
type BentoBoxActionProps = React.ComponentProps<'div'>
type BentoBoxFooterProps = React.ComponentProps<'div'>

export type {
  BentoBoxProps,
  BentoBoxHeaderProps,
  BentoBoxTitleProps,
  BentoBoxContentProps,
  BentoBoxDescriptionProps,
  BentoBoxActionProps,
  BentoBoxFooterProps,
}
export { bentoBoxVariants }
