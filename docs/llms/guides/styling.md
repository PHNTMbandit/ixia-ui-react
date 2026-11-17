# Styling and themes

Import `ixia-ui-react/styles` once and process it with Tailwind CSS 4. The stylesheet imports Tailwind and `tw-animate-css`, defines Ixia's tokens and utilities, and includes `@source "."` so Tailwind scans the distributed library files.

The library stylesheet uses `@theme` to define semantic colors and other design tokens. Prefer existing component props such as `variant`, `tone`, and `size`, and use semantic utility classes or `className` when customization is needed. The available props vary by component; check its exported TypeScript types.

## Brand themes

Brand themes are optional CSS entry points. Import one after the base stylesheet and set its `data-brand` on the document or a subtree:

```ts
import 'ixia-ui-react/styles'
import 'ixia-ui-react/themes/mabel'
```

```html
<html data-brand="mabel"></html>
```

The other available brand themes are `hogarth`, `maculata`, `monadelpha`, `venus`, and `viridiflora`. Theme subpaths do not include a `.css` suffix.

## Light and dark

The shared `ThemeProvider` and `useTheme` exports from `ixia-ui-react/hooks` manage `light`, `dark`, and `system` values and set `data-theme` on the document element. The provider reads browser `localStorage`, so render it in a browser environment.

The `cn` utility from `ixia-ui-react/utils` combines and merges Tailwind classes.
