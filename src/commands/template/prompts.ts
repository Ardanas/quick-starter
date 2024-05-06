import inquirer from 'inquirer';
import chalk from 'chalk';
import starterTemplates from '../../../starter-templates.json';



export async function selectStarterTemplate(type?: string): Promise<string> {
    if (type) {
      const template = starterTemplates.find(item => item.value === type)
      if (template) return template.value
      console.log(chalk.redBright.bold('The template of this type cannot be found. Please select from the following options'))
    }
    const { repo } = await inquirer.prompt([
      {
        type: 'list',
        name: 'repo',
        message: 'Select a template type:',
        choices: starterTemplates
      },
    ]);
    return repo
}


export async function isOverwriteDir(dir:string) {
     const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `文件夹 ${dir} 不为空, 是否需要覆盖?`,
        default: false
      }
    ]);
    return overwrite
}