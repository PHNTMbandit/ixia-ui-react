import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { InputOTP } from './index'

/**
 * A one-time password input composed of individual character slots.
 *
 * ## Anatomy
 *
 * ```tsx
 * import { InputOTP, InputOTPSlot, InputOtpSeparator } from '@dawn/ui'
 *
 * <InputOTP length={6}>
 *   <InputOTPSlot />
 *   <InputOTPSlot aria-label="Character 2 of 6" />
 *   <InputOTPSlot aria-label="Character 3 of 6" />
 *   <InputOtpSeparator />
 *   <InputOTPSlot aria-label="Character 4 of 6" />
 *   <InputOTPSlot aria-label="Character 5 of 6" />
 *   <InputOTPSlot aria-label="Character 6 of 6" />
 * </InputOTP>
 * ```
 *
 * ## Accessibility
 *
 * - The first input inherits the field label automatically
 * - Add `aria-label` to remaining inputs (e.g., "Character 2 of 6")
 * - Use `aria-describedby` when helper text should be announced
 */
export default {
  argTypes: {
    autoSubmit: {
      control: 'boolean',
      description: 'Submits the owning form automatically when all slots are filled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables input and interaction for all slots.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    length: {
      control: { max: 8, min: 1, step: 1, type: 'number' },
      description: 'Number of OTP slots to render.',
      table: {
        defaultValue: { summary: '6' },
      },
    },
    mask: {
      control: 'boolean',
      description: 'Obscures entered characters like a password field.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes all slots read-only.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required for form validation.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    validationType: {
      control: 'select',
      description: 'Restricts allowed input characters.',
      options: ['numeric', 'alphanumeric', 'none'],
      table: {
        defaultValue: { summary: 'numeric' },
      },
    },
  },
  args: {
    autoSubmit: false,
    disabled: false,
    length: 6,
    mask: false,
    readOnly: false,
    required: false,
    validationType: 'numeric',
  },
  component: InputOTP,
  parameters: {
    docs: {
      description: {
        component:
          'The Input OTP component provides a segmented input experience for collecting one-time passcodes. It supports numeric, alphanumeric, or custom validation, masked entry for sensitive codes, grouped layouts with separators, and auto-submission on completion.',
      },
      subtitle: 'A one-time password input composed of individual character slots.',
    },
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTP.Slot />
      <InputOTP.Slot aria-label="Character 2" />
      <InputOTP.Slot aria-label="Character 3" />
      <InputOTP.Slot aria-label="Character 4" />
      <InputOTP.Slot aria-label="Character 5" />
      <InputOTP.Slot aria-label="Character 6" />
    </InputOTP>
  ),
  subcomponents: { InputOTPSlot: InputOTP.Slot, InputOtpSeparator: InputOTP.Separator },
  title: 'Components/Input OTP',
} satisfies Meta<typeof InputOTP>

type Story = StoryObj<typeof InputOTP>

// =============================================================================
// PLAYGROUND
// =============================================================================

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground for tuning all OTP field props via controls.',
      },
    },
  },
}

// =============================================================================
// USAGE
// =============================================================================

export const Default: Story = {
  args: {
    length: 6,
  },
  name: 'Usage / Default',
  parameters: {
    docs: {
      description: {
        story:
          'Basic 6-digit numeric OTP input. The most common configuration for verification codes.',
      },
    },
  },
}

// =============================================================================
// LENGTH
// =============================================================================

export const FourDigits: Story = {
  args: {
    length: 4,
  },
  name: 'Length / Four Digits',
  parameters: {
    docs: {
      description: {
        story: 'Common configuration for PIN codes and short verification sequences.',
      },
    },
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTP.Slot />
      <InputOTP.Slot aria-label="Character 2 of 4" />
      <InputOTP.Slot aria-label="Character 3 of 4" />
      <InputOTP.Slot aria-label="Character 4 of 4" />
    </InputOTP>
  ),
}

export const SixDigits: Story = {
  args: {
    length: 6,
  },
  name: 'Length / Six Digits',
  parameters: {
    docs: {
      description: {
        story: 'Standard setup for SMS and authenticator-based one-time passcodes.',
      },
    },
  },
}

export const EightDigits: Story = {
  args: {
    length: 8,
  },
  name: 'Length / Eight Digits',
  parameters: {
    docs: {
      description: {
        story: 'Extended configuration for longer recovery codes or license keys.',
      },
    },
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTP.Slot />
      <InputOTP.Slot aria-label="Character 2 of 8" />
      <InputOTP.Slot aria-label="Character 3 of 8" />
      <InputOTP.Slot aria-label="Character 4 of 8" />
      <InputOTP.Separator />
      <InputOTP.Slot aria-label="Character 5 of 8" />
      <InputOTP.Slot aria-label="Character 6 of 8" />
      <InputOTP.Slot aria-label="Character 7 of 8" />
      <InputOTP.Slot aria-label="Character 8 of 8" />
    </InputOTP>
  ),
}

