import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Box, Button, Container, Grid, Typography } from '@mui/material'
import * as zod from 'zod'

import { api } from '../../../services/api'

import { useNavigate, useParams } from 'react-router-dom'
import { CustomCurrencyInput } from '../../../components/CurrencyInput'
import { useSnackbarContext } from '../../../hooks/snackbar/useSnackbarContext'

const newDonationFormValidationSchema = zod.object({
  moneyAmount: zod.number(),
})

type NewDonationFormData = zod.infer<typeof newDonationFormValidationSchema>

export function CreateDonation() {
  const methods = useForm<NewDonationFormData>({
    resolver: zodResolver(newDonationFormValidationSchema),
    defaultValues: {
      moneyAmount: 0,
    },
  })
  const navigate = useNavigate()
  const { showSnackbar } = useSnackbarContext()
  const { id: donationCampaignId } = useParams()

  if (!showSnackbar) {
    throw new Error('showSnackbar is not available within SnackbarContext')
  }

  const onSubmit = async ({ moneyAmount }: NewDonationFormData) => {
    try {
      const response = await api.post('/donation', {
        moneyAmount,
        donationCampaignId,
      })

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '90vh',
        justifyContent: 'center',
        p: { xs: 3, md: 10 },
        bgcolor: 'background.default',
        overflow: 'auto',
      }}
    >
      <FormProvider {...methods}>
        <Container maxWidth="sm">
          <Typography variant="h4" textAlign="center" mb={2}>
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
            }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Typography variant="h5" textAlign="center">
              Realizar doação
            </Typography>

            <CustomCurrencyInput
              name="moneyAmount"
              id="moneyAmount"
              label="Quantia para doação"
              required
              variant="outlined"
            />
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                >
                  Realizar doação
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </FormProvider>
    </Box>
  )
}
