import { createContext, useContext, useState } from 'react'

import type { SliderGroupContextValue } from './slider-group.types'

const FIRST_THUMB_INDEX = 0,
  SliderGroupContext = createContext<SliderGroupContextValue | undefined>(undefined),
  useSliderGroupContext = () => useContext(SliderGroupContext),
  getPrimaryValue = (value: number[] | undefined, min: number): number =>
    value?.[FIRST_THUMB_INDEX] ?? min,
  withPrimaryValue = (value: number[] | undefined, next: number): number[] => {
    const result = [...(value ?? [])]
    result[FIRST_THUMB_INDEX] = next
    return result
  },
  areNumberArraysEqual = (first?: number[], second?: number[]) =>
    first === second ||
    (first !== undefined &&
      second !== undefined &&
      first.length === second.length &&
      first.every((item, index) => item === second[index])),
  // Keeps a referentially-stable array while its contents are unchanged, so a new
  // Literal each render can't masquerade as a value change (which loops Base UI's controlled Slider).
  useStableNumberArray = (next: number[] | undefined) => {
    const [stable, setStable] = useState(next)
    if (!areNumberArraysEqual(stable, next)) {
      setStable(next)
      return next
    }
    return stable
  }

export {
  SliderGroupContext,
  useSliderGroupContext,
  getPrimaryValue,
  withPrimaryValue,
  areNumberArraysEqual,
  useStableNumberArray,
}
