import { useEffect, useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup } from '@blueprintjs/core'
import { SDK, AuthResponse } from '@snapauth/sdk'

import { ApiData, SourceUrl } from 'components'
import { backend, toast } from 'helpers'

import type { ApiInfo } from 'helpers/backend'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const SignInAutofill: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const [authResponse, setAuthResponse] = useState<AuthResponse>()
  const [backendData, setBackendData] = useState<ApiInfo>()

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthResponse(undefined)
    setBackendData(undefined)
    toast.success('Using username/password auth')
  }

  useEffect(() => {
    snapAuth.handleAutofill(async (response: AuthResponse) => {
      setAuthResponse(response)
      if (response.ok) {
        toast.success('Got the autofilled SnapAuth token')
        const data = await backend.signIn(response.data.token)
        setBackendData(data)
      } else {
        toast.error(response.error)
      }
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
    <ApiData backendData={backendData} clientResponse={authResponse} />
  </>
}

export default SignInAutofill
