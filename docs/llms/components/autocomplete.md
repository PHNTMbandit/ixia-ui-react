# Autocomplete

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Autocomplete improves text entry by surfacing matching suggestions in real time. Its input group and grid search support primary, secondary, ghost, and outline surface variants. Typed items infer callback item types for both flat and grouped lists. Place Status and Empty directly inside Content, alongside an explicit List containing items, collections, or groups. Content provides the shared popup padding; List scrolls independently of feedback. GridContent continues to provide its own list.

## Import

```tsx
import { Autocomplete } from 'ixia-ui-react/autocomplete'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `autoHighlight`: Controls whether the first or matching item is automatically highlighted. Options: `true`, `false`, `always`. Storybook-reported default: `false`.
- `highlightItemOnHover`: Highlights items as the pointer moves over them. Storybook-reported default: `true`.
- `keepHighlight`: Keeps the current highlight active as the input changes. Storybook-reported default: `false`.
- `mode`: Controls how completion behaves: list popup, inline text, both, or disabled. Options: `list`, `both`, `inline`, `none`. Storybook-reported default: `list`.
- `openOnInputClick`: Opens the suggestions popup when the input is clicked. Storybook-reported default: `false`.

## Runtime exports

- `AutocompleteCollection`
- `AutocompleteContent`
- `AutocompleteEmpty`
- `AutocompleteGridContent`
- `AutocompleteGridItem`
- `AutocompleteGroup`
- `AutocompleteGroupLabel`
- `AutocompleteInputGroup`
- `AutocompleteInputGroupAddon`
- `AutocompleteInputGroupInput`
- `AutocompleteItem`
- `AutocompleteList`
- `AutocompleteRow`
- `AutocompleteStatus`
- `AutocompleteTrigger`
- `Autocomplete`

## Type exports

- `AutocompleteCollectionProps`
- `AutocompleteContentProps`
- `AutocompleteEmptyProps`
- `AutocompleteGridContentProps`
- `AutocompleteGridItemProps`
- `AutocompleteGroupLabelProps`
- `AutocompleteGroupProps`
- `AutocompleteInputGroupAddonProps`
- `AutocompleteInputGroupInputProps`
- `AutocompleteInputGroupProps`
- `AutocompleteItemProps`
- `AutocompleteListProps`
- `AutocompleteProps`
- `AutocompleteRowProps`
- `AutocompleteStatusProps`
- `AutocompleteTriggerProps`

## Compound parts

### Autocomplete

- `Autocomplete.Collection`
- `Autocomplete.Content`
- `Autocomplete.Empty`
- `Autocomplete.GridContent`
- `Autocomplete.GridItem`
- `Autocomplete.Group`
- `Autocomplete.GroupLabel`
- `Autocomplete.InputGroup`
- `Autocomplete.InputGroupAddon`
- `Autocomplete.InputGroupInput`
- `Autocomplete.Item`
- `Autocomplete.List`
- `Autocomplete.Row`
- `Autocomplete.Status`
- `Autocomplete.Trigger`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/autocomplete/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/autocomplete/autocomplete.stories.tsx)
- [Getting started](../guides/getting-started.md)
