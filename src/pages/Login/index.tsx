import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button, Divider } from '@mui/material'
import * as zod from 'zod'

import { api } from '../../services/api'
import { TextInput } from '../../components/TextInput'

import { ButtonGroup, Container, FormContainer, Title } from './styles'

import { useNavigate } from 'react-router-dom'
import { setRefreshTokenCookie, setTokenCookie } from '../../config/tokens'

import { useSnackbarContext } from '../../hooks/snackbar/useSnackbarContext'

const loginFormValidationSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
})

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

  if (!showSnackbar) {
    throw new Error('showSnackbar is not available within SnackbarContext')
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data)

      const {
        payload: { tokens },
      } = response.data

      setTokenCookie('access_token', tokens.access_token)
      setRefreshTokenCookie(tokens.refresh_token)

      methods.reset()

      navigate('/', { replace: true })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        showSnackbar(error.response.data.message, 'error')
      } else if (error.request) {
        showSnackbar(
          'Nenhuma resposta recebida pelo servidor. Tente novamente mais tarde!',
          'error',
        )
      } else {
        showSnackbar(
          'Algo inesperado aconteceu. Tente novamente mais tarde',
          'error',
        )
      }
    }
  }

  return (
    <Container>
      <FormProvider {...methods}>
        <Title>IDonate</Title>
        <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
          <Title>Fazer Login</Title>
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

          <ButtonGroup>
            <Button type="submit" variant="contained" color="success">
              Entrar
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate('/', { replace: true })}
            >
              Cancelar
            </Button>
          </ButtonGroup>
          <Divider />
          <Button
            variant="text"
            onClick={() => navigate('/register', { replace: true })}
          >
            Não possui uma conta? Registre-se aqui
          </Button>
        </FormContainer>
      </FormProvider>
    </Container>
  )
}
