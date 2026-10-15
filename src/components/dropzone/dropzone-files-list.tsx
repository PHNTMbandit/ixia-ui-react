import { CheckIcon, FileArrowUpIcon, TrashIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { Meter, MeterFooter, MeterIndicator, MeterTrack, MeterValue } from '../meter'
import type { DropzoneFilesListProps } from './dropzone.types'
import { formatFileSize, getFileKey, useDropzone } from './dropzone.utils'

const NO_PROGRESS = 0,
  COMPLETE_PROGRESS = 100

export function DropzoneFilesList({ className, children, ref, ...props }: DropzoneFilesListProps) {
  const { files, fileProgress, removeFile, onUpload } = useDropzone()

  return (
    <ul className={cn('flex flex-col gap-xs', className)} ref={ref} {...props}>
      {files.map((file) => {
        const fileKey = getFileKey(file),
          progress = fileProgress[fileKey] ?? NO_PROGRESS,
          isUploading = progress >= NO_PROGRESS && progress < COMPLETE_PROGRESS,
          isUploaded = progress >= COMPLETE_PROGRESS

        let meterTone: 'success' | 'brand' = 'brand'
        if (isUploaded) {
          meterTone = 'success'
        }

        return (
          <li
            key={fileKey}
            className={cn(
              'flex items-center justify-between gap-lg rounded-xl border bg-surface px-md py-sm',
              isUploading && 'border-border',
              isUploaded && 'border-border',
            )}
          >
            {isUploading && (
              <div className="flex items-center justify-center rounded-full bg-brand-container p-xs">
                <FileArrowUpIcon className="size-md text-brand-on-container" />
              </div>
            )}
            {isUploaded && (
              <div className="flex items-center justify-center rounded-full bg-success-container p-xs">
                <CheckIcon className="size-md text-success-on-container" />
              </div>
            )}
            <div className="flex w-full flex-col justify-between gap-3xs">
              <span className="style-text-default-0">{file.name}</span>
              {onUpload && (
                <Meter orientation="vertical" tone={meterTone} value={progress}>
                  <MeterTrack>
                    <MeterIndicator />
                  </MeterTrack>
                  <MeterFooter>
                    <span className="style-text-prose--1 text-on-surface-variant">
                      {formatFileSize(file.size)}
                    </span>
                    <MeterValue />
                  </MeterFooter>
                </Meter>
              )}
              {!onUpload && (
                <span className="style-text-prose--1 text-on-surface-variant">
                  {formatFileSize(file.size)}
                </span>
              )}
            </div>
            <Button variant="ghost" tone="error" onClick={() => removeFile(file)}>
              <TrashIcon weight="bold" />
            </Button>
          </li>
        )
      })}
      {children}
    </ul>
  )
}
