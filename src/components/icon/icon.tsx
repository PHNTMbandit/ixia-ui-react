import React from 'react'

import { defaultIcons } from './default-icons'
import { IconContext } from './icon-context'
import type { IconRenderProps } from './icon.types'

export function Icon({ name, weight, ...props }: IconRenderProps) {
  const context = React.useContext(IconContext),
    Custom = context.icons[name],
    Default = defaultIcons[name]

  if (Custom) {
    return <Custom aria-hidden="true" {...props} />
  }

  return <Default aria-hidden="true" weight={weight ?? context.weight} {...props} />
}
