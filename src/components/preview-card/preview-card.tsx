import { PreviewCard as BasePreviewCard } from '@base-ui/react'

import type { PreviewCardProps } from './preview-card.types'

export function PreviewCard({ ...props }: PreviewCardProps) {
  return <BasePreviewCard.Root {...props} />
}
