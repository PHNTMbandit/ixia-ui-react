import { faker, fakerJA } from '@faker-js/faker'
import {
  ArrowsDownUpIcon,
  ColumnsIcon,
  FunnelIcon,
  GridFourIcon,
  TableIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
import { Badge } from '../badge'
import type { BadgeProps } from '../badge'
import { Button } from '../button'
import { createAppColumnHelper, useAppTable } from './table-context'
import { TableResults } from './table-results'

export default {
  parameters: {
    docs: {
      description: {
        component:
          'A composition-first data table built on TanStack Table. Supports common patterns like simple lists, data grids, dashboards, user directories, and task trackers.',
      },
      subtitle: 'Flexible data table with sorting, filtering, pagination, and multiple view modes.',
    },
  },
  title: 'Components/Table',
}

interface Person {
  age: number
  avatar: string
  dateJoined: Date
  email: string
  firstName: string
  lastName: string
  progress: number
  status: 'active' | 'inactive' | 'pending'
  visits: number
}

const makePeople = (count: number): Person[] =>
    Array.from({ length: count }, () => ({
      age: faker.number.int({ max: 65, min: 18 }),
      avatar: faker.image.avatar(),
      dateJoined: faker.date.past({ years: 5 }),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      progress: faker.number.int({ max: 100, min: 0 }),
      status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      visits: faker.number.int({ max: 500, min: 0 }),
    })),
  makePeopleJA = (count: number): Person[] =>
    Array.from({ length: count }, () => ({
      age: fakerJA.number.int({ max: 65, min: 18 }),
      avatar: fakerJA.image.avatar(),
      dateJoined: fakerJA.date.past({ years: 5 }),
      email: fakerJA.internet.email(),
      firstName: fakerJA.person.firstName(),
      lastName: fakerJA.person.lastName(),
      progress: fakerJA.number.int({ max: 100, min: 0 }),
      status: fakerJA.helpers.arrayElement(['active', 'inactive', 'pending']),
      visits: fakerJA.number.int({ max: 500, min: 0 }),
    })),
  statusTone = (value: string): BadgeProps['tone'] => {
    switch (value) {
      case 'active':
      case 'in-stock': {
        return 'success'
      }
      case 'pending':
      case 'low-stock': {
        return 'warning'
      }
      default: {
        return 'neutral'
      }
    }
  }

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

const makeProducts = (count: number): Product[] =>
  Array.from({ length: count }, () => ({
    category: faker.commerce.department(),
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
    status: faker.helpers.arrayElement(['in-stock', 'low-stock', 'out-of-stock']),
    stock: faker.number.int({ min: 0, max: 200 }),
  }))

export const Playground = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'A simple table with three columns: First Name, Last Name, and Email. The table is populated with 5 rows of fake data generated using the Faker library.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.display({
          cell: ({ cell }) => <cell.TableCheckboxCell />,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          enableHiding: false,
          enableSorting: false,
          header: ({ header }) => <header.TableSelectHeader />,
          id: 'select',
          size: 48,
        }),
        columnHelper.accessor('avatar', {
          cell: ({ cell }) => <cell.TableImageCell className="rounded-full" />,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          enableSorting: false,
          header: 'Avatar',
        }),
        columnHelper.accessor('firstName', {
          enableMultiSort: true,
          filterFn: 'string',
          header: 'First Name',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('lastName', {
          enableMultiSort: true,
          filterFn: 'string',
          header: 'Last Name',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('email', {
          enableMultiSort: true,
          filterFn: 'string',
          header: 'Email',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('age', {
          filterFn: 'number',
          header: 'Age',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('dateJoined', {
          cell: ({ cell }) => <cell.TableDateCell />,
          filterFn: 'date',
          header: 'Date Joined',
          meta: {
            filterVariant: 'date',
          },
        }),
        columnHelper.accessor('visits', {
          filterFn: 'number',
          header: 'Visits',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('progress', {
          filterFn: 'number',
          header: 'Progress',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.TableBadgeCell tone={statusTone} />,
          filterFn: 'select',
          header: 'Status',
          meta: { filterVariant: 'select' },
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(5000), []),
        enableMultiSort: true,
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
          rowSelection: {},
          sorting: [{ id: 'firstName', desc: false }],
        },
        key: 'people-simple',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableToolbar>
            <table.TableSearch placeholder="Search..." />
            <table.TableFilterMenu>
              <Button aria-label="Filter" size="iconMedium" variant="ghost" tone="neutral">
                <FunnelIcon weight="bold" />
              </Button>
            </table.TableFilterMenu>
            <table.TableSortMenu>
              <Button aria-label="Sort" size="iconMedium" variant="ghost" tone="neutral">
                <ArrowsDownUpIcon weight="bold" />
              </Button>
            </table.TableSortMenu>
            <table.TableColumnToggle>
              <Button aria-label="Toggle columns" size="iconMedium" variant="ghost" tone="neutral">
                <ColumnsIcon weight="bold" />
              </Button>
            </table.TableColumnToggle>
          </table.TableToolbar>
          <table.TableFilterList />
          <table.TableSortList />
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
            <table.TableFooter />
          </table.TableViewport>
          <table.TableNav>
            <table.TablePagination>
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const PlaygroundJA = {
  name: 'Playground (JA)',
  parameters: {
    docs: {
      description: {
        story:
          'A simple table with three columns: First Name, Last Name, and Email. The table is populated with 5 rows of fake data generated using the Faker library.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.display({
          cell: ({ cell }) => <cell.TableCheckboxCell />,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          enableHiding: false,
          enableSorting: false,
          header: ({ header }) => <header.TableSelectHeader />,
          id: 'select',
          size: 48,
        }),
        columnHelper.accessor('avatar', {
          cell: ({ cell }) => <cell.TableImageCell className="rounded-full" />,
          enableColumnFilter: false,
          enableGlobalFilter: false,
          enableSorting: false,
          header: 'アバター',
        }),
        columnHelper.accessor('firstName', {
          enableMultiSort: true,
          filterFn: 'string',
          header: '名',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('lastName', {
          enableMultiSort: true,
          filterFn: 'string',
          header: '姓',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('email', {
          enableMultiSort: true,
          filterFn: 'string',
          header: 'メール',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('age', {
          filterFn: 'number',
          header: '年齢',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('dateJoined', {
          cell: ({ cell }) => <cell.TableDateCell />,
          filterFn: 'date',
          header: '入社日',
          meta: {
            filterVariant: 'date',
          },
        }),
        columnHelper.accessor('visits', {
          filterFn: 'number',
          header: '訪問回数',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('progress', {
          filterFn: 'number',
          header: '進捗',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.TableBadgeCell tone={statusTone} />,
          filterFn: 'select',
          header: 'ステータス',
          meta: { filterVariant: 'select' },
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeopleJA(5000), []),
        enableMultiSort: true,
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
          rowSelection: {},
          sorting: [{ id: 'firstName', desc: false }],
        },
        key: 'people-simple-ja',
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
        <table.TableContainer>
          <table.TableToolbar>
            <table.TableSearch placeholder="検索..." />
            <table.TableFilterMenu>
              <Button aria-label="フィルター" size="iconMedium" variant="ghost" tone="neutral">
                <FunnelIcon weight="bold" />
              </Button>
            </table.TableFilterMenu>
            <table.TableSortMenu>
              <Button aria-label="並び替え" size="iconMedium" variant="ghost" tone="neutral">
                <ArrowsDownUpIcon weight="bold" />
              </Button>
            </table.TableSortMenu>
            <table.TableColumnToggle>
              <Button
                aria-label="列の表示切り替え"
                size="iconMedium"
                variant="ghost"
                tone="neutral"
              >
                <ColumnsIcon weight="bold" />
              </Button>
            </table.TableColumnToggle>
          </table.TableToolbar>
          <table.TableFilterList />
          <table.TableSortList />
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
            <table.TableFooter />
          </table.TableViewport>
          <table.TableNav>
            <table.TablePagination>
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const BasicList = {
  name: 'Use case / Basic list',
  parameters: {
    docs: {
      description: {
        story:
          'A minimal, read-only table with only a header and body — no toolbar, filtering, or pagination. Ideal for short static lists embedded in a page.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Product>(),
      columns = columnHelper.columns([
        columnHelper.accessor('name', { header: 'Product' }),
        columnHelper.accessor('category', { header: 'Category' }),
        columnHelper.accessor('stock', {
          cell: ({ cell }) => <cell.TableNumberCell />,
          header: 'Stock',
        }),
        columnHelper.accessor('price', {
          cell: ({ cell }) => <cell.TableNumberCell>$</cell.TableNumberCell>,
          header: 'Price',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makeProducts(6), []),
        key: 'products-basic',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const RowSelection = {
  name: 'Use case / Row selection',
  parameters: {
    docs: {
      description: {
        story:
          'Multi-row selection with a select-all header checkbox. A contextual toolbar reveals bulk actions once one or more rows are selected.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.display({
          cell: ({ cell }) => <cell.TableCheckboxCell />,
          enableHiding: false,
          enableSorting: false,
          header: ({ header }) => <header.TableSelectHeader />,
          id: 'select',
          size: 48,
        }),
        columnHelper.accessor('firstName', { header: 'First Name' }),
        columnHelper.accessor('lastName', { header: 'Last Name' }),
        columnHelper.accessor('email', { header: 'Email' }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.TableBadgeCell tone={statusTone} />,
          header: 'Status',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(8), []),
        initialState: { rowSelection: {} },
        key: 'people-selection',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableToolbar>
            <table.Subscribe selector={(state) => state.rowSelection}>
              {(rowSelection) => {
                const count = Object.keys(rowSelection).length

                return count > 0 ? (
                  <div className="flex w-full items-center justify-between gap-xs">
                    <span className="style-text-default--1 text-on-surface-variant">
                      {count} selected
                    </span>
                    <Button size="small" tone="error" variant="soft">
                      <TrashIcon weight="bold" />
                      Delete
                    </Button>
                  </div>
                ) : (
                  <span className="style-text-default--1 text-on-surface-variant">
                    Select rows to reveal bulk actions.
                  </span>
                )
              }}
            </table.Subscribe>
          </table.TableToolbar>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const Filtering = {
  name: 'Use case / Filtering',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates every filter variant — string, number, date, and multi-select — surfaced through the filter menu and rendered as removable chips in the active filter list.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.accessor('firstName', {
          filterFn: 'string',
          header: 'First Name',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('email', {
          filterFn: 'string',
          header: 'Email',
          meta: { filterVariant: 'string' },
        }),
        columnHelper.accessor('age', {
          filterFn: 'number',
          header: 'Age',
          meta: { filterVariant: 'number' },
        }),
        columnHelper.accessor('dateJoined', {
          cell: ({ cell }) => <cell.TableDateCell />,
          filterFn: 'date',
          header: 'Date Joined',
          meta: { filterVariant: 'date' },
        }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.TableBadgeCell tone={statusTone} />,
          filterFn: 'select',
          header: 'Status',
          meta: { filterVariant: 'select' },
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(200), []),
        initialState: { pagination: { pageIndex: 0, pageSize: 8 } },
        key: 'people-filtering',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableToolbar>
            <table.TableSearch placeholder="Search..." />
            <table.TableFilterMenu>
              <Button aria-label="Filter" size="iconMedium" variant="ghost" tone="neutral">
                <FunnelIcon weight="bold" />
              </Button>
            </table.TableFilterMenu>
          </table.TableToolbar>
          <table.TableFilterList />
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
          <table.TableNav>
            <table.TablePagination>
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const WithFooterTotals = {
  name: 'Use case / Footer totals',
  parameters: {
    docs: {
      description: {
        story:
          'Uses column footers to render aggregate values. Totals recompute from the filtered row model, so they stay in sync as the data is filtered.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Product>(),
      columns = columnHelper.columns([
        columnHelper.accessor('name', { footer: 'Total', header: 'Product' }),
        columnHelper.accessor('category', { header: 'Category' }),
        columnHelper.accessor('stock', {
          cell: ({ cell }) => <cell.TableNumberCell />,
          footer: ({ table }) =>
            table
              .getFilteredRowModel()
              .rows.reduce((sum, row) => sum + row.getValue<number>('stock'), 0)
              .toLocaleString(),
          header: 'Stock',
        }),
        columnHelper.accessor('price', {
          cell: ({ cell }) => <cell.TableNumberCell>$</cell.TableNumberCell>,
          footer: ({ table }) =>
            `$${table
              .getFilteredRowModel()
              .rows.reduce((sum, row) => sum + row.getValue<number>('price'), 0)
              .toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
          header: 'Price',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makeProducts(8), []),
        key: 'products-footer',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
            <table.TableFooter />
          </table.TableViewport>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const CompactDensity = {
  name: 'Use case / Compact density',
  parameters: {
    docs: {
      description: {
        story:
          'A denser presentation with row dividers disabled via `showDivider={false}` and a smaller page size, suited to information-dense dashboards.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.accessor('firstName', { header: 'First Name' }),
        columnHelper.accessor('lastName', { header: 'Last Name' }),
        columnHelper.accessor('email', { header: 'Email' }),
        columnHelper.accessor('visits', {
          cell: ({ cell }) => <cell.TableNumberCell />,
          header: 'Visits',
        }),
        columnHelper.accessor('status', {
          cell: ({ cell }) => <cell.TableBadgeCell tone={statusTone} />,
          header: 'Status',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(50), []),
        initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
        key: 'people-compact',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody showDivider={false} />
          </table.TableViewport>
          <table.TableNav>
            <table.TablePagination>
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const EmptyState = {
  name: 'Use case / Empty state',
  parameters: {
    docs: {
      description: {
        story:
          'Renders a friendly empty message when there is no data to display, while keeping the column headers visible for context.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.accessor('firstName', { header: 'First Name' }),
        columnHelper.accessor('lastName', { header: 'Last Name' }),
        columnHelper.accessor('email', { header: 'Email' }),
      ]),
      table = useAppTable({
        columns,
        data: [],
        key: 'people-empty',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
          <div className="flex flex-col items-center justify-center gap-3xs py-2xl text-center">
            <span className="style-text-default-0 text-on-surface">No records found</span>
            <span className="style-text-default--1 text-on-surface-variant">
              New entries will appear here once they are added.
            </span>
          </div>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const CustomPagination = {
  name: 'Use case / Custom pagination',
  parameters: {
    docs: {
      description: {
        story:
          'Composes a richer pagination bar with first/last jump buttons and a live "showing x–y of z" summary via `TableResults`.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.accessor('firstName', { header: 'First Name' }),
        columnHelper.accessor('lastName', { header: 'Last Name' }),
        columnHelper.accessor('email', { header: 'Email' }),
        columnHelper.accessor('visits', {
          cell: ({ cell }) => <cell.TableNumberCell />,
          header: 'Visits',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(120), []),
        initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
        key: 'people-pagination',
      })

    return (
      <table.AppTable>
        <table.TableContainer>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
          <table.TableNav>
            <TableResults>
              {(start, end, total) => (
                <span className="style-text-default--1 text-on-surface-variant">
                  Showing {start}–{end} of {total}
                </span>
              )}
            </TableResults>
            <table.TablePagination>
              <table.TableFirstPage />
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
              <table.TableLastPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}

export const Grid = {
  name: 'Use case / Grid view',
  parameters: {
    docs: {
      description: {
        story:
          'Toggle between a multi-column list view and a card-based grid view. The list view exposes the full set of columns, while the grid view collapses each row into a single rich card by hiding the list-only columns.',
      },
    },
  },
  render: () => {
    const columnHelper = createAppColumnHelper<Person>(),
      columns = columnHelper.columns([
        columnHelper.accessor('firstName', {
          cell: ({ cell, table }) => {
            const person = cell.row.original

            if (!(table.atoms.viewMode.get() === 'grid')) {
              return <cell.TableTextCell />
            }

            return (
              <div className="flex flex-col gap-sm">
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
                  <span>{person.visits.toLocaleString()} visits</span>
                  <span>Joined {person.dateJoined.getFullYear()}</span>
                </div>
                <div className="flex flex-col gap-3xs">
                  <div className="flex items-center justify-between style-text-default--2 text-on-surface-variant">
                    <span>Progress</span>
                    <span>{person.progress}%</span>
                  </div>
                  <div className="h-2xs w-full overflow-hidden rounded-full bg-neutral-container-high">
                    <div
                      className="h-full rounded-full bg-brand-default"
                      style={{ width: `${person.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          },
          header: 'First Name',
        }),
        columnHelper.accessor('lastName', {
          cell: ({ table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }
          },
          header: 'Last Name',
        }),
        columnHelper.accessor('email', {
          cell: ({ table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }
          },
          header: 'Email',
        }),
        columnHelper.accessor('status', {
          cell: ({ cell, table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }

            return <cell.TableBadgeCell tone={statusTone} />
          },
          header: 'Status',
        }),
        columnHelper.accessor('visits', {
          cell: ({ cell, table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }

            return <cell.TableNumberCell />
          },
          header: 'Visits',
        }),
        columnHelper.accessor('dateJoined', {
          cell: ({ cell, table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }

            return <cell.TableDateCell />
          },
          header: 'Date Joined',
        }),
        columnHelper.accessor('progress', {
          cell: ({ cell, table }) => {
            if (table.atoms.viewMode.get() === 'grid') {
              return null
            }

            return <span>{cell.row.original.progress}%</span>
          },
          header: 'Progress',
        }),
      ]),
      table = useAppTable({
        columns,
        data: React.useMemo(() => makePeople(120), []),
        initialState: { pagination: { pageIndex: 0, pageSize: 12 } },
        key: 'people-grid',
      })

    return (
      <table.AppTable>
        <table.TableContainer className="w-[90vw]">
          <table.TableToolbar>
            <table.TableSearch placeholder="Search..." />
            <table.TableViewModeToggle
              aria-label="Toggle view mode"
              variant="ghost"
              size="iconMedium"
            >
              {(isGridView) => (
                <>{isGridView ? <GridFourIcon weight="bold" /> : <TableIcon weight="bold" />}</>
              )}
            </table.TableViewModeToggle>
          </table.TableToolbar>
          <table.TableViewport>
            <table.TableHeader />
            <table.TableBody />
          </table.TableViewport>
          <table.TableNav>
            <TableResults>
              {(start, end, total) => (
                <span className="style-text-default--1 text-on-surface-variant">
                  Showing {start}–{end} of {total}
                </span>
              )}
            </TableResults>
            <table.TablePagination>
              <table.TableFirstPage />
              <table.TablePreviousPage />
              <table.TablePaging />
              <table.TableNextPage />
              <table.TableLastPage />
            </table.TablePagination>
          </table.TableNav>
        </table.TableContainer>
      </table.AppTable>
    )
  },
}
