import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { Checkbox } from '../checkbox'
import { CheckboxGroup } from './index'

const NOTIFICATION_OPTIONS = [
  { id: 'comments', label: 'Comments', value: 'comments' },
  { id: 'mentions', label: 'Mentions', value: 'mentions' },
  { id: 'announcements', label: 'Announcements', value: 'announcements' },
] as const

export default {
  argTypes: {
    allValues: {
      control: 'object',
      description: 'Optional list of all child values used for parent or indeterminate patterns.',
    },
    defaultValue: {
      control: 'object',
      description: 'Initial selected values for uncontrolled groups.',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
  },
  args: {
    defaultValue: [],
  },
  component: CheckboxGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox Group manages shared selection state for multiple checkbox items. It is useful for preference panels, filters, and nested permission editors, and supports advanced patterns such as parent checkboxes and indeterminate sub-groups via `allValues`, `value`, and `onValueChange`. Child checkboxes can use either `elevated` or `inSurface` variants depending on container density.',
      },
      subtitle:
        'A group of checkbox components that allows users to select multiple options from a set.',
    },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox id="option1" label="Option 1" value="option1" />
      <Checkbox id="option2" label="Option 2" value="option2" />
      <Checkbox id="option3" label="Option 3" value="option3" />
    </CheckboxGroup>
  ),
  title: 'Components/Checkbox Group',
} satisfies Meta<typeof CheckboxGroup>

type Story = StoryObj<typeof CheckboxGroup>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'A basic uncontrolled group for exploring default selections through controls.',
      },
    },
  },
}

export const Elevated: Story = {
  name: 'Composition / Elevated Group',
  parameters: {
    docs: {
      description: {
        story: 'Standard checkbox group for multi-select settings or preference lists.',
      },
    },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox id="elevated-option1" label="Option 1" value="option1" variant="elevated" />
      <Checkbox id="elevated-option2" label="Option 2" value="option2" variant="elevated" />
      <Checkbox id="elevated-option3" label="Option 3" value="option3" variant="elevated" />
    </CheckboxGroup>
  ),
}

export const WithElevatedSelection: Story = {
  args: {
    defaultValue: ['mentions', 'announcements'],
  },
  name: 'Composition / Elevated Selection',
  parameters: {
    docs: {
      description: {
        story: 'Preselect values when a form should reflect saved user preferences on load.',
      },
    },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      {NOTIFICATION_OPTIONS.map((option) => (
        <Checkbox
          id={option.id}
          key={option.value}
          label={option.label}
          value={option.value}
          variant="elevated"
        />
      ))}
    </CheckboxGroup>
  ),
}

export const InSurface: Story = {
  name: 'Composition / In Surface Group',
  parameters: {
    docs: {
      description: {
        story: 'Standard checkbox group for multi-select settings or preference lists.',
      },
    },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      <Checkbox id="insurface-option1" label="Option 1" value="option1" variant="inSurface" />
      <Checkbox id="insurface-option2" label="Option 2" value="option2" variant="inSurface" />
      <Checkbox id="insurface-option3" label="Option 3" value="option3" variant="inSurface" />
    </CheckboxGroup>
  ),
}

export const WithInSurfaceSelection: Story = {
  args: {
    defaultValue: ['mentions', 'announcements'],
  },
  name: 'Composition / In Surface Selection',
  parameters: {
    docs: {
      description: {
        story: 'Preselect values when a form should reflect saved user preferences on load.',
      },
    },
  },
  render: (args) => (
    <CheckboxGroup {...args}>
      {NOTIFICATION_OPTIONS.map((option) => (
        <Checkbox
          id={option.id}
          key={option.value}
          label={option.label}
          value={option.value}
          variant="inSurface"
        />
      ))}
    </CheckboxGroup>
  ),
}

export const Nested: Story = {
  name: 'Composition / Nested Permissions',
  parameters: {
    docs: {
      description: {
        story:
          'Nested groups support parent-child permission flows, including indeterminate states for partial selection.',
      },
    },
  },
  render: (args) => {
    const id = React.useId(),
      [mainValue, setMainValue] = React.useState<string[]>([]),
      [managementValue, setManagementValue] = React.useState<string[]>([]),
      mainPermissions = ['view-dashboard', 'manage-users', 'access-reports'],
      userManagementPermissions = ['create-user', 'edit-user', 'delete-user', 'assign-roles']

    return (
      <CheckboxGroup
        {...args}
        allValues={mainPermissions}
        aria-labelledby={id}
        onValueChange={(value) => {
          if (value.includes('manage-users')) {
            setManagementValue(userManagementPermissions)
          } else if (managementValue.length === userManagementPermissions.length) {
            setManagementValue([])
          }
          setMainValue(value)
        }}
        style={{ marginLeft: '1rem' }}
        value={mainValue}
      >
        <Checkbox
          id={id}
          indeterminate={
            managementValue.length > 0 &&
            managementValue.length !== userManagementPermissions.length
          }
          label="User Permissions"
          parent
          style={{ marginLeft: '-1rem' }}
        />
        <Checkbox label="View Dashboard" value="view-dashboard" />
        <Checkbox label="Access Reports" value="access-reports" />
        <CheckboxGroup
          allValues={userManagementPermissions}
          onValueChange={(value) => {
            if (value.length === userManagementPermissions.length) {
              setMainValue((prev) => [...new Set([...prev, 'manage-users'])])
            } else {
              setMainValue((prev) => prev.filter((v) => v !== 'manage-users'))
            }
            setManagementValue(value)
          }}
          style={{ marginLeft: '1rem' }}
          value={managementValue}
        >
          <Checkbox
            id="manage-users-caption"
            label="Manage Users"
            parent
            style={{ marginLeft: '-1rem' }}
          />
          <Checkbox label="Create User" value="create-user" />
          <Checkbox label="Edit User" value="edit-user" />
          <Checkbox label="Delete User" value="delete-user" />
          <Checkbox label="Assign Roles" value="assign-roles" />
        </CheckboxGroup>
      </CheckboxGroup>
    )
  },
}

export const ControlledExample: Story = {
  name: 'Composition / Controlled Example',
  parameters: {
    docs: {
      description: {
        story:
          'A fully controlled checkbox group is useful when values need to sync with external state.',
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState<string[]>(['comments'])

    return (
      <div className="flex flex-col gap-sm">
        <CheckboxGroup onValueChange={setValue} value={value}>
          {NOTIFICATION_OPTIONS.map((option) => (
            <Checkbox
              id={`controlled-${option.id}`}
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </CheckboxGroup>
        <p className="style-text-default--1 text-on-surface-variant">
          Selected: {value.length > 0 ? value.join(', ') : 'none'}
        </p>
      </div>
    )
  },
}
