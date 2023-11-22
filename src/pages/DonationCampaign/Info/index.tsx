import { Button } from '@mui/material'
import { IDonationCampaign } from '../../../interfaces/IDonationCampaign'
import {
  Container,
  ContentContainer,
  DonationCampaignInfoContainer,
  HeaderContainer,
} from './styles'

import { useLoaderData, useNavigate } from 'react-router-dom'

import donationCampaignImg from '../../../assets/donationCampaignLogo.jpg'

export function DonationCampaignInfo() {
  const donationCampaign = useLoaderData() as IDonationCampaign

  const navigate = useNavigate()

  return (
    <Container>
      <HeaderContainer>
        <h1>Campanha de doação</h1>
      </HeaderContainer>
      <ContentContainer>
        <DonationCampaignInfoContainer>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={donationCampaignImg}
              alt={donationCampaign.title}
              height={350}
            />
          </div>
          <h2>{donationCampaign.title}</h2>

          <span>
            <b>Organizador: </b>
            {donationCampaign.campaignOrganizer?.firstName}{' '}
            {donationCampaign.campaignOrganizer?.lastName}
          </span>
          <span>
            <b>Meta:</b> R${donationCampaign.goal}
          </span>
          <span>
            <b>Arrecadado:</b> R${donationCampaign.moneyRaised}
          </span>

          <Button
            variant="contained"
            color="success"
            onClick={() => navigate('')}
          >
            Fazer doação
          </Button>
        </DonationCampaignInfoContainer>
      </ContentContainer>
    </Container>
  )
}
