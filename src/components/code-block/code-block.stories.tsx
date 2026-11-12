import { FileCssIcon, FileJsIcon, FileTsIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { codeToHtml } from 'shiki/bundle/web'
import type { BundledLanguage } from 'shiki/bundle/web'
import { expect, spyOn, waitFor } from 'storybook/test'

import { Button } from '../button'
import type { CodeBlockProps, CodeBlockValue } from './code-block.types'
import { CodeBlock } from './index'

async function highlightCode(code: string, lang: BundledLanguage) {
  const html = await codeToHtml(code, {
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

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

async function highlightedItem(item: CodeBlockValue & { code: string }, lang: BundledLanguage) {
  return { ...item, content: await highlightCode(item.code, lang) }
}

const data: CodeBlockValue[] = [
  {
    code: '<Button>Click me</Button>',
    content: <Button>Click me</Button>,
    icon: <FileJsIcon weight="bold" />,
    id: '0',
    label: 'Button',
    name: 'button.jsx',
  },
  await highlightedItem(
    {
      code: `const fetchUserData = async (userId) => {
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
      icon: <FileJsIcon weight="bold" />,
      id: '1',
      label: 'JavaScript',
      name: 'api.js',
    },
    'javascript',
  ),
  await highlightedItem(
    {
      code: `interface User {
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
      icon: <FileTsIcon weight="bold" />,
      id: '2',
      label: 'TypeScript',
      name: 'types.ts',
    },
    'typescript',
  ),
  await highlightedItem(
    {
      code: `.container {
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
      icon: <FileCssIcon weight="bold" />,
      id: '3',
      label: 'CSS',
      name: 'styles.css',
    },
    'css',
  ),
  await highlightedItem(
    {
      code: `import { Button } from 'ixia-ui-react/button'`,
      icon: <FileJsIcon weight="bold" />,
      id: '4',
      label: 'JavaScript',
      name: 'import.js',
    },
    'javascript',
  ),
]

export default {
  argTypes: {
    defaultValue: {
      description: 'The ID of the initially selected item. Legacy item objects are also accepted.',
      table: {
        type: { summary: 'string | CodeBlockValue' },
      },
    },
    items: {
      description:
        'Items with a unique id, optional label, name, code (original source), custom content, and icon. Copy and download use code, never content.',
      table: {
        type: { summary: 'CodeBlockValue[]' },
      },
    },
    onValueChange: {
      description: 'Called with the selected item ID.',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    value: {
      description: 'The ID of the selected item when using controlled state.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    defaultValue: data[0].id,
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
        component: `CodeBlock manages selection, layout, copying, and downloading without depending on a syntax highlighter.

| Item fields | Display | Copy / download |
| --- | --- | --- |
| \`code\` only | Escaped source in \`<pre><code>\` | Original source |
| \`code\` + \`content\` | Custom React presentation | Original source |
| \`content\` only | Custom React presentation | Disabled |

Use unique item IDs. \`defaultValue\` and controlled \`value\` take an item ID; omit \`defaultValue\` to select the first item. Downloads use \`name\` as the file name, falling back to \`snippet.txt\` when it is omitted.

Use the same \`code\` string for a live preview and a highlighted view to export the same source from either. An empty \`code: ''\` is valid and keeps actions enabled. Explicit \`content: null\` suppresses the fallback.

Highlighting belongs to the consumer: pass any highlighter's React output as \`content\`. For highlighters returning HTML strings (such as Shiki), wrap trusted output in an element with \`dangerouslySetInnerHTML\`. CodeBlock itself never interprets strings as HTML.

**Migration:** move original source to \`code\`, and make \`defaultValue\` an item ID. Existing highlighted HTML strings must be wrapped explicitly in \`content\`; do not put generated HTML in \`code\`, because it is copied/downloaded verbatim.`,
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

const exampleCode = '<Button>Save changes</Button>\n'
const presentationItems: CodeBlockValue[] = [
  {
    id: 'preview',
    label: 'Preview',
    name: 'button.tsx',

    code: exampleCode,
    content: <Button>Save changes</Button>,
  },
  await highlightedItem(
    {
      id: 'highlighted',
      label: 'Highlighted',

      name: 'button.tsx',
      code: exampleCode,
    },
    'tsx',
  ),
  { id: 'plain', label: 'Plain', name: 'button.tsx', code: exampleCode },
  {
    id: 'text',
    label: 'Text',
    name: 'button.tsx',
    code: exampleCode,
    content: '<strong>Literal text, not HTML</strong>',
  },
  {
    id: 'content-only',
    label: 'Content only',
    name: 'preview',
    content: <Button>Preview only</Button>,
  },
  { id: 'empty', label: 'Empty', name: 'empty.ts', code: '' },
  {
    id: 'hidden',
    label: 'Hidden',

    name: 'button.tsx',
    code: exampleCode,
    content: null,
  },
  { id: 'unnamed', label: 'No name', code: exampleCode },
]

export const SourceAndPresentation: Story = {
  name: 'Source and Presentation',
  args: {
    items: presentationItems,
    defaultValue: presentationItems[0].id,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Preview, highlighted, plain, and text views share the same original source. Supply `code` for copy/download and optional `content` for presentation. Content-only items disable actions, empty source remains exportable, and `content: null` intentionally renders nothing. The Shiki HTML wrapper is consumer-owned; any React-based highlighter works here too.',
      },
    },
  },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlock.Header>
        <CodeBlock.Tabs />
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window>
        <CodeBlock.Actions>
          <CodeBlock.Download disabled={false} />
          <CodeBlock.Copy disabled={false} />
        </CodeBlock.Actions>
      </CodeBlock.Window>
    </CodeBlock>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    const writeText = spyOn(navigator.clipboard, 'writeText').mockResolvedValue(),
      createObjectURL = spyOn(URL, 'createObjectURL').mockReturnValue('blob:code-block-test'),
      revokeObjectURL = spyOn(URL, 'revokeObjectURL').mockImplementation(() => {}),
      click = spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {}),
      copy = canvas.getByRole('button', { name: 'Copy code' }),
      download = canvas.getByRole('button', { name: 'Download file' })

    try {
      for (const label of [
        'Preview',
        'Highlighted',
        'Plain',
        'Text',
        'Empty',
        'Hidden',
        'No name',
      ]) {
        await userEvent.click(canvas.getByRole('tab', { name: label }))
        await expect(copy).toBeEnabled()
        await expect(download).toBeEnabled()

        if (label === 'Preview') {
          await expect(canvas.getByRole('button', { name: 'Save changes' })).toBeVisible()
          await expect(canvasElement.querySelector('pre')).toBeNull()
        } else if (label === 'Highlighted') {
          await expect(canvasElement.querySelector('pre.shiki')).not.toBeNull()
        } else if (label === 'Plain' || label === 'Empty' || label === 'No name') {
          await expect(canvasElement.querySelector('pre code')?.textContent).toBe(
            label === 'Empty' ? '' : exampleCode,
          )
          await expect(
            canvas.queryByRole('button', { name: 'Save changes' }),
          ).not.toBeInTheDocument()
        } else if (label === 'Text') {
          await expect(canvas.getByText('<strong>Literal text, not HTML</strong>')).toBeVisible()
          await expect(canvasElement.querySelector('strong')).toBeNull()
        } else {
          await expect(canvasElement.querySelector('pre')).toBeNull()
          await expect(
            canvas.queryByRole('button', { name: 'Save changes' }),
          ).not.toBeInTheDocument()
        }

        await userEvent.click(copy)
        await expect(writeText).toHaveBeenLastCalledWith(label === 'Empty' ? '' : exampleCode)
        if (label === 'Preview') {
          await waitFor(() => {
            const icon = copy.querySelector('svg')
            if (!icon) {
              throw new Error('Expected the code block copy button to render an icon')
            }
            expect(getComputedStyle(icon).animationName).toBe('enter')
          })
        }
        if (label === 'No name') {
          await expect(download).toBeEnabled()
        }
        await userEvent.click(download)

        const blob = createObjectURL.mock.lastCall?.[0]
        if (!(blob instanceof Blob)) {
          throw new Error('Expected the original source to be downloaded as a Blob')
        }
        await expect(await blob.text()).toBe(label === 'Empty' ? '' : exampleCode)
        const link: unknown = click.mock.instances.at(-1)
        if (!(link instanceof HTMLAnchorElement)) {
          throw new Error('Expected the download to use an anchor element')
        }
        let expectedName = 'button.tsx'
        if (label === 'Empty') {
          expectedName = 'empty.ts'
        } else if (label === 'No name') {
          expectedName = 'snippet.txt'
        }
        await expect(link.download).toBe(expectedName)
        await expect(revokeObjectURL).toHaveBeenLastCalledWith('blob:code-block-test')
      }

      await userEvent.click(canvas.getByRole('tab', { name: 'Content only' }))
      await expect(canvas.getByRole('button', { name: 'Preview only' })).toBeVisible()
      await expect(copy).toBeDisabled()
      await expect(download).toBeDisabled()
      copy.click()
      download.click()
      await expect(writeText).toHaveBeenCalledTimes(7)
      await expect(createObjectURL).toHaveBeenCalledTimes(7)
    } finally {
      writeText.mockRestore()
      createObjectURL.mockRestore()
      revokeObjectURL.mockRestore()
      click.mockRestore()
    }
  },
}

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
  play: async ({ canvas }) => {
    const icon = canvas.getByRole('button', { name: 'Copy code' }).querySelector('svg')
    if (!icon) {
      throw new Error('Expected the code block copy button to render an icon')
    }
    await expect(getComputedStyle(icon).animationName).toBe('none')
  },
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
    <CodeBlock className="w-[1000px]" {...args}>
      <CodeBlock.Header data-testid="tabs-header">
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
  play: async ({ canvas, userEvent }) => {
    const list = canvas.getByRole('tablist'),
      header = canvas.getByTestId('tabs-header'),
      cssTab = canvas.getByRole('tab', { name: 'CSS' })

    await expect(getComputedStyle(list).borderBottomWidth).toBe('0px')
    await expect(getComputedStyle(header).borderBottomWidth).toBe('1px')
    await expect(list.querySelector('[role="presentation"]')).toBeVisible()
    await userEvent.click(cssTab)
    await expect(cssTab).toHaveAttribute('aria-selected', 'true')
    await expect(canvas.getByText('styles.css')).toBeVisible()
  },
}

// ─── Layout Variations ───────────────────────────────────────────────────────

function HeaderPaddingExample(args: CodeBlockProps) {
  const [showTabs, setShowTabs] = useState(false)

  return (
    <div className="flex w-[800px] flex-col gap-md">
      <Button onClick={() => setShowTabs((value) => !value)}>Switch navigation</Button>
      <CodeBlock {...args}>
        <CodeBlock.Header data-testid="default-header">
          {showTabs ? (
            <div>
              <CodeBlock.Tabs />
            </div>
          ) : (
            <CodeBlock.Select />
          )}
          <CodeBlock.Name />
        </CodeBlock.Header>
      </CodeBlock>
      <CodeBlock {...args}>
        <CodeBlock.Header data-testid="custom-header" className="px-lg">
          {showTabs ? <CodeBlock.Tabs showBorder /> : <CodeBlock.Select />}
          <CodeBlock.Name />
        </CodeBlock.Header>
      </CodeBlock>
      <CodeBlock {...args}>
        <CodeBlock.Header data-testid="plain-header">
          <CodeBlock.Name />
        </CodeBlock.Header>
      </CodeBlock>
    </div>
  )
}

export const HeaderPadding: Story = {
  name: 'Layout / Header Padding',
  parameters: {
    docs: {
      description: {
        story:
          'Headers use 2xs padding on both sides with a select or no navigation. Tabs are flush to the left; use `className` to customize the padding. The second header also opts back into the tabs border.',
      },
    },
  },
  render: (args) => <HeaderPaddingExample {...args} />,
  play: async ({ canvas, userEvent }) => {
    const defaultHeader = canvas.getByTestId('default-header'),
      customHeader = canvas.getByTestId('custom-header'),
      plainHeader = canvas.getByTestId('plain-header'),
      reference = document.createElement('div')

    reference.style.position = 'absolute'
    reference.style.visibility = 'hidden'
    reference.style.width = 'var(--spacing-2xs)'
    defaultHeader.append(reference)

    const spacing = reference.getBoundingClientRect().width
    reference.style.width = 'var(--spacing-lg)'
    const customSpacing = reference.getBoundingClientRect().width
    reference.remove()

    const expectPadding = async (header: HTMLElement, left: number, right: number) => {
      const style = getComputedStyle(header)

      await expect(Number.parseFloat(style.paddingLeft)).toBeCloseTo(left, 1)
      await expect(Number.parseFloat(style.paddingRight)).toBeCloseTo(right, 1)
    }

    await expect(spacing).toBeGreaterThan(0)
    await expect(customSpacing).toBeGreaterThan(0)
    await expectPadding(defaultHeader, spacing, spacing)
    await expectPadding(customHeader, customSpacing, customSpacing)
    await expectPadding(plainHeader, spacing, spacing)

    await userEvent.click(canvas.getByRole('button', { name: 'Switch navigation' }))
    await expectPadding(defaultHeader, 0, spacing)
    await expectPadding(customHeader, customSpacing, customSpacing)
    await expectPadding(plainHeader, spacing, spacing)
    const customTabsList = customHeader.querySelector('[role="tablist"]')
    if (!(customTabsList instanceof HTMLElement)) {
      throw new Error('Expected the custom header to contain a tab list')
    }
    await expect(getComputedStyle(customTabsList).borderBottomWidth).toBe('1px')

    defaultHeader.setAttribute('dir', 'rtl')
    try {
      await expectPadding(defaultHeader, 0, spacing)
    } finally {
      defaultHeader.removeAttribute('dir')
    }

    await userEvent.click(canvas.getByRole('button', { name: 'Switch navigation' }))
    await expectPadding(defaultHeader, spacing, spacing)
    await expectPadding(customHeader, customSpacing, customSpacing)
  },
}

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
    <CodeBlock className="w-[800px]" {...args} defaultValue={data[4].id}>
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
      icon = name.closest('div')?.querySelector('svg')

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

function ControlledSelectionExample() {
  const [value, setValue] = useState('javascript'),
    items: CodeBlockValue[] = [
      { code: 'const answer = 42', id: 'javascript', label: 'JavaScript', name: 'answer.js' },
      {
        code: 'const answer: number = 42',
        id: 'typescript',
        label: 'TypeScript',
        name: 'answer.ts',
      },
    ]

  return (
    <CodeBlock items={items} value={value} onValueChange={setValue}>
      <CodeBlock.Header>
        <CodeBlock.Tabs />
        <CodeBlock.Name />
      </CodeBlock.Header>
      <CodeBlock.Window />
    </CodeBlock>
  )
}

export const ControlledSelection: Story = {
  name: 'State / Controlled Selection',
  args: {
    defaultValue: undefined,
  },
  render: () => <ControlledSelectionExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'TypeScript' }))
    await expect(canvas.getByText('answer.ts')).toBeVisible()
    await expect(canvas.getByRole('tab', { name: 'TypeScript' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  },
}

function DynamicItemsExample() {
  const [items, setItems] = useState<CodeBlockValue[]>([
    { code: 'Before update', id: 'sample', label: 'Sample', name: 'sample.txt' },
  ])

  return (
    <>
      <Button
        onClick={() =>
          setItems((currentItems) =>
            currentItems.map((item) => ({ ...item, code: 'After update' })),
          )
        }
      >
        Update source
      </Button>
      <CodeBlock items={items} defaultValue="sample">
        <CodeBlock.Window />
      </CodeBlock>
    </>
  )
}

export const DynamicItems: Story = {
  name: 'State / Updated Items',
  args: {
    defaultValue: undefined,
  },
  render: () => <DynamicItemsExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Update source' }))
    await expect(canvas.getByText('After update')).toBeVisible()
    await expect(canvas.queryByText('Before update')).not.toBeInTheDocument()
  },
}
