import { BentoBox as BentoBoxRoot } from './bento-box'
import { BentoBoxAction } from './bento-box-action'
import { BentoBoxContent } from './bento-box-content'
import { BentoBoxDescription } from './bento-box-description'
import { BentoBoxFooter } from './bento-box-footer'
import { BentoBoxHeader } from './bento-box-header'
import { BentoBoxTitle } from './bento-box-title'

const BentoBox = Object.assign(BentoBoxRoot, {
  Action: BentoBoxAction,
  Content: BentoBoxContent,
  Description: BentoBoxDescription,
  Footer: BentoBoxFooter,
  Header: BentoBoxHeader,
  Title: BentoBoxTitle,
})

export type {
  BentoBoxActionProps,
  BentoBoxContentProps,
  BentoBoxDescriptionProps,
  BentoBoxFooterProps,
  BentoBoxHeaderProps,
  BentoBoxProps,
  BentoBoxTitleProps,
} from './bento-box.types'

export { BentoBoxAction } from './bento-box-action'
export { BentoBoxContent } from './bento-box-content'
export { BentoBoxDescription } from './bento-box-description'
export { BentoBoxFooter } from './bento-box-footer'
export { BentoBoxHeader } from './bento-box-header'
export { BentoBoxTitle } from './bento-box-title'

export { BentoBox }
