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

export function CodeBlockDownload({ className, children, ref, ...props }: CodeBlockDownloadProps) {
  const { currentValue } = useCodeBlock(),
    [downloaded, setDownloaded] = React.useState(false),
    handleClick = async () => {
      try {
        const blob = new Blob([currentValue.content]),
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
      size="iconMedium"
      variant="ghost"
      tone="neutral"
      className={cn('', className)}
      ref={ref}
      {...props}
    >
      {children}
      {DOWNLOAD_STATUS_ICON[`${downloaded}`]}
    </Button>
  )
}
