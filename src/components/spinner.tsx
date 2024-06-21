import { cn } from "@/lib/utils"

interface Props {
    className?: string
}

export const Spinner = ({ className }: Props) => {
    return (
        <div
            className={cn("animate-spin inline-block border-[3px] border-current border-t-transparent rounded-full", className)}
        />
    )
}