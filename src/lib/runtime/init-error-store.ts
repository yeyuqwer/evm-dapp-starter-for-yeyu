import { errorStore } from '@/lib/common/errors/error-store'

let listenerRefCount = 0
let removeListeners: (() => void) | undefined

export function initializeErrorStore(): () => void {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  listenerRefCount += 1
  if (listenerRefCount === 1) {
    const errorListener = (event: ErrorEvent) => {
      if (event.error instanceof Error) {
        event.preventDefault()
        errorStore.getState().setLastError(event.error)
      }
    }
    window.addEventListener('error', errorListener)

    const rejectionListener = (event: PromiseRejectionEvent) => {
      if (event.reason instanceof Error) {
        event.preventDefault()
        errorStore.getState().setLastError(event.reason)
      }
    }
    window.addEventListener('unhandledrejection', rejectionListener)

    removeListeners = () => {
      window.removeEventListener('error', errorListener)
      window.removeEventListener('unhandledrejection', rejectionListener)
    }
  }

  return () => {
    listenerRefCount = Math.max(0, listenerRefCount - 1)
    if (listenerRefCount === 0) {
      removeListeners?.()
      removeListeners = undefined
    }
  }
}
