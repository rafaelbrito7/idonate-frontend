import { AlertColor } from '@mui/material'

export type SnackbarContextType = (
  message: string,
  severity: AlertColor,
) => void
