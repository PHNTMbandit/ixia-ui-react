import type { SelectTrigger } from '../select'
import type { Tabs } from '../tabs'

type CodeBlockProps = Omit<React.ComponentProps<'div'>, 'defaultValue'> & {
  defaultValue: CodeBlockValue
  items: CodeBlockValue[]
}

interface CodeBlockProviderState {
  currentValue: CodeBlockValue
  setCurrentValue: React.Dispatch<React.SetStateAction<CodeBlockValue>>
  items: CodeBlockValue[]
}

interface CodeBlockValue {
  id: string
  label: string
  name: string
  content: string
  icon?: React.ReactNode
}

type CodeBlockTabsProps = React.ComponentProps<typeof Tabs>
type CodeBlockCopyProps = React.ComponentProps<'button'>
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
