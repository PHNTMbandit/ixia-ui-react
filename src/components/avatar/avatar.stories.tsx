import type { ImageLoadingStatus } from '@base-ui/react/avatar'
import {
  BellIcon,
  CheckIcon,
  CrownIcon,
  DotOutlineIcon,
  PlusIcon,
  WarningIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Button } from '../button'
import { Avatar } from './index'

const SIZES = ['small', 'medium', 'large'] as const,
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  POSITIONS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const

type AvatarSize = (typeof SIZES)[number]
type BadgeTone = (typeof TONES)[number]
type BadgePosition = (typeof POSITIONS)[number]

const SAMPLE_USERS = [
    {
      image: 'https://github.com/shadcn.png',
      initials: 'ST',
      name: 'Sophia Turner',
    },
    {
      image: 'https://i.pravatar.cc/128?img=12',
      initials: 'ML',
      name: 'Marcus Lee',
    },
    {
      image: 'https://i.pravatar.cc/128?img=32',
      initials: 'NP',
      name: 'Nina Patel',
    },
  ] as const,
  BADGE_ICONS = {
    accent: <BellIcon weight="bold" />,
    brand: <CrownIcon weight="bold" />,
    error: <WarningIcon weight="bold" />,
    info: <BellIcon weight="bold" />,
    neutral: <DotOutlineIcon weight="fill" />,
    success: <CheckIcon weight="bold" />,
    warning: <WarningIcon weight="bold" />,
  } satisfies Record<BadgeTone, React.ReactNode>,
  AvatarTemplate = ({
    size = 'medium',
    withFallback = false,
    showBadge = false,
    badgeTone = 'success',
    badgePosition = 'bottomRight',
    badgeIcon = false,
  }: {
    size?: AvatarSize
    withFallback?: boolean
    showBadge?: boolean
    badgeTone?: BadgeTone
    badgePosition?: BadgePosition
    badgeIcon?: boolean
  }) => (
    <Avatar size={size}>
      {withFallback ? (
        <Avatar.Fallback>ST</Avatar.Fallback>
      ) : (
        <Avatar.Image alt="Sophia Turner" src={SAMPLE_USERS[0].image} />
      )}
      {showBadge ? (
        <Avatar.Badge position={badgePosition} tone={badgeTone}>
          {badgeIcon ? BADGE_ICONS[badgeTone] : null}
        </Avatar.Badge>
      ) : null}
    </Avatar>
  )

export default {
  argTypes: {
    size: {
      control: { type: 'select' },
      description: 'Controls the avatar dimensions and fallback text size.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
  args: {
    size: 'medium',
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'The Avatar component visually represents a person, team member, or entity. It supports three sizes (`small`, `medium`, `large`), image and fallback rendering, and optional status badges with configurable tone and position. Use it in navigation, comments, messaging interfaces, member lists, and activity feeds.',
      },
      subtitle:
        'A circular user representation that supports images, initials, and presence badges.',
    },
  },
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Image src={'https://github.com/shadcn.png'} />
    </Avatar>
  ),
  subcomponents: {
    AvatarBadge: Avatar.Badge,
    AvatarFallback: Avatar.Fallback,
    AvatarImage: Avatar.Image,
  },
  title: 'Components/Avatar',
} satisfies Meta<typeof Avatar>

type Story = StoryObj<typeof Avatar>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use controls to explore the supported avatar sizes with the default image example.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
  name: 'Size / Small',
  parameters: {
    docs: {
      description: {
        story: 'Compact avatar size suited to dense lists, table rows, and inline metadata.',
      },
    },
  },
}

export const Medium: Story = {
  args: {
    size: 'medium',
  },
  name: 'Size / Medium',
  parameters: {
    docs: {
      description: {
        story: 'Default avatar size for profile summaries, cards, and list items.',
      },
    },
  },
}
export const Large: Story = {
  args: {
    size: 'large',
  },
  name: 'Size / Large',
  parameters: {
    docs: {
      description: {
        story: 'Large presentation size for profile headers and prominent user surfaces.',
      },
    },
  },
}

export const WithFallback: Story = {
  name: 'State / Fallback',
  parameters: {
    docs: {
      description: {
        story: 'When no image is available, fallback initials keep the identity recognizable.',
      },
    },
  },
  render: (args) => <AvatarTemplate size={args.size as AvatarSize} withFallback />,
}

