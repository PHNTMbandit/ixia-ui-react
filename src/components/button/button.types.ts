import type { Button as BaseButton } from '@base-ui/react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded-full whitespace-nowrap transition-all select-none disabled:pointer-events-none disabled:opacity-50',
  {
    compoundVariants: [
      {
        className: 'bg-brand-default text-brand-on-default hover:bg-brand-muted',
        tone: 'brand',
        variant: 'fill',
      },
      {
        className: 'bg-accent-default text-accent-on-default hover:bg-accent-muted',
        tone: 'accent',
        variant: 'fill',
      },
      {
        className: 'bg-neutral-default text-neutral-on-default hover:bg-neutral-muted',
        tone: 'neutral',
        variant: 'fill',
      },
      {
        className: 'bg-error-default text-error-on-default hover:bg-error-muted',
        tone: 'error',
        variant: 'fill',
      },
      {
        className: 'bg-info-default text-info-on-default hover:bg-info-muted',
        tone: 'info',
        variant: 'fill',
      },
      {
        className: 'bg-success-default text-success-on-default hover:bg-success-muted',
        tone: 'success',
        variant: 'fill',
      },
      {
        className: 'bg-warning-default text-warning-on-default hover:bg-warning-muted',
        tone: 'warning',
        variant: 'fill',
      },
      {
        className:
          'border-brand-border text-brand-default hover:bg-brand-subtle hover:text-brand-on-container',
        tone: 'brand',
        variant: 'outline',
      },
      {
        className:
          'border-accent-border text-accent-default hover:bg-accent-subtle hover:text-accent-on-container',
        tone: 'accent',
        variant: 'outline',
      },
      {
        className:
          'border-neutral-border text-neutral-default hover:bg-neutral-subtle hover:text-neutral-on-container',
        tone: 'neutral',
        variant: 'outline',
      },
      {
        className:
          'border-error-border text-error-default hover:bg-error-subtle hover:text-error-on-container',
        tone: 'error',
        variant: 'outline',
      },
      {
        className:
          'border-info-border text-info-default hover:bg-info-subtle hover:text-info-on-container',
        tone: 'info',
        variant: 'outline',
      },
      {
        className:
          'border-success-border text-success-default hover:bg-success-subtle hover:text-success-on-container',
        tone: 'success',
        variant: 'outline',
      },
      {
        className:
          'border-warning-border text-warning-default hover:bg-warning-subtle hover:text-warning-on-container',
        tone: 'warning',
        variant: 'outline',
      },
      {
        className: 'text-brand-default hover:bg-brand-subtle hover:text-brand-on-container',
        tone: 'brand',
        variant: 'ghost',
      },
      {
        className: 'text-accent-default hover:bg-accent-subtle hover:text-accent-on-container',
        tone: 'accent',
        variant: 'ghost',
      },
      {
        className: 'text-neutral-default hover:bg-neutral-subtle hover:text-neutral-on-container',
        tone: 'neutral',
        variant: 'ghost',
      },
      {
        className: 'text-error-default hover:bg-error-subtle hover:text-error-on-container',
        tone: 'error',
        variant: 'ghost',
      },
      {
        className: 'text-info-default hover:bg-info-subtle hover:text-info-on-container',
        tone: 'info',
        variant: 'ghost',
      },
      {
        className: 'text-success-default hover:bg-success-subtle hover:text-success-on-container',
        tone: 'success',
        variant: 'ghost',
      },
      {
        className: 'text-warning-default hover:bg-warning-subtle hover:text-warning-on-container',
        tone: 'warning',
        variant: 'ghost',
      },
      {
        className:
          'border-brand-border bg-brand-container text-brand-on-container hover:border-brand-border-strong hover:bg-brand-container-high',
        tone: 'brand',
        variant: 'soft',
      },
      {
        className:
          'border-accent-border bg-accent-container text-accent-on-container hover:border-accent-border-strong hover:bg-accent-container-high',
        tone: 'accent',
        variant: 'soft',
      },
      {
        className:
          'border-neutral-border bg-neutral-container text-neutral-on-container hover:border-neutral-border-strong hover:bg-neutral-container-high',
        tone: 'neutral',
        variant: 'soft',
      },
      {
        className:
          'border-error-border bg-error-container text-error-on-container hover:border-error-border-strong hover:bg-error-container-high',
        tone: 'error',
        variant: 'soft',
      },
      {
        className:
          'border-info-border bg-info-container text-info-on-container hover:border-info-border-strong hover:bg-info-container-high',
        tone: 'info',
        variant: 'soft',
      },
      {
        className:
          'border-success-border bg-success-container text-success-on-container hover:border-success-border-strong hover:bg-success-container-high',
        tone: 'success',
        variant: 'soft',
      },
      {
        className:
          'border-warning-border bg-warning-container text-warning-on-container hover:border-warning-border-strong hover:bg-warning-container-high',
        tone: 'warning',
        variant: 'soft',
      },
      {
        className:
          'bg-brand-container text-brand-on-container not-active:hover:bg-brand-container-high',
        tone: 'brand',
        variant: 'elevated',
      },
      {
        className:
          'bg-accent-container text-accent-on-container not-active:hover:bg-accent-container-high',
        tone: 'accent',
        variant: 'elevated',
      },
      {
        className: 'bg-surface-2 text-on-surface not-active:hover:bg-surface-3',
        tone: 'neutral',
        variant: 'elevated',
      },
      {
        className:
          'bg-error-container text-error-on-container not-active:hover:bg-error-container-high',
        tone: 'error',
        variant: 'elevated',
      },
      {
        className:
          'bg-info-container text-info-on-container not-active:hover:bg-info-container-high',
        tone: 'info',
        variant: 'elevated',
      },
      {
        className:
          'bg-success-container text-success-on-container not-active:hover:bg-success-container-high',
        tone: 'success',
        variant: 'elevated',
      },
      {
        className:
          'bg-warning-container text-warning-on-container not-active:hover:bg-warning-container-high',
        tone: 'warning',
        variant: 'elevated',
      },
      {
        className:
          'text-brand-default hover:decoration-brand-default [&>svg]:text-brand-default/50 hover:[&>svg]:text-brand-default',
        tone: 'brand',
        variant: 'link',
      },
      {
        className:
          'text-accent-default hover:decoration-accent-default [&>svg]:text-accent-default/50 hover:[&>svg]:text-accent-default',
        tone: 'accent',
        variant: 'link',
      },
      {
        className:
          'text-neutral-default hover:decoration-neutral-default [&>svg]:text-neutral-default/50 hover:[&>svg]:text-neutral-default',
        tone: 'neutral',
        variant: 'link',
      },
      {
        className:
          'text-error-default hover:decoration-error-default [&>svg]:text-error-default/50 hover:[&>svg]:text-error-default',
        tone: 'error',
        variant: 'link',
      },
      {
        className:
          'text-info-default hover:decoration-info-default [&>svg]:text-info-default/50 hover:[&>svg]:text-info-default',
        tone: 'info',
        variant: 'link',
      },
      {
        className:
          'text-success-default hover:decoration-success-default [&>svg]:text-success-default/50 hover:[&>svg]:text-success-default',
        tone: 'success',
        variant: 'link',
      },
      {
        className:
          'text-warning-default hover:decoration-warning-default [&>svg]:text-warning-default/50 hover:[&>svg]:text-warning-default',
        tone: 'warning',
        variant: 'link',
      },
    ],
    defaultVariants: {
      size: 'medium',
      tone: 'brand',
      variant: 'fill',
    },
    variants: {
      size: {
        extraSmall: 'h-md gap-3xs px-2xs style-text-default--2 [&>svg]:size-xs',
        iconExtraSmall: 'size-md p-[0px] [&>svg]:size-xs',
        iconLarge: 'size-2xl p-[0px] [&>svg]:size-md',
        iconMedium: 'size-xl p-[0px] [&>svg]:size-sm',
        iconSmall: 'size-lg p-[0px] [&>svg]:size-xs',
        large: 'h-2xl gap-xs px-md style-text-default-2 [&>svg]:size-md',
        medium: 'h-xl gap-2xs px-sm style-text-default-0 [&>svg]:size-sm',
        small: 'h-lg gap-3xs px-xs style-text-default--1 [&>svg]:size-xs',
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
        elevated: 'shadow-xs not-active:hover:shadow-md',
        fill: 'active:scale-[0.98]',
        ghost: 'active:scale-[0.98]',
        link: 'size-fit! p-0! underline decoration-transparent underline-offset-2 [&>svg]:transition-colors',
        outline: 'border active:scale-[0.98]',
        soft: 'border active:scale-[0.98]',
      },
    },
  },
)

export type ButtonProps = React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonVariants>
