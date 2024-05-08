/**
 * DO NOT MAKE SNAPAUTH SERVER CALLS FROM THE CLIENT IN A REAL APPLICATION!
 *
 * This will leak your API secret, which can easily lead to widespread account
 * takeovers.
 *
 * Instead, you would send the client token to YOUR backend, and use one of
 * our server SDKs to attach or verify it.
 *
 * Since this demo doesn't have a backend, it's directly returning what the
 * SnapAuth API returned so it can be displayed.
 */
class FakeBackendApi {

  private authHeader: string
  private host: URL

  constructor(secretKey: string) {
    this.authHeader = 'Basic ' + btoa(':' + secretKey)
    this.host = new URL('https://api.snapauth.app')
  }

  // As a fake backend, this uses the user-provided value for the username
  // and no handle. Normally, the `id` would be a generated value (primary
  // key, etc) and the `handle` would be a username, email address, or
  // similar user-provided identifier.
  register = async (token: string, username: string): Promise<ApiInfo> => {
    return await this.post('/registration/attach', { token, user: { id: username } })
  }

  signIn = async (token: string): Promise<ApiInfo> => {
    return await this.post('/auth/verify', { token })
  }

  private post = async (path: string, requestBody: unknown): Promise<ApiInfo> => {
    try {
      const response = await fetch(new URL(path, this.host), {
        method: 'POST',
        headers: {
          Authorization: this.authHeader,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      const responseBody = await response.json()
      return {
        requestBody,
        responseBody,
      }
    } catch (error) {
      return {
        requestBody,
        responseBody: {
          error: true,
          message: (error as Error).message,
        }
      }
    }
  }
}

export interface ApiInfo {
  requestBody: unknown
  responseBody: unknown
}

const backend = new FakeBackendApi(import.meta.env.VITE_SNAPAUTH_SECRET_KEY_NEVER_PUBLISH_THIS_IN_A_REAL_APP)
export default backend
