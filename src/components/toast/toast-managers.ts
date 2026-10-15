import { createToastManager } from './toast-manager'

const anchoredToastManager = createToastManager(),
  stackToastManager = createToastManager()

export { anchoredToastManager, stackToastManager }
