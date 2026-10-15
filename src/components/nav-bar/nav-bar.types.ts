import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

type NavBarProps = React.ComponentProps<'div'> & VariantProps<typeof navBarVariants>
type NavBarItemProps = React.ComponentProps<'button'> &
  VariantProps<typeof navBarItemVariants> & {
    isActive?: boolean
  }
type NavBarItemIconProps = React.ComponentProps<'div'>
type NavBarItemLabelProps = React.ComponentProps<'span'>

const navBarVariants = cva('flex h-fit items-center justify-between', {
    compoundVariants: [
      {
        className: 'rounded-xl',
        size: 'small',
        variant: 'floating',
      },
      {
        className: 'rounded-2xl',
        size: 'medium',
        variant: 'floating',
      },
      {
        className: 'rounded-3xl',
        size: 'large',
        variant: 'floating',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:size-xl [&_[data-nav-bar-item]]:gap-3xs [&_[data-nav-bar-item]]:rounded-xl',
        itemOrientation: 'vertical',
        size: 'small',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:size-2xl [&_[data-nav-bar-item]]:gap-3xs [&_[data-nav-bar-item]]:rounded-2xl',
        itemOrientation: 'vertical',
        size: 'medium',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:size-3xl [&_[data-nav-bar-item]]:gap-2xs [&_[data-nav-bar-item]]:rounded-3xl',
        itemOrientation: 'vertical',
        size: 'large',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:h-lg [&_[data-nav-bar-item]]:gap-3xs [&_[data-nav-bar-item]]:rounded-lg [&_[data-nav-bar-item]]:px-xs',
        itemOrientation: 'horizontal',
        size: 'small',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:h-xl [&_[data-nav-bar-item]]:gap-2xs [&_[data-nav-bar-item]]:rounded-xl [&_[data-nav-bar-item]]:px-sm',
        itemOrientation: 'horizontal',
        size: 'medium',
      },
      {
        className:
          '[&_[data-nav-bar-item]]:h-2xl [&_[data-nav-bar-item]]:gap-xs [&_[data-nav-bar-item]]:rounded-2xl [&_[data-nav-bar-item]]:px-md',
        itemOrientation: 'horizontal',
        size: 'large',
      },
    ],
    defaultVariants: {
      itemOrientation: 'vertical',
      size: 'medium',
      variant: 'outline',
    },
    variants: {
      itemOrientation: {
        horizontal: '[&_[data-nav-bar-item]]:flex-row',
        vertical: '[&_[data-nav-bar-item]]:flex-col',
      },
      size: {
        large: 'gap-sm p-md [&_span]:style-text-default-0 [&_svg]:size-lg',
        medium: 'gap-xs p-sm [&_span]:style-text-default--1 [&_svg]:size-md',
        small: 'gap-2xs p-xs [&_span]:style-text-default--2 [&_svg]:size-sm',
      },
      variant: {
        floating: 'absolute bottom-md w-fit max-w-15/16 overflow-x-auto bg-surface shadow-2xs',
        outline: 'w-full border border-border bg-surface-background',
      },
    },
  }),
  navBarItemVariants = cva(
    'flex aspect-square items-center justify-center transition-all disabled:pointer-events-none disabled:opacity-50 data-[active=false]:hover:cursor-pointer data-[active=false]:active:scale-95 [&>svg]:shrink-0',
    {
      defaultVariants: {
        tone: 'neutral',
      },
      variants: {
        tone: {
          accent:
            'text-accent-default hover:bg-accent-container hover:text-accent-on-container data-[active=true]:bg-accent-container data-[active=true]:text-accent-on-container',
          brand:
            'text-brand-default hover:bg-brand-container hover:text-brand-on-container data-[active=true]:bg-brand-container data-[active=true]:text-brand-on-container',
          error:
            'text-error-default hover:bg-error-container hover:text-error-on-container data-[active=true]:bg-error-container data-[active=true]:text-error-on-container',
          info: 'text-info-default hover:bg-info-container hover:text-info-on-container data-[active=true]:bg-info-container data-[active=true]:text-info-on-container',
          neutral:
            'text-neutral-default hover:bg-neutral-container hover:text-neutral-on-container data-[active=true]:bg-neutral-container data-[active=true]:text-neutral-on-container',
          success:
            'text-success-default hover:bg-success-container hover:text-success-on-container data-[active=true]:bg-success-container data-[active=true]:text-success-on-container',
          warning:
            'text-warning-default hover:bg-warning-container hover:text-warning-on-container data-[active=true]:bg-warning-container data-[active=true]:text-warning-on-container',
        },
      },
    },
  )

export { navBarVariants, navBarItemVariants }
export type { NavBarProps, NavBarItemProps, NavBarItemIconProps, NavBarItemLabelProps }
