import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

// Reads cva() variant definitions from a *.types.ts file so Figma variant axes match the code.
// The file is type-stripped and evaluated with a recording cva(); value imports are dropped, so
// Files that need other runtime values at module scope are reported instead of guessed.
export async function extractCva(file) {
  const source = await readFile(file, 'utf8'),
    names = [...source.matchAll(/\b(\w+)\s*=\s*cva\(/g)].map(([, name]) => name)
  if (!names.length) {
    return {}
  }
  let code
  try {
    code = stripTypeScriptTypes(source, { mode: 'strip' })
  } catch (error) {
    throw new Error(`Cannot read ${file}: ${error.message}`, { cause: error })
  }
  code = code.replaceAll(/^\s*import\s[\s\S]*?\sfrom\s+['"][^'"]+['"];?\s*$/gm, '')
  const module = await import(
      `data:text/javascript;base64,${Buffer.from(
        `const __cvaCalls = []
const cva = (base, config = {}) => { __cvaCalls.push(config); return () => '' }
${code}
export default __cvaCalls`,
      ).toString('base64')}`
    ).catch((error) => {
      throw new Error(`Cannot evaluate cva() calls in ${file}: ${error.message}`, { cause: error })
    }),
    calls = module.default
  if (calls.length !== names.length) {
    throw new Error(`Expected ${names.length} module-level cva() calls in ${file}`)
  }
  return Object.fromEntries(
    names.map((name, index) => {
      const config = calls[index]
      return [
        name,
        {
          defaultVariants: Object.fromEntries(
            Object.entries(config.defaultVariants || {}).map(([axis, value]) => [
              axis,
              String(value),
            ]),
          ),
          variants: Object.fromEntries(
            Object.entries(config.variants || {}).map(([axis, values]) => [
              axis,
              Object.keys(values),
            ]),
          ),
        },
      ]
    }),
  )
}
