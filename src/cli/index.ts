#!/usr/bin/env node

import cac from 'cac';
import ora from 'ora';

import { selectStarterTemplate } from './commands/template/index.ts';

const cli = cac('helper-cli')


cli.command('template', 'Create a new project from a template')
    .option('--type <type>', 'Template type')
    .option('--dir <dir>', 'Directory to download the template to')
    .action(async(options) => {
        console.log('options',options);
        const _dir = options.dir || process.cwd()
        const _type = options.type || (await selectStarterTemplate())
        console.log('dir', _dir);
        console.log('type', _type);

    })

cli.version('0.0.1')
cli.help()

cli.parse()
