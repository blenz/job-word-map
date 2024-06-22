import { getJobDetails } from "@/providers/job-data"
import { parseWords, getWordTypeKeys } from './providers/word-parser'
import { WordFreq } from "@/components/word-cloud"

async function buildWordFreqs(job: string, wordType: string): Promise<WordFreq[]> {
    const wordFreqs: Map<string, number> = new Map()

    const jobDetails = await getJobDetails(job)

    jobDetails.forEach(detail => {
        const cleanedDesc = detail.split(' ').map(d => d.replace(',', '')).filter(d => !Number.isInteger(d))
        const parsedWords = parseWords(cleanedDesc, wordType)

        parsedWords.forEach(word => {
            const key = word.toLowerCase()
            const val = wordFreqs.get(key)
            wordFreqs.set(key, val ? val + 1 : 1)
        })
    })

    return Array.from(wordFreqs).map<WordFreq>(([text, value]) => ({ text, value }))
}

function getWordTypes(): string[] {
    return getWordTypeKeys()
}

export default {
    buildWordFreqs,
    getWordTypes,
}