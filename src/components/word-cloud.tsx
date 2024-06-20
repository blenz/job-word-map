import { Text } from '@visx/text';
import { WordFreq } from '@/types'
import Wordcloud from '@visx/wordcloud/lib/Wordcloud'

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

interface Props {
    wordFreqs: WordFreq[]
}

export default function WordCloud({ wordFreqs }: Props) {
    return (
        <div className="flex justify-center items-center p-20">{
            !wordFreqs.length
                ? <h2>Search a job...</h2>
                : <Wordcloud
                    words={wordFreqs}
                    width={200}
                    height={300}
                    font={'Impact'}
                    rotate={0}
                >
                    {(cloudWords) =>
                        cloudWords.map((w, i) => (
                            <Text
                                key={w.text}
                                fill={colors[i % colors.length]}
                                textAnchor={'middle'}
                                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                                fontSize={w.size}
                                fontFamily={w.font}
                            >
                                {w.text}
                            </Text>
                        ))
                    }
                </Wordcloud>
        }</div>
    );
}
