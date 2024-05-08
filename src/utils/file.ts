import { join } from 'node:path'
import fs from 'fs-extra'

export function ensureDir(dir: string) {
  fs.ensureDirSync(dir)
}

/**
 * Empties the contents of a directory synchronously.
 * @param {string} dir
 */
export function emptyDir(dir: string) {
  fs.emptyDirSync(dir)
}

/**
 * Removes a directory and its contents recursively.
 * @param {string} dir
 */
export function removeDir(dir: string) {
  fs.removeSync(dir)
}

export function isDirEmpty(dir: string) {
  const files = fs.readdirSync(dir)
  return files.length === 0
}

export function createNonEmptyDir(dir: string) {
  fs.mkdirpSync(dir)

  const pkgJson = join(dir, 'package.json')
  fs.writeFileSync(pkgJson, '{ "foo": "bar" }')
}
