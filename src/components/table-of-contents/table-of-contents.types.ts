import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const tableOfContentsItemVariants = cva(
  'ml-2xs h-lg min-w-0 truncate text-start font-body text-sm font-medium text-on-surface-muted transition-colors duration-200 hover:cursor-pointer data-[in-view=false]:hover:text-on-surface data-[in-view=true]:text-brand-default',
  {
    defaultVariants: {
      depth: 1,
    },
    variants: {
      depth: {
        1: 'pl-sm',
        2: 'pl-lg',
        3: 'pl-xl',
        4: 'pl-2xl',
        5: 'pl-3xl',
      },
    },
  },
)

type TableOfContentsProps = React.ComponentProps<'div'> & {
  scrollOptions?: ScrollIntoViewOptions
}
type TableOfContentsItemProps = React.ComponentProps<'button'> &
  VariantProps<typeof tableOfContentsItemVariants> & {
    targetId: string
    visibilityThreshold?: number
  }
type TableOfContensIndicatorProps = React.ComponentProps<'span'>
type TableOfContentsTitleProps = React.ComponentProps<'span'>
type TableOfContentsListProps = React.ComponentProps<'div'>

export { tableOfContentsItemVariants }
export type {
  TableOfContentsProps,
  TableOfContentsItemProps,
  TableOfContensIndicatorProps,
  TableOfContentsTitleProps,
  TableOfContentsListProps,
}
