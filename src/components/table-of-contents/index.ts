import { TableOfContents as TableOfContentsComponent } from './table-of-contents'
import { TableOfContentsItem } from './table-of-contents-item'
import { TableOfContentsList } from './table-of-contents-list'
import { TableOfContentsTitle } from './table-of-contents-title'

const TableOfContents = Object.assign(TableOfContentsComponent, {
  Item: TableOfContentsItem,
  List: TableOfContentsList,
  Title: TableOfContentsTitle,
})

export { TableOfContents }
export { TableOfContentsItem } from './table-of-contents-item'
export { TableOfContentsTitle } from './table-of-contents-title'
export { TableOfContentsList } from './table-of-contents-list'
export type {
  TableOfContentsProps,
  TableOfContentsItemProps,
  TableOfContensIndicatorProps,
  TableOfContentsTitleProps,
  TableOfContentsListProps,
} from './table-of-contents.types'
