import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ts from '@typescript/typescript6'

const root = fileURLToPath(new URL('../', import.meta.url))
const componentsRoot = path.join(root, 'src', 'components')
const outputRoot = path.join(root, 'docs', 'llms', 'components')
const repository = 'https://github.com/PHNTMbandit/ixia-ui-react/blob/main'
const fallbackDescriptions = {
  hooks: 'Shared hooks for media queries and application color themes.',
  map: 'Provider-independent map controls and layer state for composing map interfaces.',
  utils: 'Shared utilities for merging class names and formatting dates.',
}

function parseSource(file) {
  return ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true)
}

function propertyName(name) {
  return name && (ts.isIdentifier(name) || ts.isStringLiteral(name)) ? name.text : undefined
}

function unwrap(expression) {
  let value = expression
  while (
    ts.isParenthesizedExpression(value) ||
    ts.isAsExpression(value) ||
    ts.isSatisfiesExpression(value)
  ) {
    value = value.expression
  }
  return value
}

function staticText(expression, variables, seen = new Set()) {
  const value = unwrap(expression)
  if (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value)) return value.text
  if (ts.isIdentifier(value)) {
    if (seen.has(value.text) || !variables.has(value.text)) return undefined
    return staticText(variables.get(value.text), variables, new Set([...seen, value.text]))
  }
  if (ts.isBinaryExpression(value) && value.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const left = staticText(value.left, variables, seen)
    const right = staticText(value.right, variables, seen)
    return left === undefined || right === undefined ? undefined : left + right
  }
  if (
    ts.isCallExpression(value) &&
    ts.isPropertyAccessExpression(value.expression) &&
    value.expression.name.text === 'join' &&
    ts.isArrayLiteralExpression(value.expression.expression)
  ) {
    const separator = value.arguments.length ? staticText(value.arguments[0], variables, seen) : ','
    const parts = value.expression.expression.elements.map((element) =>
      staticText(element, variables, seen),
    )
    return separator === undefined || parts.includes(undefined) ? undefined : parts.join(separator)
  }
  return undefined
}

function staticOptions(expression, variables, seen = new Set()) {
  const value = unwrap(expression)
  if (ts.isIdentifier(value)) {
    if (seen.has(value.text) || !variables.has(value.text)) return undefined
    return staticOptions(variables.get(value.text), variables, new Set([...seen, value.text]))
  }
  if (!ts.isArrayLiteralExpression(value)) return undefined
  const options = value.elements.map((element) => {
    const option = unwrap(element)
    if (ts.isStringLiteral(option) || ts.isNumericLiteral(option)) return option.text
    if (option.kind === ts.SyntaxKind.TrueKeyword) return 'true'
    if (option.kind === ts.SyntaxKind.FalseKeyword) return 'false'
    if (option.kind === ts.SyntaxKind.NullKeyword) return 'null'
    return undefined
  })
  return options.includes(undefined) ? undefined : options
}

function objectProperty(object, name) {
  return object.properties.find(
    (property) => ts.isPropertyAssignment(property) && propertyName(property.name) === name,
  )?.initializer
}

function normalizeNewlines(text) {
  return text.replace(/\r\n?/g, '\n')
}

