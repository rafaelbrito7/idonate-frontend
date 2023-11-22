import React from 'react'
import { SnackbarState } from '../../hooks/snackbar/useSnackbar'

interface SnackbarContextValue {
  snackbar: SnackbarState
  showSnackbar: (message: string, severity: SnackbarState['severity']) => void
  closeSnackbar: () => void
}

// Create the context with a default empty value
export const SnackbarContext = React.createContext<
  SnackbarContextValue | undefined
>(undefined)

export default SnackbarContext
