import { useEffect, useState } from 'react'
import { Classes, Tab, Tabs } from '@blueprintjs/core'

import { useMediaQuery } from 'hooks'
import { Register, SignIn, SignInAutofill } from 'panels'

import './App.css'

enum TabIds {
  Register = 'r',
  SignIn = 'si',
  AutoFill = 'af',
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
      <p>
        This is a simple demo for <a href="https://www.snapauth.app?utm_source=Demo" target="_blank">SnapAuth</a>.

        It does not store any local data, and "registering" here does <em>not</em> sign you up for SnapAuth (or anything else).
        It's meant to give you an idea of what integration looks like and understand some of the API call flows.
      </p>

      <p>You can see the source on <a href="https://github.com/snapauthapp/demo-web" target="_blank">Github</a>.</p>

      <Tabs selectedTabId={selectedTabId} onChange={next => setSelectedTabId(next as TabIds)} renderActiveTabPanelOnly>
        <Tab id={TabIds.Register} title="Register" panel={<Register />} />
        <Tab id={TabIds.SignIn} title="Sign In" panel={<SignIn />} />
        <Tab id={TabIds.AutoFill} title="Sign In (Autofill)" panel={<SignInAutofill />} />
      </Tabs>
    </>
  )
}

export default App
