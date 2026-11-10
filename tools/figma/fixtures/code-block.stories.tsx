import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { CodeBlock } from '../../../src/components/code-block'
import { Icon } from '../../../src/components/icon'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Code Block' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Code Block' }
const states = ['Default', 'Disabled']
const button = (state = 'Default') => ({
  State: state,
  size: 'medium',
  tone: 'neutral',
  variant: 'ghost',
})
const source = 'const greeting = "Hello, world!"\nconsole.log(greeting)'
const snippets = [
  {
    id: 'typescript',
    label: 'TypeScript',
    name: 'example.ts',
    code: source,
    icon: <Icon aria-hidden="true" name="fileUpload" {...swap('icon', false)} />,
    content: (
      <div {...slot('content')}>
        <pre className="style-text-code-0">
          <code {...text('code')}>{source}</code>
        </pre>
      </div>
    ),
  },
  { id: 'javascript', label: 'JavaScript', name: 'example.js', code: source },
]

function Context({ children }: { children: ReactNode }) {
  return (
    <CodeBlock items={snippets} defaultValue={snippets[0]} style={{ width: 480 }}>
      {children}
    </CodeBlock>
  )
}

const actionIcons = [
  { selector: '[data-figma-part="Button/Icon only"] svg', attrs: { swap: 'icon' } },
]

export const Copy: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Copy',
      order: 410,
      states,
      annotate: actionIcons,
      description:
        'Copy control backed by the shared Button asset. Disabled when the selected item has no code.',
      properties: { icon: 'copy status icon', State: 'disabled / missing code' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <div {...target(index)} className="flex w-fit">
            <CodeBlock.Copy
              disabled={combo.State === 'Disabled'}
              {...part('Button/Icon only', button(combo.State))}
            />
          </div>
        </Context>
      )}
    />
  ),
}
export const Download: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Download',
      order: 411,
      states,
      annotate: actionIcons,
      description:
        'Download the selected item using its name and raw code; backed by the shared Button asset.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <div {...target(index)} className="flex w-fit">
            <CodeBlock.Download
              disabled={combo.State === 'Disabled'}
              {...part('Button/Icon only', button(combo.State))}
            />
          </div>
        </Context>
      )}
    />
  ),
}
export const Name: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Name',
      order: 412,
      description: 'Selected item filename and optional item icon.',
      properties: { name: 'currentValue.name', icon: 'currentValue.icon' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <CodeBlock.Name {...target(index)} {...text('name')} />
        </Context>
      )}
    />
  ),
}
export const Select: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Select',
      order: 413,
      states,
      cva: {
        file: 'src/components/select/select.types.ts',
        name: 'selectVariants',
        axes: ['size'],
      },
      description:
        'Closed snippet selector with the Select ghost appearance; items come from CodeBlock.items.',
      annotate: [
        { selector: '[data-figma-target] [data-value]', attrs: { text: 'value' } },
        { selector: '[data-figma-target] svg', attrs: { swap: 'trailingIcon' } },
      ],
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <CodeBlock.Select
            {...target(index)}
            size={combo.size as 'medium'}
            disabled={combo.State === 'Disabled'}
          />
        </Context>
      )}
    />
  ),
}
export const Tabs: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Tabs',
      order: 414,
      cva: {
        file: 'src/components/tabs/tabs.types.ts',
        name: 'tabsVariants',
        axes: ['size', 'tone', 'variant'],
      },
      description:
        'Snippet tabs from CodeBlock.items; each generated tab is a reusable Tabs/Tab instance.',
      annotate: [
        { selector: '[data-figma-target] [role=tablist]', attrs: { slot: 'tabs' } },
        { selector: '[data-figma-target] [role=presentation]', attrs: { ignore: '' } },
      ],
      slots: {
        tabs: { description: 'Snippet tabs correspond to items.', preferred: ['Tabs/Tab'] },
        content: { description: 'Additional children after the tab list.' },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <CodeBlock.Tabs
            {...target(index)}
            size={combo.size as 'medium'}
            tone={combo.tone as 'brand'}
            variant={combo.variant as 'ghost'}
            ref={(node) => {
              node?.querySelectorAll('[role=tab]').forEach((tab, tabIndex) => {
                tab.setAttribute('data-figma-part', 'Tabs/Tab')
                tab.setAttribute(
                  'data-figma-variant',
                  JSON.stringify({
                    size: combo.size ?? 'medium',
                    tone: combo.tone ?? 'brand',
                    variant: combo.variant ?? 'ghost',
                    State: tabIndex === 0 ? 'Active' : 'Default',
                  }),
                )
                tab.setAttribute('data-figma-text', 'label')
              })
            }}
          >
            <div {...slot('content')}>
              <p className="style-text-prose-0" {...text('body')}>
                Additional snippet content.
              </p>
            </div>
          </CodeBlock.Tabs>
        </Context>
      )}
    />
  ),
}

