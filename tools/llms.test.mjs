import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import ts from '@typescript/typescript6'

const root = fileURLToPath(new URL('../', import.meta.url))
const guides = path.join(root, 'docs', 'llms', 'guides')
const references = path.join(root, 'docs', 'llms', 'components')
const read = (file) => readFileSync(file, 'utf8')

test('generated references are current and cover public entry points', () => {
  execFileSync(process.execPath, ['tools/generate-llms.mjs', '--check'], {
    cwd: root,
    stdio: 'pipe',
  })
  const index = read(path.join(root, 'llms.txt'))
  const componentNames = readdirSync(path.join(root, 'src', 'components'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  for (const subpath of [...componentNames, 'map/google', 'hooks', 'utils']) {
    assert.ok(index.includes(`\`ixia-ui-react/${subpath}\``), `Missing ${subpath} in llms.txt`)
  }

  const hooks = read(path.join(references, 'hooks.md'))
  const googleMap = read(path.join(references, 'map-google.md'))
  assert.match(hooks, /`useTheme`/)
  assert.doesNotMatch(hooks, /`useGoogleMapViewport`/)
  assert.match(googleMap, /`useGoogleMapViewport`/)
})

test('the generated-reference check accepts CRLF working-tree files', () => {
  const files = JSON.stringify([
    path.join(root, 'README.md'),
    path.join(root, 'llms.txt'),
    path.join(root, 'src', 'components', 'form', 'form.stories.tsx'),
    path.join(references, 'form.md'),
  ])
  const script = `
    import fs from 'node:fs'
    import { syncBuiltinESMExports } from 'node:module'
    const readFile = fs.readFileSync
    const files = new Set(${files})
    const replaced = new Set()
    fs.readFileSync = (...args) => {
      const content = readFile(...args)
      if (files.has(args[0]) && typeof content === 'string') {
        replaced.add(args[0])
        return content.replace(/\\r?\\n/g, '\\r\\n')
      }
      return content
    }
    syncBuiltinESMExports()
    process.argv = [process.execPath, 'tools/generate-llms.mjs', '--check']
    await import('./tools/generate-llms.mjs')
    if (replaced.size !== files.size) throw new Error('A CRLF fixture was not read')
  `
  execFileSync(process.execPath, ['--input-type=module', '-e', script], {
    cwd: root,
    stdio: 'pipe',
  })
})

test('local Markdown links resolve', () => {
  const documents = [
    path.join(root, 'llms.txt'),
    ...readdirSync(guides)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(guides, file)),
    ...readdirSync(references)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(references, file)),
  ]
  for (const file of documents) {
    for (const [, target] of read(file).matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|mailto:|#)/.test(target)) continue
      const relative = decodeURIComponent(target.split('#')[0])
      assert.ok(
        existsSync(path.resolve(path.dirname(file), relative)),
        `${file}: broken link ${target}`,
      )
    }
  }
})

test('npm package includes the index and every Markdown page', () => {
  const command = process.platform === 'win32' ? (process.env.ComSpec ?? 'cmd.exe') : 'npm'
  const args =
    process.platform === 'win32'
      ? ['/d', '/s', '/c', 'npm pack --dry-run --json --ignore-scripts']
      : ['pack', '--dry-run', '--json', '--ignore-scripts']
  const output = execFileSync(command, args, { cwd: root, encoding: 'utf8' })
  const packed = new Set(JSON.parse(output)[0].files.map((file) => file.path))
  assert.ok(packed.has('llms.txt'), 'llms.txt is missing from the package')
  for (const [directory, name] of [
    [guides, 'guides'],
    [references, 'components'],
  ]) {
    for (const file of readdirSync(directory).filter((entry) => entry.endsWith('.md'))) {
      const target = `docs/llms/${name}/${file}`
      assert.ok(packed.has(target), `${target} is missing from the package`)
    }
  }
})

test('guide examples and reference imports type-check against public source entries', () => {
  const examples = new Map()
  for (const name of ['getting-started.md', 'composition.md', 'forms.md']) {
    const content = read(path.join(guides, name))
    for (const [index, match] of [
      ...content.matchAll(/```tsx\r?\n([\s\S]*?)\r?\n```/g),
    ].entries()) {
      const file = path.join(root, 'tools', '__llms_examples__', `${name}-${index}.tsx`)
      examples.set(file, match[1])
    }
  }
  assert.ok(examples.size > 0, 'No guide examples found')
  for (const name of readdirSync(references).filter((file) => file.endsWith('.md'))) {
    const content = read(path.join(references, name))
    const snippet = content.match(/## Import\r?\n\r?\n```tsx\r?\n([\s\S]*?)\r?\n```/)
    assert.ok(snippet, `Missing import example in ${name}`)
    const file = path.join(root, 'tools', '__llms_examples__', `reference-${name}.tsx`)
    examples.set(file, snippet[1])
  }

  const options = {
    allowImportingTsExtensions: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    noEmit: true,
    skipLibCheck: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
    paths: {
      '@/*': [path.join(root, 'src', '*')],
      'ixia-ui-react/*': [
        path.join(root, 'src', 'components', '*', 'index.ts'),
        path.join(root, 'src', '*', 'index.ts'),
      ],
    },
  }
  const host = ts.createCompilerHost(options)
  const getSourceFile = host.getSourceFile.bind(host)
  const fileExists = host.fileExists.bind(host)
  const readFile = host.readFile.bind(host)
  host.fileExists = (file) => examples.has(path.normalize(file)) || fileExists(file)
  host.readFile = (file) => examples.get(path.normalize(file)) ?? readFile(file)
  host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) => {
    const source = examples.get(path.normalize(file))
    return source === undefined
      ? getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile)
      : ts.createSourceFile(file, source, languageVersion, true, ts.ScriptKind.TSX)
  }
  const program = ts.createProgram([...examples.keys()], options, host)
  const optionsDiagnostics = program.getOptionsDiagnostics()
  assert.equal(
    optionsDiagnostics.length,
    0,
    ts.formatDiagnostics(optionsDiagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  )
  const diagnostics = ts
    .getPreEmitDiagnostics(program)
    .filter(
      (diagnostic) => diagnostic.file && examples.has(path.normalize(diagnostic.file.fileName)),
    )
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n',
    }),
  )
})
