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

import { NotFound } from './pages/404NotFound'
import { DonationCampaignInfo } from './pages/DonationCampaign/Info'
import { api } from './services/api'
import { IResponse } from './interfaces/IResponse'
import { isAuthenticated } from './helpers/auth'
import { CreateDonation } from './pages/DonationCampaign/Donate'

const PrivateRoutes = () => {
  const authStatus = isAuthenticated()
  return authStatus ? <Outlet /> : <Navigate to="/login" replace />
}

const LoginRoute = () => {
  const authStatus = isAuthenticated()
  return !authStatus ? <Login /> : <Navigate to="/" replace />
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DefaultLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/donate/donation-campaign/:id"
            element={<CreateDonation />}
          />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/create/donation-campaign"
            element={<CreateDonationCampaign />}
          />
        </Route>
        <Route
          path="/"
          element={<Home />}
          loader={async () => {
            const response: IResponse = await api.get(`/donation-campaign`)
            const donationCampaigns = response.data.payload

            return donationCampaigns
          }}
        />
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
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<LoginRoute />} />

      <Route path="*" element={<NotFound />} />
    </>,
  ),
)
