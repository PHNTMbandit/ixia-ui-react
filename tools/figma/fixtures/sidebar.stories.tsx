import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { IconContainer } from '../../../src/components/icon-container'
import { Profile } from '../../../src/components/profile'
import { Sidebar } from '../../../src/components/sidebar'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Sidebar' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Sidebar' }
const layouts = { Layout: ['Expanded', 'Collapsed'] }
const expanded = (layout?: string) => layout !== 'Collapsed'
const toggleButton = { State: 'Default', size: 'medium', tone: 'neutral', variant: 'ghost' }

function Context({ children, layout = 'Expanded' }: { children: ReactNode; layout?: string }) {
  return (
    <Sidebar.Provider
      id={`figma-sidebar-${layout}`}
      defaultOpen={expanded(layout)}
      style={{ width: expanded(layout) ? 280 : 80 }}
    >
      {children}
    </Sidebar.Provider>
  )
}
function ToggleContent() {
  return <Icon aria-hidden="true" name="layers" {...swap('icon')} />
}
export const GroupLabel: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Group Label',
      order: 520,
      description: 'Expanded-sidebar section label; the source omits it when collapsed.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Sidebar.GroupLabel {...target(index)} {...text('label')}>
            Workspace
          </Sidebar.GroupLabel>
        </Context>
      )}
    />
  ),
}
export const MenuBadge: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Badge',
      order: 521,
      cva: {
        file: 'src/components/badge/badge.types.ts',
        name: 'badgeVariants',
        axes: ['size', 'tone', 'variant'],
      },
      description: 'Sidebar badge, visible only while expanded.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Sidebar.MenuBadge
            {...target(index)}
            size={combo.size as 'medium'}
            tone={combo.tone as 'brand'}
            variant={combo.variant as 'fill'}
            {...text('label')}
          >
            12
          </Sidebar.MenuBadge>
        </Context>
      )}
    />
  ),
}
export const Toggle: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Toggle',
      order: 522,
      description:
        'Sidebar toggle backed by Button. Not rendered when Provider.collapsible="none".',
      properties: { icon: 'children / render function' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <div {...target(index)} className="flex w-fit">
            <Sidebar.Toggle tone="neutral" {...part('Button/Icon only', toggleButton)}>
              <ToggleContent />
            </Sidebar.Toggle>
          </div>
        </Context>
      )}
    />
  ),
}
export const MenuButton: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Button',
      order: 523,
      axes: layouts,
      states: ['Default', 'Hover', 'Active', 'Disabled'],
      defaults: { Layout: 'Expanded' },
      interactive: { Hover: 'hover' },
      description:
        'Sidebar navigation button with active, hover and disabled states. Layout inherits Provider.open.',
      properties: { label: 'children (text)', icon: '<Icon />', State: 'isActive / disabled' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.MenuButton
            {...target(index)}
            aria-label="Projects"
            aria-current={combo.State === 'Active' ? 'page' : undefined}
            isActive={combo.State === 'Active'}
            disabled={combo.State === 'Disabled'}
          >
            <Icon aria-hidden="true" name="folder" {...swap('icon')} />
            <span {...show('showLabel', expanded(combo.Layout))} {...text('label')}>
              Projects
            </span>
          </Sidebar.MenuButton>
        </Context>
      )}
    />
  ),
}

