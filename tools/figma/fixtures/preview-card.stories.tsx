import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { PreviewCard } from '../../../src/components/preview-card'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Preview Card' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Trigger: Story = {
  parameters: {
    figma: {
      component: 'Preview Card/Trigger',
      group: 'Preview Card',
      order: 260,
      description:
        'A named preview link. Edit its label and optionally show a leading icon; retain a real href in code.',
      properties: { label: 'children', leadingIcon: '<Icon />' },
      usage: '<PreviewCard.Trigger href="#project">Project</PreviewCard.Trigger>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger href="#project" {...target(0)}>
        <Icon name="folder" aria-hidden="true" {...swap('leadingIcon', false)} />
        <span {...text('label')}>Project overview</span>
      </PreviewCard.Trigger>
    </PreviewCard>
  ),
}

function Content() {
  return (
    <div className="flex flex-col gap-xs p-sm" style={{ width: 280 }} {...slot('content')}>
      <h2 className="style-text-strong-0" {...text('title')}>
        Project overview
      </h2>
      <p className="style-text-prose-0" {...text('description')}>
        A shared workspace for your team.
      </p>
      <Button
        tone="neutral"
        variant="ghost"
        {...part('Button', { tone: 'neutral', variant: 'ghost', State: 'Default' })}
        {...text('label')}
      >
        View project
      </Button>
    </div>
  )
}

export const Popup: Story = {
  parameters: {
    figma: {
      annotate: [{ selector: '[data-preview-popup] > div', attrs: { target: '0' } }],
      component: 'Preview Card/Popup',
      group: 'Preview Card',
      order: 261,
      description:
        'The preview surface. Content is a native slot for arbitrary text, media or component instances.',
      slots: { content: { description: 'Preview content.', preferred: ['Button', 'Icon'] } },
      usage: '<PreviewCard.Popup>…</PreviewCard.Popup>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <div style={{ padding: 48, height: 280 }}>
      <PreviewCard open>
        <PreviewCard.Trigger href="#project">Project overview</PreviewCard.Trigger>
        <PreviewCard.Popup data-preview-popup="" sideOffset={8}>
          <Content />
        </PreviewCard.Popup>
      </PreviewCard>
    </div>
  ),
}

export const Root: Story = {
  name: 'Preview Card',
  parameters: {
    figma: {
      annotate: [{ selector: '[data-preview-root] > div', attrs: { target: '0' } }],
      component: 'Preview Card',
      group: 'Preview Card',
      order: 262,
      description:
        'The open PreviewCard composition. Its root provides hover/focus behavior; the visible popup contains editable slotted content.',
      slots: { content: { description: 'Preview content.', preferred: ['Button', 'Icon'] } },
      usage:
        '<PreviewCard><PreviewCard.Trigger href="#project">Project</PreviewCard.Trigger><PreviewCard.Popup>…</PreviewCard.Popup></PreviewCard>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={() => (
        <div style={{ height: 280, width: 320 }}>
          <PreviewCard open>
            <PreviewCard.Trigger href="#project" {...part('Preview Card/Trigger', {})}>
              <span {...text('label')}>Project overview</span>
            </PreviewCard.Trigger>
            <PreviewCard.Popup data-preview-root="" sideOffset={8}>
              <div
                {...slot('content')}
                className="flex flex-col gap-xs p-sm"
                style={{ width: 280 }}
              >
                <PreviewCard.Trigger href="#project" {...part('Preview Card/Trigger', {})}>
                  <span {...text('label')}>Project overview</span>
                </PreviewCard.Trigger>
                <p {...text('description')}>A shared workspace for your team.</p>
                <Button
                  {...part('Button', { State: 'Default', tone: 'brand', variant: 'fill' })}
                  {...text('label')}
                >
                  View project
                </Button>
              </div>
            </PreviewCard.Popup>
          </PreviewCard>
        </div>
      )}
    />
  ),
}
