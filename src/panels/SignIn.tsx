import { useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup } from '@blueprintjs/core'
import { SDK, AuthResponse } from '@snapauth/sdk'

import { ApiData, SourceUrl } from 'components'
import { backend, toast } from 'helpers'

import type { ApiInfo } from 'helpers/backend'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const SignIn: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)

  const [authResponse, setAuthResponse] = useState<AuthResponse>()
  const [backendData, setBackendData] = useState<ApiInfo>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthResponse(undefined)
    setBackendData(undefined)

    const auth = await snapAuth.startAuth({ id: username.current!.value })
    setAuthResponse(auth)

    if (auth.ok) {
      const data = await backend.signIn(auth.data.token)
      setBackendData(data)
      toast.success('Signed in')
    } else {
      toast.error(auth.error)
    }
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
    <ApiData backendData={backendData} clientResponse={authResponse} />
    </>
}

export default SignIn
