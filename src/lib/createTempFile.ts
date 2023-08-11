import path from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

import config from '../data/config.json' assert { type: 'json' }

async function createTempFile(strings: string[], tempFiles: string[]): Promise<void> {
  strings.sort()
  const tempFileName: string = path.join(config.tempDir, `chunk_${tempFiles.length}`)
  console.log(`Creating a temporary file: ${tempFileName}`)
  tempFiles.push(tempFileName)

  await pipeline(
    strings.map((s) => `${s}\n`),
    createWriteStream(tempFileName)
  )
}

export default createTempFile
