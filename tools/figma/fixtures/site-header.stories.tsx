import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { SiteHeader } from '../../../src/components/site-header'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Site Header' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Site Header' }

export const Title: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Site Header/Title',
      order: 550,
      description: 'Site title text.',
      properties: { title: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <SiteHeader.Title {...target(index)} {...text('title')}>
          Workspace
        </SiteHeader.Title>
      )}
    />
  ),
}
export const Separator: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Site Header/Separator',
      order: 551,
      description: 'Vertical separator with the SiteHeader token height.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(_combo, index) => <SiteHeader.Separator {...target(index)} />} />,
}
export const Group: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Site Header/Group',
      order: 552,
      description: 'Start, center or end aligned header group.',
      cva: {
        axes: ['position'],
        file: 'src/components/site-header/site-header.types.ts',
        name: 'siteHeaderGroupVariants',
      },
      slots: {
        content: {
          description: 'Titles, dividers and controls.',
          preferred: ['Site Header/Title', 'Site Header/Separator', 'Button', 'Button/Icon only'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <SiteHeader.Group
          {...target(index)}
          position={combo.position as 'start'}
          style={{ width: 240 }}
        >
          <div style={{ display: 'contents' }} {...slot('content')}>
            <SiteHeader.Title {...part('Site Header/Title', {})} {...text('title')}>
              Workspace
            </SiteHeader.Title>
          </div>
        </SiteHeader.Group>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Site Header',
  parameters: {
    figma: {
      ...base,
      component: 'Site Header',
      order: 553,
      description:
        'Equal-width header groups with native content slots. sticky is positioning behavior, not a separate visual asset.',
      properties: { groups: '<SiteHeader.Group position="start | center | end">' },
      slots: {
        groups: {
          description: 'Header group instances, in order.',
          preferred: ['Site Header/Group'],
        },
      },
      usage:
        '<SiteHeader sticky><SiteHeader.Group position="start">…</SiteHeader.Group><SiteHeader.Group position="center">…</SiteHeader.Group><SiteHeader.Group position="end">…</SiteHeader.Group></SiteHeader>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <header>
          <SiteHeader {...target(index)} style={{ width: 900 }}>
            <div style={{ display: 'contents' }} {...slot('groups')}>
              <SiteHeader.Group
                position="start"
                {...part('Site Header/Group', { position: 'start' })}
              >
                <div style={{ display: 'contents' }} {...slot('content')}>
                  <SiteHeader.Title {...part('Site Header/Title', {})} {...text('title')}>
                    Workspace
                  </SiteHeader.Title>
                  <SiteHeader.Separator
                    {...part('Site Header/Separator', {})}
                    {...show('showSeparator')}
                  />
                </div>
              </SiteHeader.Group>
              <SiteHeader.Group
                position="center"
                {...part('Site Header/Group', { position: 'center' })}
              >
                <div style={{ display: 'contents' }} {...slot('content')}>
                  <Button
                    tone="neutral"
                    variant="ghost"
                    {...part('Button', {
                      State: 'Default',
                      size: 'medium',
                      tone: 'neutral',
                      variant: 'ghost',
                    })}
                    {...text('label')}
                  >
                    Projects
                  </Button>
                </div>
              </SiteHeader.Group>
              <SiteHeader.Group position="end" {...part('Site Header/Group', { position: 'end' })}>
                <div style={{ display: 'contents' }} {...slot('content')}>
                  <Button
                    aria-label="Search workspace"
                    tone="neutral"
                    variant="ghost"
                    {...part('Button/Icon only', {
                      State: 'Default',
                      size: 'medium',
                      tone: 'neutral',
                      variant: 'ghost',
                    })}
                  >
                    <Icon name="search" {...swap('icon')} />
                  </Button>
                </div>
              </SiteHeader.Group>
            </div>
          </SiteHeader>
        </header>
      )}
    />
  ),
}
