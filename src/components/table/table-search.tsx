import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import type { ChangeEvent } from 'react'

import { cn } from '@/utils/cn'

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
        <InputGroup>
          <InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
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
