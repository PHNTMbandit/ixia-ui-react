import { PreviewCard as BasePreviewCard } from '@base-ui/react'

import { cn } from '@/utils/cn'

import type { PreviewCardTriggerProps } from './preview-card.types'

export function PreviewCardTrigger({ className, ref, ...props }: PreviewCardTriggerProps) {
  return <BasePreviewCard.Trigger className={cn('', className)} ref={ref} {...props} />
}
