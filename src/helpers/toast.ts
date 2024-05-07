import { OverlayToaster } from '@blueprintjs/core'
import { createRoot } from 'react-dom/client'

const toast = OverlayToaster.createAsync(undefined, {
  domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster),
})

export default {
  error: async (message: string) => (await toast).show({ intent: 'danger', message }),

  success: async (message: string) => (await toast).show({ intent: 'success', message }),
}
