# Table Of Contents

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

A table of contents that lists the headings of a long article and highlights the section currently in view. Each `TableOfContents.Item` targets an element by `targetId` and scrolls to it on click. Items set `data-in-view="true"` while any part of their target is visible; `visibilityThreshold` (0 to 1) sets the fraction that must be visible. Use `depth` (1 to 5) to indent nested sections. The shared indicator inside `TableOfContents.List` tracks the first and last visible items.

## Import

```tsx
import { TableOfContents } from 'ixia-ui-react/table-of-contents'
```

## Runtime exports

- `TableOfContents`
- `TableOfContentsItem`
- `TableOfContentsTitle`
- `TableOfContentsList`

## Type exports

- `TableOfContentsProps`
- `TableOfContentsItemProps`
- `TableOfContensIndicatorProps`
- `TableOfContentsTitleProps`
- `TableOfContentsListProps`

## Compound parts

### TableOfContents

- `TableOfContents.Item`
- `TableOfContents.List`
- `TableOfContents.Title`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/table-of-contents/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/table-of-contents/table-of-contents.stories.tsx)
- [Getting started](../guides/getting-started.md)
