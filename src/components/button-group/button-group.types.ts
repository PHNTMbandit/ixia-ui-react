import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export const buttonGroupVariants = cva(
  'inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full whitespace-nowrap transition-all select-none *:rounded-none *:bg-transparent disabled:pointer-events-none disabled:opacity-50 [&>button]:text-inherit',
  {
    compoundVariants: [
      {
        className: 'bg-brand-default text-brand-on-default [&>button:hover]:bg-brand-muted',
        tone: 'brand',
        variant: 'fill',
      },
      {
        className: 'bg-accent-default text-accent-on-default [&>button:hover]:bg-accent-muted',
        tone: 'accent',
        variant: 'fill',
      },
      {
        className: 'bg-neutral-default text-neutral-on-default [&>button:hover]:bg-neutral-muted',
        tone: 'neutral',
        variant: 'fill',
      },
      {
        className: 'bg-error-default text-error-on-default [&>button:hover]:bg-error-muted',
        tone: 'error',
        variant: 'fill',
      },
      {
        className: 'bg-info-default text-info-on-default [&>button:hover]:bg-info-muted',
        tone: 'info',
        variant: 'fill',
      },
      {
        className: 'bg-success-default text-success-on-default [&>button:hover]:bg-success-muted',
        tone: 'success',
        variant: 'fill',
      },
      {
        className: 'bg-warning-default text-warning-on-default [&>button:hover]:bg-warning-muted',
        tone: 'warning',
        variant: 'fill',
      },
      {
        className:
          'border-brand-border text-brand-default [&>button:hover]:bg-brand-subtle [&>button:hover]:text-brand-on-container',
        tone: 'brand',
        variant: 'outline',
      },
      {
        className:
          'border-accent-border text-accent-default [&>button:hover]:bg-accent-subtle [&>button:hover]:text-accent-on-container',
        tone: 'accent',
        variant: 'outline',
      },
      {
        className:
          'border-neutral-border text-neutral-default [&>button:hover]:bg-neutral-subtle [&>button:hover]:text-neutral-on-container',
        tone: 'neutral',
        variant: 'outline',
      },
      {
        className:
          'border-error-border text-error-default [&>button:hover]:bg-error-subtle [&>button:hover]:text-error-on-container',
        tone: 'error',
        variant: 'outline',
      },
      {
        className:
          'border-info-border text-info-default [&>button:hover]:bg-info-subtle [&>button:hover]:text-info-on-container',
        tone: 'info',
        variant: 'outline',
      },
      {
        className:
          'border-success-border text-success-default [&>button:hover]:bg-success-subtle [&>button:hover]:text-success-on-container',
        tone: 'success',
        variant: 'outline',
      },
      {
        className:
          'border-warning-border text-warning-default [&>button:hover]:bg-warning-subtle [&>button:hover]:text-warning-on-container',
        tone: 'warning',
        variant: 'outline',
      },
      {
        className:
          'text-brand-default [&>button:hover]:bg-brand-subtle [&>button:hover]:text-brand-on-container',
        tone: 'brand',
        variant: 'ghost',
      },
      {
        className:
          'text-accent-default [&>button:hover]:bg-accent-subtle [&>button:hover]:text-accent-on-container',
        tone: 'accent',
        variant: 'ghost',
      },
      {
        className:
          'text-neutral-default [&>button:hover]:bg-neutral-subtle [&>button:hover]:text-neutral-on-container',
        tone: 'neutral',
        variant: 'ghost',
      },
      {
        className:
          'text-error-default [&>button:hover]:bg-error-subtle [&>button:hover]:text-error-on-container',
        tone: 'error',
        variant: 'ghost',
      },
      {
        className:
          'text-info-default [&>button:hover]:bg-info-subtle [&>button:hover]:text-info-on-container',
        tone: 'info',
        variant: 'ghost',
      },
      {
        className:
          'text-success-default [&>button:hover]:bg-success-subtle [&>button:hover]:text-success-on-container',
        tone: 'success',
        variant: 'ghost',
      },
      {
        className:
          'text-warning-default [&>button:hover]:bg-warning-subtle [&>button:hover]:text-warning-on-container',
        tone: 'warning',
        variant: 'ghost',
      },
      {
        className:
          'border-brand-border bg-brand-container text-brand-on-container [&>button:hover]:bg-brand-container-high',
        tone: 'brand',
        variant: 'soft',
      },
      {
        className:
          'border-accent-border bg-accent-container text-accent-on-container [&>button:hover]:bg-accent-container-high',
        tone: 'accent',
        variant: 'soft',
      },
      {
        className:
          'border-neutral-border bg-neutral-container text-neutral-on-container [&>button:hover]:bg-neutral-container-high',
        tone: 'neutral',
        variant: 'soft',
      },
      {
        className:
          'border-error-border bg-error-container text-error-on-container [&>button:hover]:bg-error-container-high',
        tone: 'error',
        variant: 'soft',
      },
      {
        className:
          'border-info-border bg-info-container text-info-on-container [&>button:hover]:bg-info-container-high',
        tone: 'info',
        variant: 'soft',
      },
      {
        className:
          'border-success-border bg-success-container text-success-on-container [&>button:hover]:bg-success-container-high',
        tone: 'success',
        variant: 'soft',
      },
      {
        className:
          'border-warning-border bg-warning-container text-warning-on-container [&>button:hover]:bg-warning-container-high',
        tone: 'warning',
        variant: 'soft',
      },
      {
        className:
          'bg-brand-container text-brand-on-container [&>button]:not-active:hover:bg-brand-container-high [&>button]:active:bg-brand-container',
        tone: 'brand',
        variant: 'elevated',
      },
      {
        className:
          'bg-accent-container text-accent-on-container [&>button]:not-active:hover:bg-accent-container-high [&>button]:active:bg-accent-container',
        tone: 'accent',
        variant: 'elevated',
      },
      {
        className:
          'bg-surface-2 text-on-surface [&>button]:not-active:hover:bg-surface-3 [&>button]:not-active:hover:text-neutral-on-container [&>button]:active:bg-surface',
        tone: 'neutral',
        variant: 'elevated',
      },
      {
        className:
          'bg-error-container text-error-on-container [&>button]:not-active:hover:bg-error-container-high [&>button]:active:bg-error-container',
        tone: 'error',
        variant: 'elevated',
      },
      {
        className:
          'bg-info-container text-info-on-container [&>button]:not-active:hover:bg-info-container-high [&>button]:active:bg-info-container',
        tone: 'info',
        variant: 'elevated',
      },
      {
        className:
          'bg-success-container text-success-on-container [&>button]:not-active:hover:bg-success-container-high [&>button]:active:bg-success-container',
        tone: 'success',
        variant: 'elevated',
      },
      {
        className:
          'bg-warning-container text-warning-on-container [&>button]:not-active:hover:bg-warning-container-high [&>button]:active:bg-warning-container',
        tone: 'warning',
        variant: 'elevated',
      },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'medium',
      tone: 'brand',
      variant: 'fill',
    },
    variants: {
      orientation: {
        horizontal:
          '[&>*+*]:relative [&>*+*]:before:absolute [&>*+*]:before:top-1/2 [&>*+*]:before:left-0 [&>*+*]:before:h-1/2 [&>*+*]:before:w-px [&>*+*]:before:-translate-y-1/2 [&>*+*]:before:content-[""]',
        vertical:
          'flex-col [&>*+*]:relative [&>*+*]:before:absolute [&>*+*]:before:top-0 [&>*+*]:before:left-1/2 [&>*+*]:before:h-px [&>*+*]:before:w-1/2 [&>*+*]:before:-translate-x-1/2 [&>*+*]:before:content-[""]',
      },
      size: {
        extraSmall:
          '*:style-text-default--2 [&>button]:h-md [&>button]:px-2xs [&>button]:[&>svg]:size-2xs',
        iconExtraSmall:
          '*:size-md [&>button]:size-md [&>button]:p-[0px] [&>button]:[&>svg]:size-2xs',
        iconLarge: '*:size-2xl [&>button]:size-2xl [&>button]:p-[0px] [&>button]:[&>svg]:size-md',
        iconMedium: '*:size-xl [&>button]:size-xl [&>button]:p-[0px] [&>button]:[&>svg]:size-sm',
        iconSmall: '*:size-lg [&>button]:size-lg [&>button]:p-[0px] [&>button]:[&>svg]:size-xs',
        large:
          '*:style-text-default-2 [&>button]:h-2xl [&>button]:px-md [&>button]:[&>svg]:size-md',
        medium:
          '*:style-text-default-0 [&>button]:h-xl [&>button]:px-sm [&>button]:[&>svg]:size-sm',
        small:
          '*:style-text-default--1 [&>button]:h-lg [&>button]:px-xs [&>button]:[&>svg]:size-xs',
      },
      tone: {
        accent: '[&>*+*]:before:bg-accent-border',
        brand: '[&>*+*]:before:bg-brand-border',
        error: '[&>*+*]:before:bg-error-border',
        info: '[&>*+*]:before:bg-info-border',
        neutral: '[&>*+*]:before:bg-neutral-border',
        success: '[&>*+*]:before:bg-success-border',
        warning: '',
      },
      variant: {
        elevated: 'shadow-xs *:active:scale-100!',
        fill: '',
        ghost: '',
        outline: 'border',
        soft: 'border',
      },
    },
  },
)

export type ButtonGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof buttonGroupVariants>
