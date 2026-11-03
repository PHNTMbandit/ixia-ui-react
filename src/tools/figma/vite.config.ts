import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite-plus'

import type { Library } from './schema'

const output = fileURLToPath(new URL('generated/', import.meta.url)),
  library: Library = JSON.parse(
    readFileSync(new URL('generated/library.json', import.meta.url), 'utf8'),
  )
if (library.version !== 3 || !library.samples.length) {
  throw new Error('Run vp run figma:export first')
}
if (!library.variables) {
  throw new Error('Run vp run figma:build to generate the variables first')
}
const packageJson: { name: string; version: string } = JSON.parse(
    readFileSync(new URL('../../../package.json', import.meta.url), 'utf8'),
  ),
  // The UI runs in a sandboxed iframe without file access, so the logo is inlined.
  icon = `data:image/png;base64,${readFileSync(new URL('assets/icon.png', import.meta.url)).toString('base64')}`,
  ui = readFileSync(new URL('ui.html', import.meta.url), 'utf8').replace('%CARTYX_ICON%', icon)

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: fileURLToPath(new URL('plugin.ts', import.meta.url)),
      fileName: () => 'plugin.js',
      formats: ['iife'],
      name: 'CartyxFigma',
    },
    minify: true,
    outDir: output,
    target: 'es2020',
  },
  define: {
    CARTYX_LIBRARY: JSON.stringify(library),
    CARTYX_PACKAGE: JSON.stringify({ name: packageJson.name, version: packageJson.version }),
    CARTYX_UI: JSON.stringify(ui),
  },
  plugins: [
    {
      closeBundle() {
        mkdirSync(output, { recursive: true })
        // Figma manifests have no icon field; this is the 128×128 icon for the publish dialog.
        copyFileSync(
          new URL('assets/icon-128.png', import.meta.url),
          new URL('generated/icon-128.png', import.meta.url),
        )
        // Figma assigns the id when the plugin is first published (or created under
        // Plugins > Development > New plugin); keep it in plugin-id.txt so rebuilds retain it.
        const idFile = new URL('plugin-id.txt', import.meta.url),
          id = existsSync(idFile) ? readFileSync(idFile, 'utf8').trim() : ''
        writeFileSync(
          new URL('generated/manifest.json', import.meta.url),
          JSON.stringify(
            {
              name: 'Cartyx UI Sync',
              ...(id ? { id } : {}),
              api: '1.0.0',
              main: 'plugin.js',
              editorType: ['figma'],
              documentAccess: 'dynamic-page',
              networkAccess: { allowedDomains: ['none'] },
            },
            null,
            2,
          ),
        )
      },
      name: 'cartyx-figma-manifest',
    },
  ],
})
