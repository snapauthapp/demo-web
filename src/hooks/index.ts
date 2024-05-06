import { useEffect, useState } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const update = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addListener(update)
    return () => {
      mql.removeListener(update)
    }
  }, [query])
  return matches
}

export { useMediaQuery }