function Entry({
  layout = 'Expanded',
  label = 'Projects',
  active = false,
}: {
  layout?: string
  label?: string
  active?: boolean
}) {
  return (
    <Sidebar.MenuItem {...part('Sidebar/Menu Item', { Layout: layout })}>
      <div style={{ display: 'contents' }} {...slot('content')}>
        <Sidebar.MenuButton
          aria-label={label}
          aria-current={active ? 'page' : undefined}
          isActive={active}
          {...part('Sidebar/Menu Button', { Layout: layout, State: active ? 'Active' : 'Default' })}
        >
          <Icon aria-hidden="true" name="folder" {...swap('icon')} />
          <span {...show('showLabel', expanded(layout))} {...text('label')}>
            {label}
          </span>
        </Sidebar.MenuButton>
        {expanded(layout) && (
          <Sidebar.MenuBadge
            {...part('Sidebar/Menu Badge', { size: 'medium', tone: 'brand', variant: 'fill' })}
            {...show('showBadge', false)}
            {...text('label')}
          >
            12
          </Sidebar.MenuBadge>
        )}
      </div>
    </Sidebar.MenuItem>
  )
}
export const MenuItem: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Item',
      order: 524,
      axes: layouts,
      description: 'Navigation row with a menu button and optional sibling badge.',
      slots: {
        content: {
          description: 'Navigation button and badge.',
          preferred: ['Sidebar/Menu Button', 'Sidebar/Menu Badge', 'Button/Icon only'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.MenuItem {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Sidebar.MenuButton
                aria-label="Projects"
                {...part('Sidebar/Menu Button', { Layout: combo.Layout, State: 'Default' })}
              >
                <Icon aria-hidden="true" name="folder" {...swap('icon')} />
                <span {...show('showLabel', expanded(combo.Layout))} {...text('label')}>
                  Projects
                </span>
              </Sidebar.MenuButton>
              {expanded(combo.Layout) && (
                <Sidebar.MenuBadge
                  {...part('Sidebar/Menu Badge', {
                    size: 'medium',
                    tone: 'brand',
                    variant: 'fill',
                  })}
                  {...show('showBadge')}
                  {...text('label')}
                >
                  12
                </Sidebar.MenuBadge>
              )}
            </div>
          </Sidebar.MenuItem>
        </Context>
      )}
    />
  ),
}
export const Menu: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu',
      order: 525,
      axes: layouts,
      description: 'Ordered collection of navigation rows and expandable groups.',
      slots: {
        items: {
          description: 'Menu entries.',
          preferred: ['Sidebar/Menu Item', 'Sidebar/Menu Collapsible'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.Menu {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('items')}>
              <Entry layout={combo.Layout} active />
              <Entry layout={combo.Layout} label="Archive" />
            </div>
          </Sidebar.Menu>
        </Context>
      )}
    />
  ),
}
export const GroupContent: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Group Content',
      order: 526,
      axes: layouts,
      description: 'Vertical group content collection.',
      slots: {
        content: {
          description: 'Menus or other section content.',
          preferred: ['Sidebar/Menu', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.GroupContent {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Sidebar.Menu {...part('Sidebar/Menu', { Layout: combo.Layout })}>
                <div style={{ display: 'contents' }} {...slot('items')}>
                  <Entry layout={combo.Layout} active />
                  <Entry layout={combo.Layout} label="Archive" />
                </div>
              </Sidebar.Menu>
            </div>
          </Sidebar.GroupContent>
        </Context>
      )}
    />
  ),
}
function GroupParts({ layout = 'Expanded' }: { layout?: string }) {
  return (
    <>
      {expanded(layout) && (
        <Sidebar.GroupLabel
          {...part('Sidebar/Group Label', {})}
          {...show('showLabel')}
          {...text('label')}
        >
          Workspace
        </Sidebar.GroupLabel>
      )}
      <Sidebar.GroupContent {...part('Sidebar/Group Content', { Layout: layout })}>
        <div style={{ display: 'contents' }} {...slot('content')}>
          <Sidebar.Menu {...part('Sidebar/Menu', { Layout: layout })}>
            <div style={{ display: 'contents' }} {...slot('items')}>
              <Entry layout={layout} active />
              <Entry layout={layout} label="Archive" />
            </div>
          </Sidebar.Menu>
        </div>
      </Sidebar.GroupContent>
    </>
  )
}
export const Group: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Group',
      order: 527,
      axes: layouts,
      description: 'Labelled sidebar group; label is omitted in collapsed mode.',
      slots: {
        sections: {
          description: 'Group label and content.',
          preferred: ['Sidebar/Group Label', 'Sidebar/Group Content'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.Group {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('sections')}>
              <GroupParts layout={combo.Layout} />
            </div>
          </Sidebar.Group>
        </Context>
      )}
    />
  ),
}
export const Header: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Header',
      order: 528,
      axes: layouts,
      description: 'Header render-function content responds to isExpanded.',
      slots: {
        content: {
          description: 'Brand, title and toggle.',
          preferred: ['Sidebar/Toggle', 'Button', 'Profile'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.Header {...target(index)}>
            {(isExpanded) => (
              <div style={{ display: 'contents' }} {...slot('content')}>
                {isExpanded && <span {...text('title')}>Workspace</span>}
                <div className="flex" {...part('Sidebar/Toggle', {})}>
                  <Sidebar.Toggle tone="neutral" {...part('Button/Icon only', toggleButton)}>
                    <ToggleContent />
                  </Sidebar.Toggle>
                </div>
              </div>
            )}
          </Sidebar.Header>
        </Context>
      )}
    />
  ),
}
export const Footer: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Footer',
      order: 529,
      axes: layouts,
      description: 'Footer render-function slot, often used for a profile.',
      slots: {
        content: {
          description: 'Profile or footer controls.',
          preferred: ['Profile', 'Button', 'Button/Icon only'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.Footer {...target(index)}>
            {(isExpanded) => (
              <div style={{ display: 'contents' }} {...slot('content')}>
                <FooterProfile expanded={Boolean(isExpanded)} />
              </div>
            )}
          </Sidebar.Footer>
        </Context>
      )}
    />
  ),
}
function FooterProfile({ expanded: isExpanded }: { expanded: boolean }) {
  return isExpanded ? (
    <Profile {...part('Profile', {})}>
      <IconContainer size="small" tone="neutral" {...slot('avatar')}>
        <Icon aria-hidden="true" name="folder" {...swap('avatarIcon')} />
      </IconContainer>
      <Profile.Content {...part('Profile/Content', {})}>
        <div style={{ display: 'contents' }} {...slot('details')}>
          <Profile.Name {...part('Profile/Name', {})} {...text('name')}>
            Alex Morgan
          </Profile.Name>
          <Profile.Subname {...part('Profile/Subname', {})} {...text('subname')}>
            alex@example.com
          </Profile.Subname>
        </div>
      </Profile.Content>
    </Profile>
  ) : (
    <Button
      aria-label="Open profile"
      tone="neutral"
      variant="ghost"
      {...part('Button/Icon only', toggleButton)}
    >
      <Icon name="folder" {...swap('icon')} />
    </Button>
  )
}
export const Content: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Content',
      order: 530,
      axes: layouts,
      description: 'Scrollable sidebar body, with a native group collection on the real viewport.',
      annotate: [{ selector: '[data-figma-target] > div', attrs: { slot: 'groups' } }],
      slots: { groups: { description: 'Sidebar groups.', preferred: ['Sidebar/Group'] } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context layout={combo.Layout}>
          <Sidebar.Content {...target(index)} style={{ height: 240 }}>
            <Sidebar.Group {...part('Sidebar/Group', { Layout: combo.Layout })}>
              <div style={{ display: 'contents' }} {...slot('sections')}>
                <GroupParts layout={combo.Layout} />
              </div>
            </Sidebar.Group>
          </Sidebar.Content>
        </Context>
      )}
    />
  ),
}
export const MenuCollapsibleTrigger: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Collapsible Trigger',
      order: 531,
      states: ['Closed', 'Open'],
      description:
        'Expanded-sidebar collapsible trigger. The collapsed-sidebar branch becomes a Popover trigger and discards custom props; it is not fabricated as a duplicate asset.',
      annotate: [{ selector: '[data-figma-target] > svg', attrs: { swap: 'trailingIcon' } }],
      properties: { label: 'children', leadingIcon: '<Icon />', State: 'MenuCollapsible.open' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Sidebar.MenuCollapsible open={combo.State === 'Open'}>
            <Sidebar.MenuCollapsibleTrigger {...target(index)}>
              <Icon aria-hidden="true" name="folder" {...swap('leadingIcon')} />
              <span {...text('label')}>Projects</span>
            </Sidebar.MenuCollapsibleTrigger>
            <Sidebar.MenuCollapsiblePanel>
              <span>Project navigation</span>
            </Sidebar.MenuCollapsiblePanel>
          </Sidebar.MenuCollapsible>
        </Context>
      )}
    />
  ),
}
export const MenuCollapsiblePanel: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Collapsible Panel',
      order: 532,
      description:
        'Visible nested navigation panel in an expanded Sidebar. Closed panels have no separate empty asset.',
      slots: {
        items: {
          description: 'Nested navigation items.',
          preferred: ['Sidebar/Menu Item', 'Sidebar/Menu Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Context>
          <Sidebar.MenuCollapsible open>
            <Sidebar.MenuCollapsibleTrigger>Projects</Sidebar.MenuCollapsibleTrigger>
            <Sidebar.MenuCollapsiblePanel {...target(index)}>
              <div style={{ display: 'contents' }} {...slot('items')}>
                <Entry label="Recent projects" />
              </div>
            </Sidebar.MenuCollapsiblePanel>
          </Sidebar.MenuCollapsible>
        </Context>
      )}
    />
  ),
}
export const MenuCollapsible: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Menu Collapsible',
      order: 533,
      states: ['Closed', 'Open'],
      description:
        'Expandable navigation group in an expanded Sidebar, with real Trigger and Panel assets.',
      slots: {
        sections: {
          description: 'Collapsible trigger and panel.',
          preferred: ['Sidebar/Menu Collapsible Trigger', 'Sidebar/Menu Collapsible Panel'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Context>
          <Sidebar.MenuCollapsible {...target(index)} open={combo.State === 'Open'}>
            <div style={{ display: 'contents' }} {...slot('sections')}>
              <Sidebar.MenuCollapsibleTrigger
                {...part('Sidebar/Menu Collapsible Trigger', { State: combo.State })}
              >
                <Icon aria-hidden="true" name="folder" {...swap('leadingIcon')} />
                <span {...text('label')}>Projects</span>
              </Sidebar.MenuCollapsibleTrigger>
              <Sidebar.MenuCollapsiblePanel {...part('Sidebar/Menu Collapsible Panel', {})}>
                <div style={{ display: 'contents' }} {...slot('items')}>
                  <Entry label="Recent projects" />
                </div>
              </Sidebar.MenuCollapsiblePanel>
            </div>
          </Sidebar.MenuCollapsible>
        </Context>
      )}
    />
  ),
}
export const Inset: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Inset',
      order: 534,
      description: 'Flexible scrollable application content beside Sidebar, inside Provider.',
      slots: { content: { description: 'Main application content.' } },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Sidebar.Inset {...target(index)} style={{ width: 480, minHeight: 320 }}>
          <div className="p-lg" {...slot('content')}>
            <p className="style-text-prose-0" {...text('body')}>
              Application content
            </p>
          </div>
        </Sidebar.Inset>
      )}
    />
  ),
}

