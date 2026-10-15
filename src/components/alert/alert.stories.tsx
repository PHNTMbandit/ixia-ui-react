import {
  CheckCircleIcon,
  InfoIcon,
  ShieldWarningIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { Alert } from './index'

const TONE_ICONS = {
    accent: <ShieldWarningIcon weight="duotone" />,
    brand: <InfoIcon weight="duotone" />,
    error: <XCircleIcon weight="duotone" />,
    info: <InfoIcon weight="duotone" />,
    neutral: <InfoIcon weight="duotone" />,
    success: <CheckCircleIcon weight="duotone" />,
    warning: <WarningIcon weight="duotone" />,
  },
  TONE_CONTENT: Record<
    string,
    { title: string; description: string; actionLabel?: string; usage: string }
  > = {
    accent: {
      actionLabel: 'Explore',
      description: 'Check out the newly released feature that can help you work more efficiently.',
      title: 'Feature highlight',
      usage: 'Promotional or feature announcements',
    },
    brand: {
      actionLabel: 'Review',
      description:
        'Your team has updated the brand style guide. Review the changes to stay aligned.',
      title: 'New brand guidelines available',
      usage: 'Primary brand announcements',
    },
    error: {
      actionLabel: 'Update Now',
      description:
        'Your password will expire in 3 days. Update it now to maintain access to your account.',
      title: 'Critical action required',
      usage: 'Error states and critical issues',
    },
    info: {
      actionLabel: 'Learn More',
      description:
        'Learn more about the new features available in this release. See release notes for details.',
      title: 'Information',
      usage: 'Supplementary guidance and tips',
    },
    neutral: {
      description:
        'A background maintenance window is scheduled for this weekend. Plan accordingly.',
      title: 'System notification',
      usage: 'General system or administrative info',
    },
    success: {
      actionLabel: 'Undo',
      description:
        'Your profile has been updated and all changes are now live across your account.',
      title: 'Changes saved successfully',
      usage: 'Confirms completed actions or successful states',
    },
    warning: {
      actionLabel: 'Delete',
      description:
        'This action cannot be undone. Deleting this item will remove it permanently from your workspace.',
      title: 'Proceed with caution',
      usage: 'Alerts that require user attention before proceeding',
    },
  },
  TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const

type Tone = (typeof TONES)[number]

const SingleAlert = ({
    tone = 'brand',
    withAction = false,
  }: {
    tone?: Tone
    withAction?: boolean
  }) => {
    const { title, description, actionLabel } = TONE_CONTENT[tone]
    return (
      <Alert tone={tone} className="max-w-[70vh]">
        <Alert.Icon>{TONE_ICONS[tone]}</Alert.Icon>
        <Alert.Title>{title}</Alert.Title>
        <Alert.Description>
          {description} {description}
        </Alert.Description>
        {withAction && actionLabel && (
          <Alert.Action>
            <Button tone={tone} size="small">
              {actionLabel}
            </Button>
          </Alert.Action>
        )}
      </Alert>
    )
  },
  AllTonesAlerts = ({ withAction = false }: { withAction?: boolean }) => (
    <div className="flex flex-col gap-sm">
      {TONES.map((tone) => (
        <SingleAlert key={tone} tone={tone} withAction={withAction} />
      ))}
    </div>
  )

export default {
  argTypes: {
    tone: {
      control: 'select',
      description: 'Sets the semantic tone and styling of the alert.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
  },
  args: {
    tone: 'brand',
  },
  component: Alert,
  parameters: {
    docs: {
      description: {
        component:
          'The Alert component is a specialized container for displaying time-sensitive or important messages. It supports seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`) and can optionally include a leading icon and action buttons via the `AlertActions` slot.',
      },
      subtitle: 'A prominent container that captures attention with contextual messaging.',
    },
  },
  render: (args) => (
    <Alert {...args}>
      <Alert.Icon>{TONE_ICONS[args.tone as Tone]}</Alert.Icon>
      <Alert.Title>Alert title</Alert.Title>
      <Alert.Description>
        A meaningful description of the alert and any required action.
      </Alert.Description>
    </Alert>
  ),
  subcomponents: {
    AlertActions: Alert.Action,
    AlertDescription: Alert.Description,
    AlertTitle: Alert.Title,
  },
  title: 'Components/Alert',
} satisfies Meta<typeof Alert>

type Story = StoryObj<typeof Alert>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to interactively explore all `tone` combinations.',
      },
    },
  },
}

// ─── Tones ───────────────────────────────────────────────────────────────────

export const Brand: Story = {
  args: { tone: 'brand' },
  name: 'Tone / Brand',
  parameters: {
    docs: {
      description: {
        story: 'Default tone. Use for primary brand announcements and standard alerts.',
      },
    },
  },
  render: (args) => <SingleAlert {...args} tone="brand" />,
}

