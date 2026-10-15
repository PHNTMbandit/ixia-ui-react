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

export function CodeBlockCopy({ className, children, ref, ...props }: CodeBlockCopyProps) {
  const { currentValue } = useCodeBlock(),
    [copied, setCopied] = React.useState(false),
    handleClick = async () => {
      try {
        await navigator.clipboard.writeText(currentValue.content)
        setCopied(true)
        setTimeout(() => setCopied(false), COPY_TIMEOUT)
      } catch (error) {
        console.error('Failed to copy text:', error)
      }
    }

  return (
    <Button
      aria-label="Copy code"
      onClick={handleClick}
      size="iconMedium"
      variant="ghost"
      tone="neutral"
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      {COPY_STATUS_ICON[`${copied}`]}
    </Button>
  )
}
