import { join } from 'node:path'
import type { CommonExecOptions, SpawnSyncReturns } from 'node:child_process'
import { execSync } from 'node:child_process'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { createNonEmptyDir, emptyDir, isDirEmpty } from '../src/utils/file'

const CLI_PATH = join(__dirname, '../bin', 'my-helper-cli.mjs')
const genPath = join(__dirname, '../TEMPLATE')

function run(args: string[], options?: CommonExecOptions): string {
  try {
    return execSync(`node ${CLI_PATH} ${args.join(' ')}`, { encoding: 'utf-8', ...options }).toString()
  }
  catch (error) {
    return (error as SpawnSyncReturns<string>).stdout
  }
}

function createGenPath() {
  createNonEmptyDir(genPath)
}

function emptyGenPath() {
  emptyDir(genPath)
}

beforeAll(() => emptyGenPath())
afterEach(() => emptyGenPath())

describe('templte', () => {
  it('prompts for the options if none supplied', () => {
    const result = run(['template'])
    expect(result).toContain('Select a template type')
  })

  it('--name', () => {
    const result = run(['template', '--name'])
    expect(result).toContain('Select a template type')
  })

  it('the target folder is not empty', () => {
    createGenPath()
    const result = run(['template', '--name', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('do you need to overwrite it？')
  })

  it('the target folder is empty', () => {
    emptyGenPath()
    const result = run(['template', '--name', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('')
  })

  it('the target folder is not empty & dont force', () => {
    createGenPath()
    const result = run(['template', '--name', `--dir=${genPath}`, '-f=false'], { input: '1\n' })
    expect(result).toContain('the folder is not empty')
  })

  it('-f, --force', () => {
    createGenPath()
    const result = run(['template', '--name', `--dir=${genPath}`, '--force'], { input: '1\n' })
    expect(result).toContain('')
  })

  it('-f, --force=false', () => {
    createGenPath()
    run(['template', '--name', `--dir=${genPath}`, '--force=false'], { input: '1\n' })
    const isEmpty = isDirEmpty(genPath)
    expect(isEmpty).toEqual(false)
  })
})
