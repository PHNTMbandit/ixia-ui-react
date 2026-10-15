import { Breadcrumb as BreadcrumbRoot } from './breadcrumb'
import { BreadcrumbEllipsis } from './breadcrumb-ellipsis'
import { BreadcrumbItem } from './breadcrumb-item'
import { BreadcrumbLink } from './breadcrumb-link'
import { BreadcrumbSeparator } from './breadcrumb-separator'

const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Ellipsis: BreadcrumbEllipsis,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
})

export type {
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from './breadcrumb.types'
export { BreadcrumbEllipsis } from './breadcrumb-ellipsis'
export { BreadcrumbItem } from './breadcrumb-item'
export { BreadcrumbLink } from './breadcrumb-link'
export { BreadcrumbSeparator } from './breadcrumb-separator'

export { Breadcrumb }
