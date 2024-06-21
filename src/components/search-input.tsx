import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Props {
    loading: boolean
    placeholder: string
    onSearch: (input: string) => void
}

export default function SearchInput({ loading, placeholder, onSearch }: Props) {
    const [input, setInput] = useState('')

    return (
        <div className="flex justify-center">
            <div className="flex space-x-2 w-full max-w-[50%]">
                <Input
                    type="input"
                    placeholder={placeholder}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    onKeyDown={({ key }) => key === "Enter" && onSearch(input)}
                />
                <Button
                    type="submit"
                    className="bg-blue-500"
                    onClick={() => onSearch(input)}
                    disabled={!input || loading}
                >
                    Search
                </Button>
            </div>
        </div>
    );
}
