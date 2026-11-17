# Form

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

`Form` renders a native `<form>` wired to TanStack Form state. Use `useAppForm` to manage values, validation, and submission.

## Form Structure

The recommended structure mirrors semantic HTML and accessibility best practices:

```tsx
<Form>
  <form.AppForm>
    <form.Errors />

    <Field.Set>
      <Field.Legend>Section title</Field.Legend>
      <form.AppField name="fieldName">
        {(field) => (
          <Field orientation="vertical">
            <field.Label />
            <field.Input />
            <field.Description>Helper text</field.Description>
            <field.Errors />
          </Field>
        )}
      </form.AppField>
    </Field.Set>

    <form.Actions>
      <form.Reset />
      <form.Submit />
    </form.Actions>
  </form.AppForm>
</Form>
```

## Component Reference

| Component | Renders | Purpose |
| --- | --- | --- |
| **`Form`** | `<form>` | Container. Stacks children with consistent gap. |
| **`form.AppForm`** | Context provider | Makes form state available to children. |
| **`form.Errors`** | Alert | Summarizes all form-level and field errors. Optional. |
| **`Field.Set`** | `<fieldset>` | Groups related fields (e.g., address, account info). Semantic grouping for assistive tech. |
| **`Field.Legend`** | `<legend>` | **Must be first child** of `Field.Set`. Screen readers announce it when focus enters the group. |
| **`form.AppField`** | (none) | Binds a single form value by name to a field. Passes `field` object to render prop. |
| **`Field`** | `<div>` (role="group") | Container for **one** field. Manages layout, spacing, and state. Supports `orientation` prop. |
| **`field.Label`** | `<label>` | Labels the input. Connects to input via `htmlFor`. |
| **`field.Input`** | `<input>` | Text input. Auto-connects to field state. |
| **`field.Description`** | `<p>` | Helper text below the input. |
| **`field.Errors`** | `<div>` | Displays field-level validation errors. |
| **`form.Actions`** | `<div>` | Horizontal container for action buttons (Submit, Reset). |
| **`form.Submit`** | `<button type="submit">` | Disables itself while submitting. |
| **`form.Reset`** | `<button type="reset">` | Restores form to `defaultValues`. |

## Field Orientation

Use the `orientation` prop on `Field` to control label placement:

- **`"vertical"`** (default): Label above control. Best for mobile and most forms.
- **`"horizontal"`**: Label and control side-by-side. Good for dense settings panels.
- **`"responsive"`**: Vertical on mobile, horizontal on desktop (uses container queries).

For horizontal fields, align all labels by setting `--ixia-field-label-width` on a shared ancestor (e.g., `Field.Set`):

```tsx
<Field.Set style={{ '--ixia-field-label-width': '7rem' }}>
  <Field orientation="horizontal">…</Field>
  <Field orientation="horizontal">…</Field>
</Field.Set>
```

## Import

```tsx
import { Form } from 'ixia-ui-react/form'
```

## Runtime exports

- `fieldContext`
- `formContext`
- `useAppForm`
- `useFieldContext`
- `useFormContext`
- `useTypedAppFormContext`
- `withFieldGroup`
- `withForm`
- `FormErrors`
- `FormReset`
- `FormSubmit`
- `FormActions`
- `FieldGroup`
- `FieldSet`
- `FieldLegend`
- `Form`

## Type exports

- `FormErrorsProps`
- `FormActionsProps`
- `FormProps`
- `FormResetProps`
- `FormSubmitProps`
- `FieldGroupProps`
- `FieldLegendProps`
- `FieldSetProps`

## Compound parts

### Form

- `Form.Actions`
- `Form.Errors`
- `Form.Reset`
- `Form.Submit`

## Optional peer dependencies

`@tanstack/react-form`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/form/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/form/form.stories.tsx)
- [Getting started](../guides/getting-started.md)
