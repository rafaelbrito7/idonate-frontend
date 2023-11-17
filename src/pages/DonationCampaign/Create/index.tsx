import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@mui/material'
import * as zod from 'zod'

import { api } from '../../../services/api'
import { TextInput } from '../../../components/TextInput'

import { ButtonGroup, Container, FormContainer, Title } from './styles'
import { useContext } from 'react'
import { SnackbarContext } from '../../../contexts/Snackbar'

import { useNavigate } from 'react-router-dom'
import { CustomCurrencyInput } from '../../../components/CurrencyInput'

const newDonationCampaignFormValidationSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  goal: zod.number(),
})

type NewDonationCampaignFormData = zod.infer<
  typeof newDonationCampaignFormValidationSchema
>

export function CreateDonationCampaign() {
  const methods = useForm<NewDonationCampaignFormData>({
    resolver: zodResolver(newDonationCampaignFormValidationSchema),
    defaultValues: {
      title: '',
      description: '',
      goal: 0,
    },
  })
  const navigate = useNavigate()
  const showSnackbar = useContext(SnackbarContext)

  if (!showSnackbar) {
    throw new Error('showSnackbar is not available within SnackbarContext')
  }

  const onSubmit = async (data: NewDonationCampaignFormData) => {
    try {
      const response = await api.post('/donation-campaign', data)

      if (response.data.statusCode === 201) {
        methods.reset()
        showSnackbar(response.data.message, 'success')
      }

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
        <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
          <Title>IDonate</Title>
          <TextInput
            name="title"
            id="title"
            label="Título da Campanha"
            required
            variant="outlined"
          />

          <TextInput
            name="description"
            id="description"
            label="Descrição da Campanha"
            required
            variant="outlined"
          />

          <CustomCurrencyInput
            name="goal"
            id="goal"
            label="Meta da campanha"
            required
            variant="outlined"
          />

          <ButtonGroup>
            <Button type="submit" variant="contained">
              Criar Campanha
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate('/', { replace: true })}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </FormContainer>
      </FormProvider>
    </Container>
  )
}
