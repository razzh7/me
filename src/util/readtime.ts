import readingTime from 'reading-time'

const estimateTime = (text: string) => {
  let { text: readtime, words: wordsNumber } = readingTime(text)
  let words = wordsNumber + ' words'
  readtime = readtime.replace(' read', '')

  return {
    readtime,
    words
  }
}

export default estimateTime
