import React from 'react'

interface Device {
  name: 'mobile' | 'tablet' | 'desktop'
  query: string
}

const devices: Device[] = [
  { name: 'mobile', query: '(max-width: 767px), (orientation: landscape) and (max-height: 500px)' },
  { name: 'tablet', query: '(min-width: 768px) and (max-width: 1023px)' },
  { name: 'desktop', query: '(min-width: 1024px)' },
]

function getInitialMatch(query: string): boolean {
  if (typeof globalThis.matchMedia !== 'function') {
    return false
  }
  return globalThis.matchMedia(query).matches
}

export function useMediaQuery(deviceName: Device['name']) {
  const device = devices.find((candidate) => candidate.name === deviceName)!,
    [matches, setMatches] = React.useState(() => getInitialMatch(device.query))

  React.useEffect(() => {
    const media = globalThis.matchMedia(device.query),
      update = () => setMatches(media.matches)

    update()

    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [device])

  return matches
}
