import React from 'react'

import { IconContext } from './icon-context'
import type { IconProviderProps } from './icon.types'

/**
 * Replaces the default Phosphor icons and sets their weight for every library component below it.
 * Providers can be nested; inner providers override only the icon names and weight they set.
 */
export function IconProvider({ icons, weight, children }: IconProviderProps) {
  const parent = React.useContext(IconContext),
    value = React.useMemo(
      () => ({ icons: { ...parent.icons, ...icons }, weight: weight ?? parent.weight }),
      [parent, icons, weight],
    )

  return <IconContext value={value}>{children}</IconContext>
}
