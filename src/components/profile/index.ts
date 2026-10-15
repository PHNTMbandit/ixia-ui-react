import { Profile as ProfileRoot } from './profile'
import { ProfileAction } from './profile-action'
import { ProfileContent } from './profile-content'
import { ProfileName } from './profile-name'
import { ProfileSubname } from './profile-subname'

const Profile = Object.assign(ProfileRoot, {
  Action: ProfileAction,
  Content: ProfileContent,
  Name: ProfileName,
  Subname: ProfileSubname,
})

export type {
  ProfileProps,
  ProfileNameProps,
  ProfileSubnameProps,
  ProfileActionProps,
  ProfileContentProps,
} from './profile.types'
export { ProfileName } from './profile-name'
export { ProfileSubname } from './profile-subname'
export { ProfileAction } from './profile-action'
export { ProfileContent } from './profile-content'

export { Profile }
