const natural = require('natural');

const lexicon = new natural.Lexicon('EN', 'N', 'NNP');
const ruleSet = new natural.RuleSet('EN');
const tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

const tagFilter = ['NNP', 'VBN', 'NN']

type TaggedWords = {
    taggedWords: { token: string, tag: string }[]
}

export default function parseKeyWords(tokens: string[]): string[] {
    const { taggedWords } = tagger.tag(tokens) as TaggedWords

    return taggedWords
        .filter(({ tag }) => tagFilter.includes(tag))
        .map(({ token }) => token)
}