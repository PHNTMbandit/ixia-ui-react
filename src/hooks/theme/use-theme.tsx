import { createContext, useContext, useEffect, useState } from 'react'

import { DEFAULT_THEME, THEME_STORAGE_KEY } from './theme.constants.ts'
import type { ThemeProviderProps, ThemeProviderState, ThemeValue } from './theme.types.ts'

const initialState: ThemeProviderState = {
    setTheme: () => undefined,
    theme: 'system',
  },
  ThemeProviderContext = createContext<ThemeProviderState>(initialState)

function getStoredTheme(storageKey: string, fallback: ThemeValue): ThemeValue {
  const stored = localStorage.getItem(storageKey)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return fallback
}

function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = THEME_STORAGE_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeValue>(() => getStoredTheme(storageKey, defaultTheme))

  useEffect(() => {
    const root = globalThis.document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  return (
    <ThemeProviderContext.Provider {...props} value={{ setTheme, theme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export { ThemeProvider, useTheme }
