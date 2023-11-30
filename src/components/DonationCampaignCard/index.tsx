import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material'

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
  const progress = (current / goal) * 100
  const [isExpanded, setIsExpanded] = useState(false)
  const displayDescription = isExpanded
    ? description
    : `${description.substring(0, 35)}...`

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '100%', // Ensures Card does not exceed the width of the Grid item
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {displayDescription}
            {description.length > 50 && (
              <Link
                component="button"
                variant="body2"
                onClick={toggleReadMore}
                sx={{ ml: 1 }}
              >
                Leia mais
              </Link>
            )}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2">
            Arrecadado: R${current.toFixed(2)} - Meta: R${goal.toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => navigate(`/view/donation-campaign/${id}`)}
          >
            Visualizar Campanha
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
