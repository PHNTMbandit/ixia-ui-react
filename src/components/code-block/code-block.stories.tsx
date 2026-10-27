import { FileCssIcon, FileJsIcon, FileTsIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { codeToHtml } from 'shiki/bundle/web'
import type { BundledLanguage } from 'shiki/bundle/web'
import { expect } from 'storybook/test'

import { Button } from '../button'
import type { CodeBlockValue } from './code-block.types'
import { CodeBlock } from './index'

async function highlightCode(code: string, lang: BundledLanguage): Promise<string> {
  return await codeToHtml(code, {
    lang,
    themes: {
      dark: 'andromeeda',
      light: 'github-light',
    },
    transformers: [
      {
        pre: (node) => {
          node.properties.style = ''
          return node
        },
      },
    ],
  })
}

const data: CodeBlockValue[] = [
  {
    content: <Button>Click me</Button>,
    icon: <FileJsIcon weight="bold" />,
    id: '0',
    label: 'Button',
    name: 'button.jsx',
  },
  {
    content: await highlightCode(
      `const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    console.log('User data:', data);
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};`,
      'javascript',
    ),
    icon: <FileJsIcon weight="bold" />,
    id: '1',
    label: 'JavaScript',
    name: 'api.js',
  },
  {
    content: await highlightCode(
      `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) throw new Error('User not found');
  return response.json();
}`,
      'typescript',
    ),
    icon: <FileTsIcon weight="bold" />,
    id: '2',
    label: 'TypeScript',
    name: 'types.ts',
  },
  {
    content: await highlightCode(
      `.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
}

.button {
  background-color: #0066cc;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #0052a3;
}`,
      'css',
    ),
    icon: <FileCssIcon weight="bold" />,
    id: '3',
    label: 'CSS',
    name: 'styles.css',
  },
]

export default {
  argTypes: {
    defaultValue: {
      description: 'The initially selected code block value from the items array.',
      table: {
        type: { summary: 'CodeBlockValue' },
      },
    },
    items: {
      description:
        'Array of code block values containing id, label, and content for each tab or select option.',
      table: {
        type: { summary: 'CodeBlockValue[]' },
      },
    },
  },
  args: {
    defaultValue: data[0],
    items: data,
  },
  component: CodeBlock,
  decorators: [
    (Story) => (
      <>
        <style>
          {`[data-theme='dark'] .shiki, [data-theme='dark'] .shiki span { color: var(--shiki-dark) !important; }`}
        </style>
        <Story />
      </>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The CodeBlock component provides a structured way to display code snippets with support for multiple languages or versions. It includes subcomponents for headers, navigation (tabs or select), and copy functionality, allowing for a customizable and interactive code display experience.',
      },
      subtitle: 'A container for displaying formatted code snippets with optional navigation.',
    },
  },
  subcomponents: {
    CodeBlockActions: CodeBlock.Actions,
    CodeBlockCopy: CodeBlock.Copy,
    CodeBlockDownload: CodeBlock.Download,
    CodeBlockHeader: CodeBlock.Header,
    CodeBlockName: CodeBlock.Name,
    CodeBlockSelect: CodeBlock.Select,
    CodeBlockTabs: CodeBlock.Tabs,
    CodeBlockWindow: CodeBlock.Window,
  },
  title: 'Components/Code Block',
} satisfies Meta<typeof CodeBlock>

type Story = StoryObj<typeof CodeBlock>

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for the CodeBlock component. Combine navigation patterns with header elements to suit your use case.',
      },
    },
  },
  render: (args) => (
    <CodeBlock className="w-[800px]" {...args}>
      <CodeBlock.Header>
        <CodeBlock.Select />
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download />
          <CodeBlock.Copy />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
}

// ─── Navigation Patterns ─────────────────────────────────────────────────────

export const Select: Story = {
  name: 'Navigation / Select',
  parameters: {
    docs: {
      description: {
        story:
          'Uses a dropdown select menu for switching between code snippets. Ideal when screen space is limited  or when there are many options.',
      },
    },
  },
  render: (args) => (
    <CodeBlock className="w-[800px]" {...args}>
      <CodeBlock.Header>
        <CodeBlock.Select />
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download />
          <CodeBlock.Copy />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
}

export const Tabs: Story = {
  name: 'Navigation / Tabs',
  parameters: {
    docs: {
      description: {
        story:
          'Uses inline tabs for switching between code snippets. Best for a small number of options where all choices should be visible.',
      },
    },
  },
  render: (args) => (
    <CodeBlock className="w-[800px]" {...args}>
      <CodeBlock.Header>
        <CodeBlock.Tabs />
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download />
          <CodeBlock.Copy />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
}

// ─── Layout Variations ───────────────────────────────────────────────────────

export const NoHeader: Story = {
  name: 'Layout / No Header',
  parameters: {
    docs: {
      description: {
        story:
          'A minimal code block without a header. Use when displaying a single code snippet that does not   require navigation or labelling.',
      },
    },
  },
  render: (args) => (
    <CodeBlock className="w-[800px]" {...args}>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download />
          <CodeBlock.Copy />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
}

export const NoSelect: Story = {
  name: 'Layout / No Select',
  parameters: {
    docs: {
      description: {
        story:
          'A minimal code block without a select. Use when displaying a single code snippet that does not   require navigation or labelling.',
      },
    },
  },
  render: (args) => (
    <CodeBlock className="w-[800px]" {...args}>
      <CodeBlock.Header>
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download />
          <CodeBlock.Copy />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
  play: async ({ canvas }) => {
    const name = canvas.getByText('button.jsx'),
      icon = name.querySelector('svg')

    if (!icon) {
      throw new globalThis.Error('Expected a file icon beside the code block name')
    }

    const style = getComputedStyle(name),
      nameBounds = name.getBoundingClientRect(),
      iconBounds = icon.getBoundingClientRect()

    await expect(Number.parseFloat(style.lineHeight)).toBeCloseTo(
      Number.parseFloat(style.fontSize),
      1,
    )
    await expect(iconBounds.y + iconBounds.height / 2).toBeCloseTo(
      nameBounds.y + nameBounds.height / 2,
      1,
    )
  },
}
