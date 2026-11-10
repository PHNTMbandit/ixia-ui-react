import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { IconContainer } from '../../../src/components/icon-container'
import { Profile } from '../../../src/components/profile'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Profile' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Profile' }
const action = { State: 'Default', size: 'medium', tone: 'neutral', variant: 'ghost' }

export const Name: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Profile/Name',
      order: 490,
      description: 'Profile display name with an optional verification icon.',
      properties: { name: 'children', icon: '<Icon /> child' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Profile.Name {...target(index)} {...text('name')}>
          Alex Morgan
          <Icon aria-hidden="true" name="selected" {...swap('icon', false)} />
        </Profile.Name>
      )}
    />
  ),
}
export const Subname: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Profile/Subname',
      order: 491,
      description: 'Secondary profile text.',
      properties: { subname: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Profile.Subname {...target(index)} {...text('subname')}>
          alex@example.com
        </Profile.Subname>
      )}
    />
  ),
}

function Details() {
  return (
    <>
      <Profile.Name {...part('Profile/Name', {})} {...text('name')}>
        Alex Morgan
        <Icon aria-hidden="true" name="selected" {...swap('icon', false)} />
      </Profile.Name>
      <Profile.Subname
        {...part('Profile/Subname', {})}
        {...show('showSubname')}
        {...text('subname')}
      >
        alex@example.com
      </Profile.Subname>
    </>
  )
}

export const Content: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Profile/Content',
      order: 492,
      description:
        'Name and subname column. compact hides this entire part; toggle showContent on Profile instead of generating an empty asset.',
      slots: {
        details: {
          description: 'Profile name and supporting content.',
          preferred: ['Profile/Name', 'Profile/Subname'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Profile.Content {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('details')}>
            <Details />
          </div>
        </Profile.Content>
      )}
    />
  ),
}
export const Action: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Profile/Action',
      order: 493,
      description: 'Trailing profile action with the source auto left margin.',
      slots: {
        actions: {
          description: 'Buttons or icons.',
          preferred: ['Button/Icon only', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Profile.Action {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('actions')}>
            <Button
              aria-label="Profile options"
              tone="neutral"
              variant="ghost"
              {...part('Button/Icon only', action)}
            >
              <Icon name="chevronDown" {...swap('icon')} />
            </Button>
          </div>
        </Profile.Action>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Profile',
  parameters: {
    figma: {
      ...base,
      component: 'Profile',
      order: 494,
      description: 'Flexible leading avatar slot, editable identity and trailing action.',
      properties: { showContent: '!<Profile.Content compact>', avatar: 'leading children' },
      slots: {
        avatar: { description: 'Avatar, image or icon.' },
        details: { description: 'Profile content.', preferred: ['Profile/Content'] },
        actions: { description: 'Trailing action.', preferred: ['Profile/Action'] },
      },
      usage:
        '<Profile><Avatar>…</Avatar><Profile.Content><Profile.Name>Alex Morgan</Profile.Name><Profile.Subname>alex@example.com</Profile.Subname></Profile.Content><Profile.Action>…</Profile.Action></Profile>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Profile {...target(index)} style={{ width: 320 }}>
          <IconContainer size="small" tone="neutral" {...slot('avatar')}>
            <Icon aria-hidden="true" name="folder" {...swap('avatarIcon')} />
          </IconContainer>
          <div style={{ display: 'contents' }} {...slot('details')}>
            <Profile.Content {...part('Profile/Content', {})} {...show('showContent')}>
              <div style={{ display: 'contents' }} {...slot('details')}>
                <Details />
              </div>
            </Profile.Content>
          </div>
          <div style={{ display: 'contents' }} {...slot('actions')}>
            <Profile.Action {...part('Profile/Action', {})} {...show('showAction')}>
              <div style={{ display: 'contents' }} {...slot('actions')}>
                <Button
                  aria-label="Profile options"
                  tone="neutral"
                  variant="ghost"
                  {...part('Button/Icon only', action)}
                >
                  <Icon name="chevronDown" {...swap('icon')} />
                </Button>
              </div>
            </Profile.Action>
          </div>
        </Profile>
      )}
    />
  ),
}
