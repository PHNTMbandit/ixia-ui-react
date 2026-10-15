import { Input as BaseInput } from '@base-ui/react/input'
import { UploadIcon, XIcon } from '@phosphor-icons/react'
import { useRef, useState } from 'react'

import { cn } from '@/utils/cn'

import { Button } from '../button'
import { formatFileSize, inputVariants } from './input.types'
import type { InputProps } from './input.types'

const DEFAULT_COLOR = '#000000',
  EMPTY_FILE_COUNT = 0,
  SINGLE_FILE_COUNT = 1,
  defaultFileUploadButtonIcon = <UploadIcon weight="bold" />,
  defaultFilesSelectedLabel = (count: number) => `${count} files selected`,
  defaultMaxFilesErrorLabel = (maxFiles: number) => {
    if (maxFiles === SINGLE_FILE_COUNT) {
      return `You can select up to ${maxFiles} file.`
    }
    return `You can select up to ${maxFiles} files.`
  },
  defaultMaxFileSizeErrorLabel = (fileName: string, maxFileSize: string) =>
    `"${fileName}" exceeds the maximum size of ${maxFileSize}.`

function getStringValue(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value
  }
  return undefined
}

function getColorValue(
  isControlled: boolean,
  controlledValue: unknown,
  uncontrolledValue: string,
): string {
  if (isControlled) {
    return getStringValue(controlledValue) || DEFAULT_COLOR
  }
  return uncontrolledValue || DEFAULT_COLOR
}

function getColorInputProps(isControlled: boolean, colorValue: string) {
  if (isControlled) {
    return { value: colorValue }
  }
  return { defaultValue: colorValue }
}

function getFileValidationError(
  files: File[],
  options: {
    maxFiles: number | undefined
    maxFileSize: number | undefined
    maxFilesErrorLabel: NonNullable<InputProps['maxFilesErrorLabel']>
    maxFileSizeErrorLabel: NonNullable<InputProps['maxFileSizeErrorLabel']>
  },
): string | undefined {
  const { maxFiles, maxFileSize, maxFilesErrorLabel, maxFileSizeErrorLabel } = options,
    oversizedFile = files.find((file) => maxFileSize !== undefined && file.size > maxFileSize)
  if (maxFiles !== undefined && files.length > maxFiles) {
    return maxFilesErrorLabel(maxFiles)
  }

  if (oversizedFile && maxFileSize !== undefined) {
    return maxFileSizeErrorLabel(oversizedFile.name, formatFileSize(maxFileSize))
  }
  return undefined
}

function getFileStatus(options: {
  fileError: string | undefined
  selectedFiles: File[]
  placeholder: InputProps['placeholder']
  filesSelectedLabel: (count: number) => string
}) {
  const { fileError, selectedFiles, placeholder, filesSelectedLabel } = options
  if (fileError) {
    return <span className="style-text-prose-0 text-error-default">{fileError}</span>
  }
  if (selectedFiles.length === EMPTY_FILE_COUNT) {
    return <span className="style-text-prose-0 text-on-surface-variant">{placeholder}</span>
  }
  if (selectedFiles.length === SINGLE_FILE_COUNT) {
    return selectedFiles.at(EMPTY_FILE_COUNT)?.name
  }
  return filesSelectedLabel(selectedFiles.length)
}

