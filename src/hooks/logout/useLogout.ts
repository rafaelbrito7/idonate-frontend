import { useAuth } from '../../contexts/Authentication/AuthContext'
import { destroyCookie } from 'nookies'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

export const useLogout = () => {
  const { setIsAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
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

  return handleLogout
}
