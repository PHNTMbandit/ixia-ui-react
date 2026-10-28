import { CheckIcon, DownloadIcon } from '@phosphor-icons/react'
import React from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { useCodeBlock } from './code-block'
import type { CodeBlockDownloadProps } from './code-block.types'

const DOWNLOAD_TIMEOUT = 2000,
  DOWNLOAD_STATUS_ICON = {
    false: <DownloadIcon weight="bold" className="animate-in zoom-in" />,
    true: <CheckIcon weight="bold" className="animate-in zoom-in" />,
  }

export function CodeBlockDownload({
  className,
  children,
  disabled,
  ref,
  ...props
}: CodeBlockDownloadProps) {
  const { currentValue } = useCodeBlock(),
    { code } = currentValue,
    [downloaded, setDownloaded] = React.useState(false),
    handleClick = async () => {
      try {
        if (code === undefined) {
          throw new Error('No source code available to download')
        }
        const blob = new Blob([code], { type: 'text/plain;charset=utf-8' }),
          url = URL.createObjectURL(blob),
          link = document.createElement('a')
        link.href = url
        link.download = currentValue.name
        link.click()
        URL.revokeObjectURL(url)

        setDownloaded(true)
        setTimeout(() => setDownloaded(false), DOWNLOAD_TIMEOUT)
      } catch (error) {
        console.error('Failed to download file:', error)
      }
    }

  return (
    <Button
      aria-label="Download file"
      onClick={handleClick}
      size="medium"
      variant="ghost"
      tone="neutral"
      className={cn('', className)}
      ref={ref}
      {...props}
      disabled={disabled || code === undefined}
    >
      {children}
      {DOWNLOAD_STATUS_ICON[`${downloaded}`]}
    </Button>
  )
}
