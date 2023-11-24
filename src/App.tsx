import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { GlobalStyle } from './styles/global'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { SnackbarProvider } from './providers/Snackbar'
import { AuthProvider } from './contexts/Authentication/AuthContext'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
          <GlobalStyle />
        </SnackbarProvider>
      </AuthProvider>
    </LocalizationProvider>
  )
}

export default App
