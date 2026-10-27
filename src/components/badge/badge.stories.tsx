import {
  CheckCircleIcon,
  FolderIcon,
  InfoIcon,
  TagIcon,
  WarningIcon,
  XCircleIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

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
    size: {
      control: 'radio',
      description:
        'Shared size for text and icon-only badges. A single SVG child automatically receives square, padding-free styling.',
      options: ['large', 'medium', 'small'],
    },
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
    size: 'medium',
    tone: 'brand',
    variant: 'fill',
  },
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'The Badge component conveys small pieces of information, such as statuses, categories, or counts. It supports seven semantic tones and three visual variants (`fill`, `outline`, `soft`). The three sizes (`large`, `medium`, `small`) work for both text and icon-only content. A single SVG child automatically becomes square and padding-free, preserving the compact icon dimensions.',
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

export const Sizes: Story = {
  name: 'Size / Text and Icon',
  render: () => (
    <div className="flex flex-col gap-sm">
      {(['large', 'medium', 'small'] as const).flatMap((size) =>
        VARIANTS.map((variant) => (
          <div
            key={`${size}-${variant}`}
            data-testid={`${size}-${variant}`}
            className="flex items-center gap-sm"
          >
            <Badge size={size} variant={variant} role="img" aria-label="Featured">
              <>
                <TagIcon />
              </>
            </Badge>
            <Badge size={size} variant={variant}>
              <>
                <TagIcon /> Featured
              </>
            </Badge>
            <Badge size={size} variant={variant}>
              7
            </Badge>
          </div>
        )),
      )}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [index, size] of ['large', 'medium', 'small'].entries()) {
      for (const variant of VARIANTS) {
        const row = canvas.getByTestId(`${size}-${variant}`),
          [iconOnly, labeled, count] = Array.from(row.children) as HTMLElement[],
          icon = iconOnly.querySelector('svg')!,
          reference = document.createElement('div')

        reference.style.width = `var(--spacing-${['lg', 'md', 'sm'][index]})`
        reference.style.height = `var(--spacing-${['sm', 'xs', '2xs'][index]})`
        row.append(reference)

        try {
          const bounds = iconOnly.getBoundingClientRect(),
            style = getComputedStyle(iconOnly)

          await expect(bounds.width).toBeCloseTo(reference.getBoundingClientRect().width, 1)
          await expect(bounds.height).toBeCloseTo(bounds.width, 1)
          await expect(style.paddingLeft).toBe('0px')
          await expect(style.paddingRight).toBe('0px')
          await expect(icon.getBoundingClientRect().width).toBeCloseTo(
            reference.getBoundingClientRect().height,
            1,
          )
          for (const badge of [labeled, count]) {
            await expect(Number.parseFloat(getComputedStyle(badge).paddingLeft)).toBeGreaterThan(0)
            await expect(badge.getBoundingClientRect().height).toBeCloseTo(bounds.height, 1)
          }
          await expect(labeled.querySelector('svg')!.getBoundingClientRect().height).toBeCloseTo(
            Number.parseFloat(getComputedStyle(labeled).fontSize),
            1,
          )
        } finally {
          reference.remove()
        }
      }
    }
  },
}

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
  play: async ({ canvasElement }) => {
    const icon = canvasElement.querySelector('svg')

    await expect(icon).not.toBeNull()
    if (!icon?.parentElement) {
      throw new globalThis.Error('Expected a badge with a leading icon')
    }

    const badge = icon.parentElement,
      badgeBounds = badge.getBoundingClientRect(),
      iconBounds = icon.getBoundingClientRect(),
      styles = getComputedStyle(badge)

    await expect(Number.parseFloat(styles.lineHeight)).toBeCloseTo(
      Number.parseFloat(styles.fontSize),
    )
    await expect(iconBounds.height).toBeCloseTo(Number.parseFloat(styles.fontSize), 1)
    await expect(iconBounds.y + iconBounds.height / 2).toBeCloseTo(
      badgeBounds.y + badgeBounds.height / 2,
      1,
    )
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
