import { basename } from 'node:path'
import inquirer from 'inquirer'
import { getStarterTemplateData, readStarterTemplateData } from '../utils'

export async function selectStarterTemplate(template: string | undefined, configFile: string | undefined): Promise<string> {
  const templateChoices = configFile ? getStarterTemplateData(configFile) : readStarterTemplateData()
  if (template) {
    const res = templateChoices.find(item => item.name === template)
    return res ? res.value : template
  }
  const { name } = await inquirer.prompt([
    {
      type: 'list',
      name: 'name',
      message: 'Select a template:',
      choices: templateChoices,
      pageSize: 10,
    },
  ])
  return name
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

export async function isOverwriteFile() {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'overwrite',
      message: `Do you want to overwrite the default configuration？`,
      default: false,
    },
  ])
  return overwrite
}
