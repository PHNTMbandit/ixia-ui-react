import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Theme spacing tokens from styles/input.css; without them twMerge cannot dedupe e.g. gap-md vs gap-0.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: [
        '3xs',
        '2xs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '3xs-2xs',
        '2xs-xs',
        'xs-sm',
        'sm-md',
        'md-lg',
        'lg-xl',
        'xl-2xl',
        '2xl-3xl',
        'sm-lg',
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
