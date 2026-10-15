import type { GroupProps, PanelProps, SeparatorProps } from 'react-resizable-panels'

type ResizeablePanelGroupProps = GroupProps
type ResizeablePanelProps = PanelProps
type ResizeableHandleProps = SeparatorProps & {
  withHandle?: boolean
}

export type { ResizeablePanelGroupProps, ResizeablePanelProps, ResizeableHandleProps }
