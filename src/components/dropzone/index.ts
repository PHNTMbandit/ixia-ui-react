import { Dropzone as DropzoneRoot } from './dropzone'
import { DropzoneActions } from './dropzone-actions'
import { DropzoneClear } from './dropzone-clear'
import { DropzoneConfirm } from './dropzone-confirm'
import { DropzoneContainer } from './dropzone-container'
import { DropzoneError } from './dropzone-error'
import { DropzoneFileLimit } from './dropzone-file-limit'
import { DropzoneFileSizeLimit } from './dropzone-file-size-limit'
import { DropzoneFiles } from './dropzone-files'
import { DropzoneFilesHeader } from './dropzone-files-header'
import { DropzoneFilesList } from './dropzone-files-list'
import { DropzoneFilesTitle } from './dropzone-files-title'
import { DropzoneFormats } from './dropzone-formats'
import { DropzoneHeading } from './dropzone-heading'
import { DropzoneIcon } from './dropzone-icon'
import { DropzoneInfo } from './dropzone-info'
import { DropzoneSubtitle } from './dropzone-subtitle'
import { DropzoneTrigger } from './dropzone-trigger'

const Dropzone = Object.assign(DropzoneRoot, {
  Actions: DropzoneActions,
  Clear: DropzoneClear,
  Confirm: DropzoneConfirm,
  Container: DropzoneContainer,
  Error: DropzoneError,
  FileLimit: DropzoneFileLimit,
  FileSizeLimit: DropzoneFileSizeLimit,
  Files: DropzoneFiles,
  FilesHeader: DropzoneFilesHeader,
  FilesList: DropzoneFilesList,
  FilesTitle: DropzoneFilesTitle,
  Formats: DropzoneFormats,
  Heading: DropzoneHeading,
  Icon: DropzoneIcon,
  Info: DropzoneInfo,
  Subtitle: DropzoneSubtitle,
  Trigger: DropzoneTrigger,
})

export type {
  DropzoneProps,
  DropzoneContainerProps,
  DropzoneErrorProps,
  DropzoneActionsProps,
  DropzoneClearProps,
  DropzoneConfirmProps,
  DropzoneFilesListProps,
  DropzoneFileLimitProps,
  DropzoneFilesHeaderProps,
  DropzoneFilesProps,
  DropzoneFilesTitleProps,
  DropzoneFileSizeLimitProps,
  DropzoneFormatsProps,
  DropzoneHeadingProps,
  DropzoneIconProps,
  DropzoneSubtitleProps,
  DropzoneTriggerProps,
  DropzoneInfoProps,
} from './dropzone.types'
export { DropzoneContainer } from './dropzone-container'
export { DropzoneError } from './dropzone-error'
export { DropzoneFilesList as DropzoneFileList } from './dropzone-files-list'
export { DropzoneFileSizeLimit } from './dropzone-file-size-limit'
export { DropzoneFormats } from './dropzone-formats'
export { DropzoneHeading } from './dropzone-heading'
export { DropzoneIcon } from './dropzone-icon'
export { DropzoneSubtitle } from './dropzone-subtitle'
export { DropzoneTrigger } from './dropzone-trigger'
export { DropzoneInfo } from './dropzone-info'
export { DropzoneFiles } from './dropzone-files'
export { DropzoneFilesHeader } from './dropzone-files-header'
export { DropzoneFilesTitle } from './dropzone-files-title'
export { DropzoneActions } from './dropzone-actions'
export { DropzoneConfirm } from './dropzone-confirm'
export { DropzoneClear } from './dropzone-clear'

export { Dropzone }
