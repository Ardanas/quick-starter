#!/usr/bin/env node

import { resolve } from 'node:path'
import { cwd, exit } from 'node:process'
import cac from 'cac'
import { name, version } from '../package.json'
import { download, handleConfig, selectStarterTemplate } from './commands'
import { log } from './utils/log'

const cli = cac(name)

cli.command('config <action> [value]', 'config file')
  .action((action, value) => {
    handleConfig(action, value)
  })

cli.command('[template] [dir]', 'Create a new project from a template')
  .option('--dir [dir]', 'A relative or absolute path where to extract the template')
  .option('-c, --config [filePath]', 'Your starter template configuration file path')
  .option('-f, --force', 'Remove any existing directory or file recursively before cloning.')
  .action(async (template, dir, options) => {
    try {
      const { dir: optionDir, force, config: configFile, ...restOptions } = options
      const targetDir = optionDir || dir
      const _dir = targetDir ? resolve(targetDir) : cwd()
      const _template = await selectStarterTemplate(template, configFile)
      await download(_template, _dir, force, restOptions)
    }
    catch (error: any) {
      log.error(error.message)
      exit(1)
    }
  })

cli.version(version)
cli.help()

try {
  cli.parse()
}
catch (error: any) {
  log.error(error.message)
  exit(1)
}
