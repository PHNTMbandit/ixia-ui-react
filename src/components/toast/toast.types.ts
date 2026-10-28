import type { Toast as BaseToast, ToastObject } from '@base-ui/react/toast'
import type { ComponentProps } from 'react'

import type { IconComponent } from '../icon'

type ToastVariant = 'brand' | 'accent' | 'neutral' | 'success' | 'error' | 'info' | 'warning'

type ToastProviderProps = ComponentProps<'div'>
type AnchoredToastProps = ComponentProps<typeof BaseToast.Viewport>
type StackToastProps = ComponentProps<typeof BaseToast.Viewport>
interface StackToastData {
  icon?: IconComponent
  variant?: ToastVariant
  [key: string]: unknown
}

type StackToastItemProps = React.ComponentProps<'div'> & {
  toast: ToastObject<StackToastData>
}
type AnchoredToastData = Record<string, unknown>

type AnchoredToastItemProps = React.ComponentProps<'div'> & {
  toast: ToastObject<AnchoredToastData>
}

export type {
  ToastVariant,
  ToastProviderProps,
  AnchoredToastProps,
  StackToastProps,
  StackToastData,
  StackToastItemProps,
  AnchoredToastData,
  AnchoredToastItemProps,
}
