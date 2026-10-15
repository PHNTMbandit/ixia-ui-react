import type { Button } from '../button'

type DropzoneContainerProps = React.ComponentProps<'label'> & {
  children?: React.ReactNode
}
type DropzoneErrorProps = React.ComponentProps<'p'>
type DropzoneFilesListProps = React.ComponentProps<'ul'>
type DropzoneFileSizeLimitProps = React.ComponentProps<'span'>
type DropzoneFormatsProps = React.ComponentProps<'span'>
type DropzoneHeadingProps = React.ComponentProps<'span'>
type DropzoneIconProps = React.ComponentProps<'div'>
type DropzoneInfoProps = React.ComponentProps<'div'>
type DropzoneSubtitleProps = React.ComponentProps<'span'>
type DropzoneTriggerProps = React.ComponentProps<'button'>
type DropzoneProps = React.ComponentProps<'input'> & {
  children?: React.ReactNode
  maxFiles?: number
  maxFileSize?: number
  maxFilesErrorLabel?: (maxFiles: number) => string
  maxFileSizeErrorLabel?: (fileName: string, maxFileSize: string) => string
  fileTypeErrorLabel?: (fileName: string) => string
  onConfirm?: (files: File[]) => void
  onUpload?: (file: File, onProgress: (percent: number) => void) => void | Promise<void>
}
type DropzoneFileLimitProps = React.ComponentProps<'span'>
type DropzoneFilesProps = React.ComponentProps<'div'>
type DropzoneFilesHeaderProps = React.ComponentProps<'div'>
type DropzoneFilesTitleProps = React.ComponentProps<'span'>
type DropzoneActionsProps = React.ComponentProps<'div'>
type DropzoneConfirmProps = React.ComponentProps<typeof Button>
type DropzoneClearProps = React.ComponentProps<typeof Button>
interface DropzoneContextProps {
  acceptedFileTypes: string[]
  fileError: string | undefined
  fileProgress: Record<string, number>
  files: File[]
  handleDragLeave: (event: React.DragEvent<HTMLElement>) => void
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void
  handleDrop: (event: React.DragEvent<HTMLElement>) => void
  handleFiles: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  isHovering: boolean
  maxFileSize?: string
  maxFiles?: number
  props: React.ComponentProps<'input'>
  removeFile: (file: File) => void
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
  onUpload?: (file: File, onProgress: (percent: number) => void) => void | Promise<void>
  onConfirm?: (files: File[]) => void
}
export type {
  DropzoneContainerProps,
  DropzoneErrorProps,
  DropzoneFilesListProps,
  DropzoneFileSizeLimitProps,
  DropzoneFormatsProps,
  DropzoneHeadingProps,
  DropzoneIconProps,
  DropzoneInfoProps,
  DropzoneSubtitleProps,
  DropzoneTriggerProps,
  DropzoneProps,
  DropzoneFileLimitProps,
  DropzoneFilesProps,
  DropzoneFilesHeaderProps,
  DropzoneFilesTitleProps,
  DropzoneActionsProps,
  DropzoneConfirmProps,
  DropzoneClearProps,
  DropzoneContextProps,
}
