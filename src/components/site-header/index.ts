import { SiteHeader as SiteHeaderRoot } from './site-header'
import { SiteHeaderGroup } from './site-header-group'
import { SiteHeaderSeparator } from './site-header-separator'
import { SiteHeaderTitle } from './site-header-title'

const SiteHeader = Object.assign(SiteHeaderRoot, {
  Group: SiteHeaderGroup,
  Separator: SiteHeaderSeparator,
  Title: SiteHeaderTitle,
})

export type {
  SiteHeaderProps,
  SiteHeaderGroupProps,
  SiteHeaderTitleProps,
  SiteHeaderSeparatorProps,
} from './site-header.types'

export { SiteHeaderGroup } from './site-header-group'
export { SiteHeaderTitle } from './site-header-title'
export { SiteHeaderSeparator } from './site-header-separator'

export { SiteHeader }
