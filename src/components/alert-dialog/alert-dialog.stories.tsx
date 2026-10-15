import {
  CheckCircleIcon,
  InfoIcon,
  ShieldWarningIcon,
  TrashIcon,
  WarningCircleIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { AlertDialog } from './index'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const

type Tone = (typeof TONES)[number]

const TONE_ICONS: Record<Tone, React.ReactNode> = {
    accent: <ShieldWarningIcon weight="fill" />,
    brand: <InfoIcon weight="fill" />,
    error: <XCircleIcon weight="fill" />,
    info: <InfoIcon weight="fill" />,
    neutral: <InfoIcon weight="fill" />,
    success: <CheckCircleIcon weight="fill" />,
    warning: <WarningIcon weight="fill" />,
  },
  TONE_TRIGGER_LABELS: Record<Tone, string> = {
    accent: 'Open Dialog',
    brand: 'Open Dialog',
    error: 'Delete Item',
    info: 'View Details',
    neutral: 'Open Dialog',
    success: 'Complete Action',
    warning: 'Proceed',
  },
  TONE_CONTENT: Record<Tone, { title: string; description: string; confirm: string }> = {
    accent: {
      confirm: 'Publish',
      description:
        'This content will be made publicly visible immediately. You can unpublish it at any time from settings.',
      title: 'Publish this content?',
    },
    brand: {
      confirm: 'Confirm',
      description:
        'You are about to make a change that will affect your account. Are you sure you want to proceed?',
      title: 'Confirm your action',
    },
    error: {
      confirm: 'Delete',
      description:
        'This action cannot be undone. The item and all associated data will be permanently removed from our servers.',
      title: 'Permanently delete this item?',
    },
    info: {
      confirm: 'Accept & Continue',
      description:
        'Our terms of service have been updated. You must review and accept the new terms to continue using your account.',
      title: 'New terms of service',
    },
    neutral: {
      confirm: 'Save Changes',
      description:
        'You have unsaved changes. Would you like to save them before leaving, or discard your edits?',
      title: 'Save changes?',
    },
    success: {
      confirm: 'Mark Complete',
      description:
        'Once marked as complete, this task will be archived and removed from your active queue.',
      title: 'Mark as complete?',
    },
    warning: {
      confirm: 'Transfer',
      description:
        'You are about to transfer ownership of this workspace. You will lose admin privileges and this cannot be reversed.',
      title: 'Transfer ownership?',
    },
  },
  DialogTemplate = ({ tone = 'brand' }: { tone?: Tone }) => {
    const { title, description, confirm } = TONE_CONTENT[tone]
    return (
      <AlertDialog>
        <AlertDialog.Trigger>
          <Button tone={tone} variant="outline">
            {TONE_TRIGGER_LABELS[tone]}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Popup tone={tone} className="w-[900px]">
          <AlertDialog.Header>
            <AlertDialog.Icon>{TONE_ICONS[tone]}</AlertDialog.Icon>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{description}</AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <AlertDialog.Confirm>{confirm}</AlertDialog.Confirm>
          </AlertDialog.Footer>
        </AlertDialog.Popup>
      </AlertDialog>
    )
  },
  meta: Meta<typeof AlertDialog.Popup> = {
    argTypes: {
      tone: {
        control: 'select',
        description: 'Sets the semantic tone of the dialog, coloring the icon and confirm button.',
        options: TONES,
        table: {
          defaultValue: { summary: 'brand' },
        },
      },
    },
    component: AlertDialog,
    decorators: [
      (Story) => (
        <div
          className="flex min-h-dvh w-full items-center justify-center bg-cover bg-center p-lg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80)',
          }}
        >
          <Story />
        </div>
      ),
    ],
    parameters: {
      docs: {
        description: {
          component:
            'The Alert Dialog component blocks interaction with the rest of the application until the user explicitly confirms or cancels. It supports seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`) that color the leading icon and the confirm button.',
        },
        subtitle:
          'An accessible modal dialog that interrupts the user to confirm or acknowledge an action.',
      },
      layout: 'fullscreen',
    },
    subcomponents: {
      AlertDialogClose: AlertDialog.Close,
      AlertDialogConfirm: AlertDialog.Confirm,
      AlertDialogDescription: AlertDialog.Description,
      AlertDialogFooter: AlertDialog.Footer,
      AlertDialogPopup: AlertDialog.Popup,
      AlertDialogTitle: AlertDialog.Title,
      AlertDialogTrigger: AlertDialog.Trigger,
    },
    title: 'Components/Alert Dialog',
  }

export default meta