function ActionsContent() {
  return (
    <>
      <div className="flex" {...part('Code Block/Copy', { State: 'Default' })}>
        <CodeBlock.Copy {...part('Button/Icon only', button())} />
      </div>
      <div
        className="flex"
        {...part('Code Block/Download', { State: 'Default' })}
        {...show('showDownload')}
      >
        <CodeBlock.Download {...part('Button/Icon only', button())} />
      </div>
    </>
  )
}

export const Actions: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Actions',
      order: 415,
      annotate: actionIcons,
      description:
        'Top-right code-window action group; use inside the relatively positioned Window.',
      slots: {
        actions: {
          description: 'Copy, download and custom actions.',
          preferred: ['Code Block/Copy', 'Code Block/Download', 'Button/Icon only'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <CodeBlock.Window style={{ minHeight: 100 }}>
            <CodeBlock.Actions {...target(index)}>
              <div style={{ display: 'contents' }} {...slot('actions')}>
                <ActionsContent />
              </div>
            </CodeBlock.Actions>
          </CodeBlock.Window>
        </Context>
      )}
    />
  ),
}
export const Header: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Header',
      order: 416,
      description: 'Header with replaceable filename, selector or tabs.',
      slots: {
        content: {
          description: 'Snippet name or selection controls.',
          preferred: ['Code Block/Name', 'Code Block/Select', 'Code Block/Tabs'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <CodeBlock.Header {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <CodeBlock.Name {...part('Code Block/Name', {})} {...text('name')} />
              <CodeBlock.Select
                {...part('Code Block/Select', { size: 'medium', State: 'Default' })}
              />
            </div>
          </CodeBlock.Header>
        </Context>
      )}
    />
  ),
}
export const Window: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Code Block/Window',
      order: 417,
      annotate: actionIcons,
      description:
        'Code presentation from currentValue.content (or raw code fallback), with native content and overlay action slots.',
      slots: {
        content: { description: 'Code, syntax-highlighted text or custom presentation.' },
        actions: { description: 'Window action group.', preferred: ['Code Block/Actions'] },
      },
      properties: { code: 'currentValue.code / content' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <CodeBlock.Window {...target(index)} style={{ minHeight: 160 }}>
            <div style={{ display: 'contents' }} {...slot('actions')}>
              <CodeBlock.Actions {...part('Code Block/Actions', {})}>
                <div style={{ display: 'contents' }} {...slot('actions')}>
                  <ActionsContent />
                </div>
              </CodeBlock.Actions>
            </div>
          </CodeBlock.Window>
        </Context>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Code Block',
  parameters: {
    figma: {
      ...base,
      component: 'Code Block',
      order: 418,
      annotate: actionIcons,
      description:
        'Composable code viewer. Header, selection controls, Window and action assets mirror the compound API.',
      slots: {
        sections: {
          description: 'Code block sections.',
          preferred: ['Code Block/Header', 'Code Block/Tabs', 'Code Block/Window'],
        },
      },
      usage:
        '<CodeBlock items={snippets} defaultValue={snippets[0]}><CodeBlock.Header><CodeBlock.Name /><CodeBlock.Select /></CodeBlock.Header><CodeBlock.Window><CodeBlock.Actions><CodeBlock.Copy /><CodeBlock.Download /></CodeBlock.Actions></CodeBlock.Window></CodeBlock>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo: Combo, index) => (
        <CodeBlock
          {...target(index)}
          items={snippets}
          defaultValue={snippets[0]}
          style={{ width: 480 }}
        >
          <div style={{ display: 'contents' }} {...slot('sections')}>
            <CodeBlock.Header {...part('Code Block/Header', {})} {...show('showHeader')}>
              <div style={{ display: 'contents' }} {...slot('content')}>
                <CodeBlock.Name {...part('Code Block/Name', {})} {...text('name')} />
                <CodeBlock.Select
                  {...part('Code Block/Select', { size: 'medium', State: 'Default' })}
                />
              </div>
            </CodeBlock.Header>
            <CodeBlock.Window {...part('Code Block/Window', {})} style={{ minHeight: 160 }}>
              <div style={{ display: 'contents' }} {...slot('actions')}>
                <CodeBlock.Actions {...part('Code Block/Actions', {})} {...show('showActions')}>
                  <div style={{ display: 'contents' }} {...slot('actions')}>
                    <ActionsContent />
                  </div>
                </CodeBlock.Actions>
              </div>
            </CodeBlock.Window>
          </div>
        </CodeBlock>
      )}
    />
  ),
}
