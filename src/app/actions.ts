"use server"

import { WordFreq } from "@/types"
import { createWordFreqs } from "@/services"
import { getJobDescriptions } from "@/providers/jobs"
import { getWordTypeKeys } from "@/providers/pos";

export async function getWordFreqs(job: string, wordType: string): Promise<WordFreq[]> {
    const descs = await getJobDescriptions(job)
    return createWordFreqs(descs, wordType)
}

export async function getWordTypes(): Promise<string[]> {
    return getWordTypeKeys()
}