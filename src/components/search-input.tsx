import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Props {
    placeholder: string
    onSearch: (input: string) => void
}

export default function SearchInput({ placeholder, onSearch }: Props) {
    const [input, setInput] = useState('')

    return (
        <div className="flex items-center space-x-2">
            <Input
                type="input"
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                type="submit"
                className="bg-blue-500"
                onClick={() => onSearch(input)}
                disabled={!input}
            >
                Search
            </Button>
        </div>
    );
}
