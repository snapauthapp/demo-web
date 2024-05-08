import { Code, Section, SectionCard } from '@blueprintjs/core'
import { AuthResponse, RegisterResponse } from '@snapauth/sdk'

import type { ApiInfo } from 'helpers/backend'

interface Props {
  backendData: ApiInfo|undefined
  clientResponse: AuthResponse|RegisterResponse|undefined
}

const ApiData: React.FC<Props> = ({ backendData, clientResponse }) => {
  return <>
    {clientResponse && <Section title="Client SDK Response">
      <output>
        <pre>{JSON.stringify(clientResponse, undefined, 2)}</pre>
      </output>
    </Section>}
    {backendData && <Section title="Backend">
      <SectionCard>
        <p><Code>POST /registration/attach</Code></p>
        <output><pre>{JSON.stringify(backendData.requestBody, undefined, 2)}</pre></output>
      </SectionCard>

      <SectionCard>
        <p>Response</p>
        <output><pre>{JSON.stringify(backendData.responseBody, undefined, 2)}</pre></output>
      </SectionCard>
    </Section>}
  </>
}

export default ApiData
