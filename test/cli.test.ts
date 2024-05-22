import { dirname, join } from 'node:path'
import type { CommonExecOptions, SpawnSyncReturns } from 'node:child_process'
import { execSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const defaultJsonPath = join(__dirname, '../default.json')
const defaultJsonBakPath = join(__dirname, './.default.bak')
const notArrayJsonPath = join(__dirname, './notArray.json')
const inCorrectJsonPath = join(__dirname, './inCorrect.json')
const correctJsonPath = join(__dirname, './correct.json')
const CLI_PATH = join(__dirname, '../bin', 'quick-starter.mjs')
const targetDirPath = join(__dirname, './_template')
const localDirPath = join(__dirname, './_demo')
const localFilePath = join(localDirPath, 'default.json')
const remoteTemplateName = 'gh:antfu/starter-ts'

function run(args: string[], options?: CommonExecOptions): string {
  try {
    return execSync(`node ${CLI_PATH} ${args.join(' ')}`, { encoding: 'utf-8', ...options }).toString()
  }
  catch (error) {
    return (error as SpawnSyncReturns<string>).stdout
  }
}

function restoreDefaultJson() {
  const content = fs.readFileSync(defaultJsonBakPath, { encoding: 'utf-8' })
  fs.writeFileSync(defaultJsonPath, content)
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
  createNonEmptyFile(localFilePath, JSON.stringify([{ name: 'ts', value: remoteTemplateName }], null, 4))
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
afterAll(_afterAll)

describe('base', () => {
  it('prompts for the options if none supplied', () => {
    const result = run([])
    expect(result).toContain('Select a template')
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

describe('config', () => {
  it('set && file does not exist', () => {
    const result = run(['config', 'set', `${Date.now()}.json`])
    expect(result).toContain('file does not exist')
  })

  it('set && JSON data is not an array', () => {
    const result = run(['config', 'set', notArrayJsonPath])
    expect(result).toContain('JSON data is not an array')
  })

  it('set && incorrect data format', () => {
    const result = run(['config', 'set', inCorrectJsonPath])
    expect(result).toContain('please ensure the correct data format')
  })

  it('set && overwrite correct data', () => {
    const result = run(['config', 'set', correctJsonPath])
    expect(result).toContain('Do you want to overwrite the default configuration')
  })

  it('set && confirm correct data coverage', () => {
    const result = run(['config', 'set', correctJsonPath], { input: 'y\n' })
    expect(result).toContain('successful')
    restoreDefaultJson()
  })

  it('list', () => {
    const data = fs.readJsonSync(defaultJsonPath)
    const result = run(['config', 'list'])
    expect(data).toEqual(JSON.parse(result))
  })
})
