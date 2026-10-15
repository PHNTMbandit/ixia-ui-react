import { CheckIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Fragment } from 'react'

import { Progress } from './index'

const STEP_ITEMS = [
    {
      description: 'Set your account details',
      title: 'Account',
    },
    {
      description: 'Confirm contact information',
      title: 'Verification',
    },
    {
      description: 'Finalize your setup',
      title: 'Complete',
    },
  ] as const,
  StepsTemplate = ({
    currentIndex = 1,
    withIcons = false,
  }: {
    currentIndex?: number
    withIcons?: boolean
  }) => (
    <Progress className="w-[300px]" currentIndex={currentIndex}>
      {STEP_ITEMS.map((item, index) => (
        <Fragment key={item.title}>
          <Progress.Indicator>
            <Progress.Label>
              {withIcons && index + 1 < currentIndex ? <CheckIcon weight="bold" /> : index + 1}
            </Progress.Label>
            <Progress.Title>{item.title}</Progress.Title>
            <Progress.Description>{item.description}</Progress.Description>
          </Progress.Indicator>
          {index + 1 < STEP_ITEMS.length && <Progress.Bar />}
        </Fragment>
      ))}
    </Progress>
  )

export default {
  argTypes: {
    currentIndex: {
      control: { max: 3, min: 1, step: 1, type: 'number' },
      description: 'Current active step index (1-based).',
      table: {
        defaultValue: { summary: '1' },
      },
    },
  },
  args: {
    currentIndex: 1,
  },
  component: Progress,
  parameters: {
    docs: {
      description: {
        component:
          'The Progress component helps represent multi-step workflows such as onboarding, checkout, and setup flows. Compose steps with `ProgressIndicator` and connectors with `ProgressBar`, then control the highlighted state with `currentIndex`. Indicators support optional titles and descriptions for richer guidance.',
      },
      subtitle: 'A step-based progress tracker composed from indicators and connecting bars.',
    },
  },
  render: (args) => <StepsTemplate currentIndex={args.currentIndex} />,
  subcomponents: { ProgressBar: Progress.Bar, ProgressIndicator: Progress.Indicator },
  title: 'Components/Progress',
} satisfies Meta<typeof Progress>

type Story = StoryObj<typeof Progress>
type IndicatorStory = StoryObj<typeof Progress.Indicator>
type BarStory = StoryObj<typeof Progress.Bar>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use controls to test how step highlighting changes as `currentIndex` updates.',
      },
    },
  },
}

export const Default: Story = {
  name: 'State / Numeric Steps',
}

export const WithCompletionIcons: Story = {
  args: {
    currentIndex: 2,
  },
  name: 'State / Completion Icons',
  parameters: {
    docs: {
      description: {
        story:
          'Completed steps can display icons while the current step stays numeric for clarity.',
      },
    },
  },
  render: (args) => <StepsTemplate currentIndex={args.currentIndex} withIcons />,
}

export const IndicatorText: IndicatorStory = {
  name: 'Primitive / Indicator Text',
  parameters: {
    docs: {
      description: {
        story: 'A text indicator primitive with title and description metadata.',
      },
    },
  },
  render: (args) => <Progress.Indicator {...args}>1</Progress.Indicator>,
}

export const IndicatorIcon: IndicatorStory = {
  name: 'Primitive / Indicator Icon',
  parameters: {
    docs: {
      description: {
        story: 'Icon indicator primitive for completed milestones.',
      },
    },
  },
  render: (args) => (
    <Progress.Indicator {...args}>
      <CheckIcon weight="bold" />
    </Progress.Indicator>
  ),
}

export const Bar: BarStory = {
  name: 'Primitive / Bar',
  parameters: {
    docs: {
      description: {
        story: 'Connector bar primitive used between step indicators in composed layouts.',
      },
    },
  },
  render: (args) => (
    <div className="w-3xl">
      <Progress.Bar {...args} />
    </div>
  ),
}

export const Manual: Story = {
  name: 'State / Manual Control',
  render: (args) => (
    <Progress className="w-[300px]" {...args}>
      <Progress.Indicator>
        <Progress.Label>1</Progress.Label>
        <Progress.Title>Step 1</Progress.Title>
        <Progress.Description>Description for step 1</Progress.Description>
      </Progress.Indicator>
      <Progress.Bar />
      <Progress.Indicator>
        <Progress.Label>2</Progress.Label>
        <Progress.Title>Step 2</Progress.Title>
        <Progress.Description>Description for step 2</Progress.Description>
      </Progress.Indicator>
      <Progress.Bar />
      <Progress.Indicator>
        <Progress.Label>3</Progress.Label>
        <Progress.Title>Step 3</Progress.Title>
        <Progress.Description>Description for step 3</Progress.Description>
      </Progress.Indicator>
    </Progress>
  ),
}
