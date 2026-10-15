import { Separator as BaseResizableSeparator } from 'react-resizable-panels'

import { cn } from '@/utils/cn'

import type { ResizeableHandleProps } from './resizeable.types'

export function ResizeableHandle({
  withHandle = false,
  className,
  ...props
}: ResizeableHandleProps) {
  return (
    <BaseResizableSeparator
      className={cn(
        'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-[0px] after:left-1/2 after:w-px after:-translate-x-1/2 focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full after:aria-[orientation=horizontal]:left-[0px] after:aria-[orientation=horizontal]:h-px after:aria-[orientation=horizontal]:w-full after:aria-[orientation=horizontal]:translate-x-[0px] after:aria-[orientation=horizontal]:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90',
        className,
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && <div className="z-10 flex h-md w-3xs shrink-0 rounded-lg bg-border-strong" />}
    </BaseResizableSeparator>
  )
}
