# Getting started

Ixia UI React is a React component library with styled, composable components. Some components wrap Base UI primitives, but Ixia's exports and composition can differ from Base UI's.

## Install

Install the library and its required React peers:

```sh
npm install ixia-ui-react react react-dom
```

Individual features have optional peer dependencies. For example, forms require `@tanstack/react-form`, and charts require `recharts`. Check the relevant component reference or the package README before using a feature.

## Load the styles

Import the stylesheet once from your app entry:

```ts
import 'ixia-ui-react/styles'
```

The published stylesheet contains Tailwind CSS 4 directives and scans the library's distributed files. Process it with a Tailwind CSS 4-compatible build pipeline; it is not a standalone precompiled CSS file. For example, a Vite app can use `@tailwindcss/vite` in its Vite configuration. See the [styling guide](styling.md).

## Import a component

Use named exports from component subpaths. There is no aggregate `ixia-ui-react` root import.

```tsx
import { Button } from 'ixia-ui-react/button'

export function Example() {
  return <Button>Continue</Button>
}
```

Use `ixia-ui-react/hooks` for shared hooks and `ixia-ui-react/utils` for shared utilities. Google Maps-specific hooks are exported from `ixia-ui-react/map/google`, not `ixia-ui-react/hooks`.

Continue with [component composition](composition.md), [forms](forms.md), or the [component index](../../../llms.txt).
