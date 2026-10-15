import {
  assignPrototypeAPIs,
  assignTableAPIs,
  functionalUpdate,
  makeStateUpdater,
} from '@tanstack/react-table'
import type {
  Row,
  RowData,
  Table,
  TableFeature,
  TableFeatures,
  Updater,
} from '@tanstack/react-table'

import type { RowLockedState, RowVisibilityState } from './layer-tree.types'

/**
 * Base constraint for tree node data types used by layer tree utilities.
 */
interface LayerTreeNodeBase {
  id: string
  children?: this[]
}

type LayerTreeTable = Table<TableFeatures, RowData>
type LayerTreeRow = Row<TableFeatures, RowData>

/**
 * Recursively searches for a node by ID in a nested tree structure.
 *
 * @param nodes - The array of nodes to search through
 * @param nodeId - The ID of the node to find
 * @returns The matching node or `null` if not found
 *
 * @example
 * ```ts
 * const node = findLayerTreeNode(layers, 'layer-001')
 * if (node) console.log(node.name)
 * ```
 */
const findLayerTreeNode = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    nodeId: string,
  ): TData | null => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        return node
      }
      if (node.children?.length) {
        const match = findLayerTreeNode(node.children, nodeId)
        if (match) {
          return match
        }
      }
    }
    // oxlint-disable-next-line unicorn/no-null
    return null
  },
  /**
   * Removes a node from a nested tree structure by ID.
   *
   * @param nodes - The array of nodes to remove from
   * @param nodeId - The ID of the node to remove
   * @returns An object containing the updated tree and the removed node (if found)
   *
   * @example
   * ```ts
   * const { nextNodes, removedNode } = removeLayerTreeNode(layers, 'layer-001')
   * if (removedNode) setLayers(nextNodes)
   * ```
   */
  removeLayerTreeNode = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    nodeId: string,
  ): { nextNodes: TData[]; removedNode: TData | null } => {
    // oxlint-disable-next-line unicorn/no-null
    let removedNode: TData | null = null

    const nextNodes = nodes.flatMap((node) => {
      if (node.id === nodeId) {
        removedNode = node
        return []
      }
      if (!node.children?.length) {
        return [node]
      }

      const { nextNodes: nextChildren, removedNode: nestedRemovedNode } = removeLayerTreeNode(
        node.children,
        nodeId,
      )
      if (!nestedRemovedNode) {
        return [node]
      }

      removedNode = nestedRemovedNode
      return [{ ...node, children: nextChildren }]
    })

    return { nextNodes, removedNode }
  },
  /**
   * Inserts a node as a child of the specified folder node.
   *
   * @param nodes - The array of nodes to search through
   * @param folderId - The ID of the folder to insert into
   * @param nodeToInsert - The node to insert
   * @returns A new tree with the node inserted
   *
   * @example
   * ```ts
   * const newTree = insertLayerTreeNode(layers, 'folder-001', newLayer)
   * setLayers(newTree)
   * ```
   */
  insertLayerTreeNode = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    folderId: string,
    nodeToInsert: TData,
  ): TData[] =>
    nodes.map((node) => {
      if (node.id === folderId) {
        return { ...node, children: [...(node.children ?? []), nodeToInsert] }
      }
      if (!node.children?.length) {
        return node
      }
      return {
        ...node,
        children: insertLayerTreeNode(node.children, folderId, nodeToInsert),
      }
    }),
  containsLayerTreeNode = (nodes: LayerTreeNodeBase[], nodeId: string) =>
    Boolean(findLayerTreeNode(nodes, nodeId)),
  moveNodeIntoFolder = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    sourceId: string,
    targetId: string,
  ): TData[] => {
    const { nextNodes, removedNode } = removeLayerTreeNode(nodes, sourceId)
    if (!removedNode) {
      return nodes
    }
    return insertLayerTreeNode(nextNodes, targetId, removedNode)
  },
  /**
   * Moves a node from its current position into a target folder.
   * Prevents circular references by checking if target is a descendant of source.
   *
   * @param nodes - The array of nodes
   * @param sourceId - The ID of the node to move
   * @param targetId - The ID of the folder to move into
   * @returns A new tree with the node moved, or the original tree if the move is invalid
   *
   * @example
   * ```ts
   * const newTree = moveLayerTreeNode(layers, 'layer-001', 'folder-002')
   * setLayers(newTree)
   * ```
   */
  moveLayerTreeNode = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    sourceId: string,
    targetId: string,
  ): TData[] => {
    if (sourceId === targetId) {
      return nodes
    }

    const sourceNode = findLayerTreeNode(nodes, sourceId),
      targetNode = findLayerTreeNode(nodes, targetId)

    // Target must exist and be a folder (have children array)
    if (!sourceNode || !targetNode?.children) {
      return nodes
    }
    // Prevent circular reference: can't move into own descendant
    if (containsLayerTreeNode(sourceNode.children ?? [], targetId)) {
      return nodes
    }

    return moveNodeIntoFolder(nodes, sourceId, targetId)
  },
  /**
   * Moves a node to the root level of the tree.
   *
   * @param nodes - The array of nodes
   * @param sourceId - The ID of the node to move
   * @returns A new tree with the node at root level
   *
   * @example
   * ```ts
   * const newTree = moveLayerTreeNodeToRoot(layers, 'layer-001')
   * setLayers(newTree)
   * ```
   */
  moveLayerTreeNodeToRoot = <TData extends LayerTreeNodeBase>(
    nodes: TData[],
    sourceId: string,
  ): TData[] => {
    const { nextNodes, removedNode } = removeLayerTreeNode(nodes, sourceId)
    if (!removedNode) {
      return nodes
    }
    return [...nextNodes, removedNode]
  },
  rowVisibilityFeature: TableFeature = {
    assignRowPrototype: (prototype, table) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const layerTable = table as unknown as LayerTreeTable
      assignPrototypeAPIs('rowVisibilityFeature', prototype, table, {
        row_getIsVisible: {
          fn: (row) =>
            layerTable.atoms.rowVisibility?.get()?.[row.id] ??
            layerTable.options.getRowVisible?.(row) ??
            true,
        },
        row_toggleVisibility: {
          fn: (row, value?: boolean) => {
            layerTable.options.onRowVisibilityChange?.((old: RowVisibilityState) => ({
              ...old,
              [row.id]: value ?? !(old[row.id] ?? true),
            }))
          },
        },
      })
    },
    constructTableAPIs: (table) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const layerTable = table as unknown as LayerTreeTable,
        isRowVisible = (row: LayerTreeRow) =>
          layerTable.atoms.rowVisibility?.get()?.[row.id] ??
          layerTable.options.getRowVisible?.(row) ??
          true,
        setRowVisibility = (updater: Updater<RowVisibilityState>) => {
          const safeUpdater: Updater<RowVisibilityState> = (old) => functionalUpdate(updater, old)
          layerTable.options.onRowVisibilityChange?.(safeUpdater)
        },
        getIsAllRowsVisible = () =>
          layerTable.getRowModel().flatRows.every((row) => isRowVisible(row))

      assignTableAPIs('rowVisibilityFeature', layerTable, {
        table_getIsAllRowsVisible: {
          fn: () => getIsAllRowsVisible(),
        },
        table_resetRowVisibility: {
          fn: () => setRowVisibility(layerTable.initialState.rowVisibility ?? {}),
        },
        table_setRowVisibility: {
          fn: (updater: Updater<RowVisibilityState>) => setRowVisibility(updater),
        },
        table_toggleAllRowsVisible: {
          fn: (value?: boolean) => {
            const next = value ?? !getIsAllRowsVisible()
            setRowVisibility(() => {
              const state: RowVisibilityState = {}
              for (const row of layerTable.getRowModel().flatRows) {
                state[row.id] = next
              }
              return state
            })
          },
        },
      })
    },
    getDefaultTableOptions: (table) => ({
      enableRowVisibility: true,
      onRowVisibilityChange: makeStateUpdater('rowVisibility', table),
    }),
    getInitialState: (initialState) => ({
      rowVisibility: {},
      ...initialState,
    }),
  },
  rowLockedFeature: TableFeature = {
    assignRowPrototype: (prototype, table) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const layerTable = table as unknown as LayerTreeTable
      assignPrototypeAPIs('rowLockedFeature', prototype, table, {
        row_getIsLocked: {
          fn: (row) =>
            layerTable.atoms.rowLocked?.get()?.[row.id] ??
            layerTable.options.getRowLocked?.(row) ??
            false,
        },
        row_toggleLocked: {
          fn: (row, value?: boolean) => {
            layerTable.options.onRowLockedChange?.((old: RowLockedState) => ({
              ...old,
              [row.id]: value ?? !(old[row.id] ?? false),
            }))
          },
        },
      })
    },
    constructTableAPIs: (table) => {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      const layerTable = table as unknown as LayerTreeTable,
        isRowLocked = (row: LayerTreeRow) =>
          layerTable.atoms.rowLocked?.get()?.[row.id] ??
          layerTable.options.getRowLocked?.(row) ??
          false,
        setRowLocked = (updater: Updater<RowLockedState>) => {
          const safeUpdater: Updater<RowLockedState> = (old) => functionalUpdate(updater, old)
          layerTable.options.onRowLockedChange?.(safeUpdater)
        },
        getIsAllRowsLocked = () =>
          layerTable.getRowModel().flatRows.every((row) => isRowLocked(row))

      assignTableAPIs('rowLockedFeature', layerTable, {
        table_getIsAllRowsLocked: {
          fn: () => getIsAllRowsLocked(),
        },
        table_resetRowLocked: {
          fn: () => setRowLocked(layerTable.initialState.rowLocked ?? {}),
        },
        table_setRowLocked: {
          fn: (updater: Updater<RowLockedState>) => setRowLocked(updater),
        },
        table_toggleAllRowsLocked: {
          fn: (value?: boolean) => {
            const next = value ?? !getIsAllRowsLocked()
            setRowLocked(() => {
              const state: RowLockedState = {}
              for (const row of layerTable.getRowModel().flatRows) {
                state[row.id] = next
              }
              return state
            })
          },
        },
      })
    },
    getDefaultTableOptions: (table) => ({
      enableRowLocked: true,
      onRowLockedChange: makeStateUpdater('rowLocked', table),
    }),
    getInitialState: (initialState) => ({
      rowLocked: {},
      ...initialState,
    }),
  }

export {
  findLayerTreeNode,
  insertLayerTreeNode,
  moveLayerTreeNode,
  moveLayerTreeNodeToRoot,
  removeLayerTreeNode,
  rowLockedFeature,
  rowVisibilityFeature,
  type LayerTreeNodeBase,
}
