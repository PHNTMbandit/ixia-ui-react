import type { Icon } from '@phosphor-icons/react'

type ThemeValue = 'light' | 'dark' | 'system'

interface Theme {
  value: ThemeValue
  label: string
  icon: Icon
}

interface ThemeProviderState {
  theme: ThemeValue
  setTheme: (theme: ThemeValue) => void
}

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: ThemeValue
  storageKey?: string
}

export type { ThemeValue, Theme, ThemeProviderState, ThemeProviderProps }
