'use client'

import SearchInput from '@/components/search-input'
import { WordCloud, WordFreq } from '@/components/word-cloud'
import { WordType } from '@/lib/word-parser'
import { useEffect, useState } from 'react'
import { getWordFreqs, getWordTypes } from './actions'

export default function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [wordFreqs, setWordFreqs] = useState<WordFreq[]>([])
  const [wordTypes, setWordTypes] = useState<WordType[]>([])

  useEffect(() => {
    ;(async () => {
      const wordTypes = await getWordTypes()
      setWordTypes(wordTypes)
    })()
  }, [])

  const searchJob = async (job: string, wordType: WordType) => {
    try {
      setLoading(true)
      const wordFreqs = await getWordFreqs(job, wordType)
      setWordFreqs(wordFreqs)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <SearchInput loading={loading} values={wordTypes} placeholder="Job" onSearch={searchJob} />
        <WordCloud loading={loading} wordFreqs={wordFreqs} />
      </div>
    </>
  )
}