function SidebarParts({ layout = 'Expanded' }: { layout?: string }) {
  return (
    <>
      <Sidebar.Header {...part('Sidebar/Header', { Layout: layout })}>
        {(isExpanded) => (
          <div style={{ display: 'contents' }} {...slot('content')}>
            {isExpanded && <span {...text('title')}>Workspace</span>}
            <div className="flex" {...part('Sidebar/Toggle', {})}>
              <Sidebar.Toggle tone="neutral" {...part('Button/Icon only', toggleButton)}>
                <ToggleContent />
              </Sidebar.Toggle>
            </div>
          </div>
        )}
      </Sidebar.Header>
      <Sidebar.Content
        {...part('Sidebar/Content', { Layout: layout })}
        ref={(node) => node?.firstElementChild?.setAttribute('data-figma-slot', 'groups')}
      >
        <Sidebar.Group {...part('Sidebar/Group', { Layout: layout })}>
          <div style={{ display: 'contents' }} {...slot('sections')}>
            <GroupParts layout={layout} />
          </div>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer {...part('Sidebar/Footer', { Layout: layout })}>
        {(isExpanded) => (
          <div style={{ display: 'contents' }} {...slot('content')}>
            <FooterProfile expanded={Boolean(isExpanded)} />
          </div>
        )}
      </Sidebar.Footer>
    </>
  )
}
export const Root: Story = {
  name: 'Sidebar',
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar',
      order: 535,
      axes: { ...layouts, tone: ['primary', 'secondary', 'ghost'], side: ['left', 'right'] },
      defaults: { Layout: 'Expanded', tone: 'primary', side: 'left' },
      description:
        'Desktop sidebar with its real 80px icon-collapse layout, sections and contextual menu assets. Closed offcanvas sidebars are intentionally not empty assets.',
      slots: {
        sections: {
          description: 'Sidebar header, scrollable content and footer.',
          preferred: ['Sidebar/Header', 'Sidebar/Content', 'Sidebar/Footer'],
        },
      },
      usage:
        '<Sidebar.Provider id="workspace"><Sidebar><Sidebar.Header>{expanded => …}</Sidebar.Header><Sidebar.Content>…</Sidebar.Content><Sidebar.Footer>{expanded => …}</Sidebar.Footer></Sidebar><Sidebar.Inset>…</Sidebar.Inset></Sidebar.Provider>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Sidebar.Provider
          id={`figma-sidebar-root-${index}`}
          defaultOpen={expanded(combo.Layout)}
          side={combo.side as 'left'}
          style={{ height: 480 }}
        >
          <Sidebar
            {...target(index)}
            width={280}
            tone={combo.tone as 'primary'}
            role="navigation"
            aria-label="Workspace navigation"
          >
            <div style={{ display: 'contents' }} {...slot('sections')}>
              <SidebarParts layout={combo.Layout} />
            </div>
          </Sidebar>
        </Sidebar.Provider>
      )}
    />
  ),
}
export const Provider: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Sidebar/Provider',
      order: 536,
      axes: { ...layouts, side: ['left', 'right'] },
      defaults: { Layout: 'Expanded', side: 'left' },
      description:
        'Unlike behavior-only providers, Sidebar.Provider renders the flex layout containing Sidebar and Inset; side reverses their layout.',
      slots: {
        layout: {
          description: 'Sidebar and main content.',
          preferred: ['Sidebar', 'Sidebar/Inset'],
        },
      },
      properties: { Layout: 'defaultOpen / collapsible="icon"', side: 'side', layout: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Sidebar.Provider
          {...target(index)}
          id={`figma-sidebar-layout-${index}`}
          defaultOpen={expanded(combo.Layout)}
          side={combo.side as 'left'}
          style={{ height: 480, width: 900 }}
        >
          <div style={{ display: 'contents' }} {...slot('layout')}>
            <Sidebar
              role="navigation"
              aria-label="Workspace navigation"
              width={280}
              {...part('Sidebar', { Layout: combo.Layout, tone: 'primary', side: combo.side })}
            >
              <div style={{ display: 'contents' }} {...slot('sections')}>
                <SidebarParts layout={combo.Layout} />
              </div>
            </Sidebar>
            <Sidebar.Inset {...part('Sidebar/Inset', {})}>
              <div className="p-lg" {...slot('content')}>
                <p className="style-text-prose-0" {...text('body')}>
                  Application content
                </p>
              </div>
            </Sidebar.Inset>
          </div>
        </Sidebar.Provider>
      )}
    />
  ),
}
