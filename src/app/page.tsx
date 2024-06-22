'use client'

import { useEffect, useState } from "react";
import { getWordFreqs, getWordTypes } from "./actions";
import { WordCloud, WordFreq } from "@/components/word-cloud";
import SearchInput from "@/components/search-input";
import { WordType } from "@/lib/word-parser";

export default function App() {
  const [wordFreqs, setWords] = useState<WordFreq[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [wordTypes, setWordTypes] = useState<WordType[]>([])

  useEffect(() => {
    (async () => {
      setWordTypes(await getWordTypes())
    })()
  }, [])

  const searchJob = async (job: string, wordType: WordType) => {
    try {
      setLoading(true)
      const wordFreqs = await getWordFreqs(job, wordType)
      setWords(wordFreqs)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SearchInput loading={loading} values={wordTypes} placeholder="Job" onSearch={searchJob} />
      <WordCloud loading={loading} wordFreqs={wordFreqs} />
    </div>
  );
}
