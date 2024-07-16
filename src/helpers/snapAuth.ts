import { SDK } from '@snapauth/sdk'
const snapAuth = new SDK(import.meta.env.VITE_SNAPAUTH_PUBLISHABLE_KEY, import.meta.env.VITE_SNAPAUTH_HOST)
export default snapAuth
