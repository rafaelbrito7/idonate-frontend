import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import * as zod from 'zod'

import { TextInput } from '../../components/TextInput'

import { useLocation, useNavigate } from 'react-router-dom'

import { useSnackbarContext } from '../../hooks/snackbar/useSnackbarContext'

import { loginFormValidationSchema } from '../../schemas/zod'
import { login } from '../../helpers/auth'

type LoginFormData = zod.infer<typeof loginFormValidationSchema>

export function Login() {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarContext()

  const location = useLocation()
  const message = location.state?.message

  const onSubmit = async (data: LoginFormData) => {
    try {
      methods.reset()

      await login(data)

      navigate('/')
      showSnackbar('Login realizado com sucesso!', 'success')
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 3, md: 10 },
        bgcolor: 'background.default',
      }}
    >
      <FormProvider {...methods}>
        <Container maxWidth="sm">
          <Typography variant="h4" textAlign="center" mb={2}>
            IDonate
          </Typography>
          {message && <Typography>{message}</Typography>}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 1,
              p: 3,
              border: 1,
              borderColor: 'grey.300',
              gap: 2,
              boxShadow: 1,
              bgcolor: 'background.paper',
            }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Typography variant="h5" textAlign="center">
              Fazer Login
            </Typography>
            <TextInput
              name="email"
              id="email"
              label="Email"
              required={true}
              variant="outlined"
            />
            <TextInput
              name="password"
              id="password"
              label="Senha"
              required={true}
              variant="outlined"
              type="password"
            />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  Entrar
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => navigate('/', { replace: true })}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="text"
              fullWidth
              onClick={() => navigate('/register', { replace: true })}
            >
              Não possui uma conta? Registre-se aqui
            </Button>
          </Box>
        </Container>
      </FormProvider>
    </Box>
  )
}
