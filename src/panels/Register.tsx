import { useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup } from '@blueprintjs/core'
import { SDK, RegisterResponse } from '@snapauth/sdk'

import { ApiData, SourceUrl } from 'components'
import { backend, toast } from 'helpers'

import type { ApiInfo } from 'helpers/backend'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)

  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>()
  const [backendData, setBackendData] = useState<ApiInfo>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const name = username.current!.value

    const registration = await snapAuth.startRegister({ name })
    // This is for display only. Normally, you just use the data.
    setRegisterResponse(registration)

    if (registration.ok) {
      toast.success('Got a SnapAuth token')

      const data = await backend.attachRegistration(registration.data.token, name)
      // Again, for display purposes only.
      setBackendData(data)
    } else {
      toast.error('Error response: ' + registration.error)
    }
  }

  return <>
    <Callout>
      <p>Adding a passkey for a new or existing user is super easy with SnapAuth!</p>
      <p>
        To do it during registration, you can use <Code>snapAuth.startRegister()</Code> before or after your backend API call.
        If you do it before, you can save a round-trip by passing our <Code>token</Code> alongside other data.
        Doing it after can make the experience clearer and more reliable for the user, in case you run into form validation errors.
        It's up to you!
      </p>

      <p>
        For existing users, make the same API call (often on a settings page) once they're already authenticated.
        Instead of getting the <Code>name</Code> from a form field, use the data you already have to populate it.
      </p>

      <p><SourceUrl path="src/panels/Register.tsx" /></p>
    </Callout>
    <form onSubmit={onSubmit}>
      <FormGroup label="Create a username" labelInfo="(required)">
        <InputGroup
          autoComplete="username"
          inputRef={username}
          required
        />
      </FormGroup>
      <Button type="submit" intent="primary">Register</Button>
    </form>
    <ApiData backendData={backendData} clientResponse={registerResponse} />
  </>
}

export default Register
