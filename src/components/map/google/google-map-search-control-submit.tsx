import { CircleNotchIcon } from '@phosphor-icons/react'
import React from 'react'

import { Button } from '@/components/button'
import { cn } from '@/utils'

import { useGoogleMapSearchControl } from './google-map-search-control.context'
import type { GoogleMapSearchControlSubmitProps } from './google-map-search-control.types'

export function GoogleMapSearchControlSubmit({
  className,
  onClick,
  ref,
  ...props
}: GoogleMapSearchControlSubmitProps) {
  const [isPending, startTransition] = React.useTransition(),
    { selectFirstSuggestion } = useGoogleMapSearchControl(),
    handleClick: NonNullable<GoogleMapSearchControlSubmitProps['onClick']> = async (event) => {
      onClick?.(event)

      if (!event.defaultPrevented) {
        startTransition(async () => {
          await selectFirstSuggestion()
        })
      }
    }

  if (isPending) {
    return (
      <Button
        tone="neutral"
        size="medium"
        disabled
        className={cn('animate-spin', className)}
        ref={ref}
        {...props}
      >
        <CircleNotchIcon weight="bold" />
      </Button>
    )
  }
  return <Button className={cn('', className)} ref={ref} {...props} onClick={handleClick} />
}
