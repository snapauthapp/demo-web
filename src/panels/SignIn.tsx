import { useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup } from '@blueprintjs/core'
import { SDK, AuthResponse } from '@snapauth/sdk'

import { SourceUrl } from 'components'

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
    <Callout>
      <p>If you want a passkey-first auth flow or have a multi-step process, <Code>snapAuth.startAuth()</Code> is the way to go.
      If not many of your users have passkeys yet, this alone can be a little jarring.</p>
      <p>This is <em>great</em> way to re-authenticate a returning user, since you should already have their <Code>user id</Code> in a cookie or session.</p>
      <p><SourceUrl path="src/panels/SignIn.tsx" /></p>
    </Callout>
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
