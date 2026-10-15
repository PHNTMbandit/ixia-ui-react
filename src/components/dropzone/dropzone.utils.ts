import React from 'react'

import type { DropzoneContextProps } from './dropzone.types'

const BYTES_PER_UNIT = 1000,
  FIRST_UNIT_INDEX = 0,
  UNIT_STEP = 1,
  LAST_UNIT_OFFSET = 1,
  NO_DECIMALS = 0,
  SINGLE_DECIMAL = 1,
  EMPTY_LENGTH = 0,
  PATTERN_START = 0,
  WILDCARD_SUFFIX_LENGTH = 1,
  formatFileSize = (bytes: number): string => {
    if (bytes < BYTES_PER_UNIT) {
      return `${bytes} B`
    }

    const units = ['KB', 'MB', 'GB', 'TB']
    let size = bytes / BYTES_PER_UNIT,
      unitIndex = FIRST_UNIT_INDEX,
      decimals = NO_DECIMALS

    while (size >= BYTES_PER_UNIT && unitIndex < units.length - LAST_UNIT_OFFSET) {
      size /= BYTES_PER_UNIT
      unitIndex += UNIT_STEP
    }

    if (!Number.isInteger(size)) {
      decimals = SINGLE_DECIMAL
    }

    return `${size.toFixed(decimals)}${units[unitIndex]}`
  },
  getFileKey = (file: File): string => `${file.name}-${file.size}-${file.lastModified}`,
  isFileTypeAccepted = (file: File, acceptedFileTypes: string[]): boolean => {
    if (acceptedFileTypes.length === EMPTY_LENGTH) {
      return true
    }

    const fileName = file.name.toLowerCase(),
      fileType = file.type.toLowerCase()

    return acceptedFileTypes.some((accepted) => {
      const pattern = accepted.toLowerCase()

      if (pattern.startsWith('.')) {
        return fileName.endsWith(pattern)
      }

      if (pattern.endsWith('/*')) {
        return fileType.startsWith(pattern.slice(PATTERN_START, -WILDCARD_SUFFIX_LENGTH))
      }

      return fileType === pattern
    })
  },
  DropzoneContext = React.createContext<DropzoneContextProps | undefined>(undefined),
  useDropzone = () => {
    const context = React.useContext(DropzoneContext)

    if (!context) {
      throw new Error('useDropzone must be used within a DropzoneProvider')
    }

    return context
  }

export { DropzoneContext, formatFileSize, getFileKey, isFileTypeAccepted, useDropzone }
