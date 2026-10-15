import { HeartIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toggle } from '../toggle/toggle'
import { ToggleGroup } from './toggle-group'

export default {
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow selecting multiple toggles at once.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    size: {
      control: 'select',
      description: 'Size of the toggle group and its toggles.',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      description: 'Visual style of the toggle group.',
      options: ['default', 'ghost'],
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    multiple: false,
    size: 'medium',
    variant: 'default',
  },
  component: ToggleGroup,
  parameters: {
    description: {
      component:
        'Toggle Group organizes related toggles into one control. It supports single selection by default and multiple selections when enabled.',
    },
    subtitle: 'A group of toggle buttons for single or multiple selections.',
  },
  render: (args) => (
    <div className="w-[500px]">
      <ToggleGroup {...args}>
        <Toggle>
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Option 1
            </>
          )}
        </Toggle>
        <Toggle>
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Option 2
            </>
          )}
        </Toggle>
      </ToggleGroup>
    </div>
  ),
  title: 'Components/Toggle Group',
} satisfies Meta<typeof ToggleGroup>

type Story = StoryObj<typeof ToggleGroup>

export const Playground: Story = {}

export const BehaviorSingleSelection: Story = {
  args: {
    multiple: false,
  },
}

export const BehaviorMultipleSelection: Story = {
  args: {
    multiple: true,
  },
}

export const CompositionFormattingToolbar: Story = {
  render: () => (
    <div className="w-[500px] space-y-sm rounded-lg border border-surface-3 bg-surface p-md">
      <p className="style-text-default--1 text-on-surface-variant">Formatting options</p>
      <ToggleGroup multiple>
        <Toggle size="small" tone="brand">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Bold
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="accent">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Italic
            </>
          )}
        </Toggle>
        <Toggle size="small" tone="neutral">
          {({ pressed }) => (
            <>
              <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              Underline
            </>
          )}
        </Toggle>
      </ToggleGroup>
    </div>
  ),
}

export const CompositionAutoSizing: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Small size (Toggles inherit from group)
        </p>
        <ToggleGroup size="small" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Medium size (default)</p>
        <ToggleGroup size="medium" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Large size</p>
        <ToggleGroup size="large" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  ),
}

export const GhostVariant: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">
          Small size (Toggles inherit from group)
        </p>
        <ToggleGroup size="small" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Medium size (default)</p>
        <ToggleGroup size="medium" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>

      <div className="space-y-xs">
        <p className="style-text-default--1 text-on-surface-variant">Large size</p>
        <ToggleGroup size="large" variant="ghost" multiple>
          <Toggle aria-label="Brand option" tone="brand">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Accent option" tone="accent">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
          <Toggle aria-label="Info option" tone="info">
            {({ pressed }) => (
              <>
                <HeartIcon weight={pressed ? 'fill' : 'bold'} />
              </>
            )}
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  ),
}
