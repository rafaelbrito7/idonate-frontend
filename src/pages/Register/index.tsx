import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { subYears } from 'date-fns'
import { Button } from '@mui/material'
import * as zod from 'zod'

import { api } from '../../services/api'
import { TextInput } from '../../components/TextInput'
import { MUDatePicker } from '../../components/DatePicker'

import { ButtonGroup, Container, FormContainer, Title } from './styles'
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
    <Container>
      <FormProvider {...methods}>
        <Title>IDonate</Title>
        <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
          <Title>Criar conta</Title>
          <TextInput
            name="email"
            id="email"
            label="Email"
            required={true}
            variant="outlined"
          />

          <TextInput
            name="firstName"
            id="firstName"
            label="Nome"
            required={true}
            variant="outlined"
          />

          <TextInput
            name="lastName"
            id="lastName"
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
            name="cpf"
            id="cpf"
            label="CPF"
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
              Registrar-se
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </FormContainer>
      </FormProvider>
    </Container>
  )
}
