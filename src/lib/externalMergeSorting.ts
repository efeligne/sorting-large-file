import readline from 'node:readline'
import { createReadStream, createWriteStream } from 'node:fs'
import { rm } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'

import splitToSortedChunks from './splitToSortedChunks.js'

import config from '../data/config.json' assert { type: 'json' }

async function externalMergeSorting(): Promise<void> {
  const tempFiles: string[] = []

  await splitToSortedChunks(tempFiles)

  const chunkReaders = tempFiles.map(
    (tempFile) => readline.createInterface({
      input: createReadStream(tempFile),
      crlfDelay: Infinity
    })[Symbol.asyncIterator]()
  )
  console.log('Created readable streams from all temporary files.\n')

  const minValues = await Promise.all<string>(
    chunkReaders.map(
      async (chunkReader) => {
        return await chunkReader
          .next()
          .then((iteratorResult) => iteratorResult.value)
      }
    )
  )

  console.log('Merge sorting...\n')
  await pipeline(
    async function* () {
      while (chunkReaders.length > 0) {
        const [minimalString] = minValues.slice().sort()
        const i = minValues.findIndex((v) => v === minimalString)
        const { value, done } = await chunkReaders[i].next()
        if (!(done ?? false)) {
          minValues[i] = value
        } else {
          minValues.splice(i, 1)
          chunkReaders.splice(i, 1)
        }
        yield `${minimalString}\n`
      }
    },
    createWriteStream(config.sortedFile)
  )

  console.log('Merge sorting is completed.')
  console.log('Results file: ', config.sortedFile)

  await rm(config.tempDir, { force: true, recursive: true })
  console.log('Temporary files have been deleted.\n')
}

export default externalMergeSorting
