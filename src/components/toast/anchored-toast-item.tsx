import { Toast as BaseToast } from '@base-ui/react/toast'

import { cn } from '@/utils/cn'

import type { AnchoredToastItemProps } from './toast.types'

export function AnchoredToastItem({ className, ref, toast, ...props }: AnchoredToastItemProps) {
  return (
    <BaseToast.Root
      className={cn(
        'group flex w-max origin-(--transform-origin) flex-col rounded-full bg-surface px-sm py-2xs shadow-lg transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
        className,
      )}
      ref={ref}
      toast={toast}
      {...props}
    >
      <BaseToast.Arrow className="data-[side=bottom]:-top-3xs data-[side=left]:right-[-13px] data-[side=left]:rotate-90 data-[side=right]:left-[-13px] data-[side=right]:-rotate-90 data-[side=top]:-bottom-3xs data-[side=top]:rotate-180" />
      <BaseToast.Content>
        <BaseToast.Description className="style-text-default--1" />
      </BaseToast.Content>
    </BaseToast.Root>
  )
}
