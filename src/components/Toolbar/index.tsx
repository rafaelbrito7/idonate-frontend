import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu' // For the menu icon in smaller screens
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { destroyCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Authentication/AuthContext'
import { api } from '../../services/api'
import ToolbarMenu from './ToolbarMenu'

export default function CustomToolbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { setIsAuthenticated, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      await api.post('/auth/logout')
      destroyCookie(null, 'access_token')
      destroyCookie(null, 'refresh_token')
      setIsAuthenticated(false)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // Implement functionality to toggle a drawer or menu
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            IDonate
          </Typography>
          {!isMobile && (
            <ToolbarMenu
              isLogged={isAuthenticated}
              handleLogout={handleLogout}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
