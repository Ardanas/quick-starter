import type { IChoice } from '../types'
import { isFileExist, readJson } from './file'

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
    throw new Error('The data cannot be empty, please ensure the correct data format')
  return jsonData
}
