import { Kbd as KbdRoot } from './kbd'
import { KbdGroup } from './kbd-group'

const Kbd = Object.assign(KbdRoot, {
  Group: KbdGroup,
})

export type { KbdGroupProps, KbdProps } from './kbd.types'
export { KbdGroup } from './kbd-group'
export { Kbd }