function storyMetadata(file) {
  if (!existsSync(file)) return { description: undefined, controls: [] }
  const source = parseSource(file)
  const variables = new Map()
  let description

  function collectVariables(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      variables.set(node.name.text, node.initializer)
    }
    ts.forEachChild(node, collectVariables)
  }
  function findDescription(node) {
    if (
      description === undefined &&
      ts.isPropertyAssignment(node) &&
      propertyName(node.name) === 'description' &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      const component = node.initializer.properties.find(
        (property) =>
          ts.isPropertyAssignment(property) && propertyName(property.name) === 'component',
      )
      if (component) {
        description = staticText(component.initializer, variables)
        if (description === undefined) {
          throw new Error(`Cannot extract the component description from ${file}`)
        }
      }
    }
    ts.forEachChild(node, findDescription)
  }

  collectVariables(source)
  findDescription(source)
  const assignment = source.statements.find(
    (statement) => ts.isExportAssignment(statement) && !statement.isExportEquals,
  )
  let meta = assignment && unwrap(assignment.expression)
  if (meta && ts.isIdentifier(meta) && variables.has(meta.text)) {
    meta = unwrap(variables.get(meta.text))
  }
  const argTypes = meta && ts.isObjectLiteralExpression(meta) && objectProperty(meta, 'argTypes')
  const controls = []
  if (argTypes && ts.isObjectLiteralExpression(argTypes)) {
    for (const property of argTypes.properties) {
      if (
        !ts.isPropertyAssignment(property) ||
        !ts.isObjectLiteralExpression(property.initializer)
      ) {
        continue
      }
      const name = propertyName(property.name)
      const content = property.initializer
      const table = objectProperty(content, 'table')
      if (
        table &&
        ts.isObjectLiteralExpression(table) &&
        objectProperty(table, 'disable')?.kind === ts.SyntaxKind.TrueKeyword
      ) {
        continue
      }
      const descriptionNode = objectProperty(content, 'description')
      const optionsNode = objectProperty(content, 'options')
      const defaultValue =
        table && ts.isObjectLiteralExpression(table) && objectProperty(table, 'defaultValue')
      const defaultNode =
        defaultValue &&
        ts.isObjectLiteralExpression(defaultValue) &&
        objectProperty(defaultValue, 'summary')
      const description = descriptionNode && staticText(descriptionNode, variables)
      const options = optionsNode && staticOptions(optionsNode, variables)
      const defaultSummary = defaultNode && staticText(defaultNode, variables)
      if (name && (description || options || defaultSummary)) {
        controls.push({ name, description, options, defaultSummary })
      }
    }
  }
  return {
    description: description
      ? normalizeNewlines(description)
          .replace(/^[ \t]+$/gm, '')
          .replace(/^( *[-*] .+?)[ \t]+$/gm, '$1')
          .trim()
      : undefined,
    controls,
  }
}

function resolveRelativeExport(file, specifier) {
  if (!specifier.startsWith('.'))
    throw new Error(`Unsupported export * from ${specifier} in ${file}`)
  const base = path.resolve(path.dirname(file), specifier)
  const resolved = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')].find(
    (candidate) => existsSync(candidate) && path.extname(candidate),
  )
  if (!resolved) throw new Error(`Cannot resolve export * from ${specifier} in ${file}`)
  return resolved
}

function addBindingNames(name, values) {
  if (ts.isIdentifier(name)) {
    values.add(name.text)
    return
  }
  for (const element of name.elements) {
    if (ts.isBindingElement(element)) addBindingNames(element.name, values)
  }
}

function readExports(file, visited = new Set()) {
  if (visited.has(file)) return { values: [], types: [], compounds: [] }
  visited.add(file)
  const source = parseSource(file)
  const values = new Set()
  const types = new Set()
  const compounds = []

  for (const statement of source.statements) {
    const exported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (
      exported &&
      statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.DefaultKeyword)
    ) {
      throw new Error(`Unsupported default export in ${file}`)
    }
    if (exported && ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        addBindingNames(declaration.name, values)
      }
    }
    if (
      exported &&
      (ts.isFunctionDeclaration(statement) ||
        ts.isClassDeclaration(statement) ||
        ts.isEnumDeclaration(statement))
    ) {
      if (!statement.name) throw new Error(`Unsupported anonymous export in ${file}`)
      values.add(statement.name.text)
      if (!ts.isFunctionDeclaration(statement)) types.add(statement.name.text)
    }
    if (
      exported &&
      (ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement))
    ) {
      types.add(statement.name.text)
    }
    if (ts.isExportDeclaration(statement)) {
      if (!statement.exportClause) {
        if (!statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) {
          throw new Error(`Unsupported export declaration in ${file}`)
        }
        const nested = readExports(
          resolveRelativeExport(file, statement.moduleSpecifier.text),
          visited,
        )
        for (const name of nested.values) (statement.isTypeOnly ? types : values).add(name)
        for (const name of nested.types) types.add(name)
        if (!statement.isTypeOnly) compounds.push(...nested.compounds)
      } else if (ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          ;(statement.isTypeOnly || element.isTypeOnly ? types : values).add(element.name.text)
        }
      } else {
        throw new Error(`Unsupported namespace export in ${file}`)
      }
    }
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue
        const initializer = unwrap(declaration.initializer)
        if (
          !ts.isCallExpression(initializer) ||
          !ts.isPropertyAccessExpression(initializer.expression) ||
          initializer.expression.expression.getText(source) !== 'Object' ||
          initializer.expression.name.text !== 'assign'
        ) {
          continue
        }
        const parts = initializer.arguments[1]
        if (!parts || !ts.isObjectLiteralExpression(parts)) {
          throw new Error(`Cannot extract compound parts for ${declaration.name.text} in ${file}`)
        }
        const names = parts.properties.map((property) => {
          const name = propertyName(property.name)
          if (!name) throw new Error(`Unsupported compound part in ${file}`)
          return name
        })
        compounds.push({ name: declaration.name.text, parts: names })
      }
    }
  }
  return {
    values: [...values],
    types: [...types],
    compounds: compounds.filter((compound) => values.has(compound.name)),
  }
}

