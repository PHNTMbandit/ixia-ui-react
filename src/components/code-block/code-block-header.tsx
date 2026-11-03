import { cn } from '@/utils/cn'

type CodeBlockHeaderProps = React.ComponentProps<'div'>

export function CodeBlockHeader({ className, ref, ...props }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        // Keep the tab-specific default overridable by ordinary padding classes.
        'flex min-h-2xl items-center justify-between border-b border-border px-2xs pl-(--code-block-header-padding-left) [--code-block-header-padding-left:var(--spacing-2xs)] has-data-[slot=code-block-tabs]:[--code-block-header-padding-left:0px]',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
