const generateRandomString = (len: number): string => {
  let result: string = ''

  while (result.length < len) {
    result += Math.random().toString(36).substring(2)
  }

  return result.substring(0, len)
}

export default generateRandomString
