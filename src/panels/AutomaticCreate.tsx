import { useEffect, useRef, useState } from 'react'
import { Button, Callout, Code, FormGroup, InputGroup, SegmentedControl } from '@blueprintjs/core'
import { RegisterResponse } from '@snapauth/sdk'

import { ApiData, SourceUrl } from 'components'
import { backend, snapAuth, toast } from 'helpers'

import type { ApiInfo } from 'helpers/backend'

enum Modes {
  Register = 'r',
  SignIn = 's',
}
const AutomaticCreate: React.FC = () => {

  const username = useRef<HTMLInputElement>(null)
  // const password = useRef<HTMLInputElement>(null)

  const [registerResponse, setRegisterResponse] = useState<RegisterResponse>()
  const [backendData, setBackendData] = useState<ApiInfo>()
  const [mode, setMode] = useState(Modes.Register)

  /*
   * This is just for displaying feedback for demo purposes. It's not needed to
   * actually run conditional passkey creation.
   */
  const [canWork, setCanWork] = useState(false)
  useEffect(() => {
    const check = async () => {
      const browserSupport = await snapAuth.isConditionalCreateAvailable()
      setCanWork(browserSupport)
    }
    check()
  }, [])

  const onPasskeyCreate = async (registration: RegisterResponse) => {
    console.debug('on passkey create', registration)
    setRegisterResponse(registration)
    if (registration.ok) {
      toast.success('Got a SnapAuth token')

      const name = username.current!.value
      const data = await backend.register(registration.data.token, name)
      // Again, for display purposes only.
      setBackendData(data)
    } else {
      toast.error('Error response: ' + registration.error)
    }
  }

  const onRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // No-op: send to your backend, redirect
    toast.success('User registered')
    setBackendData(undefined)
    setRegisterResponse(undefined)
  }

  const onSigninSubmit = async (e: React.FormEvent) => {
    console.debug('signin')
    e.preventDefault()
    setBackendData(undefined)
    setRegisterResponse(undefined)

    // This is where you'd send the username+password to your backend for
    // processing...
    // (NO-OP)

    snapAuth.handleAutomaticRegistration({ name: username.current!.value }, onPasskeyCreate)

  }
  let userLabel: string, passLabel: string, buttonLabel: string, passAutocomplete: string
  let onSubmit
  if (mode === Modes.Register) {
    userLabel = 'Create a username'
    passLabel = 'Create a password'
    buttonLabel = 'Register'
    passAutocomplete = 'new-password'
    onSubmit = onRegisterSubmit
  } else {
    userLabel = 'Your username'
    passLabel = 'Your password'
    buttonLabel = 'Sign In'
    passAutocomplete = 'current-password'
    onSubmit = onSigninSubmit
  }

  return <>
    <Callout>
      <p>Creating passkeys automatically for users that only have passwords is easy with SnapAuth!</p>
      <p>
        After a user signs in using their password, call the <Code>snapAuth.nameThis()</Code> API.
        This can be on the next page load, in a callback in a single-page app, or similar.
      </p>

      <p>
        If the user's device allowed automatic passkey creation, we will call your callback with the relevant data.
        Process it the same way you would for normal passkey creation (see Create a passkey).
      </p>

      <p>
        In this demo, first register with any username and password, and be sure to save the password in your password manager.
        Then switch to "Sign in" and use the credentials you just created.
        You should see a system message indicating a passkey was automatically created.
      </p>
      <p><SourceUrl path="src/panels/AutomaticCreate.tsx" /></p>
    </Callout>

    {canWork || <Callout intent="danger">CR not supported</Callout>}

    <SegmentedControl
      value={mode}
      options={[{label: 'Register', value: Modes.Register},{label: 'Sign In', value: Modes.SignIn}]}
      onValueChange={(v) => setMode(v as Modes)}
      inline
    />
    <form onSubmit={onSubmit}>
      <FormGroup label={userLabel} labelInfo="(required)">
        <InputGroup
          autoComplete="username"
          inputRef={username}
          required
        />
      </FormGroup>
      <FormGroup label={passLabel}labelInfo="(required)">
        <InputGroup
          autoComplete={passAutocomplete}
          required
          type="password"
        />
      </FormGroup>
      <Button
        disabled={!canWork}
        intent="primary"
        type="submit"
      >{buttonLabel}</Button>
    </form>
    <ApiData backendData={backendData} clientResponse={registerResponse} />
  </>
}

export default AutomaticCreate
