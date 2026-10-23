import { useSelector } from '@tanstack/react-store'

import { cn } from '@/utils'

import { TabsList, TabsTab } from '../tabs'
import { Tabs } from '../tabs/tabs'
import { useTableContext } from './table-feature-context'
import type { TableDatasetTabProps } from './table.types'

export function TableDatasetTab({ className, children, ref, ...props }: TableDatasetTabProps) {
  const table = useTableContext(),
    datasets = useSelector(table.atoms.datasets),
    currentDataset = useSelector(table.atoms.currentDataset),
    handleTabChange = (datasetId: string) => {
      const dataset = datasets.find((candidate) => candidate.id === datasetId)

      if (!dataset) {
        return
      }

      table.setCurrentDataset(dataset)
    }

  return (
    <Tabs
      value={currentDataset.id}
      onValueChange={handleTabChange}
      className={cn('[[data-slot=table-container]>&]:-mb-md', className)}
      ref={ref}
      {...props}
      data-slot="table-dataset-tab"
    >
      {children}
      <TabsList>
        {datasets.map((dataset) => (
          <TabsTab key={dataset.id} value={dataset.id}>
            {dataset.name}
          </TabsTab>
        ))}
      </TabsList>
    </Tabs>
  )
}
