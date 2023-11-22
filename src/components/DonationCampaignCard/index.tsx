import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

interface IDonationCampaignCardProps {
  id: string
  title: string
  description: string
  goal: number
  current: number
}

export function DonationCampaignCard({
  id,
  title,
  description,
  goal,
  current,
}: IDonationCampaignCardProps) {
  const navigate = useNavigate()

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
              {title}
            </Typography>
            <Typography color="text.secondary">
              Arrecadado: R${current} - Meta: R${goal}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/view/donation-campaign/${id}`)}
            >
              Visualizar Campanha
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
}
