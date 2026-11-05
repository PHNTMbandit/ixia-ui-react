import type { Button } from '../button'

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, 'children'> & {
  children: (copied: boolean) => React.ReactNode
  content: string
  timeout?: number
}

export type { CopyButtonProps }
