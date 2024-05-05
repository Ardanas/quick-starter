import fse from 'fs-extra';

export function ensureDir (dir: string) {
    fse.ensureDirSync(dir)
}

export function emptyDir(dir: string) {
    fse.emptyDirSync(dir)
}

export function isDirEmpty(dir: string) {
    const files =  fse.readdirSync(dir);
    return files.length === 0
}