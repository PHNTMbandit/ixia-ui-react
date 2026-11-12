import type { CopyButton } from '../copy-button'
import type { SelectTrigger } from '../select'
import type { Tabs } from '../tabs'

type CodeBlockProps = Omit<React.ComponentProps<'div'>, 'defaultValue'> & {
  defaultValue?: string | CodeBlockValue
  items: CodeBlockValue[]
  onValueChange?: (value: string) => void
  value?: string
}

interface CodeBlockProviderState {
  currentIndex: number
  currentValue: CodeBlockValue | undefined
  itemKeys: string[]
  items: CodeBlockValue[]
  setCurrentValue: (index: number) => void
}

interface CodeBlockValue {
  id: string
  name?: string
  label?: string
  code?: string
  content?: React.ReactNode
  icon?: React.ReactNode
}

type CodeBlockTabsProps = React.ComponentProps<typeof Tabs>
type CodeBlockCopyProps = Omit<React.ComponentProps<typeof CopyButton>, 'children' | 'content'> & {
  children?: React.ReactNode
}
type CodeBlockNameProps = React.ComponentProps<'div'>
type CodeBlockSelectProps = React.ComponentProps<typeof SelectTrigger>
type CodeBlockHeaderGroupProps = React.ComponentProps<'div'>
type CodeBlockDownloadProps = React.ComponentProps<'button'>
type CodeBlockActionsProps = React.ComponentProps<'div'>
type CodeBlockWindowProps = React.ComponentProps<'div'>

export type {
  CodeBlockProps,
  CodeBlockProviderState,
  CodeBlockValue,
  CodeBlockTabsProps,
  CodeBlockCopyProps,
  CodeBlockNameProps,
  CodeBlockSelectProps,
  CodeBlockHeaderGroupProps,
  CodeBlockDownloadProps,
  CodeBlockActionsProps,
  CodeBlockWindowProps,
}
