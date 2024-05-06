import { useEffect, useState } from 'react'
import { Classes } from '@blueprintjs/core'

import { useMediaQuery } from 'hooks'
import './App.css'

function App() {
  const [selectedTabId, setSelectedTabId] = useState(TabIds.Register)
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    document.querySelector('body')!.className = darkMode ? Classes.DARK : ''
  }, [darkMode])

  return (
    <>
      <h1>SnapAuth Demo</h1>
    </>
  )
}

export default App
