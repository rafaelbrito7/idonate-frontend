import { Button, Grid } from '@mui/material'
import { DonationCampaignCard } from '../../components/DonationCampaignCard'
import { useMemo, useState } from 'react'
import {
  ContentContainer,
  FooterContainer,
  HeaderContainer,
  Container,
} from './styles'

import { IDonationCampaign } from '../../interfaces/IDonationCampaign'
import Pagination from '@mui/material/Pagination'

import { useLoaderData, useNavigate } from 'react-router-dom'

export function Home() {
  const [currentPage, setCurrentPage] = useState(1)

  const navigate = useNavigate()

  const pageSize = 9
  const donationCampaigns = useLoaderData() as IDonationCampaign[]

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return donationCampaigns.slice(start, start + pageSize)
  }, [currentPage, pageSize, donationCampaigns])

  return (
    <Container>
      <HeaderContainer>
        <h1>Campanhas</h1>
        <Button
          variant="contained"
          onClick={() => navigate('/create/donation-campaign')}
        >
          Criar campanhar
        </Button>
      </HeaderContainer>

      <ContentContainer>
        <Grid container spacing={8}>
          {paginatedItems.map((item, index) => (
            <Grid item xs={4} key={index}>
              <DonationCampaignCard
                id={item.id}
                description={item.description}
                current={item.moneyRaised}
                goal={item.goal}
                title={item.title}
              />
            </Grid>
          ))}
        </Grid>
      </ContentContainer>
      <FooterContainer>
        <Pagination
          count={Math.ceil(donationCampaigns.length / pageSize)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
        />
      </FooterContainer>
    </Container>
  )
}
