import readingTime from 'reading-time'

const estimateTime = (text: string) => {
  let { text: readtime, words: wordsNumber } = readingTime(text)
  const words = wordsNumber + ' words'
  readtime = readtime.replace(' read', '')

  return {
    readtime,
    words
  }
}

export default estimateTime
