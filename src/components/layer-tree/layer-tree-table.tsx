import { createTableHook } from '@tanstack/react-table'

import { LayerTree } from './layer-tree'
import { LayerTreeBody } from './layer-tree-body'
import { features, cellContext, headerContext, tableContext } from './layer-tree-context'
import { LayerTreeExpandAll } from './layer-tree-expand-all'
import { LayerTreeFooter } from './layer-tree-footer'
import { LayerTreeIconCell } from './layer-tree-icon-cell'
import { LayerTreeLockedAll } from './layer-tree-locked-all'
import { LayerTreeLockedCell } from './layer-tree-locked-cell'
import { LayerTreeNodeIcon } from './layer-tree-node-icon'
import { LayerTreeRow } from './layer-tree-row'
import { LayerTreeSearch } from './layer-tree-search'
import { LayerTreeSort } from './layer-tree-sort'
import { LayerTreeTextCell } from './layer-tree-text-cell'
import { LayerTreeTriggerCell } from './layer-tree-trigger-cell'
import { LayerTreeVisibilityAll } from './layer-tree-visibility-all'
import { LayerTreeVisibilityCell } from './layer-tree-visibility-cell'

const { createAppColumnHelper, useAppTable, useTableContext, useCellContext, useHeaderContext } =
  createTableHook({
    cellComponents: {
      LayerTreeIconCell,
      LayerTreeLockedCell,
      LayerTreeNodeIcon,
      LayerTreeTextCell,
      LayerTreeTriggerCell,
      LayerTreeVisibilityCell,
    },
    cellContext,
    features,
    headerComponents: {},
    headerContext,
    tableComponents: {
      LayerTree,
      LayerTreeBody,
      LayerTreeExpandAll,
      LayerTreeFooter,
      LayerTreeLockedAll,
      LayerTreeRow,
      LayerTreeSearch,
      LayerTreeSort,
      LayerTreeVisibilityAll,
    },
    tableContext,
  })

export { createAppColumnHelper, useAppTable, useCellContext, useHeaderContext, useTableContext }

export { features } from './layer-tree-context'
