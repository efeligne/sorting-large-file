import { createReadStream } from 'node:fs'
import readline from 'node:readline'

import realSize from './realSize.js'
import createTempFile from './createTempFile.js'

import config from '../data/config.json' assert { type: 'json'}

async function splitToSortedChunks(tempFiles: string[]): Promise<void> {
  let bufferSize = 0
  const strings: string[] = []

  const streamReader = createReadStream(config.unsortedFile)
  const lines = readline.createInterface({
    input: streamReader,
    crlfDelay: Infinity
  })
  console.log('Created readable stream from a large file.\n')

  for await (const line of lines) {
    strings.push(line)
    bufferSize += realSize(`${line}\n`)

    if (bufferSize >= config.maxBufferSize) {
      await createTempFile(strings, tempFiles)
      strings.length = 0
      bufferSize = 0
    }
  }

  if (strings.length > 0) {
    await createTempFile(strings, tempFiles)
    console.log('\nCreation of temporary files is completed.\n')
  }
}

export default splitToSortedChunks
