# Copy Button

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

Copies a string to the clipboard and renders temporary success feedback through a children render function. The render function receives `true` after a successful copy and `false` otherwise. Copying uses the browser Clipboard API, which requires a secure context (such as HTTPS or localhost) and may be denied by browser permissions. Button props, including `aria-label`, are forwarded to the underlying Button.

## Import

```tsx
import { CopyButton } from 'ixia-ui-react/copy-button'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `children`: Render function that receives whether the copy succeeded recently and returns the button content.
- `content`: Text to write to the clipboard when the button is activated.
- `timeout`: How long copied feedback remains visible, in milliseconds. Storybook-reported default: `2000`.

## Runtime exports

- `CopyButton`

## Type exports

- `CopyButtonProps`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/copy-button/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/copy-button/copy-button.stories.tsx)
- [Getting started](../guides/getting-started.md)
