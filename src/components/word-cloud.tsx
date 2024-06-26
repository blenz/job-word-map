import { Text } from '@visx/text'
import Wordcloud from '@visx/wordcloud/lib/Wordcloud'
import { scaleLog } from '@visx/scale'
import { Spinner } from './spinner'
import { BaseDatum } from '@visx/wordcloud/lib/types'

const colors = ['#143059', '#2F6B9A', '#82a6c2']

export type WordFreq = BaseDatum & { value: number }

interface Props {
  wordFreqs: WordFreq[]
  loading: boolean
}

export function WordCloud({ wordFreqs, loading }: Props) {
  const fontScaleVals: number[] = wordFreqs.map(w => w.value)
  const fontScaleDomain: number[] = [Math.min(...fontScaleVals), Math.max(...fontScaleVals)]
  const fontScale = scaleLog({ domain: fontScaleDomain, range: [10, 300] })
  const fontSizeSetter = (wordFreq: WordFreq) => fontScale(wordFreq.value)

  return (
    <div className="my-10 flex items-center justify-center overflow-auto">
      {!wordFreqs.length && !loading && <h2>Search a job...</h2>}

      {loading && (
        <div className="flex items-center space-x-3">
          <Spinner className="size-6" />
          <h2>Building word map...</h2>
        </div>
      )}

      {!!wordFreqs.length && !loading && (
        <Wordcloud
          words={wordFreqs}
          width={window.innerWidth}
          height={600}
          font={'Impact'}
          fontSize={fontSizeSetter}
          rotate={0}
        >
          {cloudWords =>
            cloudWords.map((w, i) => (
              <Text
                key={w.text}
                fill={colors[i % colors.length]}
                textAnchor={'middle'}
                transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
                fontSize={w.size}
                fontFamily={w.font}
                // onMouseEnter={() => console.log(w.size)}
              >
                {w.text}
              </Text>
            ))
          }
        </Wordcloud>
      )}
    </div>
  )
}
