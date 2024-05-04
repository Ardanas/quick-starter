import inquirer from 'inquirer';
import starterTemplates from '../../../../starter-templates.json';

export async function selectStarterTemplate(): Promise<string> {
    const { selectedTemplateType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTemplateType',
        message: 'Select a template type:',
        choices: starterTemplates
      },
    ]);
    return selectedTemplateType
}