import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, spyOn, waitFor } from 'storybook/test'

import { CopyButton } from './copy-button'

export default {
  argTypes: {
    children: {
      control: false,
      description:
        'Render function that receives whether the copy succeeded recently and returns the button content.',
    },
    content: {
      control: 'text',
      description: 'Text to write to the clipboard when the button is activated.',
    },
    timeout: {
      control: 'number',
      description: 'How long copied feedback remains visible, in milliseconds.',
      table: {
        defaultValue: { summary: '2000' },
      },
    },
  },
  args: {
    content: 'https://example.com',
    timeout: 2000,
  },
  component: CopyButton,
  parameters: {
    docs: {
      description: {
        component:
          'Copies a string to the clipboard and renders temporary success feedback through a children render function. The render function receives `true` after a successful copy and `false` otherwise. Copying uses the browser Clipboard API, which requires a secure context (such as HTTPS or localhost) and may be denied by browser permissions. Button props, including `aria-label`, are forwarded to the underlying Button.',
      },
      subtitle: 'A button that copies text and indicates when copying succeeds.',
    },
  },
  title: 'Components/Copy Button',
} satisfies Meta<typeof CopyButton>

type Story = StoryObj<typeof CopyButton>

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Activate the button to copy the editable content. The icon changes to confirm success, then returns to its initial state after the configured timeout.',
      },
    },
  },
  render: (args) => (
    <CopyButton {...args}>
      {(copied) =>
        copied ? (
          <>
            <CheckIcon /> Copy page
          </>
        ) : (
          <>
            <CopyIcon /> Copy page
          </>
        )
      }
    </CopyButton>
  ),
}

export const IconOnly: Story = {
  args: {
    'aria-label': 'Copy page URL',
  },
  parameters: {
    docs: {
      description: {
        story:
          'For an icon-only button, provide an accessible name with `aria-label`; the copied state is conveyed with the confirmation icon.',
      },
    },
  },
  render: (args) => (
    <CopyButton {...args}>
      {(copied) => (copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />)}
    </CopyButton>
  ),
}

export const FeedbackAnimation: Story = {
  ...IconOnly,
  args: {
    'aria-label': 'Copy page URL',
    timeout: 500,
  },
  name: 'Behavior / Feedback Animation',
  parameters: {
    docs: {
      description: {
        story:
          'The icon stays still on mount, then animates after a successful copy and when the feedback resets.',
      },
    },
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Copy page URL' }),
      getIcon = () => {
        const icon = button.querySelector('svg')
        if (!icon) {
          throw new Error('Expected the copy button to render an icon')
        }
        return icon
      },
      initialIcon = getIcon()

    await expect(getComputedStyle(initialIcon).animationName).toBe('none')

    const writeText = spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    try {
      await userEvent.click(button)
      await expect(writeText).toHaveBeenCalledWith(args.content)
      await waitFor(() => expect(getIcon()).not.toBe(initialIcon))

      const copiedIcon = getIcon()
      await expect(getComputedStyle(copiedIcon).animationName).toBe('enter')
      await expect(getComputedStyle(copiedIcon).getPropertyValue('--tw-enter-scale').trim()).toBe(
        '0',
      )

      await waitFor(
        () => {
          const resetIcon = getIcon()
          expect(resetIcon).not.toBe(copiedIcon)
          expect(getComputedStyle(resetIcon).animationName).toBe('enter')
          expect(getComputedStyle(resetIcon).getPropertyValue('--tw-enter-scale').trim()).toBe('0')
        },
        { timeout: 2000 },
      )
    } finally {
      writeText.mockRestore()
    }
  },
}
