import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'

import { build } from 'vite-plus'

import { buildVariables } from './tokens.mjs'

const variables = buildVariables(
    await readFile(new URL('../../styles/input.css', import.meta.url), 'utf8'),
  ),
  text = {
    fontFamily: 'Noto Sans JP',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 400,
    height: 24,
    kind: 'text',
    name: 'Label',
    opacity: 1,
    text: 'Save',
    width: 40,
    x: 8,
    y: 8,
  },
  layer = {
    backgroundBitmap:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
    children: [text],
    fill: { a: 1, b: 0.8, g: 0.3, r: 0 },
    height: 40,
    kind: 'frame',
    layout: {
      align: 'CENTER',
      direction: 'HORIZONTAL',
      gap: 8,
      justify: 'CENTER',
      padding: [8, 8, 8, 8],
    },
    name: 'button',
    opacity: 1,
    radii: [8, 8, 8, 8],
    width: 56,
    x: 0,
    y: 0,
  }
function icon(svgKey) {
  return {
    color: layer.fill,
    colorToken: { name: 'color/brand/default' },
    height: 16,
    kind: 'svg',
    name: 'svg',
    opacity: 1,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"/>',
    svgKey,
    width: 16,
    x: 12,
    y: 10,
  }
}
function partFrame(name, width, height) {
  return {
    children: [],
    height,
    kind: 'frame',
    name,
    opacity: 1,
    radii: [8, 8, 8, 8],
    width,
    x: 0,
    y: 0,
  }
}
function buttonLayer(label) {
  return {
    ...partFrame('button', 80, 36),
    auto: {
      align: 'CENTER',
      gap: 6,
      justify: 'CENTER',
      mode: 'HORIZONTAL',
      padding: [0, 12, 0, 12],
    },
    children: [
      { ...icon('add-key'), figma: { show: 'showLeadingIcon=false', swap: 'leadingIcon' } },
      { ...text, figma: { text: 'label' }, sizing: { h: 'HUG', v: 'HUG' }, text: label },
    ],
    fill: layer.fill,
    fillToken: { name: 'color/brand/default' },
    sizing: { h: 'HUG', v: 'FIXED' },
  }
}
const library = {
    docs: {
      Button: { description: 'Buttons trigger actions.', examples: { Brand: 'Primary action.' } },
    },
    failures: [{ error: 'Network tiles', id: 'components-map--markers', theme: 'dark' }],
    generatedAt: '2026-01-01T00:00:00Z',
    parts: {
      components: [
        {
          axes: { tone: ['brand'] },
          component: 'Alert',
          defaults: { tone: 'brand' },
          description: 'Alerts highlight important messages.',
          group: 'Alert',
          interactions: [],
          order: 20,
          properties: { action: 'action' },
          slots: { action: { description: 'Buttons or links.', preferred: ['Button'] } },
          usage: '<Alert action={<Button>Go</Button>} />',
          variants: [
            {
              layer: {
                ...partFrame('alert', 200, 60),
                auto: { gap: 8, mode: 'VERTICAL', padding: [12, 12, 12, 12] },
                children: [
                  { ...partFrame('Indicator', 200, 3), absolute: true, underlay: true, y: 57 },
                  {
                    ...partFrame('Action', 80, 36),
                    auto: { gap: 8, mode: 'HORIZONTAL', padding: [0, 0, 0, 0] },
                    children: [
                      {
                        ...buttonLayer('Go'),
                        figma: { part: 'Button', variant: '{"State":"Default"}' },
                      },
                    ],
                    figma: { slot: 'action' },
                    sizing: { h: 'FILL', v: 'HUG' },
                  },
                ],
              },
              props: { tone: 'brand' },
            },
          ],
        },
        {
          axes: {},
          component: 'Dialog',
          defaults: {},
          description: 'Dialogs ask for a decision.',
          group: 'Dialog',
          interactions: [],
          order: 30,
          properties: { actions: 'footer' },
          slots: { actions: { description: 'Dialog actions.', preferred: ['Button'] } },
          usage: '<Dialog />',
          variants: [
            {
              layer: {
                ...partFrame('dialog', 320, 120),
                auto: { gap: 8, mode: 'VERTICAL', padding: [16, 16, 16, 16] },
                children: [
                  {
                    ...partFrame('Actions', 120, 36),
                    auto: { gap: 8, mode: 'HORIZONTAL', padding: [0, 0, 0, 0] },
                    children: [
                      {
                        ...buttonLayer('Close'),
                        figma: { part: 'Button', variant: '{"State":"Default"}' },
                      },
                    ],
                    figma: { slot: 'actions' },
                    sizing: { h: 'FILL', v: 'HUG' },
                  },
                ],
              },
              props: {},
            },
          ],
        },
        {
          axes: { tone: ['brand', 'error'], State: ['Default', 'Hover', 'Pressed'] },
          component: 'Button',
          defaults: { State: 'Default', tone: 'brand' },
          description: 'Buttons trigger actions.',
          group: 'Button',
          interactions: [
            { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
            { from: { State: 'Hover' }, to: { State: 'Pressed' }, trigger: 'ON_PRESS' },
          ],
          order: 10,
          properties: { label: 'children', leadingIcon: 'leadingIcon' },
          slots: {},
          usage: '<Button>Save</Button>',
          variants: ['error', 'brand'].flatMap((tone) =>
            ['Pressed', 'Hover', 'Default'].map((State) => ({
              layer: buttonLayer('Save'),
              props: { tone, State },
            })),
          ),
        },
      ],
      icons: [{ layer: { ...icon('add-key'), x: 0, y: 0 }, name: 'add', svgKey: 'add-key' }],
    },
    samples: [
      {
        family: 'Button',
        id: 'components-button--brand',
        layer: { ...layer, fillToken: { name: 'color/brand/default' } },
        name: 'Brand',
        state: 'Default',
      },
      {
        family: 'Badge',
        id: 'components-badge--status',
        layer: buttonLayer('New'),
        name: 'Status badges',
        state: 'Default',
      },
    ],
    tokens: [
      {
        name: 'color/brand/default',
        type: 'COLOR',
        values: { dark: layer.fill, light: layer.fill },
      },
      { name: 'text/base', type: 'FLOAT', values: { dark: 16, light: 16 } },
      { name: 'spacing/sm', type: 'FLOAT', values: { dark: 12, light: 12 } },
      { name: 'radius/full', type: 'FLOAT', values: { dark: 9999, light: 9999 } },
    ],
    variables,
    version: 3,
    viewport: { height: 1000, width: 1440 },
    warnings: [],
  },
  bundle = await build({
    build: {
      lib: {
        entry: fileURLToPath(new URL('plugin.ts', import.meta.url)),
        formats: ['iife'],
        name: 'TestPlugin',
      },
      minify: false,
      target: 'es2020',
      write: false,
    },
    configFile: false,
    define: {
      CARTYX_LIBRARY: JSON.stringify(library),
      CARTYX_PACKAGE: JSON.stringify({ name: '@test/ui', version: '1.2.3' }),
      CARTYX_UI: JSON.stringify(await readFile(new URL('ui.html', import.meta.url), 'utf8')),
    },
    logLevel: 'silent',
  }),
  bundles = Array.isArray(bundle) ? bundle : [bundle],
  { code } = bundles.flatMap((result) => result.output).find((output) => output.type === 'chunk'),
  triggerKeys = { ON_CLICK: ['type'], ON_HOVER: ['type'], ON_PRESS: ['type'] },
  actionKeys = new Set(['type', 'destinationId', 'navigation', 'transition', 'resetScrollPosition'])

function shared(target) {
  const data = {}
  target.setSharedPluginData = (namespace, key, value) => {
    assert.ok(/^[a-z0-9]{3,}$/i.test(namespace))
    data[`${namespace}:${key}`] = value
  }
  target.getSharedPluginData = (namespace, key) => data[`${namespace}:${key}`] || ''
  return target
}

function host({
  availableFonts = [{ family: 'Noto Sans JP', style: 'Regular' }],
  modes = true,
  rejectTransitions = false,
  state,
} = {}) {
  let nextId = 0
  const nodes = [],
    messages = [],
    // State persists between hosts to simulate re-running the plugin on the same file.
    document = state || { collections: [], pages: [], styles: [], variables: [] }
  function createNode(type) {
    const node = {
      id: String(++nextId) + type,
      type,
      name: '',
      children: [],
      width: 100,
      height: 100,
      layoutMode: 'NONE',
      layoutPositioning: 'AUTO',
      constraints: { horizontal: 'MIN', vertical: 'MIN' },
      fills: [],
      strokes: [],
      effects: [],
      strokeWeight: 0,
      strokeAlign: 'INSIDE',
      strokeTopWeight: 0,
      strokeRightWeight: 0,
      strokeBottomWeight: 0,
      strokeLeftWeight: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomRightRadius: 0,
      bottomLeftRadius: 0,
      appendChild(child) {
        if (child.parent) {
          child.parent.children.splice(child.parent.children.indexOf(child), 1)
        }
        this.children.push(child)
        child.parent = this
      },
      resize(width, height) {
        assert.ok(Number.isFinite(width) && width > 0)
        assert.ok(Number.isFinite(height) && height > 0)
        this.width = width
        this.height = height
        // Figma fixes both Auto Layout axes when a frame is resized.
        if (this.layoutMode !== 'NONE') {
          this.primaryAxisSizingMode = 'FIXED'
          this.counterAxisSizingMode = 'FIXED'
        }
      },
      resizeWithoutConstraints(width, height) {
        this.resize(width, height)
      },
      remove() {
        if (this.parent) {
          this.parent.children.splice(this.parent.children.indexOf(this), 1)
        }
        this.removed = true
      },
      findOne(predicate) {
        for (const child of this.children) {
          if (predicate(child)) {
            return child
          }
          const found = child.findOne(predicate)
          if (found) {
            return found
          }
        }
        return null
      },
      setPluginData() {
        throw new Error('Cannot set private plugin data in a plugin without an ID.')
      },
      setBoundVariable(field, variable) {
        this.boundVariables = { ...this.boundVariables, [field]: variable.id }
      },
      key: `key-${nextId}`,
      findAll(predicate) {
        return this.children.flatMap((child) => [
          ...(predicate(child) ? [child] : []),
          ...child.findAll(predicate),
        ])
      },
      addComponentProperty(name, propertyType, defaultValue, options) {
        // Sets and standalone components accept properties; variants inside a set do not.
        assert.ok(
          this.type === 'COMPONENT_SET' ||
            (this.type === 'COMPONENT' && this.parent?.type !== 'COMPONENT_SET'),
          `${this.type} ${this.name} cannot have component properties`,
        )
        assert.ok(!this.properties?.[name], `duplicate property ${name}`)
        const id = `${name}#${this.id}`
        this.properties = {
          ...this.properties,
          [name]: { defaultValue, id, options, type: propertyType },
        }
        return id
      },
      editComponentProperty(id, { name, defaultValue, preferredValues }) {
        const [key, entry] = Object.entries(this.properties).find(([, value]) => value.id === id)
        delete this.properties[key]
        const next = name ?? key,
          renamedId = `${next}#${this.id}`
        this.properties[next] = {
          ...entry,
          defaultValue: defaultValue ?? entry.defaultValue,
          id: renamedId,
          options: preferredValues ? { ...entry.options, preferredValues } : entry.options,
        }
        return renamedId
      },
      deleteComponentProperty(id) {
        const [key] = Object.entries(this.properties).find(([, value]) => value.id === id)
        delete this.properties[key]
      },
      get componentPropertyDefinitions() {
        return Object.fromEntries(
          Object.values(this.properties || {}).map(({ id, type: propertyType, defaultValue }) => [
            id,
            { defaultValue, type: propertyType },
          ]),
        )
      },
      createInstance() {
        assert.equal(this.type, 'COMPONENT')
        const instance = createNode('INSTANCE')
        instance.mainComponent = this
        const owner = this.parent?.type === 'COMPONENT_SET' ? this.parent : this,
          definitions = owner.componentPropertyDefinitions || {}
        instance.componentProperties = Object.fromEntries(
          Object.entries(definitions).map(([key, { type: propertyType, defaultValue }]) => [
            key,
            { type: propertyType, value: defaultValue },
          ]),
        )
        instance.setProperties = (values) => {
          for (const key of Object.keys(values)) {
            assert.ok(key in definitions, key)
          }
          instance.overrides = { ...instance.overrides, ...values }
        }
        return instance
      },
      async getMainComponentAsync() {
        return this.mainComponent
      },
      // Figma clones into the original's parent.
      clone() {
        const copy = createNode(this.type)
        for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(this))) {
          if (
            'value' in descriptor &&
            typeof descriptor.value !== 'function' &&
            !['id', 'children', 'parent', 'key'].includes(key)
          ) {
            copy[key] = descriptor.value
          }
        }
        copy.x = this.x
        copy.y = this.y
        for (const child of this.children) {
          copy.appendChild(child.clone())
        }
        this.parent?.appendChild(copy)
        return copy
      },
      setExplicitVariableModeForCollection(collection, modeId) {
        assert.ok(collection.modes.some((mode) => mode.modeId === modeId))
        this.explicitMode = modeId
      },
      async loadAsync() {},
      async setTextStyleIdAsync(id) {
        this.textStyleId = id
      },
      async setReactionsAsync(reactions) {
        // Mirrors Figma's runtime validation, which is stricter than the published typings.
        for (const reaction of reactions) {
          const allowed = triggerKeys[reaction.trigger.type]
          if (!allowed) {
            throw new Error(`Unsupported trigger ${reaction.trigger.type}`)
          }
          for (const key of Object.keys(reaction.trigger)) {
            if (!allowed.includes(key)) {
              throw new Error(`Unrecognized key: "${key}"`)
            }
          }
          for (const action of reaction.actions) {
            for (const key of Object.keys(action)) {
              if (!actionKeys.has(key)) {
                throw new Error(`Unrecognized key: "${key}"`)
              }
            }
          }
          if (rejectTransitions && reaction.actions.some((action) => action.transition)) {
            throw new Error('Transition rejected')
          }
        }
        this.reactions = reactions
      },
    }
    // Figma rejects undefined/NaN positions with this exact error.
    for (const axis of ['x', 'y']) {
      let value = 0
      Object.defineProperty(node, axis, {
        enumerable: true,
        get: () => value,
        set(next) {
          if (!Number.isFinite(next)) {
            throw new Error(
              `in set_${axis}: Property "${axis}" failed validation: Required value missing`,
            )
          }
          value = next
        },
      })
    }
    shared(node)
    nodes.push(node)
    return node
  }
  const root = {
    appendChild(page) {
      root.insertChild(document.pages.length, page)
    },
    get children() {
      return document.pages
    },
    findAllWithCriteria({ types }) {
      assert.ok(document.allPagesLoaded, 'call figma.loadAllPagesAsync() first')
      return document.pages.flatMap((page) =>
        page.findAll((node) => types.includes(node.type) && !node.removed),
      )
    },
    insertChild(index, page) {
      const current = document.pages.indexOf(page)
      if (current !== -1) {
        document.pages.splice(current, 1)
      }
      document.pages.splice(index, 0, page)
    },
  }
  function createVariable(name, collection, type) {
    const variable = {
      hiddenFromPublishing: false,
      id: `variable-${document.variables.length}`,
      name,
      remove() {
        document.variables.splice(document.variables.indexOf(this), 1)
      },
      resolvedType: type,
      scopes: ['ALL_SCOPES'],
      setValueForMode(mode, value) {
        assert.ok(collection.modes.some((candidate) => candidate.modeId === mode))
        this.values[mode] = value
      },
      setVariableCodeSyntax(platform, value) {
        assert.equal(platform, 'WEB')
        this.codeSyntax = { WEB: value }
      },
      values: {},
      variableCollectionId: collection.id,
    }
    document.variables.push(variable)
    return variable
  }
  const figma = {
    base64Decode: (value) => new Uint8Array(Buffer.from(value, 'base64')),
    combineAsVariants(components, parent) {
      const set = createNode('COMPONENT_SET')
      parent.appendChild(set)
      for (const component of components) {
        // Unnamed variants would become a meaningless "Property 1" in Figma.
        assert.ok(
          component.name.split(', ').every((pair) => /^[^=]+=[^=]+$/.test(pair)),
          `variant name "${component.name}" is not "Property=Value"`,
        )
        set.appendChild(component)
        component.variantProperties = Object.fromEntries(
          component.name.split(', ').map((pair) => pair.split('=')),
        )
      }
      return set
    },
    createComponent: () => createNode('COMPONENT'),
    createEllipse: () => createNode('ELLIPSE'),
    createFrame: () => createNode('FRAME'),
    createImage(bytes) {
      assert.deepEqual([...bytes.subarray(0, 4)], [137, 80, 78, 71])
      return { hash: 'test-image' }
    },
    createNodeFromSvg() {
      const svg = createNode('FRAME')
      svg.appendChild(createNode('VECTOR'))
      return svg
    },
    createPage() {
      const page = createNode('PAGE')
      page.remove = () => {
        assert.notEqual(document.currentPage, page, 'cannot remove the current page')
        document.pages.splice(document.pages.indexOf(page), 1)
        page.removed = true
      }
      document.pages.push(page)
      return page
    },
    createText: () => createNode('TEXT'),
    createTextStyle() {
      const style = shared({
        id: `style-${document.styles.length}`,
        name: '',
        remove() {},
        setBoundVariable(field, variable) {
          this.boundVariables = { ...this.boundVariables, [field]: variable.id }
        },
      })
      style.remove = () => document.styles.splice(document.styles.indexOf(style), 1)
      document.styles.push(style)
      return style
    },
    get currentPage() {
      return document.currentPage
    },
    flatten(shapes, parent) {
      const vector = createNode('VECTOR')
      parent.appendChild(vector)
      for (const shape of shapes) {
        shape.remove()
      }
      return vector
    },
    async getLocalTextStylesAsync() {
      return [...document.styles]
    },
    async getNodeByIdAsync(id) {
      return nodes.find((node) => node.id === id) || null
    },
    async listAvailableFontsAsync() {
      return availableFonts.map((fontName) => ({ fontName }))
    },
    async loadAllPagesAsync() {
      document.allPagesLoaded = true
    },
    async loadFontAsync() {},
    notify() {},
    root,
    async setCurrentPageAsync(page) {
      document.currentPage = page
    },
    async setFileThumbnailNodeAsync(node) {
      this.thumbnail = node
    },
    showUI() {},
    ui: { postMessage: (message) => messages.push(message) },
    variables: {
      createVariable,
      createVariableAlias: (variable) => ({ id: variable.id, type: 'VARIABLE_ALIAS' }),
      createVariableCollection(name) {
        const collection = shared({
          addMode(modeName) {
            if (!modes) {
              throw new Error('Limited to 1 modes only')
            }
            const modeId = `${name}-mode-${this.modes.length}`
            this.modes.push({ modeId, name: modeName })
            return modeId
          },
          defaultModeId: `${name}-mode-0`,
          id: `collection-${document.collections.length}-${name}`,
          modes: [{ modeId: `${name}-mode-0`, name: 'Mode 1' }],
          name,
          remove() {
            document.collections.splice(document.collections.indexOf(this), 1)
          },
          renameMode(modeId, modeName) {
            this.modes.find((mode) => mode.modeId === modeId).name = modeName
          },
        })
        document.collections.push(collection)
        return collection
      },
      async getLocalVariableCollectionsAsync() {
        return [...document.collections]
      },
      async getLocalVariablesAsync() {
        return [...document.variables]
      },
      setBoundVariableForPaint(paint, field, variable) {
        assert.equal(field, 'color')
        return { ...paint, boundVariables: { color: { id: variable.id, type: 'VARIABLE_ALIAS' } } }
      },
    },
    viewport: { scrollAndZoomIntoView() {} },
  }
  runInNewContext(code, { figma, setTimeout })
  return { document, figma, messages, nodes }
}

