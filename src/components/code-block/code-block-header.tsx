import { cn } from '@/utils/cn'

type CodeBlockHeaderProps = React.ComponentProps<'div'>

export function CodeBlockHeader({ className, ref, ...props }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        'flex min-h-2xl items-center justify-between border-b border-border p-2xs',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
