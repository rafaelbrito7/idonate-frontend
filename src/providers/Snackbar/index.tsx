import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import { SnackbarContext } from '../../contexts/Snackbar/index'
import { SnackbarContextType } from '../../contexts/Snackbar/SnackbarContextType'
import { Alert, AlertColor } from '@mui/material'

interface SnackbarProviderProps {
  children: React.ReactNode
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [severity, setSeverity] = useState<AlertColor>('success')

  const showSnackbar: SnackbarContextType = (msg, severity) => {
    setMessage(msg)
    setSeverity(severity)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
