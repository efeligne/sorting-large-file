import { createWriteStream } from 'node:fs'
import { rm, mkdir } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'

import realSize from './realSize.js'
import generateRandomString from './generateRandomString.js'

import config from '../data/config.json' assert { type: 'json' }

function* dataGenerator(len: number, fileSize: number | bigint): Generator<string> {
  let bytesPrepared = 0
  while (bytesPrepared < fileSize) {
    const data = `${generateRandomString(len)}\n`
    bytesPrepared += realSize(data)
    yield data
  }
  console.log('Created.\n')
}

async function createLargeFile(fileName: string, len: number, fileSize: number | bigint): Promise<void> {
  console.log('Creating a large file...')
  await mkdir(config.tempDir, { recursive: true })
  await rm(fileName, { force: true })
  await pipeline(
    dataGenerator(len, fileSize),
    createWriteStream(fileName))
}

export default createLargeFile
