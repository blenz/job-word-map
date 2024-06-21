const natural = require('natural');

const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const wordTypes: { [key: string]: string[] } = {
    'verbs': ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ'],
    'nouns': ['NN', 'NNS', 'NNP', 'NNPS'],
    'adjectives': ['JJ', 'JJS', 'JJR'],
    'adverbs': ['RB', 'RBS', 'RBR'],
}

type TaggedWords = {
    taggedWords: { token: string, tag: string }[]
}

export function parseKeyWords(tokens: string[], wordType: string): string[] {
    const { taggedWords } = tagger.tag(tokens) as TaggedWords
    const tagFilter = wordTypes[wordType]

    return taggedWords
        .filter(({ tag }) => tagFilter.includes(tag))
        .map(({ token }) => token)
}

export function getWordTypeKeys(): string[] {
    return Object.keys(wordTypes)
}