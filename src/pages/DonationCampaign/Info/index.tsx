import { useLoaderData, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
} from '@mui/material'
import { IDonationCampaign } from '../../../interfaces/IDonationCampaign'
import donationCampaignImg from '../../../assets/donationCampaignLogo.jpg'

export function DonationCampaignInfo() {
  const donationCampaign = useLoaderData() as IDonationCampaign
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Campanha de doação
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container justifyContent="center">
                <Grid item>
                  <img
                    src={donationCampaignImg}
                    alt={donationCampaign.title}
                    style={{ width: '100%', maxWidth: 350, height: 'auto' }}
                  />
                </Grid>
              </Grid>
              <Typography
                variant="h5"
                component="h2"
                textAlign="center"
                gutterBottom
              >
                {donationCampaign.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Organizador:</strong>{' '}
                {`${donationCampaign.campaignOrganizer?.firstName} ${donationCampaign.campaignOrganizer?.lastName}`}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Meta:</strong> R${donationCampaign.goal.toFixed(2)}
              </Typography>
              <Typography variant="body1">
                <strong>Arrecadado:</strong> R$
                {donationCampaign.moneyRaised.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() =>
                  navigate(`/donate/donation-campaign/${donationCampaign.id}`)
                }
              >
                Fazer doação
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
