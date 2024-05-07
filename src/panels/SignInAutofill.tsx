import { useEffect, useRef, useState } from 'react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'

import { SDK, AuthResponse } from '@snapauth/sdk'

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
