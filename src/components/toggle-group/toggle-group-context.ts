import { createContext, useContext } from 'react'

interface ToggleGroupContextType {
  size?: 'small' | 'medium' | 'large'
}

const ToggleGroupContext = createContext<ToggleGroupContextType | undefined>(undefined),
  useToggleGroupContext = () => {
    const context = useContext(ToggleGroupContext)
    return context
  }

export { ToggleGroupContext, useToggleGroupContext }
export type { ToggleGroupContextType }
