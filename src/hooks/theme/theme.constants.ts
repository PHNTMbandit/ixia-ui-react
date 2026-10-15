import type { Theme, ThemeValue } from './theme.types'

const THEME_STORAGE_KEY = 'dawn-ui-theme',
  DEFAULT_THEME: ThemeValue = 'light',
  getThemeByValue = (value: ThemeValue, themes: Theme[]): Theme | undefined =>
    themes.find((themeItem) => themeItem.value === value)

export { THEME_STORAGE_KEY, DEFAULT_THEME, getThemeByValue }
