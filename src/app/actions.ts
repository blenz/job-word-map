"use server"

import { WordFreq } from "@/components/word-cloud";
import { service } from "@/services/word-frequency"

export async function getWordFreqs(job: string, wordType: string): Promise<WordFreq[]> {
    try {
        return await service.buildWordFreqs(job, wordType)
    } catch (error) {
        throw new Error(error as string)
    }
}

export async function getWordTypes(): Promise<string[]> {
    try {
        return service.getWordTypes()
    } catch (error) {
        throw new Error(error as string)
    }
}
