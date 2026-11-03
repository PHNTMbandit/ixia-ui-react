import { cn } from '@/utils'

import { Button } from '../button'
import { Icon } from '../icon'
import { Popover } from '../popover'
import { useIxiaMap } from './map.context'
import type { MapLayerListProps } from './map.types'

export function MapLayerList({ className, children, ref, ...props }: MapLayerListProps) {
  const { layers } = useIxiaMap()

  return (
    <Popover>
      <Popover.Trigger>
        <Button size="medium" tone="neutral" variant="elevated">
          <Icon name="layers" weight="bold" />
        </Button>
      </Popover.Trigger>
      <Popover.Panel className={cn('', className)} ref={ref} {...props}>
        <Popover.Content>
          <ul className="flex flex-col gap-2xs">{layers.map((layer) => children(layer))}</ul>
        </Popover.Content>
      </Popover.Panel>
    </Popover>
  )
}
