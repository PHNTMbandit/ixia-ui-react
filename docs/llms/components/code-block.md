# Code Block

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

CodeBlock manages selection, layout, copying, and downloading without depending on a syntax highlighter.

| Item fields | Display | Copy / download |
| --- | --- | --- |
| `code` only | Escaped source in `<pre><code>` | Original source |
| `code` + `content` | Custom React presentation | Original source |
| `content` only | Custom React presentation | Disabled |

Use unique item IDs. `defaultValue` and controlled `value` take an item ID; omit `defaultValue` to select the first item. Downloads use `name` as the file name, falling back to `snippet.txt` when it is omitted.

Use the same `code` string for a live preview and a highlighted view to export the same source from either. An empty `code: ''` is valid and keeps actions enabled. Explicit `content: null` suppresses the fallback.

Highlighting belongs to the consumer: pass any highlighter's React output as `content`. For highlighters returning HTML strings (such as Shiki), wrap trusted output in an element with `dangerouslySetInnerHTML`. CodeBlock itself never interprets strings as HTML.

**Migration:** move original source to `code`, and make `defaultValue` an item ID. Existing highlighted HTML strings must be wrapped explicitly in `content`; do not put generated HTML in `code`, because it is copied/downloaded verbatim.

## Import

```tsx
import { CodeBlock } from 'ixia-ui-react/code-block'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `defaultValue`: The ID of the initially selected item. Legacy item objects are also accepted.
- `items`: Items with a unique id, optional label, name, code (original source), custom content, and icon. Copy and download use code, never content.
- `onValueChange`: Called with the selected item ID.
- `value`: The ID of the selected item when using controlled state.

## Runtime exports

- `CodeBlockActions`
- `CodeBlockCopy`
- `CodeBlockDownload`
- `CodeBlockHeader`
- `CodeBlockName`
- `CodeBlockSelect`
- `CodeBlockTabs`
- `CodeBlockWindow`
- `CodeBlock`

## Type exports

- `CodeBlockProps`
- `CodeBlockActionsProps`
- `CodeBlockCopyProps`
- `CodeBlockDownloadProps`
- `CodeBlockHeaderGroupProps`
- `CodeBlockNameProps`
- `CodeBlockProviderState`
- `CodeBlockSelectProps`
- `CodeBlockTabsProps`
- `CodeBlockWindowProps`
- `CodeBlockValue`

## Compound parts

### CodeBlock

- `CodeBlock.Actions`
- `CodeBlock.Copy`
- `CodeBlock.Download`
- `CodeBlock.Header`
- `CodeBlock.Name`
- `CodeBlock.Select`
- `CodeBlock.Tabs`
- `CodeBlock.Window`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/code-block/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/code-block/code-block.stories.tsx)
- [Getting started](../guides/getting-started.md)
