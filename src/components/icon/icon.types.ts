import type React from 'react'

type IconProps = React.ComponentProps<'svg'>
type IconComponent = React.ComponentType<IconProps>
type IconName =
  | 'add'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'chevronsUpDown'
  | 'close'
  | 'columnFilter'
  | 'copy'
  | 'delete'
  | 'download'
  | 'ellipsis'
  | 'error'
  | 'fieldError'
  | 'fileUpload'
  | 'filter'
  | 'firstPage'
  | 'folder'
  | 'folderExpandAll'
  | 'folderOpen'
  | 'hidden'
  | 'info'
  | 'lastPage'
  | 'layers'
  | 'locked'
  | 'minus'
  | 'percent'
  | 'search'
  | 'selected'
  | 'sort'
  | 'sortAscending'
  | 'sortDescending'
  | 'spinner'
  | 'success'
  | 'unlocked'
  | 'upload'
  | 'visible'
  | 'warning'
  | '3d'
type IconRegistry = Record<IconName, IconComponent>
type IconOverrides = Partial<IconRegistry>
type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
type DefaultIconComponent = React.ComponentType<IconProps & { weight?: IconWeight }>
type DefaultIconRegistry = Record<IconName, DefaultIconComponent>

interface IconContextValue {
  icons: IconOverrides
  weight?: IconWeight
}

type IconRenderProps = IconProps & {
  name: IconName
  weight?: IconWeight
}
interface IconProviderProps {
  icons?: IconOverrides
  weight?: IconWeight
  children?: React.ReactNode
}

export type {
  DefaultIconComponent,
  DefaultIconRegistry,
  IconComponent,
  IconContextValue,
  IconName,
  IconOverrides,
  IconProps,
  IconProviderProps,
  IconRegistry,
  IconRenderProps,
  IconWeight,
}
