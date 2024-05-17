/* eslint-disable no-console */
import chalk from 'chalk'

const error = chalk.bold.red
const warning = chalk.hex('#FFA500')

export const log = {
  text(message: string) {
    console.table(chalk.greenBright(message))
  },
  info(message: string) {
    console.log(chalk.blue(`ℹ️ ${message}`))
  },
  success(message: string) {
    console.log(chalk.magenta(`🎉 ${message}`))
  },
  warning(message: string) {
    console.log(warning(`⚠️ ${message}`))
  },
  error(message: string) {
    console.log(error(`❌ ${message}`))
  },
}