// =============================================================================
// VALIDATION TYPE
// =============================================================================

export const Numeric: Story = {
  args: {
    length: 6,
    validationType: 'numeric',
  },
  name: 'Validation / Numeric',
  parameters: {
    docs: {
      description: {
        story: 'Default validation that only accepts digits 0-9. Ideal for SMS codes and PINs.',
      },
    },
  },
}

export const Alphanumeric: Story = {
  args: {
    length: 6,
    validationType: 'alphanumeric',
  },
  name: 'Validation / Alphanumeric',
  parameters: {
    docs: {
      description: {
        story:
          'Accepts letters and numbers. Use for recovery codes, backup codes, or invite codes like `A7C9XZ`.',
      },
    },
  },
}

// =============================================================================
// GROUPED LAYOUTS
// =============================================================================

export const GroupedThreeThree: Story = {
  args: {
    length: 6,
  },
  name: 'Layout / Grouped 3-3',
  parameters: {
    docs: {
      description: {
        story:
          'Visual grouping with separator for easier reading (e.g., `123-456`). The separator is accessible to screen readers.',
      },
    },
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTP.Slot />
      <InputOTP.Slot aria-label="Character 2 of 6" />
      <InputOTP.Slot aria-label="Character 3 of 6" />
      <InputOTP.Separator />
      <InputOTP.Slot aria-label="Character 4 of 6" />
      <InputOTP.Slot aria-label="Character 5 of 6" />
      <InputOTP.Slot aria-label="Character 6 of 6" />
    </InputOTP>
  ),
}

export const GroupedTwoTwoTwo: Story = {
  args: {
    length: 6,
  },
  name: 'Layout / Grouped 2-2-2',
  parameters: {
    docs: {
      description: {
        story: 'Alternative grouping pattern showing code in three pairs.',
      },
    },
  },
  render: (args) => (
    <InputOTP {...args}>
      <InputOTP.Slot />
      <InputOTP.Slot aria-label="Character 2 of 6" />
      <InputOTP.Separator />
      <InputOTP.Slot aria-label="Character 3 of 6" />
      <InputOTP.Slot aria-label="Character 4 of 6" />
      <InputOTP.Separator />
      <InputOTP.Slot aria-label="Character 5 of 6" />
      <InputOTP.Slot aria-label="Character 6 of 6" />
    </InputOTP>
  ),
}

// =============================================================================
// MASKED
// =============================================================================

export const Masked: Story = {
  args: {
    length: 6,
    mask: true,
  },
  name: 'Security / Masked',
  parameters: {
    docs: {
      description: {
        story:
          'Obscures entered characters like a password field. Use for sensitive codes on shared screens.',
      },
    },
  },
}

// =============================================================================
// STATES
// =============================================================================

export const Disabled: Story = {
  args: {
    disabled: true,
    length: 6,
  },
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story:
          'Use disabled state while waiting for a code resend or when the service is unavailable.',
      },
    },
  },
}

export const ReadOnly: Story = {
  args: {
    length: 6,
    readOnly: true,
    value: '123456',
  },
  name: 'State / Read Only',
  parameters: {
    docs: {
      description: {
        story: 'Display a code that cannot be modified, useful for confirmation screens.',
      },
    },
  },
}

// =============================================================================
// CALLBACKS
// =============================================================================

export const OnValueComplete: Story = {
  args: {
    length: 6,
  },
  name: 'Behavior / On Complete',
  parameters: {
    docs: {
      description: {
        story:
          'Use `onValueComplete` to react when all slots are filled. Great for auto-verification without a submit button.',
      },
    },
  },
  render: function OnValueCompleteStory(args) {
    const [message, setMessage] = useState('')

    return (
      <div className="flex flex-col gap-sm">
        <InputOTP
          {...args}
          onValueComplete={(value: string) => setMessage(`Code submitted: ${value}`)}
        >
          <InputOTP.Slot />
          <InputOTP.Slot aria-label="Character 2 of 6" />
          <InputOTP.Slot aria-label="Character 3 of 6" />
          <InputOTP.Separator />
          <InputOTP.Slot aria-label="Character 4 of 6" />
          <InputOTP.Slot aria-label="Character 5 of 6" />
          <InputOTP.Slot aria-label="Character 6 of 6" />
        </InputOTP>
        {message && <p className="style-text-default--1 text-success-default">{message}</p>}
      </div>
    )
  },
}

