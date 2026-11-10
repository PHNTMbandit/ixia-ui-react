import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url),
  manifest = JSON.parse(readFileSync(new URL('package.json', root), 'utf8')),
  optionalPeers = Object.keys(manifest.peerDependenciesMeta).filter(
    (name) => manifest.peerDependenciesMeta[name].optional,
  )

test('feature dependencies are optional peers, not production dependencies', () => {
  for (const name of optionalPeers) {
    assert.ok(manifest.peerDependencies[name], `${name} must declare a peer version`)
    assert.equal(manifest.dependencies[name], undefined, `${name} must remain optional`)
    assert.ok(manifest.devDependencies[name], `${name} must be available to library developers`)
  }
  assert.deepEqual(
    Object.keys(manifest.peerDependencies).filter((name) => !optionalPeers.includes(name)),
    ['react', 'react-dom'],
  )
})

test('Button and shared entries do not load optional feature packages', () => {
  execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
        import { registerHooks } from 'node:module'
        const optionalPeers = ${JSON.stringify(optionalPeers)}
        registerHooks({
          resolve(specifier, context, nextResolve) {
            if (optionalPeers.some((name) => specifier === name || specifier.startsWith(name + '/'))) {
              throw new Error('Shared entry loaded an optional peer: ' + specifier)
            }
            return nextResolve(specifier, context)
          },
        })
        for (const subpath of ['button', 'hooks', 'utils']) {
          await import(${JSON.stringify(manifest.name)} + '/' + subpath)
        }
      `,
    ],
    { cwd: fileURLToPath(root), stdio: 'pipe' },
  )
})

test('component subpaths have JavaScript and declarations without an aggregate root', () => {
  assert.equal(manifest.exports['.'], undefined)
  for (const path of [
    'src/index.ts',
    'src/components/index.ts',
    'dist/index.js',
    'dist/index.d.ts',
  ]) {
    assert.equal(
      existsSync(new URL(path, root)),
      false,
      `${path} must not expose an aggregate root`,
    )
  }
  const subpaths = readdirSync(new URL('src/components/', root), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  for (const subpath of [...subpaths, 'hooks', 'utils', 'map/google']) {
    for (const condition of ['types', 'import']) {
      const target = manifest.exports['./*'][condition].replace('*', subpath)
      assert.ok(existsSync(new URL(target, root)), `${subpath} is missing its ${condition} target`)
    }
  }
  assert.throws(() => import.meta.resolve(manifest.name), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' })
  assert.equal(
    fileURLToPath(import.meta.resolve(`${manifest.name}/button`)),
    fileURLToPath(new URL('dist/button/index.js', root)),
  )
})

test('base styles do not require optional feature packages', () => {
  const styles = readFileSync(new URL(manifest.exports['./styles'], root), 'utf8'),
    imports = [...styles.matchAll(/@import\s+(?:url\()?['"]([^'"]+)['"]/g)].map((match) => match[1])
  for (const name of optionalPeers) {
    assert.equal(
      imports.some((specifier) => specifier === name || specifier.startsWith(`${name}/`)),
      false,
      `Base styles must not require ${name}`,
    )
  }
})
