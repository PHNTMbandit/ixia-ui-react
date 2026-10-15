import { CodeBlock as CodeBlockRoot } from './code-block'
import { CodeBlockActions } from './code-block-actions'
import { CodeBlockCopy } from './code-block-copy'
import { CodeBlockDownload } from './code-block-download'
import { CodeBlockHeader } from './code-block-header'
import { CodeBlockName } from './code-block-name'
import { CodeBlockSelect } from './code-block-select'
import { CodeBlockTabs } from './code-block-tabs'
import { CodeBlockWindow } from './code-block-window'

const CodeBlock = Object.assign(CodeBlockRoot, {
  Actions: CodeBlockActions,
  Copy: CodeBlockCopy,
  Download: CodeBlockDownload,
  Header: CodeBlockHeader,
  Name: CodeBlockName,
  Select: CodeBlockSelect,
  Tabs: CodeBlockTabs,
  Window: CodeBlockWindow,
})

export type {
  CodeBlockProps,
  CodeBlockActionsProps,
  CodeBlockCopyProps,
  CodeBlockDownloadProps,
  CodeBlockHeaderGroupProps,
  CodeBlockNameProps,
  CodeBlockProviderState,
  CodeBlockSelectProps,
  CodeBlockTabsProps,
  CodeBlockWindowProps,
  CodeBlockValue,
} from './code-block.types'
export { CodeBlockActions } from './code-block-actions'
export { CodeBlockCopy } from './code-block-copy'
export { CodeBlockDownload } from './code-block-download'
export { CodeBlockHeader } from './code-block-header'
export { CodeBlockName } from './code-block-name'
export { CodeBlockSelect } from './code-block-select'
export { CodeBlockTabs } from './code-block-tabs'
export { CodeBlockWindow } from './code-block-window'

export { CodeBlock }
