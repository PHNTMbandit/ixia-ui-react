import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '../../../src/components/avatar'
import type { AvatarProps, AvatarBadgeProps } from '../../../src/components/avatar'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Avatar', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj
const cva = { file: 'src/components/avatar/avatar.types.ts', name: 'avatarVariants' }

export const Fallback: Story = {
  parameters: {
    figma: {
      component: 'Avatar/Fallback',
      group: 'Avatar',
      order: 600,
      cva,
      description: 'Initials used when a profile image is unavailable.',
      properties: { initials: 'Avatar.Fallback children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Avatar size={combo.size as AvatarProps['size']}>
          <Avatar.Fallback {...target(index)} {...text('initials')}>
            AB
          </Avatar.Fallback>
        </Avatar>
      )}
    />
  ),
}

export const Image: Story = {
  parameters: {
    figma: {
      component: 'Avatar/Image',
      group: 'Avatar',
      order: 601,
      cva,
      description:
        'Image loading placeholder, matching the current Avatar.Image render. The React implementation currently never leaves its loading branch.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Avatar {...target(index)} size={combo.size as AvatarProps['size']}>
          <Avatar.Image alt="Profile image" />
        </Avatar>
      )}
    />
  ),
}

export const Badge: Story = {
  parameters: {
    figma: {
      component: 'Avatar/Badge',
      group: 'Avatar',
      order: 602,
      cva: { ...cva, name: 'avatarBadgeVariants', axes: ['tone'] },
      axes: { size: ['small', 'medium', 'large'] },
      defaults: { size: 'medium' },
      description: 'Status badge. Size matches its parent avatar; toggle or swap the icon.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Avatar size={combo.size as AvatarProps['size']}>
          <Avatar.Badge {...target(index)} tone={combo.tone as AvatarBadgeProps['tone']}>
            <Icon name="selected" {...swap('icon', false)} />
          </Avatar.Badge>
        </Avatar>
      )}
    />
  ),
}

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Avatar',
      group: 'Avatar',
      order: 603,
      cva,
      description:
        'Replace the content with an Image or Fallback instance; toggle and edit the nested status badge.',
      slots: {
        content: {
          description: 'Image or initials.',
          only: true,
          preferred: ['Avatar/Fallback', 'Avatar/Image'],
          max: 1,
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Avatar {...target(index)} size={combo.size as AvatarProps['size']}>
          <div className="size-full" {...slot('content')}>
            <Avatar.Fallback
              {...part('Avatar/Fallback', { size: combo.size })}
              {...text('initials')}
            >
              AB
            </Avatar.Fallback>
          </div>
          <Avatar.Badge
            {...part('Avatar/Badge', { size: combo.size, tone: 'success' })}
            {...show('badge', false)}
          >
            <Icon name="selected" {...swap('icon', false)} />
          </Avatar.Badge>
        </Avatar>
      )}
    />
  ),
}
