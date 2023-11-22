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
  campaignOrganizer?: {
    id: string
    email: string
    firstName: string
    lastName: string
    birthday: Date
    cpf: string
    password: string
    hashedRt: string
    status: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
  }
}
