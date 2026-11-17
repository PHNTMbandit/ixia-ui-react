import { Children, Fragment, isValidElement } from 'react'
import type { ReactNode } from 'react'

const EMPTY = 0

export function trimTextChildren(children: ReactNode): ReactNode {
  let text = '',
    wrapped = false,
    textIndex = EMPTY

  const result: ReactNode[] = [],
    flush = () => {
      if (text.length === EMPTY) {
        return
      }

      if (text.trim().length === EMPTY) {
        result.push(text)
      } else {
        result.push(
          <span key={`text:${textIndex++}`} data-slot="text" className="text-box-trim">
            {text}
          </span>,
        )
        wrapped = true
      }
      text = ''
    },
    visit = (nodes: ReactNode, parentKey: string) => {
      Children.toArray(nodes).forEach((child, index) => {
        let key = String(index)
        if (isValidElement(child)) {
          key = child.key ?? key
        }
        const childKey = `${parentKey}/${key}`

        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'bigint') {
          text += String(child)
        } else if (isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment) {
          visit(child.props.children, childKey)
        } else {
          flush()
          result.push(<Fragment key={`child:${childKey}`}>{child}</Fragment>)
        }
      })
    }

  visit(children, '')
  flush()
  if (wrapped || result.length > EMPTY) {
    return result
  }
  return children
}
