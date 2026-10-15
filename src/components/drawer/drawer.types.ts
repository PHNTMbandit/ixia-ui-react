import type { Drawer as BaseDrawer } from '@base-ui/react'

type DrawerProps = BaseDrawer.Root.Props
type DrawerProviderProps = BaseDrawer.Provider.Props
type DrawerTriggerProps = BaseDrawer.Trigger.Props
type DrawerPopupProps = BaseDrawer.Popup.Props
type DrawerContentProps = BaseDrawer.Content.Props
type DrawerTitleProps = BaseDrawer.Title.Props
type DrawerDescriptionProps = BaseDrawer.Description.Props
type DrawerCloseProps = BaseDrawer.Close.Props
type DrawerHeaderProps = React.ComponentProps<'div'>

export type {
  DrawerProps,
  DrawerProviderProps,
  DrawerTriggerProps,
  DrawerPopupProps,
  DrawerContentProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
  DrawerHeaderProps,
}
