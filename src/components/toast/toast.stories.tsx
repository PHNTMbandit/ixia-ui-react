import { CopyIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { cn } from '@/utils/cn'

import { anchoredToastManager, stackToastManager, Toast } from '.'
import { Button } from '../button'
import type { ToastVariant } from './toast.types'

type Tone = ToastVariant

const showStackToast = ({
    tone = 'neutral',
    withAction = true,
  }: {
    tone?: Tone
    withAction?: boolean
  }) => {
    const id = stackToastManager.add({
      actionProps: withAction
        ? {
            children: 'Undo',
            onClick() {
              stackToastManager.close(id)
              stackToastManager.add({
                title: 'Action undone',
                description: 'The previous action has been undone.',
                variant: tone,
              })
            },
          }
        : undefined,
      description: 'This is a sample toast notification.',
      title: 'Notification',
      variant: tone,
    })

    return id
  },
  showIconToast = (tone: Tone) => {
    stackToastManager.add({
      description: 'The content has been copied to your clipboard.',
      icon: CopyIcon,
      title: 'Copy successful',
      variant: tone,
    })
  },
  StackTriggerButton = ({
    tone,
    withAction = true,
    className,
    children,
  }: {
    tone: Tone
    withAction?: boolean
    className?: string
    children: React.ReactNode
  }) => (
    <Button
      className={cn(className)}
      tone={tone}
      onClick={() => showStackToast({ tone, withAction })}
    >
      {children}
    </Button>
  )

const AnchoredTriggerButton = ({ tone = 'brand' }: { tone?: Tone }) => {
  const [showingToast, setShowingToast] = React.useState(false),
    buttonRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <Button
      ref={buttonRef}
      tone={tone}
      onClick={() => {
        if (showingToast) {
          return
        }

        setShowingToast(true)
        anchoredToastManager.add({
          description: 'Copied!',
          onClose() {
            setShowingToast(false)
          },
          positionerProps: {
            anchor: buttonRef.current,
            sideOffset: 8,
          },
          timeout: 5000,
          title: 'Notification',
          variant: tone,
        })
      }}
    >
      <CopyIcon weight="bold" /> Copy
    </Button>
  )
}

export default {
  component: Toast,
  parameters: {
    description: {
      component:
        'Toast provides transient feedback for user actions. This set includes stacked toasts, anchored toasts, action buttons, and icon customization through the toast manager.',
    },
    subtitle: 'A component for displaying brief messages to users.',
  },
  title: 'Components/Toast',
} satisfies Meta<typeof Toast>

type Story = StoryObj<typeof Toast>

export const Playground: Story = {
  render: () => (
    <Toast>
      <div className="flex w-[500px] flex-wrap items-center gap-sm">
        <StackTriggerButton tone="brand">Show Brand Toast</StackTriggerButton>
        <StackTriggerButton tone="success">Show Success Toast</StackTriggerButton>
        <StackTriggerButton tone="error">Show Error Toast</StackTriggerButton>
      </div>
    </Toast>
  ),
}

export const ToneAllVariants: Story = {
  render: () => (
    <Toast>
      <div className="grid w-[500px] grid-cols-2 gap-sm">
        <StackTriggerButton tone="brand">Brand</StackTriggerButton>
        <StackTriggerButton tone="accent">Accent</StackTriggerButton>
        <StackTriggerButton tone="neutral">Neutral</StackTriggerButton>
        <StackTriggerButton tone="info">Info</StackTriggerButton>
        <StackTriggerButton tone="success">Success</StackTriggerButton>
        <StackTriggerButton tone="warning">Warning</StackTriggerButton>
        <StackTriggerButton tone="error">Error</StackTriggerButton>
      </div>
    </Toast>
  ),
}

export const BehaviorWithAction: Story = {
  render: () => (
    <Toast>
      <div className="w-[500px]">
        <StackTriggerButton tone="brand" withAction>
          Show Toast With Action
        </StackTriggerButton>
      </div>
    </Toast>
  ),
}

export const BehaviorWithoutAction: Story = {
  render: () => (
    <Toast>
      <div className="w-[500px]">
        <StackTriggerButton tone="warning" withAction={false}>
          Show Toast Without Action
        </StackTriggerButton>
      </div>
    </Toast>
  ),
}

export const BehaviorCustomIcon: Story = {
  render: () => (
    <Toast>
      <div className="w-[500px]">
        <Button tone="accent" onClick={() => showIconToast('accent')}>
          Show Icon Toast
        </Button>
      </div>
    </Toast>
  ),
}

export const CompositionAnchoredToast: Story = {
  render: () => (
    <Toast>
      <div className="w-[500px] space-y-sm rounded-lg border border-surface-3 bg-surface p-md">
        <h3 className="style-text-strong-1">Copy Interaction</h3>
        <p className="style-text-prose--1 text-on-surface-variant">
          The toast is anchored to the trigger button and closes automatically.
        </p>
        <AnchoredTriggerButton tone="brand" />
      </div>
    </Toast>
  ),
}
