import { WordFreq } from '@/types'
import parseKeyWords from './providers/pos'

export function createWordFreqs(descs: string[]): WordFreq[] {
    let wordFreqs: { [key: string]: number } = {}

    descs.forEach(desc => {
        const sanitizedDesc = desc.replace(/\W/g, ' ').split(' ').filter(w => w)
        const parsedWords = parseKeyWords(sanitizedDesc)

        parsedWords.forEach(word => {
            word = word.toLowerCase()
            if (word in wordFreqs) {
                wordFreqs[word] = ++wordFreqs[word]
            } else {
                wordFreqs[word] = 1
            }
        })
    })

    return Object.entries(wordFreqs)
        .map<WordFreq>(([text, value]) => ({ text, value }))
}