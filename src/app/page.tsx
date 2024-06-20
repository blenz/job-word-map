import { useState } from "react";
import { fetchWords } from "./actions";
import SearchInput from "@/components/search-input";
export default function App() {
  const [words, setWords] = useState<string[]>([])

  const searchJob = async (job: string) => {
    const words = await fetchWords(job)
    setWords(words)
  }

  return (
    <main>
      <div className="px-20">
        <SearchInput placeholder="Job" onSearch={searchJob} />
      </div>
    </main>
  );
}
