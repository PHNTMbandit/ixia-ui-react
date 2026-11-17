# Component composition

Import each component from its own subpath. Ixia often exposes both a compound component such as `Dialog.Popup` and separate named exports such as `DialogPopup`. Use the Ixia reference for the exact parts: do not assume Base UI's part names or wrapper structure are identical.

## Button

```tsx
import { Button } from 'ixia-ui-react/button'

export function ContinueButton() {
  return (
    <Button tone="brand" variant="fill">
      Continue
    </Button>
  )
}
```

## Dialog

`Dialog.Trigger` accepts the trigger element as its child. `Dialog.Popup` creates the portal and backdrop; a separate Base UI portal is not needed.

```tsx
import { Button } from 'ixia-ui-react/button'
import { Dialog } from 'ixia-ui-react/dialog'

export function ExampleDialog() {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>Delete draft?</Dialog.Title>
          <Dialog.Description>This cannot be undone.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Close />
      </Dialog.Popup>
    </Dialog>
  )
}
```

## Select

The Ixia popup includes its portal and positioner. Supply a label for the trigger and place items inside `Select.List`.

```tsx
import { Select } from 'ixia-ui-react/select'

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Pear', value: 'pear' },
]

export function FruitSelect() {
  return (
    <Select defaultValue="apple" items={fruits}>
      <Select.Trigger aria-label="Fruit">
        <Select.Value placeholder="Select a fruit" />
      </Select.Trigger>
      <Select.Popup>
        <Select.List>
          {fruits.map((fruit) => (
            <Select.Item key={fruit.value} value={fruit.value}>
              {fruit.label}
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select>
  )
}
```

## Autocomplete

`Autocomplete.Content` creates the popup. `Empty`, `Status`, and `List` are siblings inside it, and `Collection` belongs inside `List`.

```tsx
import { Autocomplete } from 'ixia-ui-react/autocomplete'

const tags = ['Design', 'Engineering', 'Research']

export function TagSearch() {
  return (
    <Autocomplete items={tags}>
      <Autocomplete.InputGroup>
        <Autocomplete.InputGroupInput aria-label="Search tags" />
      </Autocomplete.InputGroup>
      <Autocomplete.Content>
        <Autocomplete.Empty>No matching tags</Autocomplete.Empty>
        <Autocomplete.List>
          <Autocomplete.Collection>
            {(tag: string) => (
              <Autocomplete.Item key={tag} value={tag}>
                {tag}
              </Autocomplete.Item>
            )}
          </Autocomplete.Collection>
        </Autocomplete.List>
      </Autocomplete.Content>
    </Autocomplete>
  )
}
```

For remote results, control `value` and `onValueChange`, set `filter={null}` when the server filters results, and show `Autocomplete.Status` while loading or reporting an error. If React's `useTransition` tracks the request, await the request inside the transition action so its pending state lasts until it settles. Handle failed requests and ignore obsolete responses.

For grouped or object items, consult the [autocomplete reference](../components/autocomplete.md) and its linked Storybook examples.
