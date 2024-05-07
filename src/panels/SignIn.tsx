import { useRef, useState } from 'react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'

import { SDK, AuthResponse } from '@snapauth/sdk'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const SignIn: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)

  const [authResponse, setAuthResponse] = useState<AuthResponse>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const auth = await snapAuth.startAuth({ id: username.current!.value })
    setAuthResponse(auth)
  }

  return <>
    <form onSubmit={onSubmit}>
      <FormGroup label="Your username" labelInfo="(required)">
        <InputGroup
          autoComplete="username"
          inputRef={username}
          required
        />
      </FormGroup>
      <Button type="submit" intent="primary">Sign In</Button>
    </form>
    {authResponse &&
    <output><pre>{JSON.stringify(authResponse, undefined, 2)}</pre></output>
    }
    </>
}

export default SignIn
