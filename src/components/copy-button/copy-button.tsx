import { useState } from 'react'

import { cn } from '@/utils'

import { Button } from '../button'
import type { CopyButtonProps } from './copy-button.types'

const COPY_TIMEOUT = 2000

export function CopyButton({
  content,
  className,
  children,
  ref,
  timeout = COPY_TIMEOUT,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false),
    [hasCopied, setHasCopied] = useState(false),
    handleClick = async () => {
      try {
        await navigator.clipboard.writeText(content)
        setHasCopied(true)
        setCopied(true)
        setTimeout(() => setCopied(false), timeout)
      } catch (error) {
        console.error('Failed to copy text:', error)
      }
    }
  return (
    <Button
      className={cn(hasCopied && '[&>svg]:animate-in [&>svg]:zoom-in', className)}
      ref={ref}
      onClick={handleClick}
      {...props}
    >
      {children(copied)}
    </Button>
  )
}
