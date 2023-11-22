import { Snackbar, Alert } from '@mui/material'
import SnackbarContext from '../../contexts/Snackbar/index'
import { useSnackbar } from '../../hooks/snackbar/useSnackbar'
import { ReactNode } from 'react'

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

  return (
    <SnackbarContext.Provider value={{ snackbar, showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}
