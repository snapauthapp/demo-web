import { useRef } from 'react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'

const Register: React.FC = () => {
  const username = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify({
      username: username.current!.value,
    }))
  }

  return (
    <form onSubmit={onSubmit}>
      <FormGroup label="Create a username" labelInfo="(required)">
        <InputGroup
          autoComplete="username"
          inputRef={username}
          required
        />
      </FormGroup>
      <FormGroup label="Create a password" labelInfo="(required)">
        <InputGroup
          autoComplete="new-password"
          inputRef={password}
          required
          type="password"
        />
      </FormGroup>
      <Button type="submit" intent="primary">Register</Button>
    </form>
  )
}

export default Register
