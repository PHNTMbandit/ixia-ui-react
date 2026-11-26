import { BentoBox as BentoBoxRoot } from './bento-box'
import { BentoBoxContent } from './bento-box-content'
import { BentoBoxDescription } from './bento-box-description'
import { BentoBoxFooter } from './bento-box-footer'
import { BentoBoxGrid } from './bento-box-grid'
import { BentoBoxHeader } from './bento-box-header'
import { BentoBoxHeaderAside } from './bento-box-header-aside'
import { BentoBoxImage } from './bento-box-image'
import { BentoBoxOverlay } from './bento-box-overlay'
import { BentoBoxTitle } from './bento-box-title'
import { BentoBoxValue } from './bento-box-value'

const BentoBox = Object.assign(BentoBoxRoot, {
  Content: BentoBoxContent,
  Description: BentoBoxDescription,
  Footer: BentoBoxFooter,
  Grid: BentoBoxGrid,
  Header: BentoBoxHeader,
  HeaderAside: BentoBoxHeaderAside,
  Image: BentoBoxImage,
  Overlay: BentoBoxOverlay,
  Title: BentoBoxTitle,
  Value: BentoBoxValue,
})

export type {
  BentoBoxHeaderAsideProps,
  BentoBoxContentProps,
  BentoBoxDescriptionProps,
  BentoBoxFooterProps,
  BentoBoxGridProps,
  BentoBoxHeaderProps,
  BentoBoxImageProps,
  BentoBoxOverlayProps,
  BentoBoxProps,
  BentoBoxTitleProps,
  BentoBoxValueProps,
} from './bento-box.types'

export { BentoBoxHeaderAside } from './bento-box-header-aside'
export { BentoBoxContent } from './bento-box-content'
export { BentoBoxDescription } from './bento-box-description'
export { BentoBoxFooter } from './bento-box-footer'
export { BentoBoxGrid } from './bento-box-grid'
export { BentoBoxHeader } from './bento-box-header'
export { BentoBoxImage } from './bento-box-image'
export { BentoBoxOverlay } from './bento-box-overlay'
export { BentoBoxTitle } from './bento-box-title'
export { BentoBoxValue } from './bento-box-value'

export { BentoBox }
