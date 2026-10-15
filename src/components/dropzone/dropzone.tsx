import React from 'react'

import { cn } from '@/utils/cn'

import type { DropzoneProps } from './dropzone.types'
import { DropzoneContext, formatFileSize, getFileKey, isFileTypeAccepted } from './dropzone.utils'

const SINGLE_FILE = 1,
  FIRST_INDEX = 0,
  EMPTY = 0,
  MIN_PROGRESS = 0,
  MAX_PROGRESS = 100,
  defaultMaxFilesErrorLabel = (max: number) => {
    let suffix = 's'
    if (max === SINGLE_FILE) {
      suffix = ''
    }
    return `You can select up to ${max} file${suffix}.`
  },
  defaultMaxFileSizeErrorLabel = (fileName: string, max: string) =>
    `"${fileName}" exceeds the maximum size of ${max}.`,
  defaultFileTypeErrorLabel = (fileName: string) => `"${fileName}" is not an accepted file type.`,
  resolveAcceptedTypes = (accept: string | undefined) => {
    if (typeof accept !== 'string') {
      return []
    }
    return accept
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
  },
  toFileArray = (fileList: FileList | null) => {
    if (!fileList) {
      return []
    }
    return [...fileList]
  },
  formatOptionalSize = (size: number | undefined) => {
    if (size === undefined) {
      return undefined
    }
    return formatFileSize(size)
  }

export function Dropzone({
  maxFiles,
  maxFileSize,
  maxFilesErrorLabel = defaultMaxFilesErrorLabel,
  maxFileSizeErrorLabel = defaultMaxFileSizeErrorLabel,
  fileTypeErrorLabel = defaultFileTypeErrorLabel,
  onUpload,
  ref,
  className,
  children,
  onChange,
  onConfirm,
  ...props
}: DropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null),
    filesRef = React.useRef<File[]>([]),
    [isHovering, setIsHovering] = React.useState(false),
    [files, setFiles] = React.useState<File[]>([]),
    [fileError, setFileError] = React.useState<string | undefined>(undefined),
    [fileProgress, setFileProgress] = React.useState<Record<string, number>>({}),
    acceptedFileTypes = resolveAcceptedTypes(props.accept),
    formattedMaxFileSize = formatOptionalSize(maxFileSize),
    syncInputFiles = React.useCallback((nextFiles: File[]) => {
      if (!inputRef.current) {
        return
      }

      const dataTransfer = new DataTransfer()
      nextFiles.forEach((file) => dataTransfer.items.add(file))
      inputRef.current.files = dataTransfer.files
    }, []),
    getNextFiles = (incomingFiles: File[]) => {
      if (!props.multiple) {
        return incomingFiles.slice(FIRST_INDEX, SINGLE_FILE)
      }

      const mergedFiles = [...filesRef.current, ...incomingFiles],
        dedupedFiles = mergedFiles.filter(
          (file, index, source) =>
            source.findIndex(
              (item) =>
                item.name === file.name &&
                item.size === file.size &&
                item.lastModified === file.lastModified,
            ) === index,
        )

      return dedupedFiles
    },
    startUploads = (newFiles: File[]) => {
      newFiles.forEach((file) => {
        const key = getFileKey(file)

        if (!onUpload) {
          setFileProgress((previous) => ({ ...previous, [key]: MAX_PROGRESS }))
          return
        }

        setFileProgress((previous) => ({ ...previous, [key]: MIN_PROGRESS }))
        void onUpload(file, (percent) => {
          setFileProgress((previous) => ({
            ...previous,
            [key]: Math.max(MIN_PROGRESS, Math.min(MAX_PROGRESS, percent)),
          }))
        })
      })
    },
    commitFiles = (previousFiles: File[], acceptedFiles: File[]) => {
      const previousKeys = new Set(previousFiles.map(getFileKey)),
        addedFiles = acceptedFiles.filter((file) => !previousKeys.has(getFileKey(file)))
      filesRef.current = acceptedFiles
      setFiles(acceptedFiles)
      syncInputFiles(acceptedFiles)
      startUploads(addedFiles)
    },
    partitionBySize = (candidateFiles: File[]) => {
      if (maxFileSize === undefined) {
        return { acceptedFiles: candidateFiles, oversizedFiles: [] as File[] }
      }

      return {
        acceptedFiles: candidateFiles.filter((file) => file.size <= maxFileSize),
        oversizedFiles: candidateFiles.filter((file) => file.size > maxFileSize),
      }
    },
    processFiles = (candidateFiles: File[]) => {
      const invalidTypeFiles = candidateFiles.filter(
          (file) => !isFileTypeAccepted(file, acceptedFileTypes),
        ),
        { oversizedFiles, acceptedFiles } = partitionBySize(candidateFiles)

      if (invalidTypeFiles.length > EMPTY) {
        return {
          acceptedFiles: undefined,
          error: fileTypeErrorLabel(invalidTypeFiles[FIRST_INDEX].name),
        }
      }

      if (maxFiles !== undefined && acceptedFiles.length > maxFiles) {
        return {
          acceptedFiles: undefined,
          error: maxFilesErrorLabel(maxFiles),
        }
      }

      if (oversizedFiles.length > EMPTY && maxFileSize !== undefined) {
        return {
          acceptedFiles,
          error: maxFileSizeErrorLabel(
            oversizedFiles[FIRST_INDEX].name,
            formatFileSize(maxFileSize),
          ),
        }
      }

      return { acceptedFiles, error: undefined }
    },
    applyAcceptedFiles = (candidateFiles: File[]) => {
      const previousFiles = filesRef.current,
        nextFiles = getNextFiles(candidateFiles),
        { acceptedFiles, error } = processFiles(nextFiles)

      if (acceptedFiles) {
        commitFiles(previousFiles, acceptedFiles)
      }

      return { acceptedFiles, error, previousFiles }
    },
    removeFile = (fileToRemove: File) => {
      const removedKey = getFileKey(fileToRemove)

      setFiles((previousFiles) => {
        const nextFiles = previousFiles.filter((file) => file !== fileToRemove)
        filesRef.current = nextFiles
        syncInputFiles(nextFiles)
        return nextFiles
      })
      setFileProgress((previous) => {
        const next = { ...previous }
        delete next[removedKey]
        return next
      })
      setFileError(undefined)
    },
    handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { acceptedFiles, error, previousFiles } = applyAcceptedFiles(
        toFileArray(event.target.files),
      )

      setFileError(error)
      if (!acceptedFiles) {
        syncInputFiles(previousFiles)
        return
      }

      onChange?.(event)
    },
    handleDragOver = (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      setIsHovering(true)
    },
    handleDragLeave = () => {
      setIsHovering(false)
    },
    handleDrop = (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      const { acceptedFiles, error } = applyAcceptedFiles([...event.dataTransfer.files])

      setFileError(error)
      if (!acceptedFiles) {
        setIsHovering(false)
        return
      }

      inputRef.current?.dispatchEvent(new Event('change', { bubbles: true }))
      setIsHovering(false)
    }

  React.useEffect(() => {
    filesRef.current = files
  }, [files])

  return (
    <DropzoneContext.Provider
      value={{
        acceptedFileTypes,
        fileError,
        fileProgress,
        files,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFiles,
        inputRef,
        isHovering,
        maxFileSize: formattedMaxFileSize,
        maxFiles,
        onConfirm,
        onUpload,
        props,
        removeFile,
        setFiles,
      }}
    >
      <div className={cn('space-y-md', className)} ref={ref}>
        {children}
      </div>
    </DropzoneContext.Provider>
  )
}
