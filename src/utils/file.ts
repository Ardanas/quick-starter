import fs from 'fs-extra'

export function ensureDir(dir: string) {
  fs.ensureDirSync(dir)
}

export function emptyDir(dir: string) {
  fs.emptyDirSync(dir)
}

export function isDirEmpty(dir: string) {
  const files = fs.readdirSync(dir)
  return files.length === 0
}
