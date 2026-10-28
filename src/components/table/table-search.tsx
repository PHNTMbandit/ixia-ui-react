import type { ChangeEvent } from 'react'

import { cn } from '@/utils/cn'

import { Icon } from '../icon'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { useTableContext } from './table-feature-context'
import type { TableSearchProps } from './table.types'

export function TableSearch({ className, ref, ...props }: TableSearchProps) {
  const table = useTableContext(),
    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      table.setGlobalFilter(event.target.value)
    }

  return (
    <table.Subscribe selector={(state) => state.globalFilter}>
      {(globalFilter) => (
        <InputGroup variant={props.variant ?? 'outline'} className="flex-1">
          <InputGroupAddon>
            <Icon name="search" />
          </InputGroupAddon>
          <InputGroupInput
            className={cn('', className)}
            onChange={handleChange}
            ref={ref}
            value={globalFilter ?? ''}
            {...props}
          />
        </InputGroup>
      )}
    </table.Subscribe>
  )
}
