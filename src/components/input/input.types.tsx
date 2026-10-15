import type { Input as BaseInput } from '@base-ui/react/input'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

const BYTES_PER_KILOBYTE = 1000,
  INITIAL_UNIT_INDEX = 0,
  INTEGER_PRECISION = 0,
  FRACTIONAL_PRECISION = 1,
  UNIT_INDEX_INCREMENT = 1,
  getPrecision = (size: number): number => {
    if (Number.isInteger(size)) {
      return INTEGER_PRECISION
    }
    return FRACTIONAL_PRECISION
  },
  formatFileSize = (bytes: number): string => {
    if (bytes < BYTES_PER_KILOBYTE) {
      return `${bytes} B`
    }

    const units = ['KB', 'MB', 'GB', 'TB']
    let size = bytes / BYTES_PER_KILOBYTE,
      unitIndex = INITIAL_UNIT_INDEX

    while (size >= BYTES_PER_KILOBYTE && unitIndex < units.length - UNIT_INDEX_INCREMENT) {
      size /= BYTES_PER_KILOBYTE
      unitIndex += UNIT_INDEX_INCREMENT
    }

    return `${size.toFixed(getPrecision(size))} ${units[unitIndex]}`
  },
  inputVariants = cva(
    'group flex w-full items-center text-ellipsis caret-brand-border-strong outline outline-transparent transition-all placeholder:opacity-60 focus-within:outline-brand-border-strong not-focus-within:hover:outline-border-strong disabled:cursor-not-allowed aria-invalid:bg-error-container aria-invalid:text-error-on-container aria-invalid:caret-error-border-strong aria-invalid:outline-error-border aria-invalid:focus-within:outline-error-border-strong aria-invalid:not-focus-within:hover:outline-error-border data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
    {
      defaultVariants: {
        size: 'medium',
        variant: 'primary',
      },
      variants: {
        size: {
          large: 'h-2xl gap-xs rounded-2xl px-md style-text-prose-1',
          medium: 'h-xl gap-2xs rounded-xl px-sm style-text-prose-0',
          small: 'h-lg gap-3xs rounded-lg pr-3xs pl-xs style-text-prose--1',
        },
        variant: {
          ghost: 'bg-transparent',
          primary: 'bg-surface shadow-2xs',
          secondary: 'bg-neutral-container',
        },
      },
    },
  )

type InputProps = VariantProps<typeof inputVariants> &
  Omit<ComponentProps<typeof BaseInput>, 'size'> & {
    fileUploadButtonLabel?: string
    fileUploadButtonIcon?: React.ReactNode
    maxFiles?: number
    maxFileSize?: number
    clearFilesLabel?: string
    filesSelectedLabel?: (count: number) => string
    maxFilesErrorLabel?: (maxFiles: number) => string
    maxFileSizeErrorLabel?: (fileName: string, maxFileSize: string) => string
    compact?: boolean
  }

export { formatFileSize, inputVariants, type InputProps }
