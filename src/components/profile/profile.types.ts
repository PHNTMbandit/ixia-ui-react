import type { ComponentProps } from 'react'

type ProfileProps = ComponentProps<'div'>
type ProfileContentProps = React.ComponentProps<'div'> & {
  compact?: boolean
}
type ProfileActionProps = React.ComponentProps<'div'>
type ProfileNameProps = React.ComponentProps<'span'>
type ProfileSubnameProps = React.ComponentProps<'span'>

export type {
  ProfileProps,
  ProfileContentProps,
  ProfileActionProps,
  ProfileNameProps,
  ProfileSubnameProps,
}
