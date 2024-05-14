import { join } from 'node:path'
import type { CommonExecOptions, SpawnSyncReturns } from 'node:child_process'
import { execSync } from 'node:child_process'
import fs from 'fs-extra'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const CLI_PATH = join(__dirname, '../bin', 'quick-starter.mjs')
const targetDirPath = join(__dirname, './_template')
const localDirPath = join(__dirname, './_demo')
const localFilePath = join(localDirPath, `_@_$_${Date.now()}_$_@_.txt`)
const remoteTemplateName = 'gh:antfu/starter-ts'

function run(args: string[], options?: CommonExecOptions): string {
  try {
    return execSync(`node ${CLI_PATH} ${args.join(' ')}`, { encoding: 'utf-8', ...options }).toString()
  }
  catch (error) {
    return (error as SpawnSyncReturns<string>).stdout
  }
}

function createNonEmptyFile(filepath: string, content: string) {
  fs.ensureFileSync(filepath)
  fs.writeFileSync(filepath, content)
}

function createTargetFile() {
  const filepath = join(targetDirPath, 'test.txt')
  createNonEmptyFile(filepath, 'whatever')
}

function _beforeAll() {
  createNonEmptyFile(localFilePath, 'whatever')
}

function emptyTargetDir() {
  fs.emptyDir(targetDirPath)
}

function _afterAll() {
  fs.removeSync(targetDirPath)
  fs.removeSync(localDirPath)
}

function isTargetDirEmpty() {
  const files = fs.readdirSync(targetDirPath)
  return files.length === 0
}

beforeAll(_beforeAll)

describe('base', () => {
  it('prompts for the options if none supplied', () => {
    const result = run([])
    expect(result).toContain('Select a template type')
  })

  it('the target folder is not empty', () => {
    createTargetFile()
    const result = run([localFilePath, targetDirPath])
    expect(result).toContain('do you need to overwrite it')
  })

  it('--force=false', () => {
    createTargetFile()
    const result = run([localFilePath, targetDirPath, '--force=false'])
    expect(result).toContain('the folder is not empty')
  })
})

describe('download', () => {
  afterAll(_afterAll)

  it('default options', () => {
    emptyTargetDir()
    run([`--dir=${targetDirPath}`], { input: '1\n' })
    expect(isTargetDirEmpty()).toEqual(false)
  })

  it('--dir > [dir]', () => {
    emptyTargetDir()
    run([localDirPath, 'randomDir', `--dir=${targetDirPath}`])
    expect(isTargetDirEmpty()).toEqual(false)
  })

  // it('--force', () => {
  //   fs.ensureFile(targetDirPath)
  //   fs.writeFile(join(targetDirPath, 'test.txt'), 'whatever')
  //   run([localFilePath, targetDirPath, '--force'])
  //   expect(isTargetDirEmpty()).toEqual(false)
  // })

  it('template from local dir', () => {
    emptyTargetDir()
    run([localDirPath, targetDirPath])
    expect(isTargetDirEmpty()).toEqual(false)
  })

  it('template from git repo', () => {
    emptyTargetDir()
    run([remoteTemplateName, targetDirPath])
    expect(isTargetDirEmpty()).toEqual(false)
  })
})
