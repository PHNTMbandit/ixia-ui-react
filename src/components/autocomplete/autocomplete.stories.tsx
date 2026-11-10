import { MagnifyingGlassIcon, SpinnerGapIcon, TagIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button'
import { useFilter } from './autocomplete.types'
import { Autocomplete } from './index'

type AutocompleteMode = 'list' | 'both' | 'inline' | 'none'
type AutocompleteInputVariant = NonNullable<
  React.ComponentProps<typeof Autocomplete.InputGroup>['variant']
>

interface TagItem {
  id: string
  label: string
  group: 'Type' | 'Component'
}

interface TagGroup {
  value: string
  items: TagItem[]
}

interface Movie {
  id: string
  title: string
  year: number
}

const AUTOCOMPLETE_MODES = [
    'list',
    'both',
    'inline',
    'none',
  ] as const satisfies readonly AutocompleteMode[],
  tagsData: TagItem[] = [
    { group: 'Type', id: 't1', label: 'feature' },
    { group: 'Type', id: 't2', label: 'fix' },
    { group: 'Type', id: 't3', label: 'bug' },
    { group: 'Type', id: 't4', label: 'docs' },
    { group: 'Type', id: 't5', label: 'internal' },
    { group: 'Type', id: 't6', label: 'mobile' },
    { group: 'Component', id: 'c-accordion', label: 'component: accordion' },
    { group: 'Component', id: 'c-alert-dialog', label: 'component: alert dialog' },
    { group: 'Component', id: 'c-autocomplete', label: 'component: autocomplete' },
    { group: 'Component', id: 'c-avatar', label: 'component: avatar' },
    { group: 'Component', id: 'c-checkbox', label: 'component: checkbox' },
    { group: 'Component', id: 'c-combobox', label: 'component: combobox' },
    { group: 'Component', id: 'c-dialog', label: 'component: dialog' },
    { group: 'Component', id: 'c-field', label: 'component: field' },
    { group: 'Component', id: 'c-form', label: 'component: form' },
    { group: 'Component', id: 'c-input', label: 'component: input' },
    { group: 'Component', id: 'c-menu', label: 'component: menu' },
    { group: 'Component', id: 'c-popover', label: 'component: popover' },
    { group: 'Component', id: 'c-select', label: 'component: select' },
    { group: 'Component', id: 'c-tabs', label: 'component: tabs' },
    { group: 'Component', id: 'c-toast', label: 'component: toast' },
    { group: 'Component', id: 'c-tooltip', label: 'component: tooltip' },
  ],
  topMovies: Movie[] = [
    { id: '1', title: 'The Shawshank Redemption', year: 1994 },
    { id: '2', title: 'The Godfather', year: 1972 },
    { id: '3', title: 'The Dark Knight', year: 2008 },
    { id: '4', title: 'Pulp Fiction', year: 1994 },
    { id: '5', title: 'Fight Club', year: 1999 },
    { id: '6', title: 'Inception', year: 2010 },
    { id: '7', title: 'The Matrix', year: 1999 },
    { id: '8', title: 'Interstellar', year: 2014 },
    { id: '9', title: 'Parasite', year: 2019 },
    { id: '10', title: 'Whiplash', year: 2014 },
  ]

function groupTags(tags: TagItem[]): TagGroup[] {
  const groups: Record<string, TagItem[]> = {}
  tags.forEach((tag) => {
    groups[tag.group] ??= []
    groups[tag.group].push(tag)
  })
  return ['Type', 'Component'].map((value) => ({
    items: groups[value] ?? [],
    value,
  }))
}

const groupedTags = groupTags(tagsData),
  ListAutocompleteTemplate = ({
    mode = 'list',
    autoHighlight = false,
    highlightItemOnHover = false,
    keepHighlight = false,
    openOnInputClick = true,
    variant = 'primary',
  }: {
    mode?: AutocompleteMode
    autoHighlight?: boolean | 'always'
    highlightItemOnHover?: boolean
    keepHighlight?: boolean
    openOnInputClick?: boolean
    variant?: AutocompleteInputVariant
  }) => (
    <div className="w-[420px]">
      <Autocomplete
        autoHighlight={autoHighlight}
        highlightItemOnHover={highlightItemOnHover}
        items={tagsData}
        keepHighlight={keepHighlight}
        mode={mode}
        openOnInputClick={openOnInputClick}
      >
        <Autocomplete.InputGroup variant={variant}>
          <Autocomplete.InputGroupInput placeholder="Search tags or components" />
          <Autocomplete.InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
          </Autocomplete.InputGroupAddon>
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          <Autocomplete.Empty>No matches found</Autocomplete.Empty>
          <Autocomplete.Collection>
            {(tag: TagItem) => (
              <Autocomplete.Item key={tag.id} value={tag}>
                {tag.label}
              </Autocomplete.Item>
            )}
          </Autocomplete.Collection>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  ),
  GroupedAutocompleteTemplate = ({ mode = 'both' }: { mode?: AutocompleteMode }) => (
    <div className="w-[420px]">
      <Autocomplete items={groupedTags} mode={mode} openOnInputClick>
        <Autocomplete.InputGroup variant="primary">
          <Autocomplete.InputGroupInput placeholder="Search grouped tags" />
          <Autocomplete.InputGroupAddon>
            <TagIcon weight="bold" />
          </Autocomplete.InputGroupAddon>
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          <Autocomplete.Empty>No grouped results found</Autocomplete.Empty>
          {groupedTags.map((group) => (
            <Autocomplete.Group items={group.items} key={group.value}>
              <Autocomplete.GroupLabel>{group.value}</Autocomplete.GroupLabel>
              <Autocomplete.Collection>
                {(item: TagItem) => (
                  <Autocomplete.Item key={item.id} value={item}>
                    {item.label}
                  </Autocomplete.Item>
                )}
              </Autocomplete.Collection>
            </Autocomplete.Group>
          ))}
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  )

async function searchMovies(
  query: string,
  filter: (item: string, search: string) => boolean,
): Promise<{ movies: Movie[]; error: string | null }> {
  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 350 + 120)
  })

  if (Math.random() < 0.01 || query === 'will_error') {
    return {
      error: 'Failed to fetch movies. Please try again.',
      movies: [],
    }
  }

  return {
    error: null,
    movies: topMovies.filter(
      (movie) => filter(movie.title, query) || filter(movie.year.toString(), query),
    ),
  }
}

