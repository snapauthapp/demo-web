import { useRef } from 'react'
import { Button, FormGroup, InputGroup } from '@blueprintjs/core'

const SignIn: React.FC = () => {
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
      <FormGroup label="Your username" labelInfo="(required)">
        <InputGroup
          autoComplete="username"
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
  )
}

export default SignIn
