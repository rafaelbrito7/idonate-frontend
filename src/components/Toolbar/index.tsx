import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { isLogged } from '../../helpers/isLogged'
import { destroyCookie } from 'nookies'
import { api } from '../../services/api'
import { IResponse } from '../../interfaces/IResponse'
import { useContext } from 'react'
import { SnackbarContext } from '../../contexts/Snackbar'
import ToolbarMenu from './ToolbarMenu'

export default function CustomToolbar() {
  const navigate = useNavigate()
  const showSnackbar = useContext(SnackbarContext)
  const userIsLogged = isLogged()

  if (!showSnackbar) {
    throw new Error('showSnackbar is not available within SnackbarContext')
  }

  const handleLogout = async () => {
    const response: IResponse = await api.post('/auth/logout')

    if (response.data.statusCode === 200) {
      destroyCookie(null, 'access_token')
      destroyCookie(null, 'refresh_token')
      navigate('/')
      window.location.reload()
      showSnackbar(response.data.message, 'success')
    } else {
      showSnackbar(response.data.message, 'error')
    }
  }

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              IDonate
            </Typography>

            <ToolbarMenu isLogged={userIsLogged} handleLogout={handleLogout} />
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  )
}
