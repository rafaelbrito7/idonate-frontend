export interface IDonationCampaign {
  id: string
  title: string
  description: string
  goal: number
  moneyRaised: number
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  campaignOrganizerId: string
}