function titleFor(subpath) {
  if (subpath === 'map/google') return 'Google Map'
  return subpath
    .split('-')
    .map((word) => (word === 'otp' ? 'OTP' : word[0].toUpperCase() + word.slice(1)))
    .join(' ')
}

function shortDescription(description) {
  const firstParagraph = description.split(/\n\s*\n/)[0].replace(/\s+/g, ' ')
  const sentence = firstParagraph.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? firstParagraph
  return sentence.length > 200 ? `${sentence.slice(0, 197).trimEnd()}...` : sentence
}

function sourceUrl(file) {
  return `${repository}/${path.relative(root, file).split(path.sep).join('/')}`
}

function list(names) {
  return names.map((name) => `- \`${name}\``).join('\n')
}

function renderReference(entry) {
  const { values, types, compounds } = readExports(entry.index)
  if (!values.length) throw new Error(`No runtime exports found in ${entry.index}`)
  const preferred = entry.subpath
    .split(/[-/]/)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('')
  const primary =
    entry.subpath === 'hooks' || entry.subpath === 'utils'
      ? values[0]
      : (compounds.find((compound) => compound.name === preferred)?.name ??
        compounds[0]?.name ??
        values.find((name) => name === preferred) ??
        values.find((name) => /^[A-Z][a-z]/.test(name)) ??
        values[0])
  const lines = [
    `# ${entry.title}`,
    '',
    '> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.',
    '',
    entry.description,
    '',
    '## Import',
    '',
    '```tsx',
    `import { ${primary} } from 'ixia-ui-react/${entry.subpath}'`,
    '```',
  ]
  if (entry.controls.length) {
    lines.push(
      '',
      '## Selected Storybook controls',
      '',
      'These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.',
      '',
    )
    for (const control of entry.controls) {
      const details = []
      if (control.description) details.push(control.description.replace(/\s+/g, ' '))
      if (control.options)
        details.push(`Options: ${control.options.map((option) => `\`${option}\``).join(', ')}.`)
      if (control.defaultSummary)
        details.push(`Storybook-reported default: \`${control.defaultSummary}\`.`)
      lines.push(`- \`${control.name}\`: ${details.join(' ')}`)
    }
  }
  lines.push('', '## Runtime exports', '', list(values))
  if (types.length) lines.push('', '## Type exports', '', list(types))
  if (compounds.length) {
    lines.push('', '## Compound parts')
    for (const compound of compounds) {
      lines.push(
        '',
        `### ${compound.name}`,
        '',
        list(compound.parts.map((part) => `${compound.name}.${part}`)),
      )
    }
  }
  if (entry.peers) {
    lines.push('', '## Optional peer dependencies', '', entry.peers)
  }
  lines.push(
    '',
    '## Further reading',
    '',
    `- [Public entry point on GitHub (main branch)](${sourceUrl(entry.index)})`,
  )
  if (entry.story && existsSync(entry.story)) {
    lines.push(`- [Storybook examples on GitHub (main branch)](${sourceUrl(entry.story)})`)
  }
  lines.push('- [Getting started](../guides/getting-started.md)', '')
  return lines.join('\n')
}

