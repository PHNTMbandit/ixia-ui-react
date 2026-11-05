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

const navigationMenuItemClasses =
    'flex items-center justify-center rounded-full bg-transparent no-underline transition-colors select-none hover:cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-1',
  navigationMenuSizes = {
    large:
      'h-2xl gap-xs px-md style-text-default-2 [&>[data-slot=nav-menu-icon]]:ml-md [&>svg]:size-lg',
    medium:
      'h-xl gap-2xs px-sm style-text-default-0 [&>[data-slot=nav-menu-icon]]:ml-sm [&>svg]:size-md',
    small:
      'h-lg gap-3xs px-xs style-text-default--1 [&>[data-slot=nav-menu-icon]]:ml-xs [&>svg]:size-sm',
  },
  navigationMenuTriggerVariants = cva(navigationMenuItemClasses, {
    defaultVariants: {
      size: 'medium',
      tone: 'neutral',
    },
    variants: {
      size: navigationMenuSizes,
      tone: {
        accent:
          'text-accent-default hover:bg-accent-container hover:text-accent-on-container data-popup-open:bg-accent-container data-popup-open:text-accent-on-container',
        brand:
          'text-brand-default hover:bg-brand-container hover:text-brand-on-container data-popup-open:bg-brand-container data-popup-open:text-brand-on-container',
        error:
          'text-error-default hover:bg-error-container hover:text-error-on-container data-popup-open:bg-error-container data-popup-open:text-error-on-container',
        info: 'text-info-default hover:bg-info-container hover:text-info-on-container data-popup-open:bg-info-container data-popup-open:text-info-on-container',
        neutral:
          'text-neutral-default hover:bg-neutral-container hover:text-neutral-on-container data-popup-open:bg-neutral-container data-popup-open:text-neutral-on-container',
        success:
          'text-success-default hover:bg-success-container hover:text-success-on-container data-popup-open:bg-success-container data-popup-open:text-success-on-container',
        warning:
          'text-warning-default hover:bg-warning-container hover:text-warning-on-container data-popup-open:bg-warning-container data-popup-open:text-warning-on-container',
      },
    },
  }),
  navigationMenuLinkVariants = cva(navigationMenuItemClasses, {
    defaultVariants: {
      size: 'medium',
      tone: 'neutral',
    },
    variants: {
      size: navigationMenuSizes,
      tone: {
        accent: 'text-accent-default hover:bg-accent-container hover:text-accent-on-container',
        brand: 'text-brand-default hover:bg-brand-container hover:text-brand-on-container',
        error: 'text-error-default hover:bg-error-container hover:text-error-on-container',
        info: 'text-info-default hover:bg-info-container hover:text-info-on-container',
        neutral: 'text-neutral-default hover:bg-neutral-container hover:text-neutral-on-container',
        success: 'text-success-default hover:bg-success-container hover:text-success-on-container',
        warning: 'text-warning-default hover:bg-warning-container hover:text-warning-on-container',
      },
    },
  }),
  navigationMenuContentLinkVariants = cva(
    'block rounded-xl px-sm py-xs no-underline transition-colors hover:cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-1',
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
  React.ComponentProps<typeof NavigationMenu.Link>
type NavigationMenuContentLinkProps = VariantProps<typeof navigationMenuContentLinkVariants> &
  React.ComponentProps<'div'>

export type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuIconProps,
  NavigationMenuContentProps,
  NavigationMenuContentLinkProps,
  NavigationMenuPopupProps,
  NavigationMenuLinkProps,
}
export {
  navigationMenuContentLinkVariants,
  navigationMenuLinkVariants,
  navigationMenuTriggerVariants,
}
