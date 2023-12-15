import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subYears } from 'date-fns'
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Container,
} from '@mui/material'
import * as zod from 'zod'

import { api } from '../../services/api'
import { TextInput } from '../../components/TextInput'
import { MUDatePicker } from '../../components/DatePicker'

import { IResponse } from '../../interfaces/IResponse'

import { useNavigate } from 'react-router-dom'
import { useSnackbarContext } from '../../hooks/snackbar/useSnackbarContext'

const registerValidationSchema = zod.object({
  email: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  birthday: zod.date(),
  cpf: zod.string().optional(),
  cnpj: zod.string().optional(),
  password: zod.string().min(8),
})

type RegisterFormData = zod.infer<typeof registerValidationSchema>

export function Register() {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      birthday: undefined,
      cpf: '',
      cnpj: '',
      password: '',
    },
  })
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarContext()

  if (!showSnackbar) {
    throw new Error('showSnackbar is not available within SnackbarContext')
  }

  const onSubmit = async (data: RegisterFormData) => {
    const result: IResponse = await api.post('/auth/register', data)

    if (result.data.statusCode === 201) {
      methods.reset()
      showSnackbar(result.data.message, 'success')
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { sm: 3, md: 10 },
        bgcolor: 'background.default',
      }}
    >
      <FormProvider {...methods}>
        <Container maxWidth="sm">
          <Typography variant="h4" textAlign="center">
            IDonate
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 1,
              p: { xs: 2, sm: 3 },
              border: 1,
              borderColor: 'grey.300',
              gap: 2,
              boxShadow: 1,
              bgcolor: 'background.paper',
              overflow: 'auto',
            }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Typography
              variant="h5"
              textAlign="center"
              sx={{
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                mb: { xs: 1, sm: 2 },
              }}
            >
              Criar conta
            </Typography>
            <TextInput
              id="email"
              name="email"
              label="Email"
              required={true}
              variant="outlined"
            />
            <TextInput
              id="firstName"
              name="firstName"
              label="Nome"
              required={true}
              variant="outlined"
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="Sobrenome"
              required={true}
              variant="outlined"
            />
            <MUDatePicker
              label="Data de Nascimento"
              name="birthday"
              required={true}
              maxDate={subYears(new Date(), 18)}
            />
            <TextInput
              id="cpf"
              name="cpf"
              label="CPF"
              required={true}
              variant="outlined"
            />
            <TextInput
              id="password"
              name="password"
              label="Senha"
              required={true}
              variant="outlined"
              type="password"
            />

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Registrar-se
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Button
              variant="text"
              fullWidth
              onClick={() => navigate('/login', { replace: true })}
            >
              Já possui uma conta? Faça login
            </Button>
          </Box>
        </Container>
      </FormProvider>
    </Box>
  )
}