export const ControlledValue: Story = {
  args: {
    length: 6,
  },
  name: 'Behavior / Controlled',
  parameters: {
    docs: {
      description: {
        story:
          'Use `value` and `onValueChange` for controlled input. Useful when you need to programmatically clear or set the code.',
      },
    },
  },
  render: function ControlledStory(args) {
    const [value, setValue] = useState('')

    return (
      <div className="flex flex-col gap-sm">
        <InputOTP {...args} value={value} onValueChange={setValue}>
          <InputOTP.Slot />
          <InputOTP.Slot aria-label="Character 2 of 6" />
          <InputOTP.Slot aria-label="Character 3 of 6" />
          <InputOTP.Separator />
          <InputOTP.Slot aria-label="Character 4 of 6" />
          <InputOTP.Slot aria-label="Character 5 of 6" />
          <InputOTP.Slot aria-label="Character 6 of 6" />
        </InputOTP>
        <div className="flex gap-xs">
          <span className="style-text-default--1 text-on-surface-variant">Current value:</span>
          <code className="rounded-md bg-surface px-2xs style-text-default--1 text-on-surface">
            {value || '(empty)'}
          </code>
        </div>
        <button
          type="button"
          onClick={() => setValue('')}
          className="rounded-md bg-surface px-sm py-xs style-text-default--1 text-on-surface hover:bg-surface-3"
        >
          Clear
        </button>
      </div>
    )
  },
}

// =============================================================================
// COMPOSITION
// =============================================================================

export const VerificationForm: Story = {
  args: {
    length: 6,
  },
  name: 'Composition / Verification Form',
  parameters: {
    docs: {
      description: {
        story:
          'Complete verification form with proper labeling and description. The `htmlFor` on label and `aria-describedby` ensure full accessibility.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-sm">
      <label htmlFor="verification-code" className="style-text-strong-0 text-on-surface">
        Verification code
      </label>
      <InputOTP id="verification-code" aria-describedby="verification-hint" {...args}>
        <InputOTP.Slot />
        <InputOTP.Slot aria-label="Character 2 of 6" />
        <InputOTP.Slot aria-label="Character 3 of 6" />
        <InputOTP.Separator />
        <InputOTP.Slot aria-label="Character 4 of 6" />
        <InputOTP.Slot aria-label="Character 5 of 6" />
        <InputOTP.Slot aria-label="Character 6 of 6" />
      </InputOTP>
      <p id="verification-hint" className="style-text-default--1 text-on-surface-variant">
        Enter the 6-digit code we sent to your email. The code expires in 10 minutes.
      </p>
    </div>
  ),
}

export const RecoveryCode: Story = {
  args: {
    length: 8,
    validationType: 'alphanumeric',
  },
  name: 'Composition / Recovery Code',
  parameters: {
    docs: {
      description: {
        story: 'Alphanumeric recovery code entry with 8 characters grouped in two sets of 4.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-sm">
      <label htmlFor="recovery-code" className="style-text-strong-0 text-on-surface">
        Recovery code
      </label>
      <InputOTP id="recovery-code" aria-describedby="recovery-hint" {...args}>
        <InputOTP.Slot />
        <InputOTP.Slot aria-label="Character 2 of 8" />
        <InputOTP.Slot aria-label="Character 3 of 8" />
        <InputOTP.Slot aria-label="Character 4 of 8" />
        <InputOTP.Separator />
        <InputOTP.Slot aria-label="Character 5 of 8" />
        <InputOTP.Slot aria-label="Character 6 of 8" />
        <InputOTP.Slot aria-label="Character 7 of 8" />
        <InputOTP.Slot aria-label="Character 8 of 8" />
      </InputOTP>
      <p id="recovery-hint" className="style-text-default--1 text-on-surface-variant">
        Enter one of your backup recovery codes (e.g., A7C9-XZ4B).
      </p>
    </div>
  ),
}

export const SecureAccessCode: Story = {
  args: {
    length: 6,
    mask: true,
  },
  name: 'Composition / Secure Access',
  parameters: {
    docs: {
      description: {
        story: 'Masked entry for sensitive codes in shared or public environments.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col items-center gap-sm">
      <label htmlFor="secure-code" className="style-text-strong-0 text-on-surface">
        Access code
      </label>
      <InputOTP id="secure-code" aria-describedby="secure-hint" {...args}>
        <InputOTP.Slot />
        <InputOTP.Slot aria-label="Character 2 of 6" />
        <InputOTP.Slot aria-label="Character 3 of 6" />
        <InputOTP.Separator />
        <InputOTP.Slot aria-label="Character 4 of 6" />
        <InputOTP.Slot aria-label="Character 5 of 6" />
        <InputOTP.Slot aria-label="Character 6 of 6" />
      </InputOTP>
      <p id="secure-hint" className="style-text-default--1 text-on-surface-variant">
        Use mask to obscure the code on shared screens.
      </p>
    </div>
  ),
}
