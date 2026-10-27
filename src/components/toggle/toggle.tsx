import type { ToggleState } from '@base-ui/react'
import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import { useContext } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/utils/cn'
import { hasSingleElementChild } from '@/utils/has-single-element-child'

import { ToggleGroupContext } from '../toggle-group/toggle-group-context'
import { toggleVariants } from './toggle.types'
import type { ToggleProps } from './toggle.types'

function getContent(children: ToggleProps['children'], state: ToggleState): ReactNode {
  if (typeof children === 'function') {
    return children(state)
  }
  return children
}

export function Toggle({ size, tone, className, children, ref, ...props }: ToggleProps) {
  const toggleGroupContext = useContext(ToggleGroupContext),
    effectiveSize = size ?? toggleGroupContext?.size ?? 'medium'

  return (
    <BaseToggle
      ref={ref}
      {...props}
      render={(innerProps, state) => {
        const content = getContent(children, state)
        let iconOnly: '' | undefined = undefined

        if (hasSingleElementChild(content)) {
          iconOnly = ''
        }

        return (
          <button
            {...innerProps}
            data-icon-only={iconOnly}
            className={cn(toggleVariants({ className, size: effectiveSize, tone }))}
            type="button"
          >
            {content}
          </button>
        )
      }}
    />
  )
}
