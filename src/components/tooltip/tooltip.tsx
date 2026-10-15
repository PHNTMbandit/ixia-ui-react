import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

import type { TooltipProps } from './tooltip.types'

export function Tooltip({ ...props }: TooltipProps) {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root {...props} />
    </BaseTooltip.Provider>
  )
}
