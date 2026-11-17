# Select

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

The Select component presents a controlled or uncontrolled choice list inside a popup. It supports single and multiple selection, grouped options, trigger variants (`primary`, `secondary`, `ghost`, `outline`), trigger sizes (`small`, `medium`, `large`), custom trigger/value composition, and scrollable lists for longer datasets. Trigger border and outline colors transition smoothly, with a brand outline only while the popup is open. Invalid triggers retain their error outline. The popup has no border or focus outline.

## Import

```tsx
import { Select } from 'ixia-ui-react/select'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `defaultValue`: Initial selected value or values for uncontrolled selects.
- `multiple`: Allows selecting more than one option from the list.
- `size`: Controls the trigger height and spacing. Options: `small`, `medium`, `large`. Storybook-reported default: `medium`.
- `variant`: Controls the trigger visual style. Options: `primary`, `secondary`, `ghost`, `outline`. Storybook-reported default: `primary`.

## Runtime exports

- `SelectItem`
- `SelectList`
- `SelectIcon`
- `SelectPopup`
- `SelectTrigger`
- `SelectValue`
- `SelectGroup`
- `SelectGroupLabel`
- `SelectDescription`
- `SelectTitle`
- `Select`

## Type exports

- `SelectIconProps`
- `SelectItemProps`
- `SelectListProps`
- `SelectPopupProps`
- `SelectProps`
- `SelectTriggerProps`
- `SelectValueProps`
- `SelectGroupProps`
- `SelectGroupLabelProps`
- `SelectDescriptionProps`
- `SelectTitleProps`

## Compound parts

### Select

- `Select.Description`
- `Select.Group`
- `Select.GroupLabel`
- `Select.Icon`
- `Select.Item`
- `Select.List`
- `Select.Popup`
- `Select.Title`
- `Select.Trigger`
- `Select.Value`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/select/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/select/select.stories.tsx)
- [Getting started](../guides/getting-started.md)
