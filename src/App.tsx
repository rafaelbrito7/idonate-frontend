import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import { GlobalStyle } from './styles/global'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { SnackbarProvider } from './providers/Snackbar'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <SnackbarProvider>
        <RouterProvider router={router} />
        <GlobalStyle />
      </SnackbarProvider>
    </LocalizationProvider>
  )
}

export default App
