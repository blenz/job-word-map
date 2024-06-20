'use client'

import { useState } from "react";
import { fetchWords } from "./actions";
import { WordFreq } from "@/types";
import SearchInput from "@/components/search-input";
import WordCloud from "@/components/word-cloud";

export default function App() {
  const [wordFreqs, setWords] = useState<WordFreq[]>([])

  const searchJob = async (job: string) => {
    const wordFreqs = await fetchWords(job)
    setWords(wordFreqs)
  }

  return (
    <div>
      <SearchInput placeholder="Job" onSearch={searchJob} />
      <WordCloud wordFreqs={wordFreqs} />
    </div>
  );
}
