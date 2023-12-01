import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router-dom'

import ToolbarMenu from './ToolbarMenu'
import { useSnackbarContext } from '../../hooks/snackbar/useSnackbarContext'
import { isAuthenticated, logout } from '../../helpers/auth'

export default function CustomToolbar() {
  const navigate = useNavigate()

  const { showSnackbar } = useSnackbarContext()

  const isAuth = isAuthenticated()

  async function handleLogout() {
    try {
      await logout()
      navigate('/login')
      showSnackbar('Logout realizado com sucesso!', 'success')
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message, 'error')
      } else {
        showSnackbar(
          'Algo inesperado aconteceu. Tente novamente mais tarde!',
          'error',
        )
      }
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            IDonate
          </Typography>

          <ToolbarMenu isLogged={isAuth} handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
    </Box>
  )
}
