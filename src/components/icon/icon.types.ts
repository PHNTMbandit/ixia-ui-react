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
  /** Overrides the weight of the default Phosphor icon. Ignored for icons supplied through IconProvider. */
  weight?: IconWeight
}
interface IconProviderProps {
  icons?: IconOverrides
  /** Weight applied to every default Phosphor icon below this provider. */
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
