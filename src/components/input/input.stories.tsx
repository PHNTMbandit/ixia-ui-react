import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from './input'

export default {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables interaction and applies disabled styling.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      description: 'Adjusts the height, padding, and typography of the input.',
      options: ['small', 'medium', 'large'],
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    type: {
      control: 'select',
      description: 'Native input type.',
      options: ['text', 'email', 'password', 'search', 'url', 'tel', 'color'],
      table: {
        defaultValue: { summary: 'text' },
      },
    },
    variant: {
      control: 'select',
      description: 'Controls the visual surface style of the input.',
      options: ['primary', 'secondary'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  },
  args: {
    disabled: false,
    placeholder: 'Enter text...',
    size: 'medium',
    type: 'text',
    variant: 'primary',
  },
  component: Input,
  parameters: {
    docs: {
      description: {
        component:
          'The Input component is a foundational form control for entering text and selecting colors. It supports two visual variants (`primary`, `secondary`), built-in invalid styling via `aria-invalid`, and disabled states. Use it as a standalone field or inside higher-level form compositions.',
      },
      subtitle: 'A versatile field for text and color input with built-in validation styling.',
    },
  },
  render: (args: React.ComponentProps<typeof Input>) => <Input {...args} id="input" />,
  title: 'Components/Input',
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: 'Use controls to test all variants, input types, and disabled states interactively.',
      },
    },
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  name: 'Variant / Primary',
  parameters: {
    docs: {
      description: {
        story: 'Default elevated surface style. Ideal for standard forms and settings pages.',
      },
    },
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  name: 'Variant / Secondary',
  parameters: {
    docs: {
      description: {
        story: 'Lower-emphasis surface style. Useful on already-raised or dense layouts.',
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
        story: 'Compact size for tight spaces or less critical inputs.',
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
        story: 'Default size with balanced padding and typography for general use.',
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
        story: 'Larger size for emphasis or touch targets, such as on mobile.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    variant: 'primary',
  },
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story: 'Disabled state blocks interaction and visually communicates non-editability.',
      },
    },
  },
}

export const Error: Story = {
  name: 'State / Invalid',
  parameters: {
    docs: {
      description: {
        story:
          'Setting `aria-invalid` triggers the component error style. Pair this with validation messaging in your form.',
      },
    },
  },
  render: (args) => (
    <form>
      <Input
        {...args}
        aria-invalid
        defaultValue="invalid@email"
        id="input-error"
        placeholder="Enter a valid email"
        type="email"
      />
    </form>
  ),
}

export const Color: Story = {
  args: {
    type: 'color',
  },
  name: 'Type / Color Picker',
  parameters: {
    docs: {
      description: {
        story:
          'The color type uses a custom trigger UI while preserving native input behavior under the hood.',
      },
    },
  },
}

export const File: Story = {
  name: 'Type / File',
  parameters: {
    docs: {
      description: {
        story: 'Input configured for file selection with the secondary variant.',
      },
    },
  },
  render: () => (
    <div className="flex w-[720px] flex-col gap-sm">
      <label className="style-text-default-0 text-on-surface" htmlFor="file-upload">
        Upload file
      </label>
      <Input
        id="file-upload"
        type="file"
        multiple
        variant="secondary"
        maxFiles={5}
        maxFileSize={3000}
        clearFilesLabel="Clear selected files"
        filesSelectedLabel={(count) => `${count} files selected`}
        fileUploadButtonLabel="Browse"
        maxFileSizeErrorLabel={(fileName, maxFileSize) =>
          `File "${fileName}" exceeds the maximum size of ${maxFileSize}.`
        }
        maxFilesErrorLabel={(maxFiles) => `You can only upload up to ${maxFiles} files.`}
        placeholder="Upload up to 5 files, each with a max size of 2MB."
      />
    </div>
  ),
}

export const FormRow: Story = {
  name: 'Composition / Form Row',
  parameters: {
    docs: {
      description: {
        story: 'A realistic single-field form pattern with label and helper text.',
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-sm">
      <label className="style-text-default-0 text-on-surface" htmlFor="company-name">
        Company name
      </label>
      <Input id="company-name" placeholder="Acme Incorporated" variant="primary" />
      <p className="style-text-default--1 text-on-surface-variant">
        This name will be visible to workspace members.
      </p>
    </div>
  ),
}

export const SearchField: Story = {
  name: 'Composition / Search Field',
  parameters: {
    docs: {
      description: {
        story: 'Input configured for search interactions with the secondary variant.',
      },
    },
  },
  render: () => (
    <div className="w-[420px]">
      <Input placeholder="Search projects, users, or tags" type="search" variant="secondary" />
    </div>
  ),
}

export const PasswordField: Story = {
  name: 'Composition / Password Field',
  parameters: {
    docs: {
      description: {
        story: 'Input configured for password entry with the primary variant.',
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-sm">
      <label className="style-text-default-0 text-on-surface" htmlFor="password">
        Password
      </label>
      <Input id="password" placeholder="Enter your password" type="password" variant="primary" />
    </div>
  ),
}

export const EmailField: Story = {
  name: 'Composition / Email Field',
  parameters: {
    docs: {
      description: {
        story: 'Input configured for email entry with the primary variant.',
      },
    },
  },
  render: () => (
    <div className="flex w-[420px] flex-col gap-sm">
      <label className="style-text-default-0 text-on-surface" htmlFor="email">
        Email address
      </label>
      <Input id="email" placeholder="Enter your email" type="email" variant="primary" />
    </div>
  ),
}
