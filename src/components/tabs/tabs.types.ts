import type { Tabs as BaseTabs } from '@base-ui/react/tabs'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import type React from 'react'

type TabsPanelProps = ComponentProps<typeof BaseTabs.Panel>
type TabsTabProps = ComponentProps<typeof BaseTabs.Tab>
type TabsIndicatorProps = ComponentProps<typeof BaseTabs.Indicator>
type TabsListProps = ComponentProps<typeof BaseTabs.List>

const tabsVariants = cva('', {
  compoundVariants: [
    {
      class:
        '[&_[role=presentation]]:bg-brand-default [&_[role=tab]]:data-active:text-brand-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-brand-default',
      tone: 'brand',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-accent-default [&_[role=tab]]:data-active:text-accent-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-accent-default',
      tone: 'accent',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-neutral-default [&_[role=tab]]:data-active:text-neutral-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-neutral-default',
      tone: 'neutral',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-error-default [&_[role=tab]]:data-active:text-error-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-error-default',
      tone: 'error',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-info-default [&_[role=tab]]:data-active:text-info-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-info-default',
      tone: 'info',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-success-default [&_[role=tab]]:data-active:text-success-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-success-default',
      tone: 'success',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:bg-warning-default [&_[role=tab]]:data-active:text-warning-on-default [&_[role=tab]]:hover:[&:not([data-active])]:text-warning-default',
      tone: 'warning',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:border-brand-border [&_[role=presentation]]:bg-brand-container [&_[role=tab]]:data-active:text-brand-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-brand-default',
      tone: 'brand',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-accent-border [&_[role=presentation]]:bg-accent-container [&_[role=tab]]:data-active:text-accent-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-accent-default',
      tone: 'accent',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-neutral-border [&_[role=presentation]]:bg-neutral-container [&_[role=tab]]:data-active:text-neutral-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-neutral-default',
      tone: 'neutral',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-error-border [&_[role=presentation]]:bg-error-container [&_[role=tab]]:data-active:text-error-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-error-default',
      tone: 'error',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-info-border [&_[role=presentation]]:bg-info-container [&_[role=tab]]:data-active:text-info-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-info-default',
      tone: 'info',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-success-border [&_[role=presentation]]:bg-success-container [&_[role=tab]]:data-active:text-success-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-success-default',
      tone: 'success',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:border-warning-border [&_[role=presentation]]:bg-warning-container [&_[role=tab]]:data-active:text-warning-on-container [&_[role=tab]]:hover:[&:not([data-active])]:text-warning-default',
      tone: 'warning',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:bg-brand-default [&_[role=tab]]:data-active:text-brand-default [&_[role=tab]]:hover:[&:not([data-active])]:text-brand-default',
      tone: 'brand',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-accent-default [&_[role=tab]]:data-active:text-accent-default [&_[role=tab]]:hover:[&:not([data-active])]:text-accent-default',
      tone: 'accent',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-neutral-default [&_[role=tab]]:data-active:text-neutral-default [&_[role=tab]]:hover:[&:not([data-active])]:text-neutral-default',
      tone: 'neutral',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-error-default [&_[role=tab]]:data-active:text-error-default [&_[role=tab]]:hover:[&:not([data-active])]:text-error-default',
      tone: 'error',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-info-default [&_[role=tab]]:data-active:text-info-default [&_[role=tab]]:hover:[&:not([data-active])]:text-info-default',
      tone: 'info',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-success-default [&_[role=tab]]:data-active:text-success-default [&_[role=tab]]:hover:[&:not([data-active])]:text-success-default',
      tone: 'success',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:bg-warning-default [&_[role=tab]]:data-active:text-warning-default [&_[role=tab]]:hover:[&:not([data-active])]:text-warning-default',
      tone: 'warning',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-lg [&_[role=tab]]:rounded-lg [&_[role=tablist]]:rounded-lg',
      size: 'small',
      variant: 'default',
    },
    {
      class:
        '[&_[role=tab]]:h-lg [&_[role=tab]]:px-sm [&_[role=tab]]:style-text-default--1 [&_[role=tablist]]:gap-2xs [&_[role=tablist]]:p-3xs',
      size: 'small',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-xl [&_[role=tab]]:h-xl [&_[role=tab]]:rounded-xl [&_[role=tab]]:px-md [&_[role=tab]]:style-text-default-0 [&_[role=tablist]]:gap-xs [&_[role=tablist]]:rounded-xl [&_[role=tablist]]:p-2xs',
      size: 'medium',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-2xl [&_[role=tab]]:h-2xl [&_[role=tab]]:rounded-2xl [&_[role=tab]]:px-lg [&_[role=tab]]:style-text-default-1 [&_[role=tablist]]:gap-sm [&_[role=tablist]]:rounded-2xl [&_[role=tablist]]:p-xs',
      size: 'large',
      variant: 'default',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-lg [&_[role=tab]]:h-lg [&_[role=tab]]:px-sm [&_[role=tab]]:style-text-default--1 [&_[role=tablist]]:gap-2xs [&_[role=tablist]]:rounded-lg [&_[role=tablist]]:p-3xs',
      size: 'small',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-xl [&_[role=tab]]:h-xl [&_[role=tab]]:px-md [&_[role=tab]]:style-text-default-0 [&_[role=tablist]]:gap-xs [&_[role=tablist]]:rounded-xl [&_[role=tablist]]:p-2xs',
      size: 'medium',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=presentation]]:rounded-2xl [&_[role=tab]]:h-2xl [&_[role=tab]]:px-lg [&_[role=tab]]:style-text-default-1 [&_[role=tablist]]:gap-sm [&_[role=tablist]]:rounded-2xl [&_[role=tablist]]:p-xs',
      size: 'large',
      variant: 'ghost',
    },
    {
      class:
        '[&_[role=tab]]:px-lg [&_[role=tab]]:pb-sm [&_[role=tab]]:style-text-default--1 [&_[role=tablist]]:h-lg [&_[role=tablist]]:gap-md [&_[role=tablist]]:border-b-2 **:[[role=presentation]]:bottom-[-3px] **:[[role=presentation]]:h-[2px]',
      size: 'small',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=tab]]:px-xl [&_[role=tab]]:pb-xs [&_[role=tab]]:style-text-default-0 [&_[role=tablist]]:h-xl [&_[role=tablist]]:gap-lg [&_[role=tablist]]:border-b-3 **:[[role=presentation]]:bottom-[-4px] **:[[role=presentation]]:h-[3px]',
      size: 'medium',
      variant: 'underline',
    },
    {
      class:
        '[&_[role=tab]]:px-2xl [&_[role=tab]]:pb-2xs [&_[role=tab]]:style-text-default-1 [&_[role=tablist]]:h-2xl [&_[role=tablist]]:gap-xl [&_[role=tablist]]:border-b-4 **:[[role=presentation]]:bottom-[-5px] **:[[role=presentation]]:h-[4px]',
      size: 'large',
      variant: 'underline',
    },
  ],
  defaultVariants: {
    fill: true,
    size: 'medium',
    tone: 'brand',
    variant: 'default',
  },
  variants: {
    fill: {
      false: '[&_[role=tablist]]:w-fit',
      true: '[&_[role=tab]]:grow [&_[role=tablist]]:w-full',
    },
    size: {
      large: '',
      medium: '',
      small: '',
    },
    tone: {
      accent: '',
      brand: '',
      error: '',
      info: '',
      neutral: '',
      success: '',
      warning: '',
    },
    variant: {
      default: 'space-y-xs [&_[role=presentation]]:top-1/2 [&_[role=tablist]]:bg-surface-low',
      ghost: 'space-y-2xs [&_[role=presentation]]:top-1/2 [&_[role=presentation]]:border',
      underline: 'space-y-xs [&_[role=tablist]]:border-border',
    },
  },
})

type TabsProps = React.ComponentProps<typeof BaseTabs.Root> & VariantProps<typeof tabsVariants>
type TabsTabValue = TabsTabProps['value']

export type {
  TabsProps,
  TabsTabValue,
  TabsPanelProps,
  TabsTabProps,
  TabsIndicatorProps,
  TabsListProps,
}
export { tabsVariants }
