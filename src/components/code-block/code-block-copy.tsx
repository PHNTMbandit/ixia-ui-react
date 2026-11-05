import { cn } from '@/utils/cn'

import { CopyButton } from '../copy-button'
import { Icon } from '../icon'
import { useCodeBlock } from './code-block'
import type { CodeBlockCopyProps } from './code-block.types'

const COPY_STATUS_ICON = {
  false: <Icon name="copy" />,
  true: <Icon name="selected" />,
}

export function CodeBlockCopy({
  className,
  children,
  disabled,
  ref,
  ...props
}: CodeBlockCopyProps) {
  const { currentValue } = useCodeBlock(),
    { code } = currentValue

  return (
    <CopyButton
      aria-label="Copy code"
      className={cn('', className)}
      ref={ref}
      size="medium"
      tone="neutral"
      variant="ghost"
      {...props}
      content={code ?? ''}
      disabled={disabled || code === undefined}
    >
      {(copied) => (
        <>
          {children}
          {COPY_STATUS_ICON[`${copied}`]}
        </>
      )}
    </CopyButton>
  )
}
