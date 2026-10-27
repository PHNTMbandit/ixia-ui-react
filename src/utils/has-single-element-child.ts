// oxlint-disable no-magic-numbers
import { Children, Fragment, isValidElement } from 'react'
import type { ReactNode } from 'react'

export function hasSingleElementChild(children: ReactNode): boolean {
  const items = Children.toArray(children),
    [child] = items

  if (items.length !== 1) {
    return false
  }

  if (!isValidElement<{ children?: ReactNode }>(child)) {
    return false
  }
  if (child.type === Fragment) {
    return hasSingleElementChild(child.props.children)
  }

  return true
}
