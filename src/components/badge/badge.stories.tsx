import {
  CheckCircleIcon,
  FolderIcon,
  InfoIcon,
  TagIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from './badge'

const TONES = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning'] as const,
  VARIANTS = ['fill', 'outline', 'soft'] as const

type Tone = (typeof TONES)[number]
type Variant = (typeof VARIANTS)[number]

const TONE_ICONS: Record<Tone, React.ReactNode> = {
    accent: <InfoIcon weight="fill" />,
    brand: <TagIcon weight="fill" />,
    error: <XCircleIcon weight="fill" />,
    info: <InfoIcon weight="fill" />,
    neutral: <FolderIcon weight="fill" />,
    success: <CheckCircleIcon weight="fill" />,
    warning: <WarningIcon weight="fill" />,
  },
  TONE_LABELS: Record<Tone, string> = {
    accent: 'Promoted',
    brand: 'Featured',
    error: 'Error',
    info: 'Info',
    neutral: 'Standard',
    success: 'Complete',
    warning: 'Warning',
  },
  TONE_DESCRIPTIONS: Record<Tone, string> = {
    accent: 'Highlights secondary or promotional content',
    brand: 'Used for primary brand-aligned labels and tags',
    error: 'Indicates errors or invalid states',
    info: 'Provides supplementary information',
    neutral: 'General labels for non-critical information',
    success: 'Confirms successful states or completion',
    warning: 'Alerts to situations requiring attention',
  },
  SingleBadge = ({ tone = 'brand', variant = 'fill' }: { tone?: Tone; variant?: Variant }) => (
    <Badge tone={tone} variant={variant}>
      {TONE_ICONS[tone]} {TONE_LABELS[tone]}
    </Badge>
  ),
  AllTonesGrid = ({ variant = 'fill' }: { variant?: Variant }) => (
    <div className="flex flex-wrap gap-sm">
      {TONES.map((tone) => (
        <SingleBadge key={tone} tone={tone} variant={variant} />
      ))}
    </div>
  ),
  AllVariantsGrid = ({ tone = 'brand' }: { tone?: Tone }) => (
    <div className="flex flex-wrap gap-sm">
      {VARIANTS.map((variant) => (
        <SingleBadge key={variant} tone={tone} variant={variant} />
      ))}
    </div>
  )

export default {
  argTypes: {
    tone: {
      control: 'select',
      description: 'Sets the semantic tone and color of the badge.',
      options: TONES,
      table: {
        defaultValue: { summary: 'brand' },
      },
    },
    variant: {
      control: 'select',
      description: 'Sets the visual style: solid fill, bordered, or soft container.',
      options: VARIANTS,
      table: {
        defaultValue: { summary: 'fill' },
      },
    },
  },
  args: {
    tone: 'brand',
    variant: 'fill',
  },
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'The Badge component conveys small pieces of information, such as statuses, categories, or counts. It supports seven semantic tones (`brand`, `accent`, `neutral`, `error`, `info`, `success`, `warning`) and three visual variants (`fill`, `outline`, `soft`).',
      },
      subtitle: 'A compact element for displaying status, labels, or counts.',
    },
  },
  render: (args) => (
    <Badge {...args}>
      {TONE_ICONS[args.tone as Tone]} {TONE_LABELS[args.tone as Tone]}
    </Badge>
  ),
  title: 'Components/Badge',
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof Badge>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to explore all `tone` and `variant` combinations.',
      },
    },
  },
}

// ─── Tones ───────────────────────────────────────────────────────────────────

export const Brand: Story = {
  args: { tone: 'brand' },
  name: 'Tone / Brand',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.brand } } },
  render: () => <SingleBadge tone="brand" />,
}

export const Accent: Story = {
  args: { tone: 'accent' },
  name: 'Tone / Accent',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.accent } } },
  render: () => <SingleBadge tone="accent" />,
}

export const Neutral: Story = {
  args: { tone: 'neutral' },
  name: 'Tone / Neutral',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.neutral } } },
  render: () => <SingleBadge tone="neutral" />,
}

export const Error: Story = {
  args: { tone: 'error' },
  name: 'Tone / Error',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.error } } },
  render: () => <SingleBadge tone="error" />,
}

export const Info: Story = {
  args: { tone: 'info' },
  name: 'Tone / Info',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.info } } },
  render: () => <SingleBadge tone="info" />,
}

export const Success: Story = {
  args: { tone: 'success' },
  name: 'Tone / Success',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.success } } },
  render: () => <SingleBadge tone="success" />,
}

