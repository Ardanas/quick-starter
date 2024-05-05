#!/usr/bin/env node
import { resolve } from 'path';
import cac from 'cac';
import { selectStarterTemplate, download } from './commands/template/index.ts';
import { version}  from '../../package.json'

const cli = cac('helper-cli')


cli.command('template', 'Create a new project from a template')
    .option('--type <type>', 'Template type')
    .option('--dir <dir>', 'Directory to download the template to')
    .option('-f, --force', 'Remove any existing directory or file recursively before cloning.', { default: false })
    .action(async (options) => {
        console.log('options',options);
        const _dir = options.dir ? resolve(options.dir) : process.cwd()
        const _repo = await selectStarterTemplate(options.type)
        await download(_repo, _dir, options.force)
    })

cli.version(version)
cli.help()

cli.parse()
