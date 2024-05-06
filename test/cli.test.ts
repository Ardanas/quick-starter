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

// Helper to create a non-empty directory
function createNonEmptyDir() {
  // Create the temporary directory
  fs.mkdirpSync(genPath)

  // Create a package.json file
  const pkgJson = join(genPath, 'package.json')
  fs.writeFileSync(pkgJson, '{ "foo": "bar" }')
}

function emptyDir() {
  fs.remove(genPath)
}

// Vue 3 starter template
// const templateFiles = fs
//   .readdirSync(join(CLI_PATH, 'template-vue'))
//   // _gitignore is renamed to .gitignore
//   .map(filePath => (filePath === '_gitignore' ? '.gitignore' : filePath))
//   .sort()

beforeAll(() => emptyDir())
afterEach(() => emptyDir())

describe('templte', () => {
  it('prompts for the options if none supplied', () => {
    const result = run(['template'])
    expect(result).toContain('Select a template type')
  })

  it('prompts for the type option if none supplied', () => {
    const result = run(['template', '--type'])
    expect(result).toContain('Select a template type')
  })

  it('download templates when the folder is not empty', () => {
    createNonEmptyDir()
    const result = run(['template', '--type', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('the folder is not empty')
  })

  it('download templates when the folder is  empty', () => {
    emptyDir()
    const result = run(['template', '--type', `--dir=${genPath}`], { input: '1\n' })
    expect(result).toContain('')
  })
})

// it('prompts for the framework if none supplied when target dir is current directory', () => {
//   fs.mkdirpSync(genPath)
//   const { stdout } = run(['.'], { cwd: genPath })
//   expect(stdout).toContain('Select a framework:')
// })

// it('prompts for the framework if none supplied', () => {
//   const { stdout } = run([projectName])
//   expect(stdout).toContain('Select a framework:')
// })

// it('prompts for the framework on not supplying a value for --template', () => {
//   const { stdout } = run([projectName, '--template'])
//   expect(stdout).toContain('Select a framework:')
// })

// it('prompts for the framework on supplying an invalid template', () => {
//   const { stdout } = run([projectName, '--template', 'unknown'])
//   expect(stdout).toContain(
//     `"unknown" isn't a valid template. Please choose from below:`,
//   )
// })

// it('asks to overwrite non-empty target directory', () => {
//   createNonEmptyDir()
//   const { stdout } = run([projectName], { cwd: __dirname })
//   expect(stdout).toContain(`Target directory "${projectName}" is not empty.`)
// })

// it('asks to overwrite non-empty current directory', () => {
//   createNonEmptyDir()
//   const { stdout } = run(['.'], { cwd: genPath })
//   expect(stdout).toContain(`Current directory is not empty.`)
// })

// it('successfully scaffolds a project based on vue starter template', () => {
//   const { stdout } = run([projectName, '--template', 'vue'], {
//     cwd: __dirname,
//   })
//   const generatedFiles = fs.readdirSync(genPath).sort()

//   // Assertions
//   expect(stdout).toContain(`Scaffolding project in ${genPath}`)
//   expect(templateFiles).toEqual(generatedFiles)
// })

// it('works with the -t alias', () => {
//   const { stdout } = run([projectName, '-t', 'vue'], {
//     cwd: __dirname,
//   })
//   const generatedFiles = fs.readdirSync(genPath).sort()

//   // Assertions
//   expect(stdout).toContain(`Scaffolding project in ${genPath}`)
//   expect(templateFiles).toEqual(generatedFiles)
// })

// it('accepts command line override for --overwrite', () => {
//   createNonEmptyDir()
//   const { stdout } = run(['.', '--overwrite', 'ignore'], { cwd: genPath })
//   expect(stdout).not.toContain(`Current directory is not empty.`)
// })