type Story = StoryObj<typeof AlertDialog.Popup>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: { tone: 'brand' },
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Use the controls panel to explore all `tone` options. Click the trigger button to open the dialog.',
      },
    },
  },
  render: (args) => <DialogTemplate tone={args.tone as Tone} />,
}

// ─── Tones ───────────────────────────────────────────────────────────────────

export const Brand: Story = {
  name: 'Tone / Brand',
  parameters: {
    docs: {
      description: {
        story: 'Default tone. Use for standard confirmations and brand-aligned actions.',
      },
    },
  },
  render: () => <DialogTemplate tone="brand" />,
}

export const Accent: Story = {
  name: 'Tone / Accent',
  parameters: {
    docs: {
      description: {
        story: 'Highlights a secondary or promoted action, such as publishing content.',
      },
    },
  },
  render: () => <DialogTemplate tone="accent" />,
}

export const Neutral: Story = {
  name: 'Tone / Neutral',
  parameters: {
    docs: {
      description: {
        story: 'Neutral tone for non-critical confirmations like saving or discarding changes.',
      },
    },
  },
  render: () => <DialogTemplate tone="neutral" />,
}

export const Error: Story = {
  name: 'Tone / Error',
  parameters: {
    docs: {
      description: {
        story: 'Used for destructive or irreversible actions such as permanently deleting an item.',
      },
    },
  },
  render: () => <DialogTemplate tone="error" />,
}

export const Info: Story = {
  name: 'Tone / Info',
  parameters: {
    docs: {
      description: {
        story: 'Informational tone for dialogs requiring acknowledgement, such as updated terms.',
      },
    },
  },
  render: () => <DialogTemplate tone="info" />,
}

export const Success: Story = {
  name: 'Tone / Success',
  parameters: {
    docs: {
      description: {
        story: 'Confirms a positive or completing action, such as marking a task as done.',
      },
    },
  },
  render: () => <DialogTemplate tone="success" />,
}

export const Warning: Story = {
  name: 'Tone / Warning',
  parameters: {
    docs: {
      description: {
        story: 'Draws attention to a consequential action the user should think twice about.',
      },
    },
  },
  render: () => <DialogTemplate tone="warning" />,
}

// ─── Composition ─────────────────────────────────────────────────────────────

export const AllTones: Story = {
  name: 'Composition / All Tones',
  parameters: {
    docs: {
      description: {
        story:
          'All tone variants displayed together. Each trigger opens its own independent dialog.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-sm">
      {TONES.map((tone) => (
        <DialogTemplate key={tone} tone={tone} />
      ))}
    </div>
  ),
}

export const DestructiveFlow: Story = {
  name: 'Composition / Destructive Flow',
  parameters: {
    docs: {
      description: {
        story:
          'A common pattern for irreversible destructive actions. The error tone makes the risk clear, with a labelled trigger and icon reinforcing the severity.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button tone="error" variant="soft">
          <TrashIcon weight="bold" />
          Delete Account
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Popup tone="error">
        <AlertDialog.Header>
          <AlertDialog.Icon>
            <XCircleIcon weight="fill" />
          </AlertDialog.Icon>
          <AlertDialog.Title>Delete your account?</AlertDialog.Title>
          <AlertDialog.Description>
            All of your data, including projects, settings, and billing history, will be permanently
            erased. This action is irreversible and cannot be appealed.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close>Keep Account</AlertDialog.Close>
          <AlertDialog.Confirm>Delete Forever</AlertDialog.Confirm>
        </AlertDialog.Footer>
      </AlertDialog.Popup>
    </AlertDialog>
  ),
}

export const CriticalWarning: Story = {
  name: 'Composition / Critical Warning',
  parameters: {
    docs: {
      description: {
        story:
          'A warning-tone dialog for high-stakes but non-destructive actions, such as transferring ownership.',
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>
        <Button tone="warning" variant="soft">
          <WarningCircleIcon weight="bold" />
          Transfer Ownership
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Popup tone="warning">
        <AlertDialog.Header>
          <AlertDialog.Icon>
            <WarningIcon weight="fill" />
          </AlertDialog.Icon>
          <AlertDialog.Title>Transfer workspace ownership?</AlertDialog.Title>
          <AlertDialog.Description>
            You are about to transfer ownership of this workspace to another member. You will
            immediately lose your admin privileges and cannot reclaim ownership without their
            consent.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close>Cancel</AlertDialog.Close>
          <AlertDialog.Confirm>Transfer Ownership</AlertDialog.Confirm>
        </AlertDialog.Footer>
      </AlertDialog.Popup>
    </AlertDialog>
  ),
}
