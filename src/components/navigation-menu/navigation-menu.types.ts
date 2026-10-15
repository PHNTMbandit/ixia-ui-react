import type { NavigationMenu } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

type NavigationMenuProps = React.ComponentProps<typeof NavigationMenu.Root>
type NavigationMenuListProps = React.ComponentProps<typeof NavigationMenu.List>
type NavigationMenuItemProps = React.ComponentProps<typeof NavigationMenu.Item>
type NavigationMenuTriggerProps = React.ComponentProps<typeof NavigationMenu.Trigger> &
  VariantProps<typeof navigationMenuTriggerVariants> & { isActive?: boolean }
type NavigationMenuIconProps = React.ComponentProps<typeof NavigationMenu.Icon>
type NavigationMenuContentProps = React.ComponentProps<typeof NavigationMenu.Content>
type NavigationMenuPopupProps = React.ComponentProps<typeof NavigationMenu.Positioner>

const navigationMenuTriggerVariants = cva(
    'flex items-center justify-center rounded-full bg-transparent no-underline transition-colors select-none hover:cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-1',
    {
      defaultVariants: {
        size: 'medium',
        tone: 'neutral',
      },
      variants: {
        size: {
          large: 'h-2xl gap-xs px-md style-text-default-2 [&>svg]:size-md',
          medium: 'h-xl gap-2xs px-sm style-text-default-0 [&>svg]:size-sm',
          small: 'h-lg gap-3xs px-xs style-text-default--1 [&>svg]:size-xs',
        },
        tone: {
          accent:
            'text-accent-default data-popup-open:bg-accent-container data-popup-open:text-accent-on-container',
          brand:
            'text-brand-default data-popup-open:bg-brand-container data-popup-open:text-brand-on-container',
          error:
            'text-error-default data-popup-open:bg-error-container data-popup-open:text-error-on-container',
          info: 'text-info-default data-popup-open:bg-info-container data-popup-open:text-info-on-container',
          neutral:
            'text-neutral-default data-popup-open:bg-neutral-container data-popup-open:text-neutral-on-container',
          success:
            'text-success-default data-popup-open:bg-success-container data-popup-open:text-success-on-container',
          warning:
            'text-warning-default data-popup-open:bg-warning-container data-popup-open:text-warning-on-container',
        },
      },
    },
  ),
  navigationMenuLinkVariants = cva(
    'rounded-lg px-sm py-xs transition-colors hover:cursor-pointer',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: {
          accent: 'text-accent-on-container hover:bg-accent-container',
          brand: 'text-brand-on-container hover:bg-brand-container',
          error: 'text-error-on-container hover:bg-error-container',
          info: 'text-info-on-container hover:bg-info-container',
          neutral: 'text-neutral-on-container hover:bg-neutral-container',
          success: 'text-success-on-container hover:bg-success-container',
          warning: 'text-warning-on-container hover:bg-warning-container',
        },
      },
    },
  )

type NavigationMenuLinkProps = VariantProps<typeof navigationMenuLinkVariants> &
  React.ComponentProps<'div'>

export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuIconProps,
  NavigationMenuContentProps,
  NavigationMenuPopupProps,
  NavigationMenuLinkProps,
}
export { navigationMenuLinkVariants, navigationMenuTriggerVariants }
