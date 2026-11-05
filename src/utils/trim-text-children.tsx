import { Children, Fragment, isValidElement } from 'react'
import type { ReactNode } from 'react'

const EMPTY = 0

/**
 * Wraps loose text children in a `text-box-trim` span. Flex containers can't trim their
 * anonymous text items, so without this the text is centred on rounded font metrics and
 * drifts off-centre at fluid font sizes and browser zoom levels.
 */
export function trimTextChildren(children: ReactNode): ReactNode {
  const result: ReactNode[] = [],
    text: (string | number)[] = [],
    flush = () => {
      if (text.length === EMPTY) {
        return
      }
      result.push(
        <span key={`trim-text-${result.length}`} data-slot="text" className="text-box-trim">
          {text.join('')}
        </span>,
      )
      text.length = EMPTY
    }

  for (const child of Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') {
      text.push(child)
    } else if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
      flush()
      result.push(<Fragment key={child.key}>{trimTextChildren(child.props.children)}</Fragment>)
    } else {
      flush()
      result.push(child)
    }
  }
  flush()

  return result
}
