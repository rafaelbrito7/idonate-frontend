import { Button, Grid } from '@mui/material'
import { DonationCampaignCard } from '../../components/DonationCampaignCard'
import { useEffect, useMemo, useState } from 'react'
import {
  ContentContainer,
  FooterContainer,
  HeaderContainer,
  HomeContainer,
} from './styles'
import { IResponse } from '../../interfaces/IResponse'
import { IDonationCampaign } from '../../interfaces/IDonationCampaign'
import Pagination from '@mui/material/Pagination'

import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageSize, setPageSize] = useState(9)
  const [donationCampaigns, setDonationCampaigns] = useState<
    IDonationCampaign[]
  >([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response: IResponse = await api.get('/donation-campaign/')
      const data = await response.data.payload
      setDonationCampaigns(data)
    }

    fetchData()
  }, [])

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return donationCampaigns.slice(start, start + pageSize)
  }, [currentPage, pageSize, donationCampaigns])

  return (
    <HomeContainer>
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
    </HomeContainer>
  )
}
