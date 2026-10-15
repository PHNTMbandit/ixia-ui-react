import type { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const avatarVariants = cva(
    'group/avatar relative inline-flex shrink-0 items-center justify-center rounded-full',
    {
      defaultVariants: {
        size: 'medium',
      },
      variants: {
        size: {
          large: 'size-2xl style-text-default-1',
          medium: 'size-xl style-text-default-0',
          small: 'size-lg style-text-default--1',
        },
      },
    },
  ),
  avatarBadgeVariants = cva(
    'absolute right-0 bottom-0 inline-flex items-center justify-center rounded-full outline-3 outline-surface-background group-data-[size=large]/avatar:size-md group-data-[size=medium]/avatar:size-sm group-data-[size=small]/avatar:size-xs group-data-[size=large]/avatar:[&_svg]:size-sm group-data-[size=medium]/avatar:[&_svg]:size-xs group-data-[size=small]/avatar:[&_svg]:size-2xs',
    {
      defaultVariants: {
        position: 'bottomRight',
        tone: 'success',
      },
      variants: {
        position: {
          bottomLeft: 'bottom-0 left-0',
          bottomRight: 'right-0 bottom-0',
          topLeft: 'top-0 left-0',
          topRight: 'top-0 right-0',
        },
        tone: {
          accent: 'bg-accent-default [&>svg]:text-accent-on-default',
          brand: 'bg-brand-default [&>svg]:text-brand-on-default',
          error: 'bg-error-default [&>svg]:text-error-on-default',
          info: 'bg-info-default [&>svg]:text-info-on-default',
          neutral: 'bg-neutral-default [&>svg]:text-neutral-on-default',
          success: 'bg-success-default [&>svg]:text-success-on-default',
          warning: 'bg-warning-default [&>svg]:text-warning-on-default',
        },
      },
    },
  )

type AvatarProps = ComponentProps<typeof BaseAvatar.Root> & VariantProps<typeof avatarVariants>
type AvatarImageProps = ComponentProps<typeof BaseAvatar.Image>
type AvatarFallbackProps = ComponentProps<typeof BaseAvatar.Fallback>
type AvatarBadgeProps = ComponentProps<'div'> & VariantProps<typeof avatarBadgeVariants>

export type { AvatarProps, AvatarImageProps, AvatarFallbackProps, AvatarBadgeProps }
export { avatarVariants, avatarBadgeVariants }
