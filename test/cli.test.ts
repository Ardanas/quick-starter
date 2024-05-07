import { join } from 'node:path'
import type { CommonExecOptions, SpawnSyncReturns } from 'node:child_process'
import { execSync } from 'node:child_process'
import fs from 'fs-extra'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'

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

function createNonEmptyDir() {
  fs.mkdirpSync(genPath)

  const pkgJson = join(genPath, 'package.json')
  fs.writeFileSync(pkgJson, '{ "foo": "bar" }')
}

function emptyDir() {
  fs.remove(genPath)
}

beforeAll(() => emptyDir())
afterEach(() => emptyDir())

describe('templte', () => {
  it('prompts for the options if none supplied', () => {
    const result = run(['template'])
    expect(result).toContain('Select a template type')
  })

  it('--type', () => {
    const result = run(['template', '--type'])
    expect(result).toContain('Select a template type')
  })

  it('the target folder is not empty', () => {
    createNonEmptyDir()
    const result = run(['template', '--type', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('the folder is not empty')
  })

  it('the target folder is empty', () => {
    emptyDir()
    const result = run(['template', '--type', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('')
  })

  it('-f --force', () => {
    createNonEmptyDir()
    const result = run(['template', '--type', `--dir=${genPath}`, '-f'], { input: '1\n' })
    expect(result).toContain('')
  })
})
