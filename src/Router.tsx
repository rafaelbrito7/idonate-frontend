import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { CreateDonationCampaign } from './pages/DonationCampaign/Create'
import { isLogged } from './helpers/isLogged'
import { NotFound } from './pages/404NotFound'

const PrivateRoutes = () => {
  const isUserLogged = isLogged()

  return isUserLogged ? <Outlet /> : <Navigate to="/login" replace={false} />
}

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          path="/create/donation-campaign"
          element={<CreateDonationCampaign />}
          action={isLogged}
        />
      </Route>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
