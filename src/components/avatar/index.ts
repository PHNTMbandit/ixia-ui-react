import { Avatar as AvatarRoot } from './avatar'
import { AvatarBadge } from './avatar-badge'
import { AvatarFallback } from './avatar-fallback'
import { AvatarImage } from './avatar-image'

const Avatar = Object.assign(AvatarRoot, {
  Badge: AvatarBadge,
  Fallback: AvatarFallback,
  Image: AvatarImage,
})

export type {
  AvatarBadgeProps,
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from './avatar.types'
export { AvatarFallback } from './avatar-fallback'
export { AvatarImage } from './avatar-image'
export { AvatarBadge } from './avatar-badge'

export { Avatar }
