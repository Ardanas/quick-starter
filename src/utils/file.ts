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

export function copyDir(sourceDir: string, targetDir: string) {
  fs.copySync(sourceDir, targetDir)
}

export function isFileExist(filePath: string) {
  return fs.pathExistsSync(filePath)
}

export function readJson(filePath: string) {
  return fs.readJsonSync(filePath, { encoding: 'utf-8' })
}
