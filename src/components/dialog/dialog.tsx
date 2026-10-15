import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import type { DialogProps } from './dialog.types'

export function Dialog({ ...props }: DialogProps) {
  return <BaseDialog.Root {...props} />
}
