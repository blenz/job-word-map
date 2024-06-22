const natural = require('natural')

const lexicon = new natural.Lexicon('EN', 'N', 'NNP')
const ruleSet = new natural.RuleSet('EN')
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet)

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

function parseWords(tokens: string[], wordType: WordType): string[] {
  const { taggedWords } = tagger.tag(tokens) as TaggedWords
  const tagFilter = wordTypes[wordType]

  return taggedWords.filter(({ tag }) => tagFilter.includes(tag)).map(({ token }) => token)
}

function getWordTypes(): WordType[] {
  return Object.keys(wordTypes) as WordType[]
}

export const wordParser = {
  parseWords,
  getWordTypes,
}
