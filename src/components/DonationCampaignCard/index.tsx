import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// )

interface IDonationCampaignCardProps {
  title: string
  description: string
  goal: number
  current: number
}

export function DonationCampaignCard({
  title,
  description,
  goal,
  current,
}: IDonationCampaignCardProps) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography variant="h5" component="div"></Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {current} / {goal}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Visualizar Campanha</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  )
}