// Objects created inside the plugin sandbox have a different realm, so compare plain copies.
const plain = (value) => structuredClone(value),
  componentNamed = (nodes, name) =>
    nodes.find((node) => ['COMPONENT', 'COMPONENT_SET'].includes(node.type) && node.name === name),
  theme = (document) =>
    document.collections.find((collection) => collection.name === 'Semantics: Colours'),
  ancestor = (node, predicate) => {
    for (let current = node.parent; current; current = current.parent) {
      if (predicate(current)) {
        return current
      }
    }
    return null
  }

const ancestorPage = (node) => ancestor(node, (parent) => parent.type === 'PAGE')

await test('builds composable Button components with properties, icon swaps and interactions', async () => {
  const { figma, nodes, messages, document } = host()
  await figma.ui.onmessage({
    replace: true,
    themes: ['light', 'dark'],
    type: 'import',
  })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const names = document.pages.map((page) => page.name)
  assert.ok(names.indexOf('↳ Icons') < names.indexOf('↳ Button'))
  const page = document.pages.find((candidate) => candidate.name === '↳ Button')
  assert.deepEqual(
    page.children.map((child) => child.name),
    ['Cartyx UI · Button'],
  )
  assert.equal(page.flowStartingPoints[0].nodeId, page.children[0].id)
  for (const frame of nodes.filter(
    (node) => node.type === 'FRAME' && node.layoutMode === 'VERTICAL' && !node.removed,
  )) {
    if (!ancestor(frame, (node) => node.type === 'COMPONENT')) {
      assert.equal(frame.primaryAxisSizingMode, 'AUTO', `${frame.name} must grow with its content`)
    }
  }
  const onPage = (node) => ancestor(node, (parent) => parent === page),
    sets = nodes.filter((node) => node.type === 'COMPONENT_SET' && onPage(node))
  assert.deepEqual(
    sets.map((set) => set.name),
    ['Button'],
  )
  // Stories are documentation frames bound to variables: built once, shown in both modes.
  const examples = nodes.filter(
    (node) => node.name === 'Brand' && node.parent?.name.endsWith(' mode') && onPage(node),
  )
  assert.equal(examples.length, 2)
  assert.ok(examples.every((example) => !ancestor(example, (node) => node.type === 'COMPONENT')))
  assert.deepEqual(
    examples.map((example) => ancestor(example, (node) => node.explicitMode)?.explicitMode),
    theme(document).modes.map((mode) => mode.modeId),
  )
  for (const example of examples) {
    assert.equal(example.fills[0].boundVariables.color.type, 'VARIABLE_ALIAS')
  }
  assert.ok(!nodes.some((node) => node.name?.includes('Theme=') || node.name?.includes('Example=')))
  const [button] = sets
  assert.equal(
    ancestor(button, (node) => node.type === 'PAGE'),
    page,
  )
  assert.equal(button.properties.Label.defaultValue, 'Save')
  assert.equal(button.properties['Show leading icon'].defaultValue, false)
  const addIcon = nodes.find((node) => node.name === 'Icon / Add')
  assert.equal(
    ancestor(addIcon, (node) => node.type === 'PAGE'),
    document.pages.find((candidate) => candidate.name === '↳ Icons'),
  )
  assert.equal(button.properties['Leading icon'].type, 'INSTANCE_SWAP')
  assert.equal(button.properties['Leading icon'].defaultValue, addIcon.id)
  assert.deepEqual(plain(button.properties['Leading icon'].options.preferredValues), [
    { key: addIcon.key, type: 'COMPONENT' },
  ])
  const components = button.children
  assert.equal(components.length, 6)
  // The default variant comes first so Figma uses it when inserting the component.
  assert.equal(components[0].name, 'Tone=Brand, State=Default')
  const byName = (name) => components.find((component) => component.name === name)
  for (const component of components) {
    assert.equal(component.layoutMode, 'HORIZONTAL')
    assert.equal(component.primaryAxisSizingMode, 'AUTO')
    assert.equal(component.fills[0].boundVariables.color.type, 'VARIABLE_ALIAS')
    const label = component.findOne((child) => child.type === 'TEXT')
    assert.equal(label.componentPropertyReferences.characters, `Label#${button.id}`)
    const leading = component.findOne((child) => child.type === 'INSTANCE')
    assert.equal(leading.mainComponent, addIcon)
    assert.equal(leading.visible, false)
    assert.deepEqual(plain(leading.componentPropertyReferences), {
      mainComponent: `Leading icon#${button.id}`,
      visible: `Show leading icon#${button.id}`,
    })
    const expected = component.name.includes('State=Default')
      ? ['ON_HOVER', 'Hover']
      : component.name.includes('State=Hover')
        ? ['ON_PRESS', 'Pressed']
        : undefined
    if (!expected) {
      assert.equal(component.reactions, undefined)
      continue
    }
    const [reaction] = component.reactions
    assert.equal(reaction.trigger.type, expected[0])
    assert.equal(reaction.actions[0].navigation, 'CHANGE_TO')
    assert.equal(reaction.actions[0].transition.type, 'SMART_ANIMATE')
    assert.equal(
      reaction.actions[0].destinationId,
      byName(component.name.replace(/State=\w+/, `State=${expected[1]}`)).id,
    )
  }
  const positions = new Set(components.map((component) => `${component.x},${component.y}`))
  assert.equal(positions.size, components.length)
  const usage = nodes.filter(
    (node) => node.type === 'INSTANCE' && node.mainComponent === components[0] && onPage(node),
  )
  assert.equal(usage.length, 2)
  const modes = usage.map(
    (instance) => ancestor(instance, (node) => node.explicitMode)?.explicitMode,
  )
  assert.deepEqual(
    modes,
    theme(document).modes.map((mode) => mode.modeId),
  )
  assert.ok(nodes.some((node) => node.type === 'TEXT' && node.characters === 'Instance swap'))
  assert.deepEqual(
    theme(document).modes.map((mode) => mode.name),
    ['Light', 'Dark'],
  )
  assert.equal(
    document.variables.length,
    variables.collections.reduce((sum, collection) => sum + collection.variables.length, 0),
  )
})

