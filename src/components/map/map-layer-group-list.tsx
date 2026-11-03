import { cn } from '@/utils'

import { Button } from '../button'
import { Icon } from '../icon'
import { Popover } from '../popover'
import { useIxiaMap } from './map.context'
import type { MapLayerGroupListProps } from './map.types'

const GROUP_CHECK = 0

export function MapLayerGroupList({
  groups,
  className,
  children,
  ref,
  ...props
}: MapLayerGroupListProps) {
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
          <ul className="flex flex-col gap-md">
            {groups.map((group) => {
              const groupLayers = group.layers.flatMap((config) => {
                const layer = layers.find((candidate) => candidate.id === config.id)
                if (!layer) {
                  return []
                }

                return [
                  {
                    ...layer,
                    visible: config.visible ?? true,
                  },
                ]
              })

              if (groupLayers.length === GROUP_CHECK) {
                return undefined
              }

              return children(group)
            })}
          </ul>
        </Popover.Content>
      </Popover.Panel>
    </Popover>
  )
}