export const Warning: Story = {
  args: { tone: 'warning' },
  name: 'Tone / Warning',
  parameters: { docs: { description: { story: TONE_DESCRIPTIONS.warning } } },
  render: () => <SingleBadge tone="warning" />,
}

// ─── Variants ────────────────────────────────────────────────────────────────

export const Fill: Story = {
  args: { variant: 'fill' },
  name: 'Variant / Fill',
  parameters: {
    docs: {
      description: {
        story:
          'Default variant. High contrast solid background, suitable for prominent labels and indicators.',
      },
    },
  },
  render: () => <AllTonesGrid variant="fill" />,
}

export const Outline: Story = {
  args: { variant: 'outline' },
  name: 'Variant / Outline',
  parameters: {
    docs: {
      description: {
        story:
          'Bordered style with transparent background. Less prominent than fill, ideal for secondary labels.',
      },
    },
  },
  render: () => <AllTonesGrid variant="outline" />,
}

export const Soft: Story = {
  args: { variant: 'soft' },
  name: 'Variant / Soft',
  parameters: {
    docs: {
      description: {
        story:
          'Muted container background with subtle border. Suitable for grouped or dense label layouts.',
      },
    },
  },
  render: () => <AllTonesGrid variant="soft" />,
}

// ─── Composition ─────────────────────────────────────────────────────────────

export const AllTones: Story = {
  name: 'Composition / All Tones',
  parameters: {
    docs: {
      description: {
        story: 'All seven tones displayed together for visual comparison.',
      },
    },
  },
  render: () => <AllTonesGrid variant="fill" />,
}

export const AllVariants: Story = {
  name: 'Composition / All Variants',
  parameters: {
    docs: {
      description: {
        story:
          'All three variants (fill, outline, soft) shown with the same tone to demonstrate style hierarchy.',
      },
    },
  },
  render: () => <AllVariantsGrid tone="brand" />,
}

export const StatusBadges: Story = {
  name: 'Composition / Status Badges',
  parameters: {
    docs: {
      description: {
        story:
          'Common status indicators using semantic tones: success for active, warning for pending, error for failed.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-md">
      <div>
        <p className="mb-sm text-sm font-medium text-on-surface">Item Statuses</p>
        <div className="flex flex-wrap gap-sm">
          <Badge tone="success" variant="soft">
            <CheckCircleIcon weight="fill" /> Active
          </Badge>
          <Badge tone="warning" variant="soft">
            <WarningIcon weight="fill" /> Pending
          </Badge>
          <Badge tone="error" variant="soft">
            <XCircleIcon weight="fill" /> Failed
          </Badge>
        </div>
      </div>
      <div>
        <p className="mb-sm text-sm font-medium text-on-surface">Categories</p>
        <div className="flex flex-wrap gap-sm">
          <Badge tone="brand" variant="outline">
            <TagIcon weight="fill" /> Featured
          </Badge>
          <Badge tone="accent" variant="outline">
            <InfoIcon weight="fill" /> Promoted
          </Badge>
          <Badge tone="neutral" variant="outline">
            <FolderIcon weight="fill" /> Standard
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const DenseLayout: Story = {
  name: 'Composition / Dense Layout',
  parameters: {
    docs: {
      description: {
        story: 'Multiple badges arranged compactly, often used in tag clouds or filter chips.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-2xs">
      <Badge tone="brand" variant="soft">
        React
      </Badge>
      <Badge tone="accent" variant="soft">
        TypeScript
      </Badge>
      <Badge tone="info" variant="soft">
        UI Components
      </Badge>
      <Badge tone="success" variant="soft">
        Tested
      </Badge>
      <Badge tone="neutral" variant="soft">
        Documented
      </Badge>
      <Badge tone="warning" variant="soft">
        Beta
      </Badge>
    </div>
  ),
}

export const CountIndicator: Story = {
  name: 'Composition / Count Indicator',
  parameters: {
    docs: {
      description: {
        story: 'Badge used as a numeric indicator or count notification.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-sm">
        <span>Notifications</span>
        <Badge tone="error" variant="fill">
          12
        </Badge>
      </div>
      <div className="flex items-center gap-sm">
        <span>Pending Reviews</span>
        <Badge tone="warning" variant="fill">
          3
        </Badge>
      </div>
      <div className="flex items-center gap-sm">
        <span>Completed</span>
        <Badge tone="success" variant="fill">
          52
        </Badge>
      </div>
    </div>
  ),
}
