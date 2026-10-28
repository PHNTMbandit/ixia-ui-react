import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useCodeBlock } from './code-block'
import type { CodeBlockCopyProps } from './code-block.types'

const COPY_TIMEOUT = 2000,
  COPY_STATUS_ICON = {
    false: <CopyIcon weight="bold" className="animate-in zoom-in" />,
    true: <CheckIcon weight="bold" className="animate-in zoom-in" />,
  }

export function CodeBlockCopy({
  className,
  children,
  disabled,
  ref,
  ...props
}: CodeBlockCopyProps) {
  const { currentValue } = useCodeBlock(),
    { code } = currentValue,
    [copied, setCopied] = React.useState(false),
    handleClick = async () => {
      try {
        if (code === undefined) {
          throw new Error('No source code available to copy')
        }
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), COPY_TIMEOUT)
      } catch (error) {
        console.error('Failed to copy text:', error)
      }
    }

  return (
    <Button
      aria-label="Copy code"
      className={cn('', className)}
      onClick={handleClick}
      ref={ref}
      size="medium"
      tone="neutral"
      variant="ghost"
      {...props}
      disabled={disabled || code === undefined}
    >
      {children}
      {COPY_STATUS_ICON[`${copied}`]}
    </Button>
  )
}
