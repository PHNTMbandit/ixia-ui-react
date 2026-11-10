import { gzipSync } from 'node:zlib'

// Gzips library.json for the plugin bundle (Figma rejects plugin code over 15 MB). Non-ASCII
// Characters are \u-escaped so the plugin can turn the bytes into a string without a UTF-8 decoder.
export function packLibrary(library) {
  // Matches UTF-16 code units, so astral characters are escaped as surrogate pairs.
  const json = JSON.stringify(library).replaceAll(
    /[\u0080-\uffff]/g,
    (char) => `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`,
  )
  return gzipSync(json, { level: 9 }).toString('base64')
}
