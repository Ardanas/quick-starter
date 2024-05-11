#!/usr/bin/env node

import { resolve } from 'node:path'
import { cwd, exit } from 'node:process'
import cac from 'cac'
import chalk from 'chalk'
import { name, version } from '../package.json'
import { download, selectStarterTemplate } from './commands/template/index.ts'

const cli = cac(name)

cli.command('[template] [dir]', 'Create a new project from a template')
  .option('-f, --force', 'Remove any existing directory or file recursively before cloning.')
  .action(async (template, dir, options) => {
    const _dir = dir ? resolve(dir) : cwd()
    const _template = await selectStarterTemplate(template)
    const { force, ...restOptions } = options
    await download(_template, _dir, force, restOptions)
  })

cli.version(version)
cli.help()

try {
  cli.parse()
}
catch (error: any) {
  // eslint-disable-next-line no-console
  console.log(chalk.redBright(`[error]: ${error.message}`))
  exit(1)
}
