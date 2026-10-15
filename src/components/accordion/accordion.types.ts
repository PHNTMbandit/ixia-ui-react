import type { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type React from 'react'

type AccordionProps = React.ComponentProps<typeof BaseAccordion.Root> &
  VariantProps<typeof accordionVariants> & {
    withSeparator?: boolean
  }

type AccordionPanelProps = React.ComponentProps<typeof BaseAccordion.Panel>

const accordionVariants = cva('flex flex-col justify-center', {
    defaultVariants: {
      variant: 'surface',
    },
    variants: {
      variant: {
        ghost: 'bg-transparent',
        surface: 'overflow-hidden rounded-xl bg-surface shadow-2xs',
      },
    },
  }),
  accordionItemVariants = cva(
    'group transition-all data-disabled:pointer-events-none data-disabled:opacity-50',
    {
      defaultVariants: {
        size: 'medium',
        tone: 'brand',
      },
      variants: {
        size: {
          large:
            '[&_[data-slot=accordion-content]]:gap-x-sm [&_[data-slot=accordion-down-icon]]:size-md [&_[data-slot=accordion-subtitle]]:style-text-prose-0 [&_[data-slot=accordion-title]]:style-text-strong-1 [&_[data-slot=accordion-trigger]]:h-3xl [&_[data-slot=accordion-trigger]]:gap-md [&_[data-slot=accordion-trigger]]:pr-sm [&_[data-slot=accordion-trigger]]:pl-lg [&_[data-slot=accordion-icon]]:[&>svg]:size-lg',
          medium:
            '[&_[data-slot=accordion-content]]:gap-x-xs [&_[data-slot=accordion-down-icon]]:size-sm [&_[data-slot=accordion-subtitle]]:style-text-prose--1 [&_[data-slot=accordion-title]]:style-text-strong-0 [&_[data-slot=accordion-trigger]]:h-2xl [&_[data-slot=accordion-trigger]]:gap-sm [&_[data-slot=accordion-trigger]]:pr-sm [&_[data-slot=accordion-trigger]]:pl-md [&_[data-slot=accordion-icon]]:[&>svg]:size-md',
          small:
            '[&_[data-slot=accordion-content]]:gap-x-2xs [&_[data-slot=accordion-down-icon]]:size-xs [&_[data-slot=accordion-subtitle]]:style-text-prose--2 [&_[data-slot=accordion-title]]:style-text-strong--1 [&_[data-slot=accordion-trigger]]:h-xl [&_[data-slot=accordion-trigger]]:gap-xs [&_[data-slot=accordion-trigger]]:px-sm [&_[data-slot=accordion-icon]]:[&>svg]:size-sm',
        },
        tone: {
          accent:
            '[&_[data-slot=accordion-icon]]:text-accent-default [&_[data-slot=accordion-subtitle]]:text-accent-muted [&_[data-slot=accordion-title]]:text-accent-default [&:not([data-open])]:hover:bg-accent-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-accent-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-accent-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-accent-on-container',
          brand:
            '[&_[data-slot=accordion-icon]]:text-brand-default [&_[data-slot=accordion-subtitle]]:text-brand-muted [&_[data-slot=accordion-title]]:text-brand-default [&:not([data-open])]:hover:bg-brand-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-brand-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-brand-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-brand-on-container',
          error:
            '[&_[data-slot=accordion-icon]]:text-error-default [&_[data-slot=accordion-subtitle]]:text-error-muted [&_[data-slot=accordion-title]]:text-error-default [&:not([data-open])]:hover:bg-error-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-error-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-error-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-error-on-container',
          info: '[&_[data-slot=accordion-icon]]:text-info-default [&_[data-slot=accordion-subtitle]]:text-info-muted [&_[data-slot=accordion-title]]:text-info-default [&:not([data-open])]:hover:bg-info-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-info-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-info-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-info-on-container',
          neutral:
            '[&_[data-slot=accordion-icon]]:text-neutral-default [&_[data-slot=accordion-subtitle]]:text-neutral-muted [&_[data-slot=accordion-title]]:text-neutral-default [&:not([data-open])]:hover:bg-neutral-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-neutral-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-neutral-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-neutral-on-container',
          success:
            '[&_[data-slot=accordion-icon]]:text-success-default [&_[data-slot=accordion-subtitle]]:text-success-muted [&_[data-slot=accordion-title]]:text-success-default [&:not([data-open])]:hover:bg-success-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-success-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-success-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-success-on-container',
          warning:
            '[&_[data-slot=accordion-icon]]:text-warning-default [&_[data-slot=accordion-subtitle]]:text-warning-muted [&_[data-slot=accordion-title]]:text-warning-default [&:not([data-open])]:hover:bg-warning-container [&:not([data-open])]:hover:[&_[data-slot=accordion-icon]]:text-warning-on-container [&:not([data-open])]:hover:[&_[data-slot=accordion-subtitle]]:text-warning-on-container-muted [&:not([data-open])]:hover:[&_[data-slot=accordion-title]]:text-warning-on-container',
        },
      },
    },
  )

type AccordionItemProps = React.ComponentProps<typeof BaseAccordion.Item> &
  VariantProps<typeof accordionItemVariants>
type AccordionHeaderProps = React.ComponentProps<typeof BaseAccordion.Header>
type AccordionTitleProps = React.ComponentProps<'div'>
type AccordionSubtitleProps = React.ComponentProps<'div'>
type AccordionIconProps = React.ComponentProps<'div'>

export type {
  AccordionProps,
  AccordionItemProps,
  AccordionHeaderProps,
  AccordionTitleProps,
  AccordionSubtitleProps,
  AccordionIconProps,
  AccordionPanelProps,
}
export { accordionVariants, accordionItemVariants }
