import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export const Spinner = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-[3px] border-current border-t-transparent',
        className
      )}
    />
  )
}
