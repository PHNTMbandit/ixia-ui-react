import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import path from 'node:path'

import ts from '@typescript/typescript6'

const isCva = (declaration) =>
  ts.isIdentifier(declaration.name) &&
  declaration.initializer &&
  ts.isCallExpression(declaration.initializer) &&
  ts.isIdentifier(declaration.initializer.expression) &&
  declaration.initializer.expression.text === 'cva'

// Plain data (strings, templates, objects, references) can be evaluated safely; anything that
// Calls, constructs or defines functions is runtime behaviour and is never executed.
const isPlainData = (node) => {
  let plain = true
  const visit = (child) => {
    if (
      ts.isCallExpression(child) ||
      ts.isNewExpression(child) ||
      ts.isFunctionLike(child) ||
      ts.isJsxElement(child) ||
      ts.isJsxSelfClosingElement(child)
    ) {
      plain = false
    } else {
      ts.forEachChild(child, visit)
    }
  }
  visit(node)
  return plain
}

const declarationsOf = (parsed) =>
  parsed.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.initializer)

async function readParsed(file) {
  return ts.createSourceFile(file, await readFile(file, 'utf8'), ts.ScriptTarget.Latest, true)
}

// Plain constants exported by relative modules that this file imports, e.g. shared class maps.
async function importedConstants(parsed, file) {
  const texts = []
  for (const statement of parsed.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      statement.importClause?.isTypeOnly ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      !statement.moduleSpecifier.text.startsWith('.')
    ) {
      continue
    }
    const base = path.resolve(path.dirname(file), statement.moduleSpecifier.text),
      target = [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')].find(existsSync)
    if (!target) {
      continue
    }
    const imported = await readParsed(target)
    for (const declaration of declarationsOf(imported)) {
      if (!isCva(declaration) && isPlainData(declaration.initializer)) {
        texts.push(`const ${declaration.getText(imported)}`)
      }
    }
  }
  return texts
}

// Reads cva() variant definitions from a *.types.ts file so Figma variant axes match the code.
// Evaluate only cva declarations and the plain-data constants they may reference, not unrelated
// Runtime initializers such as dialog handles. Configurations depending on other runtime values
// Are reported instead of guessed.
export async function extractCva(file) {
  const parsed = await readParsed(file),
    all = declarationsOf(parsed),
    declarations = all.filter(isCva),
    names = declarations.map((declaration) => declaration.name.text)
  if (!names.length) {
    return {}
  }
  let code
  try {
    const imported = await importedConstants(parsed, file),
      local = all.filter(
        (declaration) => isCva(declaration) || isPlainData(declaration.initializer),
      )
    code = stripTypeScriptTypes(
      [...imported, ...local.map((declaration) => `const ${declaration.getText(parsed)}`)].join(
        '\n',
      ),
      { mode: 'strip' },
    )
  } catch (error) {
    throw new Error(`Cannot read ${file}: ${error.message}`, { cause: error })
  }
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
