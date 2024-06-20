"use server"

import { WordFreq } from "@/types"
import { createWordFreqs } from "@/services"
import { getJobData } from "@/providers/jobs"

export async function getWordFreqs(job: string): Promise<WordFreq[]> {
    const data = await getJobData(job)
    // return createWordFreqs(data)
    return [
        { text: 'test', value: 100 },
        { text: 'test1', value: 100 },
        { text: 'test2', value: 100 },
    ]
}