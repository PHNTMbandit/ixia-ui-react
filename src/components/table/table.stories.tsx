import { faker, fakerJA } from '@faker-js/faker'
import {
  ArrowsDownUpIcon,
  ColumnsIcon,
  DownloadSimpleIcon,
  FunnelIcon,
  GridFourIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PlusIcon,
  TableIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import type { StoryObj } from '@storybook/react-vite'
import { useCreateAtom, useSelector } from '@tanstack/react-store'
import React from 'react'
import { expect, screen, within } from 'storybook/test'

import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Badge } from '../badge'
import type { BadgeProps } from '../badge'
import { Button } from '../button'
import { IconContainer } from '../icon-container'
import { createAppColumnHelper, useAppTable } from './table-context'
import type { TableDataset } from './table.types'

export default {
  parameters: {
    docs: {
      description: {
        component: [
          'A composition-first data table built on TanStack Table. Every part is a small component you place yourself, so the same pieces build a static list, a searchable directory, a bulk-action list, or a finance ledger.',
          '',
          '```text',
          'AppTable',
          '└─ Container',
          '   ├─ TopBar',
          '   │  ├─ Toolbar        Search, FilterMenu, SortMenu, ColumnToggle, ViewModeToggle',
          '   │  ├─ FilterList     Removable chips for active filters',
          '   │  └─ SortList       Removable chips for active sorts',
          '   ├─ Viewport          Header, Body, Footer',
          '   └─ BottomBar         Results, Pagination',
          '```',
          '',
          '`Layout` is the outer vertical stack. `Container` is an optional frame, not a required parent for controls. Put bars inside the container to include them in its border, or beside it in a `Layout` to keep them outside. Both stacks provide `gap-md`; containers have no outer margins.',
          '',
          'Outlined containers automatically inset their direct `TopBar`, `Toolbar`, and `BottomBar` children. Bars outside a frame and bars in a ghost container stay flush. A toolbar nested in a top bar is not padded twice. Use `className` to override gaps or insets, and use a nested `Layout` when adding your own grouping.',
          '',
          '```tsx',
          '<table.AppTable>',
          '  <table.Layout>',
          '    <table.TopBar><table.Toolbar>...</table.Toolbar></table.TopBar>',
          '    <table.Container>',
          '      <table.Viewport><table.Header /><table.Body /></table.Viewport>',
          '    </table.Container>',
          '    <table.BottomBar>...</table.BottomBar>',
          '  </table.Layout>',
          '</table.AppTable>',
          '```',
          '',
          'Columns are declared with `createAppColumnHelper`, and cells render through registered cell components such as `cell.TextCell` and `cell.BadgeCell`. Every part is optional: leave out what a situation does not need.',
        ].join('\n'),
      },
      subtitle:
        'Flexible data table with search, sorting, filtering, pagination, and list or grid views.',
    },
    layout: 'padded',
  },
  title: 'Components/Table',
}

const SEED = 20_261_021,
  REFERENCE_DATE = new Date('2026-10-21T12:00:00.000Z'),
  ROLES = ['Designer', 'Engineer', 'Manager', 'Support'] as const,
  PERSON_STATUSES = ['active', 'inactive', 'pending'] as const,
  ORDER_STATUSES = ['paid', 'pending', 'refunded'] as const,
  STOCK_STATUSES = ['in-stock', 'low-stock', 'out-of-stock'] as const

interface Person {
  avatar: string
  completion: number
  dateJoined: Date
  email: string
  firstName: string
  id: string
  lastName: string
  role: (typeof ROLES)[number]
  status: (typeof PERSON_STATUSES)[number]
  tasksCompleted: number
}

interface Order {
  customer: string
  id: string
  items: number
  placedAt: Date
  status: (typeof ORDER_STATUSES)[number]
  total: number
}

interface Product {
  category: string
  id: string
  name: string
  price: number
  status: (typeof STOCK_STATUSES)[number]
  stock: number
}

interface Transaction {
  amount: number
  category: string
  date: Date
  description: string
  id: string
}

const makePeople = (count: number, locale: 'en' | 'ja' = 'en'): Person[] => {
    const generator = locale === 'ja' ? fakerJA : faker

    generator.seed(SEED)

    return Array.from({ length: count }, () => ({
      avatar: generator.image.avatar(),
      completion: generator.number.int({ max: 100, min: 0 }),
      dateJoined: generator.date.past({ refDate: REFERENCE_DATE, years: 4 }),
      email: generator.internet.email().toLowerCase(),
      firstName: generator.person.firstName(),
      id: generator.string.uuid(),
      lastName: generator.person.lastName(),
      role: generator.helpers.arrayElement(ROLES),
      status: generator.helpers.arrayElement(PERSON_STATUSES),
      tasksCompleted: generator.number.int({ max: 300, min: 0 }),
    }))
  },
  makeOrders = (count: number): Order[] => {
    faker.seed(SEED)

    return Array.from({ length: count }, (_, index) => ({
      customer: faker.person.fullName(),
      id: `ORD-${1001 + index}`,
      items: faker.number.int({ max: 12, min: 1 }),
      placedAt: faker.date.recent({ days: 120, refDate: REFERENCE_DATE }),
      status: faker.helpers.arrayElement(ORDER_STATUSES),
      total: faker.number.float({ fractionDigits: 2, max: 900, min: 12 }),
    }))
  },
  makeProducts = (count: number): Product[] => {
    faker.seed(SEED)

    return Array.from({ length: count }, () => ({
      category: faker.commerce.department(),
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.number.float({ fractionDigits: 2, max: 500, min: 5 }),
      status: faker.helpers.arrayElement(STOCK_STATUSES),
      stock: faker.number.int({ max: 200, min: 0 }),
    }))
  },
  statusTone = (value: string): BadgeProps['tone'] => {
    switch (value) {
      case 'active':
      case 'in-stock':
      case 'paid': {
        return 'success'
      }
      case 'pending':
      case 'low-stock': {
        return 'warning'
      }
      case 'out-of-stock':
      case 'refunded': {
        return 'error'
      }
      default: {
        return 'neutral'
      }
    }
  },
  isGridView = (table: { atoms: { viewMode: { get: () => string } } }) =>
    table.atoms.viewMode.get() === 'grid'

function ToolbarIconButton({
  children,
  label,
  ...props
}: React.ComponentProps<typeof Button> & { label: string }) {
  return (
    <Button aria-label={label} size="medium" tone="neutral" variant="ghost" {...props}>
      {children}
    </Button>
  )
}

const personHelper = createAppColumnHelper<Person>(),
  orderHelper = createAppColumnHelper<Order>(),
  productHelper = createAppColumnHelper<Product>(),
  transactionHelper = createAppColumnHelper<Transaction>()

