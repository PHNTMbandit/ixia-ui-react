# Avatar

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Avatar component visually represents a person, team member, or entity. It supports three sizes (`small`, `medium`, `large`), image and fallback rendering, and optional status badges with configurable tone and position. Use it in navigation, comments, messaging interfaces, member lists, and activity feeds.

## Import

```tsx
import { Avatar } from 'ixia-ui-react/avatar'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `size`: Controls the avatar dimensions and fallback text size. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.

## Runtime exports

- `AvatarFallback`
- `AvatarImage`
- `AvatarBadge`
- `Avatar`

## Type exports

- `AvatarBadgeProps`
- `AvatarFallbackProps`
- `AvatarImageProps`
- `AvatarProps`

## Compound parts

### Avatar

- `Avatar.Badge`
- `Avatar.Fallback`
- `Avatar.Image`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/avatar/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/avatar/avatar.stories.tsx)
- [Getting started](../guides/getting-started.md)
