'use server'

import { WordFreq } from "@/types"

export async function fetchWords(job: string): Promise<WordFreq[]> {
    return [
        { text: 'test', value: 10 },
        { text: 'test1', value: 100 },
        { text: 'test2', value: 1000 },
    ]
}