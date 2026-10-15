import { PreviewCard as PreviewCardRoot } from './preview-card'
import { PreviewCardPopup } from './preview-card-popup'
import { PreviewCardTrigger } from './preview-card-trigger'

const PreviewCard = Object.assign(PreviewCardRoot, {
  Popup: PreviewCardPopup,
  Trigger: PreviewCardTrigger,
})

export type {
  PreviewCardPopupProps,
  PreviewCardProps,
  PreviewCardTriggerProps,
} from './preview-card.types'
export { PreviewCardPopup } from './preview-card-popup'
export { PreviewCardTrigger } from './preview-card-trigger'

export { PreviewCard }
