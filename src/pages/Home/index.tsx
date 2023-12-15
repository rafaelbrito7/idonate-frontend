import {
  Button,
  Grid,
  Box,
  Typography,
  Pagination,
  Container,
} from '@mui/material'
import { DonationCampaignCard } from '../../components/DonationCampaignCard'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { IDonationCampaign } from '../../interfaces/IDonationCampaign'

export function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const pageSize = 10
  const donationCampaigns = useLoaderData() as IDonationCampaign[]

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return donationCampaigns.slice(start, start + pageSize)
  }, [currentPage, pageSize, donationCampaigns])

  return (
    <>
      <Container>
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem 0',
          }}
        >
          <Grid item>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                marginBottom: { xs: 2, sm: 0 },
                fontSize: { xs: 20, sm: 30, md: 40, lg: 50, xl: 40 },
              }}
            >
              Campanhas
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              onClick={() => navigate('/create/donation-campaign')}
              sx={{ alignSelf: 'center' }}
            >
              Criar campanha
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {paginatedItems.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
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
      </Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 0',
        }}
      >
        <Pagination
          count={Math.ceil(donationCampaigns.length / pageSize)}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
          shape="rounded"
          sx={{ marginY: { xs: 2, sm: 3 } }}
        />
      </Box>
    </>
  )
}
