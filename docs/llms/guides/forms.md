# Forms

Ixia's form integration uses TanStack React Form. Install `@tanstack/react-form` alongside Ixia before using `ixia-ui-react/form` or `ixia-ui-react/field`. The validation example below also uses `zod`.

```sh
npm install @tanstack/react-form zod
```

`useAppForm` provides an `AppForm` context and `AppField` render prop. Inside that render prop, `field.Label`, `field.Input`, and `field.Errors` are bound to the field. Wrap each control in `Field`; use `Field.Set` and `Field.Legend` for semantic sections.

```tsx
import { Field } from 'ixia-ui-react/field'
import { Form, useAppForm } from 'ixia-ui-react/form'
import { z } from 'zod'

export function ContactForm() {
  const form = useAppForm({
    defaultValues: { email: '' },
    onSubmit: ({ value }) => {
      console.log(value.email)
    },
    validators: {
      onChange: z.object({ email: z.email('Enter a valid email address') }),
    },
  })

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault()
        void form.handleSubmit()
      }}
    >
      <form.AppForm>
        <Field.Set>
          <Field.Legend>Contact</Field.Legend>
          <form.AppField name="email">
            {(field) => (
              <Field>
                <field.Label />
                <field.Input autoComplete="email" type="email" />
                <field.Errors />
              </Field>
            )}
          </form.AppField>
        </Field.Set>
        <form.Submit>Save</form.Submit>
      </form.AppForm>
    </Form>
  )
}
```

`Field` supports `vertical`, `horizontal`, and `responsive` orientation. For more controls, validation, and grouping examples, see the [form](../components/form.md) and [field](../components/field.md) references and their Storybook sources.
