# Field

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

`Field` lays out **one** form control with its label and supporting text. Render it inside `form.AppField`: the render prop's `field` object exposes the parts below, already bound to that field's value, validation state and `id`.

| Part | Renders | Purpose |
| --- | --- | --- |
| `field.Label` | `<label for={name}>` | Names the control. Defaults to the field name in title case. `showRequired` adds a visual `*`. |
| `field.Input`, `field.TextArea`, `field.Select`, `field.Slider`, … | The control | Reads and writes the field value. Text controls set `aria-invalid` once touched and invalid. |
| `field.Errors` | `<ul>` | Validation messages. Renders nothing while the field is valid. |
| `field.Description` | `<p>` | Help text shown under the control. |

**Orientation.** Three options control the layout:

- **`vertical`** (default): Stacks label, control, errors, and description vertically. Best for mobile and most forms.
- **`horizontal`**: Puts the **first child** in a leading column and everything else in a second column. Useful for dense settings panels. Put `field.Label` first for text inputs; put `field.Checkbox` first for checkboxes.
- **`responsive`**: Stacks vertically on mobile, switches to horizontal on larger screens via container queries.

To align all labels in horizontal mode, set `--ixia-field-label-width` on a shared ancestor (e.g., `form.Set`). Pick a width that fits your longest label, accounting for translations.

**Grouping.** Use `form.Group` to organize multiple related fields within a section. Wrap them together in `form.Set` (a `<fieldset>`) with `form.Legend` (the `<legend>`). See **Components/Form**.

## Import

```tsx
import { Field } from 'ixia-ui-react/field'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `orientation`: Places the label above the control (`vertical`), beside it (`horizontal`), or adapts based on screen size (`responsive`). In horizontal/responsive mode the first child takes a leading column and the remaining parts align in the second column. Options: `vertical`, `horizontal`, `responsive`. Storybook-reported default: `vertical`.

## Runtime exports

- `fieldVariants`
- `fieldLabelVariants`
- `fieldLegendVariants`
- `FieldContent`
- `FieldDescription`
- `FieldErrors`
- `FieldGroup`
- `FieldInput`
- `FieldLabel`
- `FieldLegend`
- `FieldSeparator`
- `FieldSet`
- `FieldSlider`
- `FieldSelect`
- `FieldTextArea`
- `FieldCheckbox`
- `FieldRadio`
- `FieldRadioGroup`
- `FieldSwitch`
- `FieldToggle`
- `FieldInputGroup`
- `FieldInputGroupInput`
- `Field`

## Type exports

- `FieldCheckboxProps`
- `FieldContentProps`
- `FieldDescriptionProps`
- `FieldErrorProps`
- `FieldGroupProps`
- `FieldInputGroupInputProps`
- `FieldInputGroupProps`
- `FieldInputProps`
- `FieldLabelProps`
- `FieldLegendProps`
- `FieldProps`
- `FieldRadioGroupProps`
- `FieldRadioProps`
- `FieldSelectProps`
- `FieldSeparatorProps`
- `FieldSetProps`
- `FieldSliderProps`
- `FieldSwitchProps`
- `FieldTextAreaProps`
- `FieldToggleProps`

## Compound parts

### Field

- `Field.Checkbox`
- `Field.Content`
- `Field.Description`
- `Field.Errors`
- `Field.Group`
- `Field.Input`
- `Field.InputGroup`
- `Field.InputGroupInput`
- `Field.Label`
- `Field.Legend`
- `Field.Radio`
- `Field.RadioGroup`
- `Field.Select`
- `Field.Separator`
- `Field.Set`
- `Field.Slider`
- `Field.Switch`
- `Field.TextArea`
- `Field.Toggle`

## Optional peer dependencies

`@tanstack/react-form`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/field/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/field/field.stories.tsx)
- [Getting started](../guides/getting-started.md)
