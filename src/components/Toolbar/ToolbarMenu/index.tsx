import { useState, MouseEvent } from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'

interface IToolbarMenuProps {
  isLogged: boolean
  handleLogout: () => void
}

export default function ToolbarMenu({
  isLogged,
  handleLogout,
}: IToolbarMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}
      >
        <AccountCircleIcon color="action" fontSize="large" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {isLogged ? (
          <div>
            <MenuItem onClick={handleClose}>Minhas Campanhas</MenuItem>
            <MenuItem onClick={handleClose}>Meu perfil</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={() => navigate('/login')}>Entrar</MenuItem>
            <MenuItem onClick={() => navigate('/register')}>
              Registrar-se
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  )
}