interface PersonLabels {
  avatar: string
  completion: string
  dateJoined: string
  email: string
  name: string
  role: string
  status: string
  tasksCompleted: string
}

const PERSON_LABELS_EN: PersonLabels = {
    avatar: 'Avatar',
    completion: 'Onboarding',
    dateJoined: 'Joined',
    email: 'Email',
    name: 'Name',
    role: 'Role',
    status: 'Status',
    tasksCompleted: 'Tasks',
  },
  PERSON_LABELS_JA: PersonLabels = {
    avatar: 'アバター',
    completion: 'オンボーディング',
    dateJoined: '入社日',
    email: 'メール',
    name: '氏名',
    role: '役職',
    status: 'ステータス',
    tasksCompleted: 'タスク',
  },
  selectColumn = personHelper.display({
    cell: ({ cell }) => <cell.CheckboxCell />,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enableSorting: false,
    header: ({ header }) => <header.TableCheckboxHeader />,
    id: 'select',
    size: 48,
  }),
  buildPersonColumns = (labels: PersonLabels, locale: string) =>
    personHelper.columns([
      personHelper.accessor('avatar', {
        cell: ({ cell }) => (
          <cell.AvatarCell
            fallback={`${cell.row.original.firstName[0]}${cell.row.original.lastName[0]}`}
          />
        ),
        enableColumnFilter: false,
        enableGlobalFilter: false,
        enableSorting: false,
        header: labels.avatar,
        size: 72,
      }),
      personHelper.accessor((person) => `${person.firstName} ${person.lastName}`, {
        filterFn: 'string',
        header: labels.name,
        id: 'name',
        meta: { filterVariant: 'string' },
      }),
      personHelper.accessor('email', {
        filterFn: 'string',
        header: labels.email,
        meta: { filterVariant: 'string' },
      }),
      personHelper.accessor('role', {
        filterFn: 'select',
        header: labels.role,
        meta: { filterVariant: 'select' },
      }),
      personHelper.accessor('status', {
        cell: ({ cell }) => <cell.BadgeCell tone={statusTone} />,
        filterFn: 'select',
        header: labels.status,
        meta: { filterVariant: 'select' },
      }),
      personHelper.accessor('dateJoined', {
        cell: ({ cell }) => (
          <cell.DateTimeCell locale={locale} options={{ dateStyle: 'medium', timeZone: 'UTC' }} />
        ),
        filterFn: 'date',
        header: labels.dateJoined,
        meta: { filterVariant: 'date' },
      }),
      personHelper.accessor('tasksCompleted', {
        cell: ({ cell }) => <cell.NumberCell />,
        filterFn: 'number',
        header: labels.tasksCompleted,
        meta: { filterVariant: 'number' },
      }),
      personHelper.accessor('completion', {
        cell: ({ cell }) => (
          <cell.ProgressCell aria-label={`${cell.row.original.firstName} onboarding`} />
        ),
        enableColumnFilter: false,
        header: labels.completion,
      }),
    ]),
  personColumns = buildPersonColumns(PERSON_LABELS_EN, 'en-US'),
  personColumnsJA = buildPersonColumns(PERSON_LABELS_JA, 'ja-JP'),
  selectablePersonColumns = personHelper.columns([selectColumn, ...personColumns]),
  orderColumns = orderHelper.columns([
    orderHelper.accessor('id', { header: 'Order' }),
    orderHelper.accessor('customer', {
      filterFn: 'string',
      header: 'Customer',
      meta: { filterVariant: 'string' },
    }),
    orderHelper.accessor('placedAt', {
      cell: ({ cell }) => (
        <cell.DateTimeCell locale="en-US" options={{ dateStyle: 'medium', timeZone: 'UTC' }} />
      ),
      filterFn: 'date',
      header: 'Placed',
      meta: { filterVariant: 'date' },
    }),
    orderHelper.accessor('items', {
      cell: ({ cell }) => <cell.NumberCell />,
      filterFn: 'number',
      header: 'Items',
      meta: { filterVariant: 'number' },
    }),
    orderHelper.accessor('total', {
      cell: ({ cell }) => <cell.CurrencyCell currency="USD" locale="en-US" />,
      filterFn: 'number',
      header: 'Total',
      meta: { filterVariant: 'number' },
    }),
    orderHelper.accessor('status', {
      cell: ({ cell }) => <cell.BadgeCell tone={statusTone} />,
      filterFn: 'select',
      header: 'Status',
      meta: { filterVariant: 'select' },
    }),
  ])

