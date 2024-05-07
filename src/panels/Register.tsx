import { useRef, useState } from 'react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'

import { SDK, RegisterResponse } from '@snapauth/sdk'

const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY)

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)

  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const registration = await snapAuth.startRegister({ name: username.current!.value })
    setRegisterResponse(registration)
  }

  return <>
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
    {registerResponse &&
    <output><pre>{JSON.stringify(registerResponse, undefined, 2)}</pre></output>
    }
  </>
}

export default Register
