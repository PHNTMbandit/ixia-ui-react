import { MagnifyingGlassIcon } from '@phosphor-icons/react'

import { cn } from '@/utils/cn'

import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group'
import { useTableContext } from './layer-tree-context'
import type { LayerTreeSearchProps } from './layer-tree.types'

export function LayerTreeSearch({
  placeholder,
  className,
  children,
  ref,
  ...props
}: LayerTreeSearchProps) {
  const table = useTableContext()

  return (
    <table.Subscribe selector={(state) => state.globalFilter}>
      {(globalFilter) => (
        <InputGroup className={cn('', className)} ref={ref} {...props}>
          <InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
          </InputGroupAddon>
          <InputGroupInput
            placeholder={placeholder}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            value={globalFilter ?? ''}
          />
          {children}
        </InputGroup>
      )}
    </table.Subscribe>
  )
}
