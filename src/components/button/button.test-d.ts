import type { ButtonGroupProps } from '../button-group/button-group.types'
import type { ButtonProps } from './button.types'

type AssertNever<Value extends never> = Value
type Differences<Actual, Expected> = Exclude<Actual, Expected> | Exclude<Expected, Actual>

type ButtonVariantContract = AssertNever<
  Differences<
    NonNullable<ButtonProps['variant']>,
    'elevated' | 'fill' | 'ghost' | 'link' | 'outline' | 'secondary'
  >
>

type ButtonGroupVariantContract = AssertNever<
  Differences<
    NonNullable<ButtonGroupProps['variant']>,
    'elevated' | 'fill' | 'ghost' | 'outline' | 'secondary'
  >
>

export type { ButtonGroupVariantContract, ButtonVariantContract }
