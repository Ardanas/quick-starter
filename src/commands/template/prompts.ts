import { basename } from 'node:path'
import inquirer from 'inquirer'
import starterTemplates from '../../../starter-templates.json'
import { getStarterTemplateData } from '../../utils'

export async function selectStarterTemplate(template: string | undefined, configFile: string | undefined): Promise<string> {
  const templateChoices = configFile ? getStarterTemplateData(configFile) : starterTemplates
  if (template) {
    const res = templateChoices.find(item => item.name === template)
    return res ? res.value : template
  }
  const { repo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: 'Select a template type:',
      choices: templateChoices,
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
