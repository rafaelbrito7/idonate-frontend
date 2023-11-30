import { RouterProvider } from 'react-router-dom'
import { router } from './Router'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { SnackbarProvider } from './providers/Snackbar'
import { AuthProvider } from './contexts/Authentication/AuthContext'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from './styles/global'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <AuthProvider>
          <SnackbarProvider>
            <RouterProvider router={router} />
          </SnackbarProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