export function Input({
  fileUploadButtonIcon = defaultFileUploadButtonIcon,
  fileUploadButtonLabel,
  maxFiles,
  maxFileSize,
  clearFilesLabel = 'Remove files',
  filesSelectedLabel = defaultFilesSelectedLabel,
  maxFilesErrorLabel = defaultMaxFilesErrorLabel,
  maxFileSizeErrorLabel = defaultMaxFileSizeErrorLabel,
  compact,
  variant,
  size,
  className,
  ref,
  ...props
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null),
    [uncontrolledColorValue, setUncontrolledColorValue] = useState<string>(
      getStringValue(props.defaultValue) || getStringValue(props.value) || DEFAULT_COLOR,
    ),
    [selectedFiles, setSelectedFiles] = useState<File[]>([]),
    [fileError, setFileError] = useState<string | undefined>(undefined)

  if (props.type === 'color') {
    const isControlled = props.value !== undefined,
      colorValue = getColorValue(isControlled, props.value, uncontrolledColorValue),
      { onChange, defaultValue: _defaultValue, value: _value, ...colorProps } = props,
      handleColorChange: NonNullable<typeof onChange> = (event) => {
        if (!isControlled) {
          setUncontrolledColorValue(event.currentTarget.value)
        }

        onChange?.(event)
      },
      handleColorRef = (node: HTMLInputElement | null) => {
        inputRef.current = node

        if (typeof ref === 'function') {
          ref(node)
          return
        }

        if (ref && typeof ref === 'object') {
          Object.assign(ref, { current: node })
        }
      }

    if (compact) {
      return (
        <button
          aria-label="Open color picker"
          className={cn(
            'relative outline-2 outline-transparent transition-colors focus-within:outline-border hover:cursor-pointer',
            size === 'small' && 'size-lg -outline-offset-2',
            size === 'medium' && 'size-xl -outline-offset-4',
            size === 'large' && 'size-2xl -outline-offset-6',
            className,
          )}
          disabled={props.disabled}
          onClick={() => inputRef.current?.click()}
          type="button"
        >
          <div
            className={cn(
              'size-full',
              size === 'small' && 'rounded-lg',
              size === 'medium' && 'rounded-xl',
              size === 'large' && 'rounded-2xl',
            )}
            style={{
              backgroundColor: colorValue,
            }}
          />
          <BaseInput
            className="peer pointer-events-none invisible absolute"
            {...getColorInputProps(isControlled, colorValue)}
            onChange={handleColorChange}
            ref={handleColorRef}
            type="color"
            {...colorProps}
          />
        </button>
      )
    }

    return (
      <button
        aria-label="Open color picker"
        className={cn(
          'relative flex hover:cursor-pointer',
          inputVariants({ size, variant }),
          className,
        )}
        disabled={props.disabled}
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        <div
          className={cn(
            'absolute top-1/2 left-xs aspect-square h-7/12 -translate-y-1/2',
            size === 'small' && 'rounded-md',
            size === 'medium' && 'rounded-lg',
            size === 'large' && 'rounded-xl',
          )}
          style={{
            backgroundColor: colorValue,
          }}
        />
        <BaseInput
          className="peer pointer-events-none invisible absolute top-lg"
          {...getColorInputProps(isControlled, colorValue)}
          onChange={handleColorChange}
          ref={handleColorRef}
          type="color"
          {...colorProps}
        />
        <p
          className={cn(
            'text-left',
            size === 'small' && 'pr-2xs pl-lg style-text-default--1',
            size === 'medium' && 'pl-lg style-text-default-0',
            size === 'large' && 'pl-xl style-text-default-1',
          )}
        >
          {colorValue}
        </p>
      </button>
    )
  }

  if (props.type === 'file') {
    const { onChange, ...fileProps } = props,
      clearFiles = () => {
        if (inputRef.current) {
          inputRef.current.value = ''
        }

        setSelectedFiles([])
        setFileError(undefined)
      },
      handleFileChange: NonNullable<typeof onChange> = (event) => {
        const input = event.currentTarget,
          files = [...(input.files ?? [])],
          validationError = getFileValidationError(files, {
            maxFileSize,
            maxFileSizeErrorLabel,
            maxFiles,
            maxFilesErrorLabel,
          })
        if (validationError) {
          setSelectedFiles([])
          setFileError(validationError)
          input.value = ''
          return
        }

        setFileError(undefined)
        setSelectedFiles(files)
        onChange?.(event)
      }

    return (
      <div className="flex items-center justify-between gap-lg">
        <div className="flex items-center gap-xs">
          <Button variant="soft" tone="neutral" onClick={() => inputRef.current?.click()}>
            {fileUploadButtonIcon}
            {fileUploadButtonLabel}
          </Button>
          <BaseInput ref={inputRef} {...fileProps} hidden onChange={handleFileChange} />
          <p className="style-text-default-0">
            {getFileStatus({
              fileError,
              filesSelectedLabel,
              placeholder: props.placeholder,
              selectedFiles,
            })}
          </p>
        </div>
        <Button
          aria-label={clearFilesLabel}
          size="iconMedium"
          variant="ghost"
          tone="error"
          onClick={clearFiles}
        >
          <XIcon weight="bold" />
        </Button>
      </div>
    )
  }

  return (
    <BaseInput className={cn(inputVariants({ size, variant }), className)} ref={ref} {...props} />
  )
}
