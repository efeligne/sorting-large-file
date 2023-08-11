import createLargeFile from './lib/createLargeFile.js'
import externalMergeSorting from './lib/externalMergeSorting.js'

import config from './data/config.json' assert { type: 'json' }

const { unsortedFile, largeFileSize, stringLength } = config

void (async function () {
  await createLargeFile(unsortedFile, stringLength, largeFileSize)
  await externalMergeSorting()
  console.log('All operations are completed.\n')
})()
