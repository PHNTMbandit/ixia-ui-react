import { Alert as AlertRoot } from './alert'
import { AlertAction } from './alert-action'
import { AlertDescription } from './alert-description'
import { AlertIcon } from './alert-icon'
import { AlertTitle } from './alert-title'

const Alert = Object.assign(AlertRoot, {
  Action: AlertAction,
  Description: AlertDescription,
  Icon: AlertIcon,
  Title: AlertTitle,
})

export type {
  AlertActionProps,
  AlertDescriptionProps,
  AlertIconProps,
  AlertProps,
  AlertTitleProps,
} from './alert.types'
export { AlertDescription } from './alert-description'
export { AlertTitle } from './alert-title'
export { AlertAction } from './alert-action'
export { AlertIcon } from './alert-icon'

export { Alert }
