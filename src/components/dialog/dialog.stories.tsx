import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button'
import { InputGroup, InputGroupInput } from '../input-group'
import { ScrollArea } from '../scroll-area'
import { Dialog } from './index'

const LongDialogText =
    'Use a dialog when users need to complete a focused task without leaving context. Keep the title concise, provide a short description, and ensure actions are clear. For long content, preserve comfortable spacing and allow scrolling so users can review details without layout jumps. Prefer short forms and explicit button labels such as Create project, Save changes, or Delete item.',
  BasicDialog = ({
    title = 'Dialog Title',
    description = 'Description of the dialog',
    showClose = true,
    showFooter = true,
  }: {
    title?: string
    description?: string
    showClose?: boolean
    showFooter?: boolean
  }) => (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
        </Dialog.Header>
        <Dialog.Content>
          This is dialog content. You can place informational text, confirmation details, or compact
          forms here.
        </Dialog.Content>
        {showFooter ? (
          <Dialog.Footer>
            <Button tone="neutral" variant="outline">
              Cancel
            </Button>
            <Button>Confirm</Button>
          </Dialog.Footer>
        ) : null}
        {showClose ? <Dialog.Close data-testid="close-button" /> : null}
      </Dialog.Popup>
    </Dialog>
  ),
  meta: Meta<typeof Dialog> = {
    component: Dialog,
    decorators: [
      (Story) => (
        <div
          className="flex min-h-dvh w-full items-center justify-center bg-cover bg-center p-lg"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80)',
          }}
        >
          <Story />
        </div>
      ),
    ],
    parameters: {
      docs: {
        description: {
          component:
            'Dialog presents an overlay and popup that temporarily interrupts the page for focused work. It supports composed header, content, footer, and close primitives, and is suitable for confirmations, short forms, and detail review flows.',
        },
        subtitle: 'A modal surface for focused tasks, confirmations, and contextual forms.',
      },
      layout: 'fullscreen',
    },
    render: () => <BasicDialog />,
    subcomponents: {
      DialogClose: Dialog.Close,
      DialogContent: Dialog.Content,
      DialogDescription: Dialog.Description,
      DialogFooter: Dialog.Footer,
      DialogHeader: Dialog.Header,
      DialogPopup: Dialog.Popup,
      DialogTitle: Dialog.Title,
      DialogTrigger: Dialog.Trigger,
    },
    title: 'Components/Dialog',
  }

export default meta

type Story = StoryObj<typeof Dialog>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Baseline dialog composition with title, description, content, footer actions, and close control.',
      },
    },
  },
}

export const Default: Story = {
  name: 'Composition / Default',
}

export const NoCloseButton: Story = {
  name: 'Composition / No Close Button',
  parameters: {
    docs: {
      description: {
        story:
          'Removes the explicit corner close affordance; useful when footer actions should drive dismissal.',
      },
    },
  },
  render: () => (
    <BasicDialog
      title="Invite Member"
      description="Send an invitation to a new workspace member."
      showClose={false}
      showFooter={false}
    />
  ),
}

export const ScrollableContent: Story = {
  name: 'Composition / Scrollable Content',
  parameters: {
    docs: {
      description: {
        story:
          'Use a scroll container for longer dialog content while preserving header and action context.',
      },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>Dialog Usage Notes</Dialog.Title>
          <Dialog.Description>
            Guidelines for writing clear and focused dialog experiences.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Content>
          <ScrollArea className="max-h-[40vh]">
            <div>
              <p>{LongDialogText}</p>
              <p>{LongDialogText}</p>
              <p>{LongDialogText}</p>
              <p>{LongDialogText}</p>
            </div>
          </ScrollArea>
        </Dialog.Content>
        <Dialog.Footer>
          <Button tone="neutral" variant="outline">
            Cancel
          </Button>
          <Button>Acknowledge</Button>
        </Dialog.Footer>
        <Dialog.Close data-testid="close-button" />
      </Dialog.Popup>
    </Dialog>
  ),
}

export const FormContent: Story = {
  name: 'Composition / Form Content',
  parameters: {
    docs: {
      description: {
        story: 'Dialogs are effective for short forms that require immediate user attention.',
      },
    },
  },
  render: () => (
    <Dialog>
      <Dialog.Trigger>
        <Button>Create Project</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>Create New Project</Dialog.Title>
          <Dialog.Description>Provide a project name to continue.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Content>
          <InputGroup variant="secondary">
            <InputGroupInput placeholder="Project name" />
          </InputGroup>
        </Dialog.Content>
        <Dialog.Footer>
          <Button tone="neutral" variant="outline">
            Cancel
          </Button>
          <Button>Create</Button>
        </Dialog.Footer>
        <Dialog.Close data-testid="close-button" />
      </Dialog.Popup>
    </Dialog>
  ),
}
