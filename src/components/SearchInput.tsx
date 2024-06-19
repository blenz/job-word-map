'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SearchInput() {
    const [input, setInput] = useState('')

    const search = () => {
        console.log(input)
    }

    return (
        <div className="flex items-center space-x-2 px-10">
            <Input
                type="input"
                placeholder="Job"
                onChange={(e) => setInput(e.target.value)}
            />
            <Button
                type="submit"
                className="bg-blue-500"
                onClick={search}
            >Search</Button>
        </div>
    );
}
