"use server"

import { WordFreq } from "@/types"
import { createWordFreqs } from "@/services"
import { getJobDescriptions } from "@/providers/jobs"

export async function getWordFreqs(job: string): Promise<WordFreq[]> {
    const descs = await getJobDescriptions(job)
    return createWordFreqs(descs)
}