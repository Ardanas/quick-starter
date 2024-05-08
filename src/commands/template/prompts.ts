import { basename } from 'node:path'
import inquirer from 'inquirer'
import starterTemplates from '../../../starter-templates.json'

export async function selectStarterTemplate(name?: string): Promise<string> {
  if (name && typeof name === 'string') {
    const template = starterTemplates.find(item => item.value === name)
    return template ? template.value : name
  }
  const { repo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'Select a template type:',
      choices: starterTemplates,
    },
  ])
  return repo
}

export async function isOverwriteDir(dir: string) {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `the folder [${basename(dir)}] is not empty, do you need to overwrite it？`,
      default: false,
    },
  ])
  return overwrite
}
