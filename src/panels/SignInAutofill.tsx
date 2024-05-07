import { useEffect, useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup } from '@blueprintjs/core'
import { SDK, AuthResponse } from '@snapauth/sdk'

import { SourceUrl } from 'components'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const SignInAutofill: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [authResponse, setAuthResponse] = useState<AuthResponse>()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthResponse(undefined)
    alert('Traditional username/password fallback')
  }

  useEffect(() => {
    snapAuth.handleAutofill((response: AuthResponse) => {
      setAuthResponse(response)
    })
  }, [])

  return <>
    <Callout>
      <p>SnapAuth can be added to a traditional username+password sign in page without any visual changes.</p>
      <p>All you need to do is add <Code>autocomplete="username webauthn"</Code> to your username field, and call <Code>snapAuth.handleAutofill()</Code>.</p>
      <p>TIP: this can be combined with <Code>snapAuth.startAuth()</Code> in the same form.</p>
      <p><SourceUrl path="src/panels/SignInAutofill.tsx" /></p>
    </Callout>

    <form onSubmit={onSubmit}>
      <FormGroup label="Your username" labelInfo="(required)">
        <InputGroup
          autoComplete="username webauthn"
          inputRef={username}
          required
        />
      </FormGroup>
      <FormGroup label="Your password" labelInfo="(required)">
        <InputGroup
          autoComplete="current-password"
          inputRef={password}
          required
          type="password"
        />
      </FormGroup>
      <Button type="submit" intent="primary">Sign In</Button>
    </form>
    {authResponse &&
    <output><pre>{JSON.stringify(authResponse, undefined, 2)}</pre></output>
    }
  </>
}

export default SignInAutofill