await test('builds dependencies first and fills slots with nested component instances', async () => {
  const { figma, nodes, messages, document } = host()
  await figma.ui.onmessage({ replace: true, themes: ['light', 'dark'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const names = document.pages.map((page) => page.name)
  assert.ok(names.indexOf('↳ Alert') < names.indexOf('↳ Button'))
  const button = componentNamed(nodes, 'Button'),
    alert = componentNamed(nodes, 'Alert')
  assert.equal(alert.properties.Action.type, 'SLOT')
  assert.deepEqual(plain(alert.properties.Action.options.preferredValues), [
    { key: button.key, type: 'COMPONENT_SET' },
  ])
  assert.equal(alert.properties.Action.options.description, 'Buttons or links.')
  const [component] = alert.children,
    // A positioned underline spanning the bottom edge stretches with the component.
    indicator = component.findOne((node) => node.name === 'Indicator')
  assert.equal(indicator.layoutPositioning, 'ABSOLUTE')
  assert.deepEqual(plain(indicator.constraints), { horizontal: 'STRETCH', vertical: 'MAX' })
  const slot = component.findOne((node) => node.name === 'Action')
  assert.equal(slot.componentPropertyReferences.slotContentId, `Action#${alert.id}`)
  const [nested] = slot.children
  assert.equal(nested.type, 'INSTANCE')
  assert.equal(nested.mainComponent, button.children[0])
  assert.deepEqual(plain(nested.overrides), { [`Label#${button.id}`]: 'Go' })
  assert.ok(!messages.at(-1).warnings.some((warning) => warning.includes('not built yet')))
})

await test('builds parts without variant properties as a single component, not a variant set', async () => {
  const { figma, nodes, messages } = host()
  await figma.ui.onmessage({ replace: true, themes: ['light', 'dark'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const dialog = componentNamed(nodes, 'Dialog'),
    button = componentNamed(nodes, 'Button')
  assert.equal(dialog.type, 'COMPONENT')
  assert.notEqual(dialog.parent.type, 'COMPONENT_SET')
  assert.equal(dialog.description, 'Dialogs ask for a decision.')
  assert.equal(dialog.properties.Actions.type, 'SLOT')
  const slot = dialog.findOne((node) => node.name === 'Actions'),
    [nested] = slot.children
  assert.equal(slot.componentPropertyReferences.slotContentId, `Actions#${dialog.id}`)
  assert.equal(nested.mainComponent, button.children[0])
  // The default instance shown on the docs page comes from the standalone component.
  assert.ok(nodes.some((node) => node.type === 'INSTANCE' && node.mainComponent === dialog))
})

await test('full import creates cover, overview, foundations, and ordered component pages', async () => {
  const { figma, messages, document, nodes } = host()
  await figma.ui.onmessage({ replace: true, themes: ['light', 'dark'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  assert.deepEqual(
    document.pages.map((page) => page.name),
    [
      'Cover',
      'Getting started',
      '---',
      'FOUNDATIONS',
      '↳ Colors',
      '↳ Typography',
      '↳ Spacing & radius',
      '↳ Icons',
      '---',
      'COMPONENTS',
      '↳ Alert',
      '↳ Badge',
      '↳ Button',
      '↳ Dialog',
    ],
  )
  assert.equal(figma.thumbnail.name, 'Cartyx UI · Cover')
  assert.equal(figma.currentPage.name, 'Cover')
  const swatches = nodes.filter(
      (node) =>
        node.fills[0]?.boundVariables &&
        ancestor(node, (parent) => parent.name === 'Cartyx UI · Colors'),
    ),
    semantic = variables.collections.find((collection) => collection.name === 'Semantics: Colours'),
    palette = variables.collections.find((collection) => collection.name === 'Primitives: Colours')
  assert.equal(swatches.length, semantic.variables.length * 2 + palette.variables.length)
  assert.notEqual(swatches[0].explicitMode, swatches[1].explicitMode)
  assert.ok(
    nodes.some(
      (node) =>
        node.type === 'TEXT' &&
        node.textStyleId &&
        node.characters === 'Maps your team can rely on',
    ),
  )
  const gaps = nodes.find((node) => node.name === 'Known gaps')
  assert.ok(gaps.findOne((child) => child.characters?.includes('components-map--markers (dark)')))
})

await test('re-running fully rebuilds pages and updates variables and text styles by name', async () => {
  const first = host(),
    notes = first.figma.createPage()
  notes.name = 'Notes'
  const legacy = first.figma.createPage()
  legacy.name = 'Cartyx UI / 2026-01-01T00-00-00.000Z'
  legacy.appendChild(first.figma.createComponent())
  first.figma.variables.createVariableCollection('Cartyx UI / 2026-01-01T00-00-00.000Z/light')
  first.figma.variables.createVariableCollection('Cartyx UI')
  const grid = first.figma.variables.createVariableCollection('Grid'),
    oldPrimitives = first.figma.variables.createVariableCollection('primitives: colours'),
    oldBlue = first.figma.variables.createVariable('Blue/700', oldPrimitives, 'COLOR')
  first.figma.createTextStyle().name = 'Cartyx UI/Noto Sans JP/16 Regular · 24lh'
  const custom = first.figma.createPage()
  custom.name = '↳ Button'
  const mine = first.figma.createFrame()
  mine.name = 'My exploration'
  custom.appendChild(mine)
  await first.figma.ui.onmessage({ replace: true, themes: ['light', 'dark'], type: 'import' })
  assert.equal(first.messages.at(-1).type, 'done', first.messages.at(-1).message)
  const styles = first.document.styles.length,
    variableCount = first.document.variables.length,
    button = first.nodes.find((node) => node.type === 'COMPONENT_SET' && node.name === 'Button'),
    [variant] = button.children,
    addIcon = first.nodes.find((node) => node.name === 'Icon / Add'),
    // An instance in the user's own design.
    usage = variant.createInstance()
  notes.appendChild(usage)
  assert.deepEqual(
    first.document.styles.map((style) => style.name).filter((name) => name.startsWith('Default/')),
    variables.textStyles.map((style) => style.name).filter((name) => name.startsWith('Default/')),
  )
  const step = first.document.styles.find((style) => style.name === 'Strong/Step 0')
  assert.deepEqual(Object.keys(step.boundVariables).toSorted(), [
    'fontFamily',
    'fontSize',
    'fontStyle',
  ])
  assert.deepEqual(plain(step.lineHeight), { unit: 'PERCENT', value: 120 })
  assert.equal(oldBlue.name, 'blue/700', 'existing variables are renamed, not duplicated')
  assert.equal(oldPrimitives.name, 'Primitives: Colours')
  assert.equal(oldBlue.codeSyntax.WEB, 'var(--blue-700)')
  const brand = first.document.variables.find((variable) => variable.name === 'Brand/Brand Default')
  assert.deepEqual(
    Object.values(brand.values).map((value) => value.type),
    ['VARIABLE_ALIAS', 'VARIABLE_ALIAS'],
  )
  assert.ok(first.document.variables.some((variable) => variable.hiddenFromPublishing))
  assert.ok(button.getSharedPluginData('cartyxui', 'component'))

  const second = host({ state: first.document })
  await second.figma.ui.onmessage({ replace: true, themes: ['light', 'dark'], type: 'import' })
  assert.equal(second.messages.at(-1).type, 'done', second.messages.at(-1).message)
  const names = second.document.pages.map((page) => page.name)
  assert.equal(names.filter((name) => name === 'Cover').length, 1)
  assert.equal(names.filter((name) => name === '---').length, 2)
  assert.ok(names.includes('Notes'))
  assert.ok(!names.some((name) => name.startsWith('Cartyx UI / ')))
  assert.ok(second.document.pages.includes(custom), 'pages with user content are kept')
  assert.equal(names.filter((name) => name === '↳ Button').length, 2)
  assert.equal(second.document.styles.length, styles)
  assert.equal(styles, variables.textStyles.length, 'legacy text styles are removed')
  assert.equal(second.document.variables.length, variableCount)
  assert.deepEqual(
    second.document.collections.map((collection) => collection.name).toSorted(),
    [...variables.collections.map((collection) => collection.name), 'Grid'].toSorted((a, b) =>
      a.localeCompare(b),
    ),
  )
  assert.ok(second.document.collections.includes(grid))
  // Every run builds fresh components; the previous generated pages are removed.
  const live = (node) => second.document.pages.includes(ancestorPage(node))
  assert.ok(!live(button) && !live(addIcon))
  assert.ok(second.document.pages.includes(notes), 'user designs are never deleted')
  assert.equal(ancestorPage(usage), notes)
  const rebuilt = second.nodes.filter(
    (node) => node.type === 'COMPONENT_SET' && node.name === 'Button' && live(node),
  )
  assert.equal(rebuilt.length, 1, 'components are built fresh, not reused')
  assert.notEqual(rebuilt[0], button)
  assert.doesNotMatch(second.messages.at(-1).message, /in place/)
})

await test('loads a library.json and always runs a full build', async () => {
  const { figma, messages, document } = host()
  await figma.ui.onmessage({ library, type: 'load' })
  assert.equal(messages.at(-1).type, 'ready')
  assert.equal(messages.at(-1).source, 'file')
  await figma.ui.onmessage({
    replace: true,
    sections: ['Badge'],
    themes: ['light', 'dark'],
    type: 'import',
  })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const names = new Set(document.pages.map((page) => page.name))
  for (const name of ['Cover', '↳ Colors', '↳ Icons', '↳ Button', '↳ Badge']) {
    assert.ok(names.has(name), name)
  }
  await figma.ui.onmessage({ type: 'scan' })
  assert.equal(messages.at(-1).type, 'done', 'scan is no longer supported')
  await figma.ui.onmessage({ library: { version: 1 }, type: 'load' })
  assert.equal(messages.at(-1).type, 'error')
})

await test('keeps a single mode when the Figma plan does not allow more', async () => {
  const { figma, messages } = host({ modes: false })
  await figma.ui.onmessage({ themes: ['light', 'dark'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  assert.ok(messages.at(-1).warnings.some((warning) => warning.includes('variable modes')))
})

await test('keeps interactions when Figma rejects animated transitions', async () => {
  const { figma, messages, nodes } = host({ rejectTransitions: true })
  await figma.ui.onmessage({ themes: ['light'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const hover = nodes.find(
    (node) => node.type === 'COMPONENT' && node.name === 'Tone=Brand, State=Hover',
  )
  assert.equal(hover.reactions[0].actions[0].transition, null)
})

await test('validates import selections before touching the document', async () => {
  const { figma, nodes, messages } = host()
  await figma.ui.onmessage({ themes: [], type: 'import' })
  assert.equal(nodes.length, 0)
  assert.equal(messages.at(-1).type, 'error')
  await figma.ui.onmessage({ themes: ['sepia'], type: 'import' })
  assert.equal(nodes.length, 0)
  assert.equal(messages.at(-1).type, 'error')
})

await test('respects theme selection and explicitly reports font substitutions', async () => {
  const { figma, nodes, messages, document } = host({
    availableFonts: [{ family: 'Inter', style: 'Regular' }],
  })
  await figma.ui.onmessage({ themes: ['dark'], type: 'import' })
  // Variables always get both modes; the theme selection only affects the previews.
  assert.equal(theme(document).modes.length, 2)
  assert.ok(!nodes.some((node) => node.name === 'Light mode'))
  // Story examples are not components; the full library still builds every composable part.
  assert.ok(nodes.some((node) => node.type === 'COMPONENT' && node.name.includes('State=Hover')))
  assert.ok(messages.at(-1).warnings.some((warning) => warning.includes('Missing font')))
})

await test('reports host failures instead of claiming a successful import', async () => {
  const { figma, messages } = host({ availableFonts: [] })
  await figma.ui.onmessage({ themes: ['light'], type: 'import' })
  assert.equal(messages.at(-1).type, 'error')
  assert.match(messages.at(-1).message, /No fonts are available/)
})

await test('families without composable components get an examples-only page', async () => {
  const { figma, messages, document, nodes } = host()
  await figma.ui.onmessage({ themes: ['light', 'dark'], type: 'import' })
  assert.equal(messages.at(-1).type, 'done', messages.at(-1).message)
  const badge = document.pages.find((page) => page.name === '↳ Badge')
  assert.ok(badge)
  assert.ok(
    !nodes.some(
      (node) =>
        ['COMPONENT', 'COMPONENT_SET'].includes(node.type) &&
        ancestor(node, (parent) => parent === badge),
    ),
  )
  const examples = nodes.filter(
    (node) => node.name === 'Status badges' && node.parent?.name.endsWith(' mode'),
  )
  assert.equal(examples.length, 2)
  // Example icons reuse the icon registry when it exists; without it they stay vectors.
  assert.ok(nodes.some((node) => node.name === 'Examples'))
})
