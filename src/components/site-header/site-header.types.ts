import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { Separator } from '../separator'

const siteHeaderGroupVariants = cva('flex items-center gap-xs', {
  defaultVariants: {
    position: 'start',
  },
  variants: {
    position: {
      center: 'justify-center',
      end: 'justify-end',
      start: 'justify-start',
    },
  },
})

type SiteHeaderProps = React.ComponentProps<'div'> & {
  sticky?: boolean
}
type SiteHeaderGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof siteHeaderGroupVariants>
type SiteHeaderTitleProps = React.ComponentProps<'span'>
type SiteHeaderSeparatorProps = React.ComponentProps<typeof Separator>

export type {
  SiteHeaderProps,
  SiteHeaderGroupProps,
  SiteHeaderTitleProps,
  SiteHeaderSeparatorProps,
}
export { siteHeaderGroupVariants }