export const Playground: StoryObj = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'A team directory using every part of the table. The top bar holds a toolbar (search, filter, sort, and column visibility) with the active filter and sort chips beneath it. The bottom bar pairs a results summary with pagination.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: selectablePersonColumns,
      data: React.useMemo(() => makePeople(240), []),
      enableMultiSort: true,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
        rowSelection: {},
        sorting: [{ desc: false, id: 'name' }],
      },
      key: 'team-directory',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search people..." />
              <table.FilterMenu>
                <ToolbarIconButton label="Filter">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
              <table.SortMenu>
                <ToolbarIconButton label="Sort">
                  <ArrowsDownUpIcon />
                </ToolbarIconButton>
              </table.SortMenu>
              <table.ColumnToggle>
                <ToolbarIconButton label="Toggle columns">
                  <ColumnsIcon />
                </ToolbarIconButton>
              </table.ColumnToggle>
            </table.Toolbar>
            <table.FilterList />
            <table.SortList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <>
                  Showing
                  <span className="text-on-surface">
                    {start}–{end}
                  </span>
                  of
                  <span className="text-on-surface">{total}</span>
                </>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Toggle columns' }))
    await expect(await screen.findByRole('menuitemcheckbox', { name: 'Email' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')

    await userEvent.click(canvas.getByRole('button', { name: 'Sort' }))
    await expect(await screen.findByRole('menuitem', { name: 'Name' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')

    await userEvent.click(canvas.getByRole('button', { name: 'Filter' }))
    await expect(await screen.findByRole('menu')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
  },
}

export const BasicList: StoryObj = {
  name: 'Basic list',
  parameters: {
    docs: {
      description: {
        story:
          'The smallest table: a container, a viewport, a header, and a body. No toolbar, filtering, or pagination, which suits short lists embedded in a page.',
      },
    },
  },
  render: () => {
    const columns = productHelper.columns([
        productHelper.accessor('name', { header: 'Product' }),
        productHelper.accessor('category', { header: 'Category' }),
        productHelper.accessor('stock', {
          cell: ({ cell }) => <cell.NumberCell />,
          header: 'In stock',
        }),
        productHelper.accessor('price', {
          cell: ({ cell }) => <cell.CurrencyCell currency="USD" locale="en-US" />,
          header: 'Price',
        }),
        productHelper.accessor('status', {
          cell: ({ cell }) => <cell.BadgeCell tone={statusTone} />,
          header: 'Availability',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makeProducts(6), []),
        key: 'products-basic',
      })

    return (
      <table.AppTable>
        <table.Container>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const Ghost: StoryObj = {
  name: 'Ghost',
  parameters: {
    docs: {
      description: {
        story:
          'A team directory using every part of the table. The top bar holds a toolbar (search, filter, sort, and column visibility) with the active filter and sort chips beneath it. The bottom bar pairs a results summary with pagination.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: selectablePersonColumns,
      data: React.useMemo(() => makePeople(240), []),
      enableMultiSort: true,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
        rowSelection: {},
        sorting: [{ desc: false, id: 'name' }],
      },
      key: 'team-directory',
    })

    return (
      <table.AppTable>
        <table.Container variant="ghost">
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search people..." variant={'secondary'} />
              <table.FilterMenu>
                <ToolbarIconButton label="Filter">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
              <table.SortMenu>
                <ToolbarIconButton label="Sort">
                  <ArrowsDownUpIcon />
                </ToolbarIconButton>
              </table.SortMenu>
              <table.ColumnToggle>
                <ToolbarIconButton label="Toggle columns">
                  <ColumnsIcon />
                </ToolbarIconButton>
              </table.ColumnToggle>
            </table.Toolbar>
            <table.FilterList />
            <table.SortList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <>
                  Showing
                  <span className="text-on-surface">
                    {start}–{end}
                  </span>
                  of
                  <span className="text-on-surface">{total}</span>
                </>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const TopAndBottomBars: StoryObj = {
  name: 'Top and bottom bars',
  parameters: {
    docs: {
      description: {
        story:
          'The top bar is a vertical stack, so a page heading, the toolbar, and chip lists can sit together. Use `ml-auto` on a button to push actions to the end of the toolbar row. The bottom bar spreads its children across the row.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(48), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
      key: 'orders-bars',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <div className="flex items-center justify-between gap-md">
              <div className="flex flex-col">
                <span className="style-text-strong-1 text-on-surface">Orders</span>
                <span className="style-text-default--1 text-on-surface-variant">
                  Review and manage recent customer orders.
                </span>
              </div>
              <Button size="medium" tone="brand" variant="fill">
                <PlusIcon />
                New order
              </Button>
            </div>
            <table.Toolbar>
              <table.Search placeholder="Search orders..." />
              <table.FilterMenu>
                <ToolbarIconButton label="Filter">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
              <Button className="ml-auto shrink-0" size="medium" tone="neutral" variant="outline">
                <DownloadSimpleIcon />
                Export
              </Button>
            </table.Toolbar>
            <table.FilterList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <>
                  {start}–{end} of {total} orders
                </>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const RowSelection: StoryObj = {
  name: 'Row selection',
  parameters: {
    docs: {
      description: {
        story:
          'Multi-row selection with a select-all header checkbox. A bulk action bar appears in the top bar once one or more rows are selected, driven by subscribing to the `rowSelection` state.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: selectablePersonColumns,
      data: React.useMemo(() => makePeople(10), []),
      initialState: { rowSelection: {} },
      key: 'team-selection',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search people..." />
            </table.Toolbar>
            <table.Subscribe selector={(state) => state.rowSelection}>
              {(rowSelection) => {
                const count = Object.keys(rowSelection).length

                if (count === 0) {
                  return (
                    <span className="style-text-default--1 text-on-surface-variant">
                      Select people to reveal bulk actions.
                    </span>
                  )
                }

                return (
                  <div className="flex items-center justify-between gap-md">
                    <span className="style-text-default--1 text-on-surface">{count} selected</span>
                    <Button size="small" tone="error" variant="soft">
                      <TrashIcon />
                      Delete
                    </Button>
                  </div>
                )
              }}
            </table.Subscribe>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const Filtering: StoryObj = {
  name: 'Filtering',
  parameters: {
    docs: {
      description: {
        story:
          'All four filter variants on one order list: string (customer), number (items, total), date (placed), and multi-select (status). Pick a column from the filter menu; each applied filter becomes a removable chip in the filter list. The global search combines with column filters.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(160), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
      key: 'orders-filtering',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search orders..." />
              <table.FilterMenu>
                <ToolbarIconButton label="Filter">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
            </table.Toolbar>
            <table.FilterList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <span>
                  {start}–{end} of {total} orders
                </span>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const Sorting: StoryObj = {
  name: 'Sorting',
  parameters: {
    docs: {
      description: {
        story:
          'Multi-column sorting. Orders start sorted by status, then by total (highest first). Click a header to sort, or use the sort menu. The sort list shows the active order and lets you remove or flip each sort.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(60), []),
      enableMultiSort: true,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 8 },
        sorting: [
          { desc: false, id: 'status' },
          { desc: true, id: 'total' },
        ],
      },
      key: 'orders-sorting',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search orders..." />
              <table.SortMenu>
                <ToolbarIconButton label="Sort">
                  <ArrowsDownUpIcon />
                </ToolbarIconButton>
              </table.SortMenu>
            </table.Toolbar>
            <table.SortList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const ColumnVisibility: StoryObj = {
  name: 'Column visibility',
  parameters: {
    docs: {
      description: {
        story:
          'Let people choose which columns they see. Email, joined date, and onboarding start hidden through `initialState.columnVisibility`; the column toggle brings them back. Columns marked `enableHiding: false`, like selection, never appear in the toggle.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: selectablePersonColumns,
      data: React.useMemo(() => makePeople(24), []),
      initialState: {
        columnVisibility: { completion: false, dateJoined: false, email: false },
        pagination: { pageIndex: 0, pageSize: 8 },
      },
      key: 'team-columns',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search people..." />
              <table.ColumnToggle>
                <ToolbarIconButton label="Toggle columns">
                  <ColumnsIcon />
                </ToolbarIconButton>
              </table.ColumnToggle>
            </table.Toolbar>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const Pagination: StoryObj = {
  name: 'Pagination',
  parameters: {
    docs: {
      description: {
        story:
          'A full pagination bar for large result sets: a live results summary, first and last page jumps, and a truncated page list. `min` and `max` on `Paging` control how many pages stay visible at the start and end before the rest collapse into an overflow menu.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(480), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
      key: 'orders-pagination',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <span>
                  Showing {start}–{end} of {total}
                </span>
              )}
            </table.Results>
            <table.Pagination>
              <table.FirstPage />
              <table.PreviousPage />
              <table.Paging min={2} max={2} />
              <table.NextPage />
              <table.LastPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const StickyBars: StoryObj = {
  name: 'Sticky bars',
  parameters: {
    docs: {
      description: {
        story:
          'For long tables inside a scrolling container, set `sticky` on `TopBar` and `BottomBar` to keep search and the results summary in view. Give the container a height, `overflow-auto`, and a background so scrolled rows do not show through.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(60), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 60 } },
      key: 'orders-sticky',
    })

    return (
      <table.AppTable>
        <table.Container className="max-h-[28rem] overflow-auto bg-surface">
          <table.TopBar className="bg-surface" sticky>
            <table.Toolbar>
              <table.Search placeholder="Search orders..." />
            </table.Toolbar>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar sticky>
            <table.Results>
              {(start, end, total) => (
                <span>
                  {start}–{end} of {total} orders
                </span>
              )}
            </table.Results>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const WithoutDividers: StoryObj = {
  name: 'Without dividers',
  parameters: {
    docs: {
      description: {
        story:
          'Turn off row dividers with `showDivider={false}` for a lighter look in dense dashboards.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(40), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
      key: 'orders-dividers',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.Viewport>
            <table.Header />
            <table.Body showDivider={false} />
          </table.Viewport>
          <table.BottomBar>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const EmptyState: StoryObj = {
  name: 'Empty state',
  parameters: {
    docs: {
      description: {
        story:
          'A centered first-use state with a neutral icon, a clear title, supporting text, and a primary action. Header, Content, and Footer stack automatically; actions wrap on smaller screens.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: [],
      key: 'orders-empty',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.Empty>
            <table.EmptyHeader>
              <IconContainer tone="neutral" size="large" aria-hidden="true">
                <PackageIcon weight="bold" />
              </IconContainer>
            </table.EmptyHeader>
            <table.EmptyContent>
              <table.EmptyTitle>No orders yet</table.EmptyTitle>
              <table.EmptyDescription>
                Create your first order to start tracking purchases and keeping your team up to
                date.
              </table.EmptyDescription>
            </table.EmptyContent>
            <table.EmptyFooter>
              <Button>
                <PlusIcon weight="bold" />
                Add order
              </Button>
            </table.EmptyFooter>
          </table.Empty>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const NoResults: StoryObj = {
  name: 'No results',
  parameters: {
    docs: {
      description: {
        story:
          'A search-empty state keeps the toolbar available and offers a clear-search action. Use a neutral search icon rather than error styling for an ordinary zero-result query.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(30), []),
      initialState: { globalFilter: 'no matching customer' },
      key: 'orders-no-results',
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search orders..." />
            </table.Toolbar>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.Empty>
            <table.EmptyHeader>
              <IconContainer tone="neutral" size="large" aria-hidden="true">
                <MagnifyingGlassIcon weight="bold" />
              </IconContainer>
            </table.EmptyHeader>
            <table.EmptyContent>
              <table.EmptyTitle>No matching orders</table.EmptyTitle>
              <table.EmptyDescription>
                Try a different search term or clear your filters.
              </table.EmptyDescription>
            </table.EmptyContent>
            <table.EmptyFooter>
              <Button variant="outline" tone="neutral" onClick={() => table.setGlobalFilter('')}>
                Clear search
              </Button>
            </table.EmptyFooter>
          </table.Empty>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const title = canvas.getByText('No matching orders'),
      empty = title.closest('[data-slot="table-empty"]')!

    await expect(title).toBeVisible()
    await expect(getComputedStyle(empty).alignItems).toBe('center')
    await expect(getComputedStyle(empty).textAlign).toBe('center')
    await userEvent.click(canvas.getByRole('button', { name: 'Clear search' }))
    await expect(canvas.queryByText('No matching orders')).not.toBeInTheDocument()
    await expect(canvas.getByPlaceholderText('Search orders...')).toHaveValue('')
    await expect(canvas.getByText('ORD-1001')).toBeVisible()
  },
}

export const GridView: StoryObj = {
  name: 'Grid view',
  parameters: {
    docs: {
      description: {
        story:
          'Switch between a multi-column list and a card grid with `ViewModeToggle`. In grid mode the header is hidden and each row becomes a single card, so render the card from one column and return `null` from list-only columns when the view mode is `grid`.',
      },
    },
  },
  render: () => {
    const columns = personHelper.columns([
        personHelper.accessor('firstName', {
          cell: ({ cell, table }) => {
            const person = cell.row.original

            if (!isGridView(table)) {
              return <cell.TextCell />
            }

            return (
              <div className="flex flex-col gap-sm p-sm">
                <div className="flex items-center gap-sm">
                  <Avatar size="medium">
                    <AvatarImage
                      alt={`${person.firstName} ${person.lastName}`}
                      src={person.avatar}
                    />
                    <AvatarFallback>
                      {person.firstName[0]}
                      {person.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate style-text-strong-0">
                      {person.firstName} {person.lastName}
                    </span>
                    <span className="truncate style-text-default--1 text-on-surface-variant">
                      {person.email}
                    </span>
                  </div>
                  <Badge
                    className="ml-auto capitalize"
                    tone={statusTone(person.status)}
                    variant="soft"
                  >
                    {person.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between style-text-default--1 text-on-surface-variant">
                  <span>{person.role}</span>
                  <span>Joined {person.dateJoined.getUTCFullYear()}</span>
                </div>
                <div className="flex flex-col gap-3xs">
                  <div className="flex items-center justify-between style-text-default--2 text-on-surface-variant">
                    <span>Onboarding</span>
                    <span>{person.completion}%</span>
                  </div>
                  <div className="h-2xs w-full overflow-hidden rounded-full bg-neutral-container-high">
                    <div
                      className="h-full rounded-full bg-brand-default"
                      style={{ width: `${person.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          },
          header: 'Name',
        }),
        personHelper.accessor('email', {
          cell: ({ cell, table }) => (isGridView(table) ? null : <cell.TextCell />),
          header: 'Email',
        }),
        personHelper.accessor('role', {
          cell: ({ cell, table }) => (isGridView(table) ? null : <cell.TextCell />),
          header: 'Role',
        }),
        personHelper.accessor('status', {
          cell: ({ cell, table }) =>
            isGridView(table) ? null : <cell.BadgeCell tone={statusTone} />,
          header: 'Status',
        }),
        personHelper.accessor('dateJoined', {
          cell: ({ cell, table }) =>
            isGridView(table) ? null : (
              <cell.DateTimeCell
                locale="en-US"
                options={{ dateStyle: 'medium', timeZone: 'UTC' }}
              />
            ),
          header: 'Joined',
        }),
        personHelper.accessor('completion', {
          cell: ({ cell, table }) => (isGridView(table) ? null : <cell.ProgressCell />),
          header: 'Onboarding',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(60), []),
        initialState: { pagination: { pageIndex: 0, pageSize: 12 } },
        key: 'team-grid',
      })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search people..." />
              <table.ViewModeToggle
                aria-label="Toggle view mode"
                size="medium"
                tone="neutral"
                variant="ghost"
              >
                {(grid) => (grid ? <GridFourIcon /> : <TableIcon />)}
              </table.ViewModeToggle>
            </table.Toolbar>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <span>
                  Showing {start}–{end} of {total}
                </span>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

const TRANSACTIONS: Transaction[] = [
    {
      amount: 4200,
      category: 'Income',
      date: new Date('2026-10-01T12:00:00.000Z'),
      description: 'Monthly salary',
      id: 'txn-1',
    },
    {
      amount: -1250.75,
      category: 'Housing',
      date: new Date('2026-10-03T12:00:00.000Z'),
      description: 'Rent',
      id: 'txn-2',
    },
    {
      amount: -86.4,
      category: 'Groceries',
      date: new Date('2026-10-07T12:00:00.000Z'),
      description: 'Supermarket',
      id: 'txn-3',
    },
    {
      amount: 320,
      category: 'Income',
      date: new Date('2026-10-12T12:00:00.000Z'),
      description: 'Freelance invoice',
      id: 'txn-4',
    },
    {
      amount: -59.99,
      category: 'Utilities',
      date: new Date('2026-10-15T12:00:00.000Z'),
      description: 'Internet',
      id: 'txn-5',
    },
  ],
  formatUsd = (value: number): string =>
    new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency' }).format(value)

export const FinanceLedger: StoryObj = {
  name: 'Finance ledger',
  parameters: {
    docs: {
      description: {
        story:
          'Column footers render aggregates. The amount footer totals the filtered rows, so searching the ledger updates the total. Credits are positive and debits negative.',
      },
    },
  },
  render: () => {
    const columns = transactionHelper.columns([
        transactionHelper.accessor('date', {
          cell: ({ cell }) => (
            <cell.DateTimeCell locale="en-US" options={{ dateStyle: 'medium', timeZone: 'UTC' }} />
          ),
          footer: 'Total',
          header: 'Date',
        }),
        transactionHelper.accessor('description', { header: 'Description' }),
        transactionHelper.accessor('category', {
          cell: ({ cell }) => <cell.BadgeCell tone="neutral" />,
          header: 'Category',
        }),
        transactionHelper.accessor('amount', {
          cell: ({ cell }) => <cell.CurrencyCell currency="USD" locale="en-US" />,
          footer: ({ table }) => (
            <span className="style-text-default-0" data-testid="transactions-total">
              {formatUsd(
                table.getFilteredRowModel().rows.reduce((sum, row) => sum + row.original.amount, 0),
              )}
            </span>
          ),
          header: 'Amount',
        }),
      ]),
      table = useAppTable({
        columns,
        data: TRANSACTIONS,
        key: 'finance-transactions',
      })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="Search transactions..." />
            </table.Toolbar>
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
            <table.Footer />
          </table.Viewport>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const total = TRANSACTIONS.reduce((sum, transaction) => sum + transaction.amount, 0)

    await expect(canvas.getByTestId('transactions-total')).toHaveTextContent(formatUsd(total))
    await expect(canvas.getByText('Total')).toBeVisible()

    await userEvent.type(canvas.getByPlaceholderText('Search transactions...'), 'Rent')
    await expect(await canvas.findByTestId('transactions-total')).toHaveTextContent('-$1,250.75')
  },
}

const CELL_IMAGE = `data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><rect width="48" height="48" rx="8" fill="#2563eb"/><text x="24" y="30" text-anchor="middle" fill="white" font-size="18">UI</text></svg>',
  )}`,
  CELL_EXAMPLES = [
    {
      active: true,
      avatar: CELL_IMAGE,
      balance: 1234.5,
      completion: 0.755,
      id: 'alex',
      image: CELL_IMAGE,
      joined: new Date('2026-10-01T12:00:00.000Z'),
      name: 'Alex Morgan',
      progress: 75,
      status: 'active',
      tags: ['Design', 'Engineering'],
      updated: new Date('2026-10-21T11:55:00.000Z'),
      visits: 1234,
      website: 'https://example.com/alex',
    },
    {
      active: false,
      avatar: CELL_IMAGE,
      balance: 0,
      completion: 0,
      id: 'sam',
      image: CELL_IMAGE,
      joined: new Date('2026-10-20T12:00:00.000Z'),
      name: 'Sam Lee',
      progress: 0,
      status: 'inactive',
      tags: [],
      updated: REFERENCE_DATE,
      visits: 0,
      website: 'https://example.com/sam',
    },
    {
      active: true,
      avatar: CELL_IMAGE,
      balance: -42.5,
      completion: 1,
      id: 'jordan',
      image: CELL_IMAGE,
      joined: new Date('2026-10-15T12:00:00.000Z'),
      name: 'Jordan Taylor',
      progress: 100,
      status: 'pending',
      tags: ['Review', 'Review'],
      updated: new Date('2026-10-22T12:00:00.000Z'),
      visits: 42,
      website: 'https://example.com/jordan',
    },
  ]

export const AllCellTypes: StoryObj = {
  name: 'All cell types',
  parameters: {
    docs: {
      description: {
        story:
          'Every registered cell component: checkbox, avatar, image, text, link, number, date/time, badge, currency, percent, progress, boolean, tags, and relative time. Use them from the `cell` argument of a column definition. Values are deterministic and include edge cases: zero, false, negative currency, duplicate tags, and future dates. Percent cells take fractions (0.755 = 75.5%) while progress uses 0–100. Relative time uses a fixed reference so the examples stay reproducible. Scroll horizontally to see every column.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<(typeof CELL_EXAMPLES)[number]>(),
      columns = columnHelper.columns([
        columnHelper.display({
          cell: ({ cell }) => <cell.CheckboxCell />,
          enableSorting: false,
          header: ({ header }) => <header.TableCheckboxHeader />,
          id: 'select',
          size: 48,
        }),
        columnHelper.accessor('avatar', {
          cell: ({ cell }) => (
            <cell.AvatarCell
              aria-label={`${cell.row.original.name}'s avatar`}
              fallback="UI"
              role="img"
            />
          ),
          enableSorting: false,
          header: 'Avatar',
        }),
        columnHelper.accessor('image', {
          cell: ({ cell }) => <cell.ImageCell alt="UI sample" />,
          enableSorting: false,
          header: 'Image',
        }),
        columnHelper.accessor('name', {
          cell: ({ cell }) => <cell.TextCell />,
          header: 'Text',
        }),
        columnHelper.accessor('website', {
          cell: ({ cell }) => (
            <cell.LinkCell nativeButton={false} render={<a href={cell.getValue()} />} role="link" />
          ),
          header: 'Link',
          size: 240,
        }),
        columnHelper.accessor('visits', {
          cell: ({ cell }) => <cell.NumberCell />,
          header: 'Number',
        }),
        columnHelper.accessor('joined', {
          cell: ({ cell }) => (
            <cell.DateTimeCell locale="en-US" options={{ dateStyle: 'medium', timeZone: 'UTC' }} />
          ),
          header: 'Date / Time',
        }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.BadgeCell tone={statusTone} />,
          header: 'Badge',
        }),
        columnHelper.accessor('balance', {
          cell: ({ cell }) => <cell.CurrencyCell currency="USD" locale="en-US" />,
          header: 'Currency',
        }),
        columnHelper.accessor('completion', {
          cell: ({ cell }) => (
            <cell.PercentCell locale="en-US" options={{ maximumFractionDigits: 1 }} />
          ),
          header: 'Percent',
        }),
        columnHelper.accessor('progress', {
          cell: ({ cell }) => (
            <cell.ProgressCell aria-label={`${cell.row.original.name} progress`} />
          ),
          header: 'Progress',
        }),
        columnHelper.accessor('active', {
          cell: ({ cell }) => <cell.BooleanCell falseLabel="Disabled" trueLabel="Enabled" />,
          header: 'Boolean',
        }),
        columnHelper.accessor('tags', {
          cell: ({ cell }) => <cell.TagsCell badgeProps={{ tone: 'neutral' }} />,
          enableSorting: false,
          header: 'Tags',
          size: 220,
        }),
        columnHelper.accessor('updated', {
          cell: ({ cell }) => <cell.RelativeTimeCell locale="en-US" now={REFERENCE_DATE} />,
          header: 'Relative time',
        }),
      ]),
      table = useAppTable({
        columns,
        data: CELL_EXAMPLES,
        key: 'all-cell-types',
      })

    return (
      <table.AppTable>
        <table.Container>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const alex = within(canvas.getByText('Alex Morgan').closest('tr')!),
      sam = within(canvas.getByText('Sam Lee').closest('tr')!),
      jordan = within(canvas.getByText('Jordan Taylor').closest('tr')!)

    await expect(alex.getAllByRole('cell')).toHaveLength(14)
    await expect(alex.getByRole('img', { name: "Alex Morgan's avatar" })).toBeVisible()
    await expect(alex.getByRole('img', { name: 'UI sample' })).toBeVisible()
    await expect(alex.getByRole('link')).toHaveAttribute('href', 'https://example.com/alex')
    await expect(alex.getByRole('link')).toHaveTextContent('https://example.com/alex')
    await expect(alex.getByText((1234).toLocaleString())).toBeVisible()
    await expect(alex.getByText('Oct 1, 2026')).toBeVisible()
    await expect(alex.getByText('active', { exact: true })).toBeVisible()
    await expect(alex.getByText('$1,234.50')).toBeVisible()
    await expect(alex.getByText('75.5%')).toBeVisible()
    await expect(alex.getByRole('meter')).toHaveAttribute('aria-valuenow', '75')
    await expect(alex.getByText('Enabled')).toBeVisible()
    await expect(alex.getByText('Design')).toBeVisible()
    await expect(alex.getByText('Engineering')).toBeVisible()
    await expect(alex.getByText('5 minutes ago')).toHaveAttribute(
      'datetime',
      '2026-10-21T11:55:00.000Z',
    )
    await expect(sam.getByText('$0.00')).toBeVisible()
    await expect(sam.getByText('Disabled')).toBeVisible()
    await expect(sam.getByRole('meter')).toHaveAttribute('aria-valuenow', '0')
    await expect(sam.getByText('now')).toBeVisible()
    await expect(jordan.getByText('-$42.50')).toBeVisible()
    await expect(jordan.getAllByText('Review')).toHaveLength(2)
    await expect(jordan.getByText('tomorrow')).toBeVisible()
    await expect(jordan.getByRole('meter')).toHaveAttribute('aria-valuenow', '100')
    await userEvent.click(alex.getByRole('checkbox'))
    await expect(alex.getByRole('checkbox')).toBeChecked()
    await userEvent.click(alex.getByRole('checkbox'))
    await expect(alex.getByRole('checkbox')).not.toBeChecked()
  },
}

export const ContentHeightRows: StoryObj = {
  name: 'Content height rows',
  parameters: {
    docs: {
      description: {
        story:
          'A fixed-height container with a content-height table. Short rows stay compact, multiline content grows naturally, and unused space stays below the table rather than stretching rows. Set the height on the surrounding container, not on the table or body.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<{ description: string; id: string }>(),
      columns = columnHelper.columns([
        columnHelper.accessor('id', {
          cell: ({ cell }) => <cell.TextCell />,
          header: 'Row',
        }),
        columnHelper.accessor('description', {
          cell: ({ cell }) => <cell.TextCell className="whitespace-pre-line" />,
          header: 'Description',
        }),
      ]),
      table = useAppTable({
        columns,
        data: [
          { description: 'One line of content.', id: 'Short row' },
          {
            description: 'First line.\nSecond line.\nThird line.\nFourth line.',
            id: 'Multiline row',
          },
        ],
        key: 'content-height-rows',
      })

    return (
      <table.AppTable>
        <table.Container data-testid="content-height-container" style={{ height: 480 }}>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas }) => {
    const container = canvas.getByTestId('content-height-container'),
      table = within(container).getByRole('table'),
      shortRow = canvas.getByText('Short row').closest('tr')!,
      multilineRow = canvas.getByText('Multiline row').closest('tr')!,
      shortHeight = shortRow.getBoundingClientRect().height,
      multilineHeight = multilineRow.getBoundingClientRect().height,
      tableHeight = table.getBoundingClientRect().height,
      originalContainerHeight = container.style.height

    await expect(shortHeight).toBeGreaterThan(0)
    await expect(multilineHeight).toBeGreaterThan(shortHeight)
    await expect(multilineHeight).toBeGreaterThanOrEqual(
      canvas.getByText(/First line/).getBoundingClientRect().height,
    )
    await expect(tableHeight).toBeLessThan(container.getBoundingClientRect().height)

    try {
      container.style.height = `${container.getBoundingClientRect().height * 2}px`

      await expect(shortRow.getBoundingClientRect().height).toBeCloseTo(shortHeight, 1)
      await expect(multilineRow.getBoundingClientRect().height).toBeCloseTo(multilineHeight, 1)
      await expect(table.getBoundingClientRect().height).toBeCloseTo(tableHeight, 1)
    } finally {
      container.style.height = originalContainerHeight
    }
  },
}

export const Localization: StoryObj = {
  name: 'Localization (JA)',
  parameters: {
    docs: {
      description: {
        story:
          'Translate built-in labels through the `meta.translations` table option: filter operators and the apply, reset, ascending, and descending buttons. Headers, placeholders, aria labels, and cell locales are plain props, so pass them in your own language.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: personColumnsJA,
      data: React.useMemo(() => makePeople(60, 'ja'), []),
      enableMultiSort: true,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 8 },
        sorting: [{ desc: false, id: 'name' }],
      },
      key: 'team-directory-ja',
      meta: {
        translations: {
          buttonLabels: {
            apply: '適用',
            ascending: '昇順',
            descending: '降順',
            reset: 'リセット',
          },
          filterOperatorLabels: {
            between: 'の間',
            contains: 'を含む',
            endsWith: 'で終わる',
            equals: 'と等しい',
            greaterThan: 'より大きい',
            lessThan: 'より小さい',
            notContains: 'を含まない',
            notEquals: 'と等しくない',
            startsWith: 'で始まる',
          },
        },
      },
    })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar>
            <table.Toolbar>
              <table.Search placeholder="検索..." />
              <table.FilterMenu>
                <ToolbarIconButton label="フィルター">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
              <table.SortMenu>
                <ToolbarIconButton label="並び替え">
                  <ArrowsDownUpIcon />
                </ToolbarIconButton>
              </table.SortMenu>
              <table.ColumnToggle>
                <ToolbarIconButton label="列の表示切り替え">
                  <ColumnsIcon />
                </ToolbarIconButton>
              </table.ColumnToggle>
            </table.Toolbar>
            <table.FilterList />
            <table.SortList />
          </table.TopBar>
          <table.Viewport>
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <span>
                  {total}件中 {start}–{end}件を表示
                </span>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
}

export const DifferentLayout: StoryObj = {
  name: 'Different Layout',
  parameters: {
    docs: {
      description: {
        story:
          'Controls outside the frame. Layout spaces the toolbar, active chips, bordered viewport, and bottom bar without margins on the container or padding on the external controls.',
      },
    },
  },
  render: () => {
    const table = useAppTable({
      columns: selectablePersonColumns,
      data: React.useMemo(() => makePeople(240), []),
      enableMultiSort: true,
      initialState: {
        pagination: { pageIndex: 0, pageSize: 10 },
        rowSelection: {},
        sorting: [{ desc: false, id: 'name' }],
      },
      key: 'team-directory-external',
    })

    return (
      <table.AppTable>
        <table.Layout>
          <table.Toolbar>
            <table.Search placeholder="Search people..." />
            <table.FilterMenu>
              <ToolbarIconButton label="Filter">
                <FunnelIcon />
              </ToolbarIconButton>
            </table.FilterMenu>
            <table.SortMenu>
              <ToolbarIconButton label="Sort">
                <ArrowsDownUpIcon />
              </ToolbarIconButton>
            </table.SortMenu>
            <table.ColumnToggle>
              <ToolbarIconButton label="Toggle columns">
                <ColumnsIcon />
              </ToolbarIconButton>
            </table.ColumnToggle>
          </table.Toolbar>
          <table.FilterList />
          <table.SortList />
          <table.Container>
            <table.Viewport>
              <table.Header />
              <table.Body />
            </table.Viewport>
          </table.Container>
          <table.BottomBar>
            <table.Results>
              {(start, end, total) => (
                <span>
                  {start}–{end} of {total}
                </span>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Layout>
      </table.AppTable>
    )
  },
}

const LAYOUT_CASES = [
  { id: 'inside', title: 'Everything inside the frame', topInside: true, bottomInside: true },
  { id: 'outside', title: 'Both bars outside', topInside: false, bottomInside: false },
  {
    id: 'top-inside',
    title: 'Top bar inside, bottom bar outside',
    topInside: true,
    bottomInside: false,
  },
  {
    id: 'bottom-inside',
    title: 'Top bar outside, bottom bar inside',
    topInside: false,
    bottomInside: true,
  },
  { id: 'toolbar', title: 'Standalone toolbar inside', topInside: true, bottomInside: true },
  { id: 'ghost', title: 'Borderless container', topInside: true, bottomInside: true },
  { id: 'overrides', title: 'Custom gaps and insets', topInside: true, bottomInside: true },
] as const

function LayoutExample({ example }: { example: (typeof LAYOUT_CASES)[number] }) {
  const table = useAppTable({
      columns: orderColumns,
      data: React.useMemo(() => makeOrders(6), []),
      initialState: { pagination: { pageIndex: 0, pageSize: 3 } },
      key: `layout-${example.id}`,
    }),
    toolbar = (
      <table.Toolbar>
        <table.Search aria-label="Search orders" placeholder="Search orders..." />
      </table.Toolbar>
    ),
    top =
      example.id === 'toolbar' ? (
        toolbar
      ) : (
        <table.TopBar className={example.id === 'overrides' ? 'p-0' : undefined}>
          {toolbar}
        </table.TopBar>
      ),
    bottom = (
      <table.BottomBar>
        <table.Results>
          {(start, end, total) => (
            <span>
              {start}–{end} of {total} orders
            </span>
          )}
        </table.Results>
        <table.Pagination>
          <table.PreviousPage />
          <table.NextPage />
        </table.Pagination>
      </table.BottomBar>
    )

  return (
    <section className="flex min-w-0 flex-col gap-sm" data-testid={`layout-${example.id}`}>
      <h3 className="style-text-strong-0">{example.title}</h3>
      <table.AppTable>
        <table.Layout>
          {!example.topInside && top}
          <table.Container
            variant={example.id === 'ghost' ? 'ghost' : 'outline'}
            className={example.id === 'overrides' ? 'gap-0' : undefined}
          >
            {example.topInside && top}
            <table.Viewport>
              <table.Header />
              <table.Body />
            </table.Viewport>
            {example.bottomInside && bottom}
          </table.Container>
          {!example.bottomInside && bottom}
        </table.Layout>
      </table.AppTable>
    </section>
  )
}

export const LayoutCompositions: StoryObj = {
  name: 'Layout / Compositions',
  parameters: {
    docs: {
      description: {
        story:
          'The same table with all-inside, all-outside, mixed, standalone-toolbar, ghost, and custom-spacing compositions. Layout owns external gaps; Container owns internal gaps and frame insets. Direct-child rules prevent double padding on nested toolbars. Utility classes still override the automatic insets.',
      },
    },
  },
  render: () => (
    <div className="flex w-full min-w-0 flex-col gap-2xl">
      {LAYOUT_CASES.map((example) => (
        <LayoutExample example={example} key={example.id} />
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const example of LAYOUT_CASES) {
      const section = canvas.getByTestId(`layout-${example.id}`),
        layout = section.querySelector<HTMLElement>('[data-slot="table-layout"]')!,
        container = section.querySelector<HTMLElement>('[data-slot="table-container"]')!,
        top = section.querySelector<HTMLElement>(
          example.id === 'toolbar' ? '[data-slot="table-toolbar"]' : '[data-slot="table-top-bar"]',
        )!,
        bottom = section.querySelector<HTMLElement>('[data-slot="table-bottom-bar"]')!,
        viewport = section.querySelector<HTMLElement>('[data-slot="table-viewport"]')!,
        toolbar = section.querySelector<HTMLElement>('[data-slot="table-toolbar"]')!,
        layoutGap = Number.parseFloat(getComputedStyle(layout).rowGap),
        topInset = Number.parseFloat(getComputedStyle(top).paddingLeft),
        bottomInset = Number.parseFloat(getComputedStyle(bottom).paddingLeft),
        framed = example.id !== 'ghost'

      await expect(layoutGap).toBeGreaterThan(0)
      await expect(
        getComputedStyle(container).marginTop,
        `${example.id}: container margin top`,
      ).toBe('0px')
      await expect(
        getComputedStyle(container).marginBottom,
        `${example.id}: container margin bottom`,
      ).toBe('0px')
      await expect(top.parentElement).toBe(example.topInside ? container : layout)
      await expect(bottom.parentElement).toBe(example.bottomInside ? container : layout)
      await expect(topInset > 0).toBe(framed && example.topInside && example.id !== 'overrides')
      await expect(bottomInset > 0).toBe(framed && example.bottomInside)
      await expect(Number.parseFloat(getComputedStyle(top).paddingTop) > 0).toBe(
        framed && example.topInside && example.id !== 'overrides',
      )
      await expect(Number.parseFloat(getComputedStyle(bottom).paddingBottom) > 0).toBe(
        framed && example.bottomInside,
      )
      if (example.id !== 'toolbar') {
        await expect(
          getComputedStyle(toolbar).paddingLeft,
          `${example.id}: nested toolbar inset`,
        ).toBe('0px')
      }
      if (example.id === 'overrides') {
        await expect(getComputedStyle(container).rowGap, `${example.id}: custom gap`).toBe('0px')
      } else {
        await expect(Number.parseFloat(getComputedStyle(container).rowGap)).toBe(layoutGap)
      }
      if (!example.topInside) {
        await expect(
          container.getBoundingClientRect().top - top.getBoundingClientRect().bottom,
        ).toBeCloseTo(layoutGap, 1)
      }
      if (!example.bottomInside) {
        await expect(
          bottom.getBoundingClientRect().top - container.getBoundingClientRect().bottom,
        ).toBeCloseTo(layoutGap, 1)
      }
      await expect(
        Number.parseFloat(getComputedStyle(viewport.querySelector('thead')!).borderTopWidth) > 0,
      ).toBe(framed && example.topInside)
    }
  },
}

export const SwitchDatasets: StoryObj = {
  name: 'Switch Datasets',
  parameters: {
    docs: {
      description: {
        story:
          'Switch between two people datasets. Selecting a dataset updates the current dataset atom and replaces the table rows while preserving the table controls.',
      },
    },
  },
  render: () => {
    const datasets = useCreateAtom<TableDataset<Person>[]>([
        {
          id: 'dataset-1',
          name: 'Dataset 1',
          data: makePeople(24),
        },
        {
          id: 'dataset-2',
          name: 'Dataset 2',
          data: makePeople(36, 'ja'),
        },
      ]),
      currentDatasetAtom = useCreateAtom<TableDataset<Person>>(datasets.get()[0]),
      currentDataset = useSelector(currentDatasetAtom),
      table = useAppTable<Person>({
        columns: selectablePersonColumns,
        data: currentDataset.data,
        enableMultiSort: true,
        atoms: {
          currentDataset: currentDatasetAtom,
          datasets,
        },
        initialState: {
          pagination: { pageIndex: 0, pageSize: 10 },
          rowSelection: {},
          sorting: [{ desc: false, id: 'name' }],
        },
        key: 'team-directory',
      })

    return (
      <table.AppTable>
        <table.Container>
          <table.TopBar data-testid="dataset-topbar">
            <table.Toolbar>
              <table.Search placeholder="Search people..." />
              <table.FilterMenu>
                <ToolbarIconButton label="Filter">
                  <FunnelIcon />
                </ToolbarIconButton>
              </table.FilterMenu>
              <table.SortMenu>
                <ToolbarIconButton label="Sort">
                  <ArrowsDownUpIcon />
                </ToolbarIconButton>
              </table.SortMenu>
              <table.ColumnToggle>
                <ToolbarIconButton label="Toggle columns">
                  <ColumnsIcon />
                </ToolbarIconButton>
              </table.ColumnToggle>
            </table.Toolbar>
            <table.FilterList />
            <table.SortList />
          </table.TopBar>
          <table.DatasetTab data-testid="dataset-tabs" variant="underline" />
          <table.Viewport data-testid="dataset-viewport">
            <table.Header />
            <table.Body />
          </table.Viewport>
          <table.BottomBar data-testid="dataset-bottombar">
            <table.Results data-testid="dataset-results">
              {(start, end, total) => (
                <>
                  Showing
                  <span className="text-on-surface">
                    {start}–{end}
                  </span>
                  of
                  <span className="text-on-surface">{total}</span>
                </>
              )}
            </table.Results>
            <table.Pagination>
              <table.PreviousPage />
              <table.Paging />
              <table.NextPage />
            </table.Pagination>
          </table.BottomBar>
        </table.Container>
      </table.AppTable>
    )
  },
  play: async ({ canvas, userEvent }) => {
    const topBar = canvas.getByTestId('dataset-topbar').getBoundingClientRect(),
      tabs = canvas.getByTestId('dataset-tabs').getBoundingClientRect(),
      viewport = canvas.getByTestId('dataset-viewport').getBoundingClientRect(),
      bottomBar = canvas.getByTestId('dataset-bottombar').getBoundingClientRect()

    await expect(tabs.top - topBar.bottom).toBeGreaterThan(0)
    await expect(viewport.top).toBeCloseTo(tabs.bottom, 1)
    await expect(bottomBar.top - viewport.bottom).toBeGreaterThan(0)
    await expect(canvas.getByTestId('dataset-results')).toHaveTextContent(/of\s*24/)
    await userEvent.click(canvas.getByRole('tab', { name: 'Dataset 2' }))
    await expect(canvas.getByTestId('dataset-results')).toHaveTextContent(/of\s*36/)
    await expect(canvas.getByRole('tab', { name: 'Dataset 2' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  },
}
