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
    { id: '11', title: 'Goodfellas', year: 1990 },
    { id: '12', title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { id: '13', title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { id: '14', title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { id: '15', title: 'Forrest Gump', year: 1994 },
    { id: '16', title: 'The Silence of the Lambs', year: 1991 },
    { id: '17', title: "Schindler's List", year: 1993 },
    { id: '18', title: 'Saving Private Ryan', year: 1998 },
    { id: '19', title: 'The Green Mile', year: 1999 },
    { id: '20', title: 'The Departed', year: 2006 },
    { id: '21', title: 'The Prestige', year: 2006 },
    { id: '22', title: 'Gladiator', year: 2000 },
    { id: '23', title: 'The Lion King', year: 1994 },
    { id: '24', title: 'Spirited Away', year: 2001 },
    { id: '25', title: 'Princess Mononoke', year: 1997 },
    { id: '26', title: 'Your Name', year: 2016 },
    { id: '27', title: 'The Grand Budapest Hotel', year: 2014 },
    { id: '28', title: 'The Truman Show', year: 1998 },
    { id: '29', title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { id: '30', title: 'Jurassic Park', year: 1993 },
    { id: '31', title: 'Back to the Future', year: 1985 },
    { id: '32', title: 'Jaws', year: 1975 },
    { id: '33', title: 'Alien', year: 1979 },
    { id: '34', title: 'Aliens', year: 1986 },
    { id: '35', title: 'Blade Runner', year: 1982 },
    { id: '36', title: 'Blade Runner 2049', year: 2017 },
    { id: '37', title: 'Casablanca', year: 1942 },
    { id: '38', title: 'Rear Window', year: 1954 },
    { id: '39', title: '12 Angry Men', year: 1957 },
    { id: '40', title: 'Psycho', year: 1960 },
    { id: '41', title: '2001: A Space Odyssey', year: 1968 },
    { id: '42', title: 'The Good, the Bad and the Ugly', year: 1966 },
    { id: '43', title: 'Apocalypse Now', year: 1979 },
    { id: '44', title: 'Star Wars', year: 1977 },
    { id: '45', title: 'The Empire Strikes Back', year: 1980 },
    { id: '46', title: 'Return of the Jedi', year: 1983 },
    { id: '47', title: 'Raiders of the Lost Ark', year: 1981 },
    { id: '48', title: 'Terminator 2: Judgment Day', year: 1991 },
    { id: '49', title: 'The Shining', year: 1980 },
    { id: '50', title: 'The Thing', year: 1982 },
    { id: '51', title: 'The Princess Bride', year: 1987 },
    { id: '52', title: 'Die Hard', year: 1988 },
    { id: '53', title: 'The Big Lebowski', year: 1998 },
    { id: '54', title: 'Heat', year: 1995 },
    { id: '55', title: 'Se7en', year: 1995 },
    { id: '56', title: 'No Country for Old Men', year: 2007 },
    { id: '57', title: 'There Will Be Blood', year: 2007 },
    { id: '58', title: 'The Social Network', year: 2010 },
    { id: '59', title: 'Mad Max: Fury Road', year: 2015 },
    { id: '60', title: 'Arrival', year: 2016 },
    { id: '61', title: 'Get Out', year: 2017 },
    { id: '62', title: 'Coco', year: 2017 },
    { id: '63', title: 'Spider-Man: Into the Spider-Verse', year: 2018 },
    { id: '64', title: 'Knives Out', year: 2019 },
    { id: '65', title: 'Dune', year: 2021 },
    { id: '66', title: 'Everything Everywhere All at Once', year: 2022 },
    { id: '67', title: 'Oppenheimer', year: 2023 },
    { id: '68', title: 'Poor Things', year: 2023 },
    { id: '69', title: 'Dune: Part Two', year: 2024 },
    { id: '70', title: 'The Godfather Part II', year: 1974 },
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
          <Autocomplete.List>
            <Autocomplete.Collection>
              {(tag: TagItem) => (
                <Autocomplete.Item key={tag.id} value={tag}>
                  {tag.label}
                </Autocomplete.Item>
              )}
            </Autocomplete.Collection>
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    </div>
  ),
  GroupedAutocompleteTemplate = ({ mode = 'both' }: { mode?: AutocompleteMode }) => (
    <div className="w-[420px]">
      <Autocomplete
        itemToStringValue={(tag) => tag.label}
        items={groupedTags}
        mode={mode}
        openOnInputClick
      >
        <Autocomplete.InputGroup variant="primary">
          <Autocomplete.InputGroupInput placeholder="Search grouped tags" />
          <Autocomplete.InputGroupAddon>
            <TagIcon weight="bold" />
          </Autocomplete.InputGroupAddon>
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          <Autocomplete.Empty>No grouped results found</Autocomplete.Empty>
          <Autocomplete.List>
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
          </Autocomplete.List>
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

    startTransition(async () => {
      const result = await searchMovies(searchValue, contains)
      if (cancelled) return

      startTransition(() => {
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
        <>
          <SpinnerGapIcon aria-hidden className="size-sm animate-spin" weight="bold" />
          Searching…
        </>
      )
    }

    if (displayError) {
      return displayError
    }

    if (results.length === 0) {
      return null
    }

    return `${results.length} result${results.length === 1 ? '' : 's'} found`
  }

  return (
    <div className="w-[420px]">
      <Autocomplete
        filter={null}
        itemToStringValue={(movie) => movie.title}
        items={results}
        mode="list"
        onValueChange={setSearchValue}
        value={searchValue}
      >
        <Autocomplete.InputGroup variant="primary">
          <Autocomplete.InputGroupInput placeholder="Search top movies" />
          <Autocomplete.InputGroupAddon>
            <MagnifyingGlassIcon weight="bold" />
          </Autocomplete.InputGroupAddon>
        </Autocomplete.InputGroup>
        <Autocomplete.Content>
          {!isPending && !displayError && hasQuery && results.length === 0 && (
            <Autocomplete.Empty>No matching movies</Autocomplete.Empty>
          )}
          <Autocomplete.Status>{getStatus()}</Autocomplete.Status>
          <Autocomplete.List>
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
          </Autocomplete.List>
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
        defaultValue: { summary: 'true' },
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
        defaultValue: { summary: 'false' },
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
          'Autocomplete improves text entry by surfacing matching suggestions in real time. Its input group and grid search support primary, secondary, ghost, and outline surface variants. Typed items infer callback item types for both flat and grouped lists. Place Status and Empty directly inside Content, alongside an explicit List containing items, collections, or groups. Content provides the shared popup padding; List scrolls independently of feedback. GridContent continues to provide its own list.',
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
    Empty: Autocomplete.Empty,
    GridContent: Autocomplete.GridContent,
    GridItem: Autocomplete.GridItem,
    Group: Autocomplete.Group,
    GroupLabel: Autocomplete.GroupLabel,
    InputGroup: Autocomplete.InputGroup,
    InputGroupAddon: Autocomplete.InputGroupAddon,
    InputGroupInput: Autocomplete.InputGroupInput,
    Item: Autocomplete.Item,
    List: Autocomplete.List,
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
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByPlaceholderText('Search tags or components'),
      page = within(canvasElement.ownerDocument.body)
    await userEvent.click(input)
    const list = await page.findByRole('listbox'),
      option = page.getByRole('option', { name: 'feature' }),
      optionStyle = getComputedStyle(option),
      padding = [
        optionStyle.paddingTop,
        optionStyle.paddingRight,
        optionStyle.paddingBottom,
        optionStyle.paddingLeft,
      ],
      minHeight = optionStyle.minHeight,
      optionLeft = option.getBoundingClientRect().left

    await userEvent.type(input, 'no_such_tag')
    const empty = await page.findByText('No matches found'),
      emptyStyle = getComputedStyle(empty)
    await expect(list).not.toBeVisible()
    await expect(empty.parentElement).toBe(list.parentElement)
    await expect([
      emptyStyle.paddingTop,
      emptyStyle.paddingRight,
      emptyStyle.paddingBottom,
      emptyStyle.paddingLeft,
    ]).toEqual(padding)
    await expect(empty.getBoundingClientRect().left).toBeCloseTo(optionLeft, 0)
    await expect(emptyStyle.minHeight).toBe(minHeight)

    await userEvent.clear(input)
    await userEvent.keyboard('{ArrowDown}{Enter}')
    await expect(input).toHaveValue('feature')
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
          'Search a catalog of movies by title or year with live status feedback, loading state, and empty/error handling.',
      },
    },
  },
  render: () => <AsyncLoadingTemplate />,
}
