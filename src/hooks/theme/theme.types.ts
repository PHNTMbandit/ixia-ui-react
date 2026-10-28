import type { IconComponent } from '@/components/icon'

type ThemeValue = 'light' | 'dark' | 'system'

interface Theme {
  value: ThemeValue
  label: string
  icon: IconComponent
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
