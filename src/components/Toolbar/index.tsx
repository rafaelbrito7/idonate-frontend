import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import ToolbarMenu from './ToolbarMenu'
import { useLogout } from '../../hooks/logout/useLogout'
import { useAuth } from '../../contexts/Authentication/AuthContext'

export default function CustomToolbar() {
  const { isAuthenticated } = useAuth()

  const navigate = useNavigate()
  const logout = useLogout()

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
    },
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              IDonate
            </Typography>

            <ToolbarMenu isLogged={isAuthenticated} handleLogout={logout} />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  )
}
