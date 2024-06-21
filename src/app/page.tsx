'use client'

import { useEffect, useState } from "react";
import { getWordFreqs, getWordTypes } from "./actions";
import { WordFreq } from "@/types";
import SearchInput from "@/components/search-input";
import WordCloud from "@/components/word-cloud";

export default function App() {
  const [wordFreqs, setWords] = useState<WordFreq[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [wordTypes, setWordTypes] = useState<string[]>([])

  useEffect(() => {
    (async () => {
      setWordTypes(await getWordTypes())
    })()
  }, [])

  const searchJob = async (job: string, wordType: string) => {
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
