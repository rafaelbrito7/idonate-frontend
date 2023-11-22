import { useContext } from 'react'
import SnackbarContext from '../../contexts/Snackbar/index'

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext)

  if (context === undefined) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider')
  }

  return context
}
