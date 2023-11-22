// hooks/useSnackbar.ts
import { useState } from 'react'

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  })

  const showSnackbar = (
    message: string,
    severity: SnackbarState['severity'] = 'info',
  ) => {
    setSnackbar({
      open: true,
      message,
      severity,
    })

    setTimeout(() => {
      closeSnackbar()
    }, 4000)
  }

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  }
}