const AsyncLoadingTemplate = () => {
  const [searchValue, setSearchValue] = React.useState(''),
    [searchResults, setSearchResults] = React.useState<Movie[]>([]),
    [error, setError] = React.useState<string | null>(null),
    [isPending, startTransition] = React.useTransition(),
    { contains } = useFilter(),
    hasQuery = searchValue.trim().length > 0

  React.useEffect(() => {
    if (!hasQuery) {
      return
    }

    let cancelled = false

    startTransition(() => {
      void searchMovies(searchValue, contains).then((result) => {
        if (cancelled) {
          return
        }
        setSearchResults(result.movies)
        setError(result.error)
      })
    })

    return () => {
      cancelled = true
    }
  }, [contains, searchValue, hasQuery])

  const results = hasQuery ? searchResults : [],
    displayError = hasQuery ? error : null

  function getStatus(): React.ReactNode | null {
    if (isPending) {
      return (
        <div className="flex items-center gap-3xs">
          <SpinnerGapIcon aria-hidden className="size-xs animate-spin" weight="bold" />
          Searching…
        </div>
      )
    }

    if (displayError) {
      return displayError
    }

    if (!hasQuery) {
      return 'Start typing to search movies.'
    }

    return `${results.length} result${results.length === 1 ? '' : 's'} found`
  }

  return (
    <div className="w-[420px]">
      <Autocomplete items={results} mode="list" openOnInputClick>
        <Autocomplete.InputGroup variant="primary">
          <Autocomplete.InputGroupInput
            onChange={(event) => setSearchValue(event.currentTarget.value)}
            placeholder="Search top movies"
            value={searchValue}
          />
          <Autocomplete.InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
          </Autocomplete.InputGroupAddon>
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          <Autocomplete.Empty>No matching movies</Autocomplete.Empty>
          <Autocomplete.Status>{getStatus()}</Autocomplete.Status>
          <Autocomplete.Collection>
            {(movie: Movie) => (
              <Autocomplete.Item key={movie.id} value={movie}>
                <div className="flex w-full items-center justify-between gap-sm">
                  <span>{movie.title}</span>
                  <span className="style-text-default--1 text-on-surface-variant">
                    {movie.year}
                  </span>
                </div>
              </Autocomplete.Item>
            )}
          </Autocomplete.Collection>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  )
}

