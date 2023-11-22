import {
  Navigate,
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CreateDonationCampaign } from './pages/DonationCampaign/Create'
import { isLogged } from './helpers/isLogged'
import { NotFound } from './pages/404NotFound'
import { DonationCampaignInfo } from './pages/DonationCampaign/Info'
import { api } from './services/api'
import { IResponse } from './interfaces/IResponse'

const PrivateRoutes = () => {
  const isUserLogged = isLogged()

  return isUserLogged ? <Outlet /> : <Navigate to="/login" replace={false} />
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/create/donation-campaign"
          element={<CreateDonationCampaign />}
          action={isLogged}
        />
      </Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route
          path="/"
          element={<Home />}
          loader={async () => {
            const response: IResponse = await api.get(`/donation-campaign`)
            const donationCampaigns = response.data.payload

            return donationCampaigns
          }}
        />
      </Route>
      <Route
        path="/view/donation-campaign/:id"
        element={<DonationCampaignInfo />}
        loader={async ({ params }) => {
          const response: IResponse = await api.get(
            `/donation-campaign/findById/${params.id}`,
          )
          const donationCampaign = response.data.payload

          return donationCampaign
        }}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </>,
  ),
)
