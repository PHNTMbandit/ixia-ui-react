import type { Meta, StoryObj } from '@storybook/react-vite'

import { BentoBox } from '../../../src/components/bento-box'
import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Matrix, flag, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Bento Box' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

const base = { group: 'Bento Box' }
const size = {
  axes: ['size'],
  file: 'src/components/bento-box/bento-box.types.ts',
  name: 'bentoBoxVariants',
}
const button = { State: 'Default', size: 'medium', tone: 'neutral', variant: 'ghost' }
const sized = (combo: Combo) => ({ size: combo.size ?? 'medium' })

export const Title: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Title',
      order: 400,
      cva: size,
      description: 'Card title; size is inherited from BentoBox.',
      properties: { title: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BentoBox size={combo.size as 'medium'}>
          <BentoBox.Title {...target(index)} {...text('title')}>
            Project overview
          </BentoBox.Title>
        </BentoBox>
      )}
    />
  ),
}

export const Description: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Description',
      order: 401,
      cva: size,
      description: 'Supporting text sized by its BentoBox.',
      properties: { description: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BentoBox size={combo.size as 'medium'}>
          <BentoBox.Description {...target(index)} {...text('description')}>
            Your latest workspace activity.
          </BentoBox.Description>
        </BentoBox>
      )}
    />
  ),
}

export const Action: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Action',
      order: 402,
      description: 'Header action positioned in the second grid column.',
      slots: {
        actions: { description: 'Header controls.', preferred: ['Button', 'Button/Icon only'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <BentoBox.Action {...target(index)}>
          <div style={{ display: 'contents' }} {...slot('actions')}>
            <Button
              aria-label="More project actions"
              variant="ghost"
              tone="neutral"
              {...part('Button/Icon only', button)}
            >
              <Icon name="ellipsis" {...swap('icon')} />
            </Button>
          </div>
        </BentoBox.Action>
      )}
    />
  ),
}

function HeaderParts({ combo }: { combo: Combo }) {
  return (
    <>
      <BentoBox.Title {...part('Bento Box/Title', sized(combo))} {...text('title')}>
        Project overview
      </BentoBox.Title>
      <BentoBox.Description
        {...part('Bento Box/Description', sized(combo))}
        {...show('showDescription')}
        {...text('description')}
      >
        Your latest workspace activity.
      </BentoBox.Description>
      <BentoBox.Action {...part('Bento Box/Action', {})} {...show('showAction')}>
        <div style={{ display: 'contents' }} {...slot('actions')}>
          <Button
            aria-label="More project actions"
            tone="neutral"
            variant="ghost"
            {...part('Button/Icon only', button)}
          >
            <Icon name="ellipsis" {...swap('icon')} />
          </Button>
        </div>
      </BentoBox.Action>
    </>
  )
}

export const Header: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Header',
      order: 403,
      cva: size,
      description: 'Grid header with reusable title, description and action.',
      slots: {
        heading: {
          description: 'Title, description and optional action.',
          preferred: ['Bento Box/Title', 'Bento Box/Description', 'Bento Box/Action'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BentoBox size={combo.size as 'medium'} style={{ width: 360 }}>
          <div {...target(index)}>
            <BentoBox.Header {...slot('heading')}>
              <HeaderParts combo={combo} />
            </BentoBox.Header>
          </div>
        </BentoBox>
      )}
    />
  ),
}

export const Content: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Content',
      order: 404,
      description: 'Flexible card body; accepts any content.',
      slots: { content: { description: 'Body layers and component instances.' } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <BentoBox.Content {...target(index)} style={{ width: 320 }}>
          <div style={{ display: 'contents' }} {...slot('content')}>
            <p className="style-text-prose-0" {...text('body')}>
              Add your content here.
            </p>
          </div>
        </BentoBox.Content>
      )}
    />
  ),
}

export const Footer: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box/Footer',
      order: 405,
      cva: size,
      description: 'Wrapping footer actions with the source auto top margin.',
      slots: { actions: { description: 'Footer content and actions.', preferred: ['Button'] } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BentoBox size={combo.size as 'medium'} style={{ width: 360 }}>
          <BentoBox.Footer {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('actions')}>
              <Button
                {...part('Button', { ...button, tone: 'brand', variant: 'fill' })}
                {...text('label')}
              >
                View project
              </Button>
            </div>
          </BentoBox.Footer>
        </BentoBox>
      )}
    />
  ),
}

export const Root: Story = {
  name: 'Bento Box',
  parameters: {
    figma: {
      ...base,
      component: 'Bento Box',
      order: 406,
      cva: { ...size, axes: ['size', 'fill', 'elevation'] },
      description: 'Composable card preserving the size, fill and elevation API.',
      properties: { sections: '<BentoBox.Header>, <BentoBox.Content>, <BentoBox.Footer>' },
      slots: {
        sections: {
          description: 'Ordered card sections.',
          preferred: ['Bento Box/Header', 'Bento Box/Content', 'Bento Box/Footer'],
        },
      },
      usage:
        '<BentoBox size="medium"><BentoBox.Header>…</BentoBox.Header><BentoBox.Content>…</BentoBox.Content><BentoBox.Footer>…</BentoBox.Footer></BentoBox>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BentoBox
          {...target(index)}
          size={combo.size as 'medium'}
          elevation={combo.elevation as 'medium'}
          fill={flag(combo.fill)}
          style={{ width: 360, minHeight: 240 }}
        >
          <div style={{ display: 'contents' }} {...slot('sections')}>
            <div {...part('Bento Box/Header', sized(combo))}>
              <BentoBox.Header {...slot('heading')}>
                <HeaderParts combo={combo} />
              </BentoBox.Header>
            </div>
            <BentoBox.Content {...part('Bento Box/Content', {})}>
              <div style={{ display: 'contents' }} {...slot('content')}>
                <p className="style-text-prose-0" {...text('body')}>
                  Add your content here.
                </p>
              </div>
            </BentoBox.Content>
            <BentoBox.Footer {...part('Bento Box/Footer', sized(combo))} {...show('showFooter')}>
              <div style={{ display: 'contents' }} {...slot('actions')}>
                <Button
                  {...part('Button', { ...button, tone: 'brand', variant: 'fill' })}
                  {...text('label')}
                >
                  View project
                </Button>
              </div>
            </BentoBox.Footer>
          </div>
        </BentoBox>
      )}
    />
  ),
}
