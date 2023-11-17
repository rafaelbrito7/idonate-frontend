import { Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { StyledContainer } from './styles'

export function NotFound() {
  return (
    <StyledContainer>
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Página não encontrada
      </Typography>
      <Typography variant="body1" gutterBottom>
        Desculpe, a página que está procurando não existe.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Voltar para a página inicial
      </Button>
    </StyledContainer>
  )
}
