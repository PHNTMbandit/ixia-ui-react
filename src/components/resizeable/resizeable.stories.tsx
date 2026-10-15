import type { Meta, StoryObj } from '@storybook/react-vite'

import { cn } from '@/utils/cn'

import { ResizeableHandle } from './resizeable-handle'
import { ResizeablePanel } from './resizeable-panel'
import { ResizeablePanelGroup } from './resizeable-panel-group'

const ORIENTATIONS = ['horizontal', 'vertical'] as const,
  PanelContent = ({ label }: { label: string }) => (
    <div className="flex h-full items-center justify-center p-md">
      <span>{label}</span>
    </div>
  ),
  ThreePanelTemplate = ({
    orientation = 'horizontal',
    withHandle = false,
  }: {
    orientation?: (typeof ORIENTATIONS)[number]
    withHandle?: boolean
  }) => (
    <ResizeablePanelGroup
      className={cn(
        'rounded-xl border border-border',
        orientation === 'vertical' ? 'min-h-[500px] min-w-[350px]' : 'min-h-[200px]',
      )}
      orientation={orientation}
    >
      <ResizeablePanel defaultSize="25%">
        <PanelContent label="Header" />
      </ResizeablePanel>
      <ResizeableHandle withHandle={withHandle} />
      <ResizeablePanel defaultSize="50%">
        <PanelContent label="Content" />
      </ResizeablePanel>
      <ResizeableHandle withHandle={withHandle} />
      <ResizeablePanel defaultSize="25%">
        <PanelContent label="Footer" />
      </ResizeablePanel>
    </ResizeablePanelGroup>
  )

export default {
  argTypes: {
    orientation: {
      control: { type: 'select' },
      description: 'Axis used to lay out and resize child panels.',
      options: ORIENTATIONS,
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
  args: {
    orientation: 'horizontal',
  },
  component: ResizeablePanelGroup,
  parameters: {
    docs: {
      description: {
        component:
          'The Resizeable components are built for creating split-pane interfaces such as dashboards, editors, and tool workspaces. `ResizeablePanelGroup` defines the layout axis, `ResizeablePanel` contains content, and `ResizeableHandle` allows drag resizing between panels. You can use horizontal or vertical orientation, optional grip handles, and nested groups for IDE-style layouts.',
      },
      subtitle: 'Composable split-pane layout primitives with draggable resize handles.',
    },
  },
  render: (args) => <ThreePanelTemplate orientation={args.orientation} />,
  subcomponents: {
    ResizeableHandle,
    ResizeablePanel,
  },
  title: 'Components/Resizeable',
} satisfies Meta<typeof ResizeablePanelGroup>

type Story = StoryObj<typeof ResizeablePanelGroup>

export const Horizontal: Story = {
  name: 'Orientation / Horizontal',
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  name: 'Orientation / Vertical',
}

export const WithHandle: Story = {
  name: 'Handle / With Grip',
  parameters: {
    docs: {
      description: {
        story: 'Shows draggable separators with visible grip handles for better discoverability.',
      },
    },
  },
  render: (args) => <ThreePanelTemplate orientation={args.orientation} withHandle />,
}

export const Mixed: Story = {
  name: 'Composition / Nested Layout',
  render: () => (
    <ResizeablePanelGroup
      className="min-h-[500px] min-w-[350px] rounded-xl border border-border"
      orientation="vertical"
    >
      <ResizeablePanel defaultSize="30%">
        <div className="flex h-full items-center justify-center p-md">
          <span>Top Panel</span>
        </div>
      </ResizeablePanel>
      <ResizeableHandle />
      <ResizeablePanel defaultSize="70%">
        <ResizeablePanelGroup orientation="horizontal">
          <ResizeablePanel defaultSize="40%">
            <div className="flex h-full items-center justify-center p-md">
              <span>Left</span>
            </div>
          </ResizeablePanel>
          <ResizeableHandle />
          <ResizeablePanel defaultSize="60%">
            <div className="flex h-full items-center justify-center p-md">
              <span>Right</span>
            </div>
          </ResizeablePanel>
        </ResizeablePanelGroup>
      </ResizeablePanel>
    </ResizeablePanelGroup>
  ),
}

export const WorkspaceExample: Story = {
  name: 'Composition / Workspace Example',
  parameters: {
    docs: {
      description: {
        story:
          'A practical IDE-style split view using min panel constraints and visible drag handles.',
      },
    },
  },
  render: () => (
    <ResizeablePanelGroup
      className="min-h-[420px] rounded-xl border border-border"
      orientation="horizontal"
    >
      <ResizeablePanel defaultSize={'20%'} minSize={'15%'}>
        <PanelContent label="Sidebar" />
      </ResizeablePanel>
      <ResizeableHandle withHandle />
      <ResizeablePanel defaultSize={'55%'} minSize={'35%'}>
        <PanelContent label="Editor" />
      </ResizeablePanel>
      <ResizeableHandle withHandle />
      <ResizeablePanel defaultSize={'25%'} minSize={'20%'}>
        <PanelContent label="Preview" />
      </ResizeablePanel>
    </ResizeablePanelGroup>
  ),
}