const largeImage = (cacheBuster: number) => `https://picsum.photos/2400/2400?v=${cacheBuster}`,
  SkeletonLoadingTemplate = ({ size = 'large' }: { size?: AvatarSize }) => {
    const [reloadKey, setReloadKey] = useState(0),
      [_status, setStatus] = useState<ImageLoadingStatus>('loading')

    return (
      <div className="flex flex-col items-center gap-md">
        <Avatar size={size}>
          <Avatar.Image key={reloadKey} alt={SAMPLE_USERS[0].name} src={largeImage(reloadKey)} />
        </Avatar>

        <Button
          onClick={() => {
            setStatus('loading')
            setReloadKey((key) => key + 1)
          }}
        >
          Reload image
        </Button>
      </div>
    )
  }

export const SkeletonLoading: Story = {
  name: 'State / Skeleton Loading',
  parameters: {
    docs: {
      description: {
        story:
          'While the image is downloading, `AvatarImage` renders a pulsing skeleton via its `data-loading` styles. This story loads a large image and offers a reload control so the loading state can be observed on demand.',
      },
    },
  },
  render: (args) => <SkeletonLoadingTemplate size={(args.size as AvatarSize) ?? 'large'} />,
}

type BadgeStory = StoryObj<typeof Avatar.Badge>

export const Badge: BadgeStory = {
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    },
    tone: {
      control: { type: 'select' },
      options: ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'],
    },
  },
  args: {
    position: 'bottomRight',
    tone: 'success',
  },
  name: 'Badge / Dot',
  parameters: {
    docs: {
      description: {
        story:
          'A simple presence/status dot applied to the avatar using tone and position options.',
      },
    },
  },
  render: (args) => (
    <AvatarTemplate
      badgePosition={args.position as BadgePosition}
      badgeTone={args.tone as BadgeTone}
      showBadge
    />
  ),
}

export const BadgeWithIcon: BadgeStory = {
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
    },
    tone: {
      control: { type: 'select' },
      options: ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'],
    },
  },
  args: {
    position: 'bottomRight',
    tone: 'neutral',
  },
  name: 'Badge / Icon',
  parameters: {
    docs: {
      description: {
        story: 'An icon badge is useful for actions such as invite, add, or role indicators.',
      },
    },
  },
  render: (args) => (
    <Avatar size="medium">
      <Avatar.Image alt="Sophia Turner" src={SAMPLE_USERS[0].image} />
      <Avatar.Badge position={args.position as BadgePosition} tone={args.tone as BadgeTone}>
        <PlusIcon weight="bold" />
      </Avatar.Badge>
    </Avatar>
  ),
}

export const AllSizes: Story = {
  name: 'Composition / All Sizes',
  parameters: {
    docs: {
      description: {
        story: 'All supported sizes displayed together for quick visual comparison.',
      },
    },
  },
  render: () => (
    <div className="flex items-end gap-md">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-xs">
          <AvatarTemplate size={size} />
          <span className="style-text-default--1 text-on-surface-variant capitalize">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const AllBadgeTones: BadgeStory = {
  name: 'Composition / Badge Tones',
  parameters: {
    docs: {
      description: {
        story:
          'All badge tones shown on the same avatar so status colors can be compared at a glance.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-md">
      {TONES.map((tone) => (
        <div key={tone} className="flex flex-col items-center gap-xs">
          <AvatarTemplate badgeTone={tone} showBadge />
          <span className="style-text-default--1 text-on-surface-variant capitalize">{tone}</span>
        </div>
      ))}
    </div>
  ),
}

export const BadgePositions: BadgeStory = {
  name: 'Composition / Badge Positions',
  parameters: {
    docs: {
      description: {
        story: 'Badge placement options for adapting presence indicators to different layouts.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-md">
      {POSITIONS.map((position) => (
        <div key={position} className="flex flex-col items-center gap-xs">
          <AvatarTemplate badgePosition={position} showBadge />
          <span className="style-text-default--1 text-on-surface-variant">{position}</span>
        </div>
      ))}
    </div>
  ),
}

export const TeamStack: Story = {
  name: 'Composition / Team Stack',
  parameters: {
    docs: {
      description: {
        story:
          'A common overlapping team/member stack pattern for cards, channels, and participant summaries.',
      },
    },
  },
  render: () => (
    <div className="flex items-center">
      {SAMPLE_USERS.map((user, index) => (
        <div key={user.name} className={index === 0 ? '' : '-ml-xs'}>
          <Avatar className="outline-2 outline-surface-background" size="medium">
            <Avatar.Image alt={user.name} src={user.image} />
          </Avatar>
        </div>
      ))}
      <div className="-ml-xs">
        <Avatar size="medium">
          <Avatar.Fallback>+4</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  ),
}
