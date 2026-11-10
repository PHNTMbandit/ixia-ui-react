import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ComponentProps } from 'react'

import { Icon } from '../../../src/components/icon'
import { Progress } from '../../../src/components/progress'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Progress' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Progress' }
const states = ['Upcoming', 'Current', 'Completed']
const stage = (state?: string) => (state === 'Completed' ? 2 : state === 'Current' ? 1 : 0)

export const Label: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Progress/Label',
      order: 500,
      states,
      description: 'Step marker content, usually a number or icon.',
      properties: { label: 'children', icon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Progress currentIndex={stage(combo.State)}>
          <Progress.Indicator>
            <Progress.Label {...target(index)}>
              <span {...text('label')}>1</span>
              <Icon aria-hidden="true" name="selected" {...swap('icon', false)} />
            </Progress.Label>
          </Progress.Indicator>
        </Progress>
      )}
    />
  ),
}
export const Title: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Progress/Title',
      order: 501,
      description:
        'Step title. Pass directly to Progress.Indicator so it moves into the metadata region.',
      properties: { title: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Progress.Title {...target(index)} {...text('title')}>
          Details
        </Progress.Title>
      )}
    />
  ),
}
export const Description: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Progress/Description',
      order: 502,
      description: 'Supporting step text; a direct child of Progress.Indicator.',
      properties: { description: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Progress.Description {...target(index)} {...text('description')}>
          Project information
        </Progress.Description>
      )}
    />
  ),
}

// Indicator forwards props to its circle, while its outer wrapper also owns the metadata.
function Step({
  index,
  state = 'Upcoming',
  label = '1',
  title = 'Details',
  instance = false,
}: {
  index?: number
  state?: string
  label?: string
  title?: string
  instance?: boolean
}) {
  const ref: ComponentProps<typeof Progress.Indicator>['ref'] = (node) => {
    const outer = node?.parentElement
    if (!outer) return
    outer.firstElementChild?.setAttribute('data-figma-slot', 'marker')
    outer.children[1]?.setAttribute('data-figma-slot', 'metadata')
    if (index !== undefined) outer.setAttribute('data-figma-target', String(index))
    if (instance) {
      outer.setAttribute('data-figma-part', 'Progress/Indicator')
      outer.setAttribute('data-figma-variant', JSON.stringify({ State: state }))
    }
  }
  return (
    <Progress.Indicator ref={ref} aria-current={state === 'Current' ? 'step' : undefined}>
      <Progress.Label {...part('Progress/Label', { State: state })}>
        <span {...text('label')}>{label}</span>
        <Icon aria-hidden="true" name="selected" {...swap('icon', false)} />
      </Progress.Label>
      <Progress.Title {...part('Progress/Title', {})} {...show('showTitle')} {...text('title')}>
        {title}
      </Progress.Title>
      <Progress.Description
        {...part('Progress/Description', {})}
        {...show('showDescription')}
        {...text('description')}
      >
        Project information
      </Progress.Description>
    </Progress.Indicator>
  )
}

export const Indicator: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Progress/Indicator',
      order: 503,
      states,
      description:
        'Step circle plus its positioned title and description. State follows the root currentIndex (one-based); direct metadata children are preserved.',
      annotate: [
        { selector: '[data-figma-target] > :first-child', attrs: { slot: 'marker' } },
        { selector: '[data-figma-target] > :nth-child(2)', attrs: { slot: 'metadata' } },
      ],
      slots: {
        marker: { description: 'Step marker content.', preferred: ['Progress/Label'] },
        metadata: {
          description: 'Direct title and description children.',
          preferred: ['Progress/Title', 'Progress/Description'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div style={{ width: 180, minHeight: 120 }}>
          <Progress currentIndex={stage(combo.State)}>
            <Step index={index} state={combo.State} />
          </Progress>
        </div>
      )}
    />
  ),
}
export const Bar: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Progress/Bar',
      order: 504,
      states: ['Upcoming', 'Completed'],
      description: 'Connector between indicators; completion follows root currentIndex.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Progress currentIndex={combo.State === 'Completed' ? 2 : 0} style={{ width: 200 }}>
          <Progress.Indicator>1</Progress.Indicator>
          <Progress.Bar
            ref={(node) => node?.parentElement?.setAttribute('data-figma-target', String(index))}
          />
          <Progress.Indicator>2</Progress.Indicator>
        </Progress>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Progress',
  parameters: {
    figma: {
      ...base,
      component: 'Progress',
      order: 505,
      axes: { currentIndex: ['1', '2', '3'] },
      defaults: { currentIndex: '2' },
      description:
        'Step sequence, not a percentage meter. Keep alternating Indicator and Bar children; currentIndex is one-based. The slot is on the real root so nth-child styling remains intact.',
      slots: {
        steps: {
          description: 'Alternating step indicators and connecting bars.',
          preferred: ['Progress/Indicator', 'Progress/Bar'],
        },
      },
      usage:
        '<Progress currentIndex={2}><Progress.Indicator><Progress.Label>1</Progress.Label><Progress.Title>Details</Progress.Title></Progress.Indicator><Progress.Bar /><Progress.Indicator>…</Progress.Indicator></Progress>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => {
        const current = Number(combo.currentIndex ?? 2)
        return (
          <div
            {...target(index)}
            style={{ width: 520, padding: '0 var(--spacing-3xl) var(--spacing-3xl)' }}
          >
            <Progress
              currentIndex={current}
              role="group"
              aria-label={`Project setup: step ${current} of 3`}
              {...slot('steps')}
            >
              <Step
                instance
                label="1"
                title="Details"
                state={current > 1 ? 'Completed' : 'Current'}
              />
              <Progress.Bar
                ref={(node) => {
                  const outer = node?.parentElement
                  if (outer) {
                    outer.setAttribute('data-figma-part', 'Progress/Bar')
                    outer.setAttribute(
                      'data-figma-variant',
                      JSON.stringify({ State: current > 1 ? 'Completed' : 'Upcoming' }),
                    )
                  }
                }}
              />
              <Step
                instance
                label="2"
                title="Members"
                state={current > 2 ? 'Completed' : current === 2 ? 'Current' : 'Upcoming'}
              />
              <Progress.Bar
                ref={(node) => {
                  const outer = node?.parentElement
                  if (outer) {
                    outer.setAttribute('data-figma-part', 'Progress/Bar')
                    outer.setAttribute(
                      'data-figma-variant',
                      JSON.stringify({ State: current > 2 ? 'Completed' : 'Upcoming' }),
                    )
                  }
                }}
              />
              <Step
                instance
                label="3"
                title="Review"
                state={current === 3 ? 'Current' : 'Upcoming'}
              />
            </Progress>
          </div>
        )
      }}
    />
  ),
}
