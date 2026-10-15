export const getStoredSidebarOpen = (id: string, fallback: boolean) => {
  if (typeof document === 'undefined') {
    return fallback
  }
  const match = new RegExp(`(?:^|; )sidebar-state-${id}=(?<value>[^;]*)`).exec(document.cookie)
  if (!match) {
    return fallback
  }
  return decodeURIComponent(match.groups?.value ?? '') === 'true'
}
