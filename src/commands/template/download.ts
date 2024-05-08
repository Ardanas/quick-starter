import ora from 'ora'
import chalk from 'chalk'
import type { DownloadTemplateOptions } from 'giget'
import { downloadTemplate } from 'giget'
import { emptyDir, ensureDir, isDirEmpty } from '../../utils'
import { isOverwriteDir } from './prompts'

export async function download(template: string, dir: string, force: boolean | undefined, options: DownloadTemplateOptions) {
  ensureDir(dir)
  const isEmpty = isDirEmpty(dir)
  if (!isEmpty) {
    if (force === false) {
      // eslint-disable-next-line no-console
      return console.log(chalk.yellow(`[warning]: the folder is not empty`))
    }
    if (force === true) {
      emptyDir(dir)
    }
    else {
      const isOverwrite = await isOverwriteDir(dir)
      if (!isOverwrite)
        return
      emptyDir(dir)
    }
  }
  const spinner = ora('waiting download template')
  spinner.start()
  try {
    await downloadTemplate(template, {
      dir,
      force,
      forceClean: true,
      ...options,
    })
    spinner.succeed('download template succeed.')
  }
  catch (err: any) {
    spinner.fail(`Request failed...${err.message}`)
  }
}
