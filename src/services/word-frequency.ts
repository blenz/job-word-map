import { WordFreq } from '@/components/word-cloud'
import { WordParser, wordParser, WordType } from '@/lib/word-parser'
import { JobDataProvider, jobDataProvider } from '@/providers/job-data'

export interface WordFrequencyService {
  generateWordFreqs(job: string, wordType: WordType): Promise<WordFreq[]>
  getWordTypes(): WordType[]
}

class Service implements WordFrequencyService {
  constructor(
    private jobDataProvider: JobDataProvider,
    private wordParser: WordParser
  ) {}

  async generateWordFreqs(job: string, wordType: WordType): Promise<WordFreq[]> {
    const wordFreqs: Map<string, number> = new Map()

    const jobDetails = await this.jobDataProvider.getDetails(job)

    jobDetails.forEach(detail => {
      const cleanedDesc = detail
        .split(' ')
        .map(d => d.replace(',', ''))
        .filter(d => !Number.isInteger(d))

      const parsedWords = this.wordParser.parseWords(cleanedDesc, wordType)
      parsedWords.forEach(word => {
        const key = word.toLowerCase()
        const val = wordFreqs.get(key)
        wordFreqs.set(key, val ? val + 1 : 1)
      })
    })

    return Array.from(wordFreqs).map<WordFreq>(([text, value]) => ({ text, value }))
  }

  getWordTypes(): WordType[] {
    return this.wordParser.getWordTypes()
  }
}

export const wordFrequencyService = new Service(jobDataProvider, wordParser)