export default {
  argTypes: {
    autoHighlight: {
      control: { type: 'select' },
      description: 'Controls whether the first or matching item is automatically highlighted.',
      options: [true, false, 'always'],
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    grid: {
      table: {
        disable: true,
      },
    },
    highlightItemOnHover: {
      control: 'boolean',
      description: 'Highlights items as the pointer moves over them.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    items: {
      table: {
        disable: true,
      },
    },
    keepHighlight: {
      control: 'boolean',
      description: 'Keeps the current highlight active as the input changes.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    mode: {
      control: { type: 'select' },
      description: 'Controls how completion behaves: list popup, inline text, both, or disabled.',
      options: AUTOCOMPLETE_MODES,
      table: {
        defaultValue: { summary: 'list' },
      },
    },
    openOnInputClick: {
      control: 'boolean',
      description: 'Opens the suggestions popup when the input is clicked.',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    autoHighlight: false,
    highlightItemOnHover: false,
    keepHighlight: false,
    mode: 'list',
    openOnInputClick: true,
  },
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component:
          'Autocomplete improves text entry by surfacing matching suggestions in real time. Its input group and grid search support primary, secondary, ghost, and outline surface variants. It also supports list and inline completion modes, grouped results, trigger-based grid pickers, and async status feedback.',
      },
      subtitle: 'An input enhancement that suggests matching options while the user types.',
    },
  },
  render: (args) => (
    <ListAutocompleteTemplate
      autoHighlight={args.autoHighlight}
      highlightItemOnHover={args.highlightItemOnHover}
      keepHighlight={args.keepHighlight}
      mode={args.mode as AutocompleteMode}
      openOnInputClick={args.openOnInputClick}
    />
  ),
  subcomponents: {
    Content: Autocomplete.Content,
    GridContent: Autocomplete.GridContent,
    GridItem: Autocomplete.GridItem,
    Group: Autocomplete.Group,
    GroupLabel: Autocomplete.GroupLabel,
    InputGroup: Autocomplete.InputGroup,
    InputGroupAddon: Autocomplete.InputGroupAddon,
    InputGroupInput: Autocomplete.InputGroupInput,
    Item: Autocomplete.Item,
    Row: Autocomplete.Row,
    Status: Autocomplete.Status,
    Trigger: Autocomplete.Trigger,
  },
  title: 'Components/Autocomplete',
} satisfies Meta<typeof Autocomplete>

type Story = StoryObj<typeof Autocomplete>
type VariantStory = StoryObj<{ variant: AutocompleteInputVariant }>
type GridVariantStory = StoryObj<{ variant?: AutocompleteInputVariant }>

const variantClasses = {
    ghost: ['bg-transparent', 'outline-transparent'],
    outline: ['bg-transparent', 'outline-border'],
    primary: ['bg-surface', 'shadow-2xs'],
    secondary: ['bg-neutral-container'],
  } satisfies Record<AutocompleteInputVariant, string[]>,
  variantBackgrounds = {
    ghost: 'transparent',
    outline: 'transparent',
    primary: 'var(--color-surface)',
    secondary: 'var(--color-neutral-container)',
  } satisfies Record<AutocompleteInputVariant, string>,
  variantArgTypes = {
    variant: {
      control: 'select',
      description: 'Controls the visual surface style of the autocomplete input group.',
      options: ['primary', 'secondary', 'ghost', 'outline'],
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
  } satisfies NonNullable<VariantStory['argTypes']>,
  variantExample = {
    render: ({ variant }: { variant: AutocompleteInputVariant }) => (
      <ListAutocompleteTemplate variant={variant} />
    ),
    play: async ({ canvasElement, args }) => {
      const input = within(canvasElement).getByPlaceholderText('Search tags or components')
      await expectVariantSurface(input, args.variant)
    },
  } satisfies Pick<VariantStory, 'play' | 'render'>

async function expectVariantSurface(input: HTMLElement, variant: AutocompleteInputVariant) {
  const group = input.parentElement,
    parent = group?.parentElement
  if (!group || !parent) {
    throw new Error('Autocomplete input group is missing')
  }
  const swatch = input.ownerDocument.createElement('span')
  swatch.style.backgroundColor = variantBackgrounds[variant]
  parent.append(swatch)
  try {
    await expect(group).toHaveClass(...variantClasses[variant])
    await expect(group).toHaveClass('rounded-xl')
    await expect(getComputedStyle(group).backgroundColor).toBe(
      getComputedStyle(swatch).backgroundColor,
    )
  } finally {
    swatch.remove()
  }
}

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Use controls to explore completion modes and interaction behavior on the base list autocomplete.',
      },
    },
  },
}

export const VariantPlayground: VariantStory = {
  ...variantExample,
  args: {
    variant: 'primary',
  },
  argTypes: variantArgTypes,
  name: 'Variant / Playground',
}

export const Primary: VariantStory = {
  ...variantExample,
  args: { variant: 'primary' },
  name: 'Variant / Primary',
}

export const Secondary: VariantStory = {
  ...variantExample,
  args: { variant: 'secondary' },
  name: 'Variant / Secondary',
}

export const Ghost: VariantStory = {
  ...variantExample,
  args: { variant: 'ghost' },
  name: 'Variant / Ghost',
}

