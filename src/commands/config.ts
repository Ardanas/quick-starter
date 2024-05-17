import { env } from 'node:process'
import { execSync } from 'node:child_process'
import { defaultJsonPath, getStarterTemplateData, readStarterTemplateData, writeJson } from '../utils'
import { log } from '../utils/log'
import { isOverwriteFile } from '.'

const handlersMap = {
  set: handleSetOperation,
  edit: handleEditOperation,
  list: handleListOperation,
}

function handleSetOperation(filePath?: string) {
  if (!filePath)
    throw new Error('Please enter the file path to be replaced')
  const newData = getStarterTemplateData(filePath)
  isOverwriteFile().then((isOverwrite) => {
    if (!isOverwrite)
      return

    writeJson(defaultJsonPath, newData, { spaces: 2 })
    log.success('sucessful')
    log.text(JSON.stringify(newData, null, 4))
  })
}

function handleEditOperation() {
  env.EDITOR = 'vi'
  execSync(`vi ${defaultJsonPath}`, { stdio: [0, 1, 2] })
  log.success(`sucessful`)
}

function handleListOperation() {
  const res = readStarterTemplateData()
  log.text(JSON.stringify(res, null, 4))
}

export function handleConfig(actionType: keyof typeof handlersMap, value?: string) {
  const handler = handlersMap[actionType]
  if (!handler)
    throw new Error(`Invalid action type: ${actionType}，Please use one of the following actions: ${Object.keys(handlersMap).join(', ')}`)

  handler(value)
}
