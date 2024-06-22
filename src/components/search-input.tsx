import { Button } from '@/components/ui/button'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { capitalize, cn } from '@/lib/utils'
import { WordType } from '@/lib/word-parser'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  loading: boolean
  values: WordType[]
  placeholder: string
  onSearch: (input: string, value: WordType) => void
}

export default function SearchInput({ loading, values, placeholder, onSearch }: Props) {
  const [input, setInput] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<WordType>()

  useEffect(() => setValue(values[0]), [values])

  return (
    <div className="flex justify-center bg-sky-700 p-8 shadow-inner">
      <div className="flex w-full max-w-[40%] space-x-2">
        <div className="flex">
          <Input
            type="input"
            placeholder={placeholder}
            onChange={e => setInput(e.target.value)}
            onKeyDown={({ key }) => key === 'Enter' && onSearch(input, value as WordType)}
            disabled={loading}
            className="rounded-br-none rounded-tr-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between rounded-bl-none rounded-tl-none"
                disabled={loading || !values.length}
              >
                {capitalize(values.find(val => val === value) || '')}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandGroup>
                  {values.map(val => (
                    <CommandItem
                      key={val}
                      value={val}
                      onSelect={val => {
                        setValue(val as WordType)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn('mr-2 h-4 w-4', value === val ? 'opacity-100' : 'opacity-0')} />
                      {capitalize(val)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <Button
          type="submit"
          className="bg-blue-900"
          onClick={() => onSearch(input, value as WordType)}
          disabled={!input || loading}
        >
          Search
        </Button>
      </div>
    </div>
  )
}
