import { useEffect, useState } from 'react'
import { Classes, Tab, Tabs } from '@blueprintjs/core'

import { useMediaQuery } from 'hooks'
import { Register, SignIn } from 'panels'

import './App.css'

enum TabIds {
  Register = 'r',
  SignIn = 'si',
}

function App() {
  const [selectedTabId, setSelectedTabId] = useState(TabIds.Register)
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    document.querySelector('body')!.className = darkMode ? Classes.DARK : ''
  }, [darkMode])

  return (
    <>
      <h1>SnapAuth Demo</h1>
      <Tabs selectedTabId={selectedTabId} onChange={next => setSelectedTabId(next as TabIds)} renderActiveTabPanelOnly>
        <Tab id={TabIds.Register} title="Register" panel={<Register />} />
        <Tab id={TabIds.SignIn} title="Sign In" panel={<SignIn />} />
      </Tabs>
    </>
  )
}

export default App