export const Outline: VariantStory = {
  ...variantExample,
  args: { variant: 'outline' },
  name: 'Variant / Outline',
}

const gridVariantExample = {
  render: ({ variant }) => (
    <Autocomplete defaultOpen grid items={['Alpha', 'Beta', 'Gamma']}>
      <Autocomplete.Trigger
        aria-label="Choose an item"
        render={<Button tone="neutral" variant="outline" />}
      >
        Choose an item
      </Autocomplete.Trigger>
      <Autocomplete.GridContent
        emptyText="No items found"
        placeholder="Search grid"
        variant={variant}
      >
        <Autocomplete.Row>
          <Autocomplete.Collection>
            {(item: string) => (
              <Autocomplete.GridItem key={item} value={item}>
                {item}
              </Autocomplete.GridItem>
            )}
          </Autocomplete.Collection>
        </Autocomplete.Row>
      </Autocomplete.GridContent>
    </Autocomplete>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement),
      page = within(canvasElement.ownerDocument.body),
      trigger = canvas.getByRole('combobox', { name: 'Choose an item' }),
      input = await page.findByPlaceholderText('Search grid')
    await expect(trigger).toHaveTextContent('Choose an item')
    await expect(input.closest('[role="dialog"]')).toHaveAccessibleName('Search grid')
    await expectVariantSurface(input, args.variant ?? 'primary')
    await userEvent.type(input, 'Beta')
    await expect(page.queryByText('Alpha')).not.toBeInTheDocument()
    await expect(page.getByText('Beta')).toBeInTheDocument()
    await userEvent.clear(input)
  },
} satisfies Pick<GridVariantStory, 'play' | 'render'>

export const GridVariant: GridVariantStory = {
  ...gridVariantExample,
  argTypes: variantArgTypes,
  name: 'Grid Variant / Playground',
}

export const GridPrimary: GridVariantStory = {
  ...gridVariantExample,
  args: { variant: 'primary' },
  name: 'Grid Variant / Primary',
}

export const GridSecondary: GridVariantStory = {
  ...gridVariantExample,
  args: { variant: 'secondary' },
  name: 'Grid Variant / Secondary',
}

export const GridGhost: GridVariantStory = {
  ...gridVariantExample,
  args: { variant: 'ghost' },
  name: 'Grid Variant / Ghost',
}

export const GridOutline: GridVariantStory = {
  ...gridVariantExample,
  args: { variant: 'outline' },
  name: 'Grid Variant / Outline',
}

export const ListMode: Story = {
  args: {
    mode: 'list',
  },
  name: 'Mode / List',
  parameters: {
    docs: {
      description: {
        story: 'Standard dropdown suggestion list. This is the most common autocomplete pattern.',
      },
    },
  },
}

export const InlineMode: Story = {
  args: {
    mode: 'inline',
  },
  name: 'Mode / Inline',
  parameters: {
    docs: {
      description: {
        story:
          'Inline completion fills the input as the user types, without relying on a list popup alone.',
      },
    },
  },
}

export const BothMode: Story = {
  args: {
    mode: 'both',
  },
  name: 'Mode / Both',
  parameters: {
    docs: {
      description: {
        story: 'Combines inline completion with the suggestion list for maximum discoverability.',
      },
    },
  },
}

export const AutoHighlight: Story = {
  args: {
    autoHighlight: true,
  },
  name: 'Behaviour / Auto Highlight',
  parameters: {
    docs: {
      description: {
        story: 'Automatically highlights a matching option to streamline keyboard selection.',
      },
    },
  },
}

export const HoverHighlight: Story = {
  args: {
    highlightItemOnHover: true,
  },
  name: 'Behaviour / Hover Highlight',
  parameters: {
    docs: {
      description: {
        story: 'Highlights options on pointer hover for mouse-driven interactions.',
      },
    },
  },
}

export const GroupedResults: Story = {
  name: 'Composition / Grouped Results',
  parameters: {
    docs: {
      description: {
        story:
          'Grouped results are useful when suggestions span multiple categories, such as tags and components.',
      },
    },
  },
  render: () => <GroupedAutocompleteTemplate mode="both" />,
}

export const SecondaryInputSurface: Story = {
  name: 'Composition / Secondary Surface',
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates autocomplete inside a lower-emphasis input surface for denser layouts.',
      },
    },
  },
  render: () => <ListAutocompleteTemplate mode="list" variant="secondary" />,
}

export const AsyncLoadingState: Story = {
  name: 'State / Async Loading',
  parameters: {
    docs: {
      description: {
        story:
          'An async search pattern with live status feedback, loading state, and empty/error handling.',
      },
    },
  },
  render: () => <AsyncLoadingTemplate />,
}