function renderIndex(entries) {
  const components = entries.filter((entry) => !['hooks', 'utils'].includes(entry.subpath))
  const shared = entries.filter((entry) => ['hooks', 'utils'].includes(entry.subpath))
  const links = (items) =>
    items.map(
      (entry) =>
        `- [${entry.title}](docs/llms/components/${entry.file}): \`ixia-ui-react/${entry.subpath}\`. ${shortDescription(entry.description)}`,
    )
  return [
    '# Ixia UI React',
    '',
    '> Styled React components, hooks, and utilities built with composable primitives and Tailwind CSS 4.',
    '',
    'Import from individual `ixia-ui-react/<subpath>` entry points; there is no aggregate root import. Import `ixia-ui-react/styles` once and process it with Tailwind CSS 4.',
    '',
    'Ixia wraps some Base UI primitives, but its exports and component composition can differ from Base UI. Prefer the Ixia references and examples below.',
    '',
    '## Guides',
    '',
    '- [Getting started](docs/llms/guides/getting-started.md): Installation, imports, and optional peers.',
    '- [Styling and themes](docs/llms/guides/styling.md): Tailwind CSS, tokens, and brand themes.',
    '- [Component composition](docs/llms/guides/composition.md): Button, dialog, select, and autocomplete examples.',
    '- [Forms](docs/llms/guides/forms.md): TanStack React Form integration and field composition.',
    '',
    '## Components',
    '',
    ...links(components),
    '',
    '## Hooks and utilities',
    '',
    ...links(shared),
    '',
    '## Upstream',
    '',
    '- [Base UI LLM index](https://base-ui.com/llms.txt): Upstream primitives and behavior; Ixia wrappers may differ.',
    '',
  ].join('\n')
}

function buildEntries() {
  const readme = readFileSync(path.join(root, 'README.md'), 'utf8')
  const peers = new Map(
    [...readme.matchAll(/^\|\s+`ixia-ui-react\/([^`]+)`\s+\|\s+(.+?)\s*\|$/gm)].map((match) => [
      match[1],
      match[2].trim(),
    ]),
  )
  const componentNames = readdirSync(componentsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  const subpaths = [...componentNames, 'map/google', 'hooks', 'utils']
  return subpaths.map((subpath) => {
    const directory =
      subpath === 'hooks' || subpath === 'utils'
        ? path.join(root, 'src', subpath)
        : path.join(componentsRoot, ...subpath.split('/'))
    const index = path.join(directory, 'index.ts')
    if (!existsSync(index)) throw new Error(`Missing public entry point: ${index}`)
    const storyName = subpath === 'map/google' ? 'google-map' : subpath
    const story = path.join(directory, `${storyName}.stories.tsx`)
    const { description: storyDescription, controls } = storyMetadata(story)
    const description = storyDescription ?? fallbackDescriptions[subpath]
    if (!description) throw new Error(`Missing component description for ${subpath}`)
    return {
      description,
      controls,
      file: `${subpath.replaceAll('/', '-')}.md`,
      index,
      peers: peers.get(subpath),
      story,
      subpath,
      title: titleFor(subpath),
    }
  })
}

function main() {
  const args = process.argv.slice(2)
  if (args.length > 1 || (args[0] && args[0] !== '--check')) {
    throw new Error('Usage: node tools/generate-llms.mjs [--check]')
  }
  const check = args[0] === '--check'
  const entries = buildEntries()
  const outputs = new Map([
    [path.join(root, 'llms.txt'), renderIndex(entries)],
    ...entries.map((entry) => [path.join(outputRoot, entry.file), renderReference(entry)]),
  ])
  const unexpected = existsSync(outputRoot)
    ? readdirSync(outputRoot)
        .filter((file) => file.endsWith('.md') && !outputs.has(path.join(outputRoot, file)))
        .map((file) => path.join(outputRoot, file))
    : []
  const outdated = [...outputs].filter(
    ([file, content]) =>
      !existsSync(file) || normalizeNewlines(readFileSync(file, 'utf8')) !== content,
  )
  if (check) {
    if (outdated.length || unexpected.length) {
      for (const [file] of outdated)
        console.error(`Missing or outdated: ${path.relative(root, file)}`)
      for (const file of unexpected)
        console.error(`Unexpected generated page: ${path.relative(root, file)}`)
      console.error('Run vp run docs:llms and remove obsolete generated pages.')
      process.exitCode = 1
      return
    }
    console.log(`LLM index and ${entries.length} references are current.`)
    return
  }
  mkdirSync(outputRoot, { recursive: true })
  for (const [file, content] of outputs) writeFileSync(file, content)
  for (const file of unexpected)
    console.warn(`Remove obsolete generated page: ${path.relative(root, file)}`)
  console.log(`Generated llms.txt and ${entries.length} references.`)
}

main()
