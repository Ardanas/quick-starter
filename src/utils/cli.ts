import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { IChoice } from '../types'
import { isFileExist, readJson } from './file'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const defaultJsonPath = join(__dirname, '../default.json')

export function getStarterTemplateData(filePath: string): IChoice[] {
  const isExist = isFileExist(filePath)
  if (!isExist)
    throw new Error(`file does not exist`)
  let jsonData: IChoice[] = readJson(filePath)
  if (!Array.isArray(jsonData))
    throw new Error('JSON data is not an array')
  jsonData = jsonData
    .filter(item => item.name && item.value)
    .map(item => ({ name: item.name, value: item.value }))
  if (!jsonData.length)
    throw new Error(`The data cannot be empty, please ensure the correct data format. \n eg: [{ name: 'ts', value: 'gh:antfu/starter-ts' }]`)
  return jsonData
}

export function readStarterTemplateData(): IChoice[] {
  return readJson(defaultJsonPath)
}
