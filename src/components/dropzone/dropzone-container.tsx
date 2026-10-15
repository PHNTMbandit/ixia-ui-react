import { useId } from 'react'

import { cn } from '@/utils/cn'

import type { DropzoneContainerProps } from './dropzone.types'
import { useDropzone } from './dropzone.utils'

export function DropzoneContainer({
  className,
  children,
  ...containerProps
}: DropzoneContainerProps) {
  const {
      fileError,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFiles,
      inputRef,
      isHovering,
      props,
    } = useDropzone(),
    inputId = useId(),
    isDisabled = props.disabled ?? false

  return (
    <>
      {/* Drag-and-drop has no keyboard equivalent; the label/input and Dropzone.Trigger provide the accessible path. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <label
        htmlFor={inputId}
        aria-disabled={isDisabled}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          'flex size-full items-center justify-center rounded-xl border-2 border-brand-border bg-surface py-2xl transition-all outline-none',
          !isDisabled && 'cursor-pointer',
          isHovering && 'ring-8 ring-brand-border-strong/20',
          fileError && 'border-error-border',
          isDisabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        {...containerProps}
      >
        <div className="flex flex-col items-center justify-center gap-lg">{children}</div>
      </label>
      <input
        {...props}
        id={inputId}
        hidden
        onChange={handleFiles}
        onClick={(event) => {
          event.currentTarget.value = ''
        }}
        ref={inputRef}
        type="file"
      />
    </>
  )
}
