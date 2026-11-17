import { useEffect, useRef, useState } from 'react'

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
    resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    mounted = useRef(false),
    handleClick = async () => {
      try {
        await navigator.clipboard.writeText(content)
        if (!mounted.current) {
          return
        }
        if (resetTimer.current !== undefined) {
          clearTimeout(resetTimer.current)
        }
        setHasCopied(true)
        setCopied(true)
        resetTimer.current = setTimeout(() => {
          setCopied(false)
          resetTimer.current = undefined
        }, timeout)
      } catch (error) {
        console.error('Failed to copy text:', error)
      }
    }

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      if (resetTimer.current !== undefined) {
        clearTimeout(resetTimer.current)
      }
    }
  }, [])

  return (
    <Button
      className={cn(hasCopied && '[&>svg]:animate-in [&>svg]:zoom-in', className)}
      ref={ref}
      {...props}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented) {
          void handleClick()
        }
      }}
    >
      {children?.(copied)}
    </Button>
  )
}
