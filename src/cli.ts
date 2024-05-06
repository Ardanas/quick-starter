#!/usr/bin/env node
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import cac from 'cac'
import { name, version } from '../package.json'
import { download, selectStarterTemplate } from './commands/template/index.ts'

const cli = cac(name)

cli.command('template', 'Create a new project from a template')
  .option('--type <type>', 'Template type')
  .option('--dir <dir>', 'Directory to download the template to')
  .option('-f, --force', 'Remove any existing directory or file recursively before cloning.', { default: false })
  .action(async (options) => {
    const _dir = options.dir ? resolve(options.dir) : cwd()
    const _repo = await selectStarterTemplate(options.type)
    await download(_repo, _dir, options.force)
  })

cli.version(version)
cli.help()

cli.parse()
