import { createContext, useContext, useState } from 'react'

import type { SliderGroupContextValue } from '../slider-group/slider-group.types'

const SliderGroupContext = createContext<SliderGroupContextValue | undefined>(undefined),
  useSliderGroupContext = () => useContext(SliderGroupContext),
  areNumberArraysEqual = (first?: number[], second?: number[]) =>
    first === second ||
    (first !== undefined &&
      second !== undefined &&
      first.length === second.length &&
      first.every((item, index) => item === second[index])),
  useStableNumberArray = (next: number[] | undefined) => {
    const [stable, setStable] = useState(next)
    if (!areNumberArraysEqual(stable, next)) {
      setStable(next)
      return next
    }
    return stable
  }

export { SliderGroupContext, useSliderGroupContext, areNumberArraysEqual, useStableNumberArray }
