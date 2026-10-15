import type {
  OnChangeFn,
  Row,
  RowData,
  TableFeature,
  TableFeatures,
  Updater,
} from '@tanstack/react-table'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import React from 'react'

import type { Button } from '../button'
import type { InputGroup } from '../input-group'

declare module '@tanstack/react-table' {
  interface Plugins {
    rowLockedFeature: TableFeature
    rowVisibilityFeature: TableFeature
  }

  interface TableState_FeatureMap {
    rowLockedFeature: LayerTreeState_RowLocked
    rowVisibilityFeature: LayerTreeState_RowVisibility
  }

  interface TableOptions_FeatureMap<TFeatures extends TableFeatures, TData extends RowData> {
    rowLockedFeature: LayerTreeOptions_RowLocked<TData>
    rowVisibilityFeature: LayerTreeOptions_RowVisibility<TData>
  }

  interface Table_FeatureMap<TFeatures extends TableFeatures, TData extends RowData> {
    rowLockedFeature: LayerTreeTable_RowLocked
    rowVisibilityFeature: LayerTreeTable_RowVisibility
  }

  interface Row_FeatureMap<TFeatures extends TableFeatures, TData extends RowData> {
    rowLockedFeature: LayerTreeRow_RowLocked
    rowVisibilityFeature: LayerTreeRow_RowVisibility
  }
}

type LayerTreeProps = React.ComponentProps<'div'> & {
  onDNDStart?: (event: { nodeId: string }) => void
  onDNDEnd?: (event: { sourceNodeId: string; targetNodeId: string }) => void
}

type LayerTreeBodyProps = React.ComponentProps<'div'>
type LayerTreeRowProps = React.ComponentProps<'div'> & {
  rowId: string
}

type LayerTreeTriggerCellProps = React.ComponentProps<'button'> & {
  dndDisabled?: boolean
}
type LayerTreeSearchProps = React.ComponentProps<typeof InputGroup> & {
  placeholder?: string
}
type LayerTreeExpandAllProps = React.ComponentProps<typeof Button>
type LayerTreeFooterProps = React.ComponentProps<'div'>
type LayerTreeSortProps = React.ComponentProps<'button'>
type LayerTreeIconCellProps = React.ComponentProps<'div'>
type LayerTreeLockedCellProps = React.ComponentProps<typeof Button>
type LayerTreeLockedAllProps = React.ComponentProps<typeof Button>
type LayerTreeVisibilityCellProps = React.ComponentProps<typeof Button>
type LayerTreeVisibilityAllProps = React.ComponentProps<typeof Button>
type LayerTreeNodeIconProps = React.ComponentProps<'div'> & {
  icon: React.ElementType
}
type LayerTreeTextCellProps = React.ComponentProps<'span'> &
  VariantProps<typeof layerTreeTextCellVariants>

const layerTreeTextCellVariants = cva('min-w-0 grow truncate px-2xs', {
    defaultVariants: {
      size: 'medium',
    },
    variants: {
      size: {
        large: 'style-text-default-1',
        medium: 'style-text-default-0',
        small: 'style-text-default--1',
      },
    },
  }),
  // oxlint-disable-next-line unicorn/no-null
  LayerTreeContext = React.createContext<LayerTreeContextType | null>(null),
  useLayerTree = () => {
    const context = React.useContext<LayerTreeContextType | null>(LayerTreeContext)

    if (!context) {
      throw new Error('useLayerTree must be used within a LayerTreeProvider')
    }

    return context
  }

interface LayerTreeColumnMeta {
  fill?: boolean
}

interface LayerTreeTableMeta {
  translations?: {
    buttonLabels?: {
      ascending?: string
      descending?: string
    }
  }
}

type RowVisibilityState = Record<string, boolean>

interface LayerTreeState_RowVisibility {
  rowVisibility: RowVisibilityState
}

interface LayerTreeOptions_RowVisibility<TData extends RowData = RowData> {
  enableRowVisibility?: boolean
  onRowVisibilityChange?: OnChangeFn<RowVisibilityState>
  getRowVisible?: (row: Row<TableFeatures, TData>) => boolean
}

interface LayerTreeTable_RowVisibility {
  setRowVisibility: (updater: Updater<RowVisibilityState>) => void
  resetRowVisibility: () => void
  toggleAllRowsVisible: (value?: boolean) => void
  getIsAllRowsVisible: () => boolean
}

interface LayerTreeRow_RowVisibility {
  getIsVisible: () => boolean
  toggleVisibility: (value?: boolean) => void
}

type RowLockedState = Record<string, boolean>

interface LayerTreeState_RowLocked {
  rowLocked: RowLockedState
}

interface LayerTreeOptions_RowLocked<TData extends RowData = RowData> {
  enableRowLocked?: boolean
  onRowLockedChange?: OnChangeFn<RowLockedState>
  getRowLocked?: (row: Row<TableFeatures, TData>) => boolean
}

interface LayerTreeTable_RowLocked {
  setRowLocked: (updater: Updater<RowLockedState>) => void
  resetRowLocked: () => void
  toggleAllRowsLocked: (value?: boolean) => void
  getIsAllRowsLocked: () => boolean
}

interface LayerTreeRow_RowLocked {
  getIsLocked: () => boolean
  toggleLocked: (value?: boolean) => void
}

type LayerTreeContextType = LayerTreeProps & {
  draggingNodeId: string | null
}

export { LayerTreeContext, layerTreeTextCellVariants, useLayerTree }
export type {
  RowLockedState,
  RowVisibilityState,
  LayerTreeContextType,
  LayerTreeState_RowVisibility,
  LayerTreeOptions_RowVisibility,
  LayerTreeTable_RowVisibility,
  LayerTreeRow_RowVisibility,
  LayerTreeState_RowLocked,
  LayerTreeOptions_RowLocked,
  LayerTreeTable_RowLocked,
  LayerTreeRow_RowLocked,
  LayerTreeTableMeta,
  LayerTreeColumnMeta,
  LayerTreeProps,
  LayerTreeBodyProps,
  LayerTreeRowProps,
  LayerTreeTriggerCellProps,
  LayerTreeSearchProps,
  LayerTreeFooterProps,
  LayerTreeSortProps,
  LayerTreeIconCellProps,
  LayerTreeLockedCellProps,
  LayerTreeLockedAllProps,
  LayerTreeVisibilityCellProps,
  LayerTreeVisibilityAllProps,
  LayerTreeNodeIconProps,
  LayerTreeTextCellProps,
  LayerTreeExpandAllProps,
}
