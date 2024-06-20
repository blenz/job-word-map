'use client'

import { useState } from "react";
import { getWordFreqs } from "./actions";
import { WordFreq } from "@/types";
import SearchInput from "@/components/search-input";
import WordCloud from "@/components/word-cloud";

export default function App() {
  const [wordFreqs, setWords] = useState<WordFreq[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const searchJob = async (job: string) => {
    try {
      setLoading(true)
      const wordFreqs = await getWordFreqs(job)
      setWords(wordFreqs)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <SearchInput loading={loading} placeholder="Job" onSearch={searchJob} />
      <WordCloud wordFreqs={wordFreqs} />
    </div>
  );
}
