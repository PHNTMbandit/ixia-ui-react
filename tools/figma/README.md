# Generate the ixia UI Figma library

This local exporter renders the actual Storybook stories in Chromium and packages a Figma
development plugin. No conversion service, Figma API token, or source-code upload is used.
The plugin has network access disabled.

## Generate

From the repository root:

```powershell
vp run figma
```

This builds the current Storybook, captures **every component story in light and dark**, exports the
[composable components](#composable-components) from `tools/figma/fixtures`, and builds the
plugin. It also captures all 168 Button tone/variant/size combinations in Default, Hover,
Pressed, and Disabled states, per theme. Allow several minutes for the full capture.

For a smaller first import:

```powershell
vp run build-storybook
vp run figma:export --family Button --family Input
vp run figma:build
```

Repeat `--family` for exact Storybook family names (without `Components/`). Omitting it exports
all families. Every story is captured in both themes so its colors can be bound to the
semantic variables.

To re-capture selected families while keeping other existing captures, add `--merge`:

```powershell
vp run figma:export --family Dialog --family Tooltip --merge
vp run figma:build
```

Merging replaces the selected families in the local export, not components in Figma.
Use a full export after changing shared tokens or styles to avoid retaining older captures.

To refresh only the component and story descriptions shown in the Figma documentation (for
example after editing Storybook `parameters.docs.description`), keep the existing captures:

```powershell
vp run build-storybook
vp run figma:export --docs-only
vp run figma:build
```

To re-export only the composable components after editing a fixture or the layout tooling:

```powershell
vp run build-storybook
vp run figma:parts
vp run figma:build
```

## Import into your file

1. Open **ixia UI - Design System** in **Figma Desktop**.
2. Choose **Plugins > Development > Import plugin from manifest** (also available from
   **Plugins > Development > Manage plugins**).
3. Select `tools\figma\generated\manifest.json` from this repository.
4. Run **Plugins > Development > ixia UI Sync**.
5. Click **Generate**. Every run builds the full library: cover, foundations, icons and every
   component page.
6. Every run is a fresh install: once the variables are updated, all existing pages in the file
   are deleted before the new pages are built, so the file never holds two copies of the library.
   Anything you keep in the file, including your own pages, is removed: duplicate it elsewhere
   first. Variables and text styles are updated by name, so variable bindings survive.
   Components are always recreated, so existing instances do not link to the new ones: in this
   file they lose their main component, and in files using the published library they stop
   receiving updates. Swap them to the new components.
7. Drag instances from **Assets**. Choose **Tone**, **Variant**, **Size** and **State**, edit
   text properties, and toggle or swap icons. Switch Light/Dark by changing the
   **Semantics: Colours** variable mode on the instance or a parent frame
   (**Layer > Appearance**).
8. Review the report and visuals before publishing the local components as a team library.

### Update after code changes

After changing the source, run `vp run figma` (or only the steps you need), then click
**Generate** again. There is no partial sync; each run is a full rebuild.

The library data is bundled in the plugin, gzipped to stay under Figma's 15 MB limit for plugin
code. **Load library.json…** imports a newer
`generated/library.json` without rebuilding or republishing the plugin.

### Variables and text styles

`tokens.mjs` reads `src/styles/input.css` and generates the variable collections used by the
design system:

| Collection                 | Modes        | Contents                                             |
| -------------------------- | ------------ | ---------------------------------------------------- |
| **Primitives: Colours**    | Default      | Palette (hidden from publishing)                     |
| **Semantics: Colours**     | Light / Dark | Tone and surface colors, aliased or resolved         |
| **Primitives: Spacing**    | Mode 1       | Fluid space values at each viewport extreme (hidden) |
| **Semantics: Spacing**     | Max / Min    | Space sizes and pairs, aliased to primitives         |
| **Primitives: Typography** | Mode 1       | Font families, weights and fluid sizes               |
| **Semantics: Typography**  | Max / Min    | `Font size/Step N`, aliased to primitives            |
| **Primitives: Border**     | Mode 1       | Radius and stroke pixel values (hidden)              |
| **Semantics: Border**      | Mode 1       | Radius and stroke widths, aliased to primitives      |

Semantic variables alias primitives where possible. Mixed or literal colors are resolved during
generation and must be regenerated to reflect later primitive changes. Variables have scopes and
**Web** code syntax (`var(--color-brand-default)`). Collections and variables are matched by name (case-insensitive),
so an existing file is updated in place. Collections the generator does not own (for example
**Grid**) are left untouched, as are collections an earlier version generated but this one no
longer does (for example **Utopia**); delete those in Figma if you no longer need them. If your
plan allows only one mode, the Light mode is used and the plugin reports it.

Text styles are named `Default/Step N`, `Prose/Step N` and `Strong/Step N`; font family, style
and size are bound to the typography variables. Generated layers use these styles. Component
padding, gaps and fixed widths and heights that equal a space size are bound to
**Semantics: Spacing**, so setting a frame's **Semantics: Typography** and **Semantics: Spacing**
modes to **Min** previews the smallest viewport.

### Naming

Components use readable names (**Button**, **Accordion item**, **Icon / Add**). Properties use
sentence case (**Tone**, **Leading icon**, **Show leading icon**), and the property table on
each page lists the matching code prop.

The plugin icon is in `assets/`. `icon.png` is shown in the plugin window. Figma manifests have
no icon field, so development plugins always show Figma's generic icon in the Plugins menu. If
you publish the plugin (privately to your organization or to the Community), upload
`generated/icon-128.png` as the icon in Figma's publish dialog.
Publishing for use in other files requires the appropriate Figma plan and permissions.

Install **Noto Sans JP** and **Montserrat** locally for matching editable text. Missing fonts
or weights are reported in the plugin, with Inter / nearest-weight approximations explicitly
identified.

### Publish privately

1. In Figma, open **Plugins > Development > New plugin**, create an empty plugin and copy the id
   from its `manifest.json`.
2. Save the id in `tools/figma/plugin-id.txt` and run `vp run figma:build`.
3. Re-import `generated/manifest.json`, then choose **Publish**. Select your organization as
   the audience (requires a Figma Organization or Enterprise plan), and upload
   `generated/icon-128.png` as the icon.
4. To ship new library data without republishing, share `generated/library.json` and use
   **Load library.json…**.

## Document structure

A full import creates these pages at the top of the file:

| Page                                             | Contents                                                                      |
| ------------------------------------------------ | ----------------------------------------------------------------------------- |
| **Cover**                                        | Title, library stats, version. Also set as the file thumbnail.                |
| **Getting started**                              | How to use components, themes, interactive buttons, updates, and known gaps.  |
| **Colors**, **Typography**, **Spacing & radius** | Foundations, with swatches bound to the generated color variables.            |
| **↳ _Component_** (one per component)            | Description, components, properties, and every Storybook story in Light/Dark. |

Related Storybook families share a page (for example `Button` and `Button/Interactive`). Each
page has one root frame set as a prototype starting point, so **Present** walks through the
documentation. On the Button page, the **Try it** section contains instances whose hover and
press states work in presentation mode.

## What is editable

- Every component family becomes a native component set whose variant properties are the real
  code props (for example **tone**, **variant**, **size**). Families without a hand-written
  fixture are generated automatically from their Storybook **Playground** controls (or first
  story), with a **State=Hover** variant and a hover reaction when the root is interactive.
  There is no **Theme** or **Example** property: appearance follows the variable mode.
- Storybook stories are shown under **Examples** on each page as documentation frames (not
  components), rendered once with bound variables and displayed in Light and Dark mode panels.
- Button/Interactive is a separate, comprehensive native component set with Auto Layout,
  editable label properties, and **While hovering** / **While pressing** prototype reactions.
  Disabled states do not react.
- Other straightforward non-wrapping flex layouts become Auto Layout. Grid, wrapping, and
  complex positioned layouts retain their captured geometry in editable nested frames.
- HTML text stays text. SVG icons/charts become vectors. Images and canvas content are bitmaps.
- CSS colors, spacing, text sizes, radii, and font families are bound to the variables
  described in [Variables and text styles](#variables-and-text-styles), so switching the
  **Semantics: Colours** mode switches the theme. Colors that match no token are reported per
  family in `report.json`.
- Text uses the generated text styles. Fluid CSS values are resolved at a fixed **1440 x 1000**
  browser viewport (the fluid maximum); the result is not a responsive React layout.

## Composable components

The components designers place in real screens come from hidden fixture stories in
[`fixtures`](./fixtures) (`Figma/<Name>`, tagged `!dev`, `!autodocs` and `!test`). Each fixture
renders every variant combination of one component. `parts.mjs` captures them in both themes,
binds colors to the semantic variables and infers Auto Layout. The plugin then builds
component sets named after the code component on the component pages. Dependencies are built
before consumers across all pages, including preferred slot components. Numeric `order` controls
presentation, not dependency correctness. Missing references, duplicate names and cycles fail
validation before the importer modifies the document.

Fixtures cover these families:

| Area                       | Families                                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Core                       | Button, Accordion, Alert, Tabs, Select, Dialog, Field, Toggle Group                                            |
| Navigation and commands    | Breadcrumb, Kbd, Menu, Context Menu, Navigation Menu                                                           |
| Overlays and disclosure    | Alert Dialog, Drawer, Collapsible, Popover, Preview Card, Tooltip                                              |
| Controls                   | Autocomplete, Combobox, Avatar, Checkbox, Radio Group, Input OTP, Slider, Slider Group, Color Picker, Calendar |
| Containers and composition | Bento Box, Code Block, Dropzone, Form, Input Group, Meter, Nav Bar, Profile, Progress, Sidebar, Site Header    |

For example, Breadcrumb's `items` slot contains real Link, Item and Separator instances;
Ellipsis is another preferred segment. Menu has reusable items, shortcuts and a popup, while
Color Picker has reusable controls, rows, groups and palette swatches. Nested collections retain
their own slots. Text and icon-only decorations use text properties and instance swaps rather
than unnecessary structural variants.

Non-compound families can still be generated automatically from Storybook controls. A compound
family discovered through `Object.assign(Root, { Item, … })` **must have a fixture**: the exporter
rejects flattened fallback assets. Failed component captures do not overwrite the previous
`library.json`. The React API is unchanged; fixtures only describe how parts map to Figma.
The explicit exception is Map: Google Maps/DeckGL canvases and providers remain documentation
only, with a reported limitation and no misleading flattened map Asset.

### Swaps, slots and properties

| Code                                                                       | Figma property                                       |
| -------------------------------------------------------------------------- | ---------------------------------------------------- |
| Text children (`title`, `label`, `description`, `value`)                   | **Text** property                                    |
| Optional parts (subtitle, description, close button)                       | **Boolean** visibility property                      |
| Icon props and icon children (`leadingIcon`, `trailingIcon`, `expandIcon`) | **Boolean** `show…` + **Instance swap** (icons only) |
| `children` regions and compound parts (`Accordion.Panel`, `Dialog` body)   | **Slot** with default content                        |
| Variable-count groups (`items`, `tabs`, `actions`)                         | **Slot** restricted to the expected component        |
| cva variants and interaction states                                        | **Variant** properties                               |

Use an instance swap for one atomic element of the same kind, such as an icon, a chevron or a
logo. Use a slot for a region that can hold zero, one or many layers of any kind, and for
variable-length collections of compound parts (Breadcrumb segments, Menu items, Kbd keys) so
designers add, remove, reorder and replace them without detaching. Every icon has
a visibility toggle and a swap restricted to the **Icon / …** components on the **Icons**
page. Slots ship with sample content, work when empty and keep the Auto Layout direction, gap
and padding of the code. Names are consistent across the library: `leadingIcon`,
`trailingIcon`, `icon`, `content`, `actions`, `items`.

A part nested outside a slot (the Kbd Group in a Menu Item's shortcut) is an **exposed
instance**, so its properties appear on the parent instance. Each instance placed by a fixture
keeps its own variant, text, visibility, swap and slot overrides, including those of instances
nested inside it (each Menu Item in the popup has its own shortcut keys).

Hover, press and open states are wired as prototype reactions where the fixture declares
`interactions` (for example Button, Tab, Select and Input hover, and Accordion item open/close).

### Writing a fixture

A fixture story sets `parameters.figma` (`FigmaSpec` in [`fixtures/figma.tsx`](./fixtures/figma.tsx))
and renders `<Matrix>`, annotating elements with these helpers:

| Helper                     | Effect                                                              |
| -------------------------- | ------------------------------------------------------------------- |
| `target(index)`            | Marks the element captured for combination `index`.                 |
| `text(name)`               | Binds the element's text to a text property.                        |
| `show(name, visible)`      | Adds a boolean visibility property (default `visible`).             |
| `swap(name, visible)`      | Adds `show<Name>` plus an icon instance swap on an `<Icon>`.        |
| `slot(name)`               | Turns the element into a slot; describe it in `spec.slots`.         |
| `part(component, variant)` | Replaces the element with an instance of another fixture component. |

Spec fields:

- `cva` reads variant axes and defaults from a `cva()` definition. `axes` adds or overrides axes,
  `states` adds a **State** axis and `defaults` overrides the default variant.
- `interactive` captures states through real pointer interaction (`hover`, `press`, `focus`).
- `annotate` adds `data-figma-*` attributes (and optional inline `style`) to elements the fixture
  cannot reach, such as the check mark rendered inside `Select.Item` or the Menu popup element.
  Use `{ ignore: '' }` to skip an element.
- `adopt` is a selector for a positioned sibling that draws the target's background, such as the
  Base UI tab indicator. It becomes an absolutely positioned **Indicator** layer under the content.
- `properties` and `usage` document the code each Figma property maps to on the component page.

Property names have one type per asset, across every variant. For example, pair `slot('content')`
with `text('body')`, not `text('content')`; mixed text/slot names fail validation. Nested part
instances have independent property namespaces.

Give a fixture root an explicit `style={{ width }}` when the component should stretch with its
container. The root is then fixed width and its text and slots fill it, while components without
a width hug their content.

For a compound family, add one fixture per subcomponent, then a root fixture whose collection is a
`display: contents` element marked `slot('items')` holding `part()` elements. Give the slot
`only` and `preferred` components in `spec.slots`. Move CSS margins on slot children into wrapper
padding so each child stays a direct instance.

## Limits and explicit reports

This is a code-derived library, not a lossless React-to-Figma compiler. Advanced CSS and
component nesting may need visual refinement. CSS gradients are embedded as bitmap fills
(not editable gradient stops). CSS URL background images and generated pseudo-element content
are reported as unsupported. Borders and standard box shadows become
native strokes and effects; multi-colored borders use the first visible edge color and are reported.
Google Maps imagery is omitted rather than copying map tiles. Maps needing keys/providers may
fail capture. Dialogs, alert dialogs, drawers, popovers, menus, context menus, navigation menus,
toasts, tooltips, preview cards, selects, comboboxes, and autocompletes also get an **Open** example captured through their first
enabled trigger. Multi-trigger showcases only open the first trigger; the remaining states must
be supplied as dedicated stories. Other controls use the states rendered by their stories.
Story play functions are disabled during export.

For composable components, Auto Layout is inferred from flex CSS and, for block and grid
containers, from the rendered geometry. An auto margin (`ml-auto`, read from the computed style
because resolved styles report pixels) makes the undecorated sibling before it fill, and
positioned `::before`/`::after` backgrounds (such as Menu item highlights) become absolute layers.
Unusual layouts may need a manual tweak in Figma.
Native **Slot** properties need a Figma version that supports slots. If a required slot cannot
be created, bound or filled, the import fails explicitly instead of producing a flattened asset.
Very large variant sets (the
Button sets have 672 variants each) can make the import take several minutes.

Figma API limits for composable components:

- A slot's preferred components apply to the whole slot, so it cannot enforce order or
  alternation (a Separator between Breadcrumb Links). `only` restricts the kinds of instance.
- Nested instance properties are exposed (`isExposedInstance`), not bound to the parent's own
  properties, and slot contents are not exposed because they are edited in place.
- Figma forbids directly nested native slots in the same component. The outermost region is
  a native slot; inner regions remain editable frames within it, preserving their layout and
  content without detaching. Their preferred-component and child-count restrictions cannot
  be enforced; affected assets and the import report say so. Component instances inside a slot
  retain their own independent native slots.
- Text, visibility and swap properties inside arbitrary slot content are edited on those layers
  or their subcomponent instances, not exposed as unstable properties on the containing asset.
- Icons hard-coded in a component (the Breadcrumb chevron, Menu check marks) have no swap.
- Parts that need a wrapper in code (Menu Group Label in `Menu.Group`, Radio Item in
  `Menu.RadioGroup`) sit flat in the slot; the component description says so.
- Parent-dependent parts are captured inside their real React context before becoming assets.
  Grid and positioned layouts may retain fixed geometry even when their children are instances.
- Providers, collection iterators and context-only exports have no independent visual asset.
  Their root assets present a documented composition of the visual parts.
- Calendar dates, virtualized lists, sliders and color calculations are design samples, not live
  React behavior. Changing a Figma variant does not run application callbacks or recalculate data.
- Avatar/Image currently captures the source component's loading placeholder. The exporter does
  not repair production component behavior.

`tools\figma\generated\report.json` lists exported families, counts, unsupported features, and
failed captures. Any failed capture makes the export command fail, so the one-command workflow
will not silently build an incomplete library. Two cases are reported as warnings instead: Map
stories that cannot render without live Google Maps (Map is documentation only), and showcase
stories whose first trigger opens nothing (they have no **Open** example). After inspecting the
report, you can explicitly
run `vp run figma:build` to package successful story captures. Component capture failures are
stricter: fix the failing fixture and rerun `figma:parts`; its previous complete library is retained.

The plugin also reports missing fonts and import errors. The cover, Getting started, foundation
and icon pages are built first, then the components and their pages. If an import stops, the
partial results remain for inspection; click **Generate** again for a fresh install.

Generated files are ignored by Git and excluded from the published React package.
The plugin's bundled data stays local until you run it in your chosen Figma document.

## Validate

```powershell
vp run figma:test
vp check
```

After a full `figma:parts` capture, also import the actual generated library into the test host:

```powershell
$env:FIGMA_GENERATED_TEST = '1'
vp run figma:test
Remove-Item Env:\FIGMA_GENERATED_TEST
```

This checks compound-family fixture coverage, dependencies, nested slot/property construction
and import errors. It is opt-in because generated captures are not committed.

Run `vp run figma:build` after changing the plugin or regenerating the captures. Figma's actual
rendering and prototype behavior must be checked in Figma Desktop; browser tests do not exercise
Figma's plugin host.

In a disposable Figma file, insert Breadcrumb and a nested collection such as Menu. Add, remove,
reorder and replace slot instances; edit nested labels and icon swaps; change states and
Light/Dark, spacing and typography modes. Confirm that instances stay linked, content overrides
survive, and Auto Layout updates. Native slot API probing alone does not validate generated assets.
