const natural = require('natural')

const wordTypes: { [key in WordType]: string[] } = {
  verbs: ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'],
  nouns: ['NN', 'NNS', 'NNP', 'NNPS'],
  adjectives: ['JJ', 'JJS', 'JJR'],
  adverbs: ['RB', 'RBS', 'RBR'],
}

export type WordType = 'verbs' | 'nouns' | 'adjectives' | 'adverbs'

type TaggedWords = {
  taggedWords: { token: string; tag: string }[]
}

export interface WordParser {
  parseWords(tokens: string[], wordType: WordType): string[]
  getWordTypes(): WordType[]
}

class Parser implements WordParser {
  private tagger

  constructor() {
    let lexicon = new natural.Lexicon('EN', 'N', 'NNP')
    let ruleSet = new natural.RuleSet('EN')
    this.tagger = new natural.BrillPOSTagger(lexicon, ruleSet)
  }

  parseWords(tokens: string[], wordType: WordType): string[] {
    const { taggedWords } = this.tagger.tag(tokens) as TaggedWords
    const tagFilter = wordTypes[wordType]

    return taggedWords.filter(({ tag }) => tagFilter.includes(tag)).map(({ token }) => token)
  }

  getWordTypes(): WordType[] {
    return Object.keys(wordTypes) as WordType[]
  }
}

export const wordParser = new Parser()
