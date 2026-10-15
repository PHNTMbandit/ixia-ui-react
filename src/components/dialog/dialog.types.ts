import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import type { ComponentProps } from 'react'

type DialogProps = ComponentProps<typeof BaseDialog.Root>

type DialogTriggerProps = ComponentProps<typeof BaseDialog.Trigger>

type DialogPopupProps = ComponentProps<typeof BaseDialog.Popup>

type DialogTitleProps = ComponentProps<typeof BaseDialog.Title>

type DialogDescriptionProps = ComponentProps<typeof BaseDialog.Description>

type DialogCloseProps = ComponentProps<typeof BaseDialog.Close>
type DialogContentProps = React.ComponentProps<'div'>
type DialogHeaderProps = React.ComponentProps<'div'>
type DialogFooterProps = React.ComponentProps<'div'>
type DialogIconProps = React.ComponentProps<'div'>
const DialogHelper = BaseDialog

export type {
  DialogProps,
  DialogTriggerProps,
  DialogPopupProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogIconProps,
}
export { DialogHelper }
