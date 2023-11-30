import { Button, Grid, Box, Typography, Pagination } from '@mui/material'
import { DonationCampaignCard } from '../../components/DonationCampaignCard'
import { useMemo, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { IDonationCampaign } from '../../interfaces/IDonationCampaign'

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          marginBottom: { xs: 2, sm: 3 },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginBottom: { xs: 2, sm: 0 } }}
        >
          Campanhas
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/create/donation-campaign')}
          sx={{ alignSelf: 'center' }}
        >
          Criar campanha
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '90vh' }}>
        <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
          {paginatedItems.map((item) => (
            <DonationCampaignCard
              key={item.id}
              id={item.id}
              description={item.description}
              current={item.moneyRaised}
              goal={item.goal}
              title={item.title}
            />
          ))}
        </Grid>
      </Box>

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
    </Box>
  )
}