export const Accent: Story = {
  args: { tone: 'accent' },
  name: 'Tone / Accent',
  parameters: {
    docs: {
      description: { story: 'Highlights secondary or promotional content with emphasis.' },
    },
  },
  render: (args) => <SingleAlert {...args} tone="accent" />,
}

export const Neutral: Story = {
  args: { tone: 'neutral' },
  name: 'Tone / Neutral',
  parameters: {
    docs: {
      description: { story: 'Neutral tone for general, non-critical system messages.' },
    },
  },
  render: (args) => <SingleAlert {...args} tone="neutral" />,
}

export const Error: Story = {
  args: { tone: 'error' },
  name: 'Tone / Error',
  parameters: {
    docs: {
      description: {
        story: 'Used for errors, failures, or critical issues requiring immediate attention.',
      },
    },
  },
  render: (args) => <SingleAlert {...args} tone="error" withAction />,
}

export const Info: Story = {
  args: { tone: 'info' },
  name: 'Tone / Info',
  parameters: {
    docs: {
      description: { story: 'Informational tone for tips, guidance, and supplementary details.' },
    },
  },
  render: (args) => <SingleAlert {...args} tone="info" withAction />,
}

export const Success: Story = {
  args: { tone: 'success' },
  name: 'Tone / Success',
  parameters: {
    docs: {
      description: { story: 'Confirms successful completion of an action or positive state.' },
    },
  },
  render: (args) => <SingleAlert {...args} tone="success" withAction />,
}

export const Warning: Story = {
  args: { tone: 'warning' },
  name: 'Tone / Warning',
  parameters: {
    docs: {
      description: { story: 'Alerts the user to proceed cautiously or review before confirming.' },
    },
  },
  render: (args) => <SingleAlert {...args} tone="warning" />,
}

// ─── Behaviour ───────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'Behaviour / With Action',
  parameters: {
    docs: {
      description: {
        story:
          'Alerts can include action buttons via `AlertActions` to enable user interaction directly from the message.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      <SingleAlert tone="success" withAction />
      <SingleAlert tone="error" withAction />
      <SingleAlert tone="info" withAction />
    </div>
  ),
}

export const WithoutAction: Story = {
  name: 'Behaviour / Without Action',
  parameters: {
    docs: {
      description: {
        story: 'Alerts without action buttons are suitable for informational messages.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      <SingleAlert tone="brand" withAction={false} />
      <SingleAlert tone="neutral" withAction={false} />
      <SingleAlert tone="info" withAction={false} />
    </div>
  ),
}

// ─── Composition ─────────────────────────────────────────────────────────────

export const AllTones: Story = {
  name: 'Composition / All Tones',
  parameters: {
    docs: {
      description: {
        story:
          'All seven tones displayed together for quick reference and side-by-side comparison.',
      },
    },
  },
  render: () => <AllTonesAlerts withAction={false} />,
}

export const AllTonesWithActions: Story = {
  name: 'Composition / All Tones with Actions',
  parameters: {
    docs: {
      description: {
        story:
          'All tones rendered with action buttons where applicable. Demonstrates the full interactive pattern.',
      },
    },
  },
  render: () => <AllTonesAlerts withAction />,
}

export const MultipleAlerts: Story = {
  name: 'Composition / Multiple Stacked',
  parameters: {
    docs: {
      description: {
        story:
          'Multiple alerts can be stacked to convey several messages or states simultaneously.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-md">
      <div>
        <p className="mb-sm text-sm font-medium text-on-surface">Success + Info</p>
        <div className="flex flex-col gap-sm">
          <SingleAlert tone="success" withAction />
          <SingleAlert tone="info" withAction />
        </div>
      </div>
      <div>
        <p className="mb-sm text-sm font-medium text-on-surface">Warning + Error</p>
        <div className="flex flex-col gap-sm">
          <SingleAlert tone="warning" />
          <SingleAlert tone="error" withAction />
        </div>
      </div>
    </div>
  ),
}

export const WithoutDescription: Story = {
  name: 'Composition / Without Description',
  parameters: {
    docs: {
      description: {
        story: 'Alerts can be rendered without a description for concise messages.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      <Alert>
        <Alert.Icon>
          <WarningIcon />
        </Alert.Icon>
        <Alert.Title>This is an example of a brand alert without an description.</Alert.Title>
      </Alert>
    </div>
  ),
}

export const ActionWithNoIcon: Story = {
  name: 'Composition / Action with No Icon',
  parameters: {
    docs: {
      description: {
        story: 'An alert can have an action button even if no icon is present.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      <Alert>
        <Alert.Title>This is an example of an alert with an action but no icon.</Alert.Title>
        <Alert.Description>This alert has an action but no icon.</Alert.Description>
        <Alert.Action>
          <Button size="small">Action</Button>
        </Alert.Action>
      </Alert>
    </div>
  ),
}
