import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete'

import { cn } from '@/utils/cn'

import type { AutocompleteTriggerProps } from './autocomplete.types'

export function AutocompleteTrigger({ className, ref, ...props }: AutocompleteTriggerProps) {
  return <BaseAutocomplete.Trigger className={cn('', className)} ref={ref} {...props} />
}
