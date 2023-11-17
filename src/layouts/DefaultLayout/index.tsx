import { Outlet } from 'react-router-dom'

import { LayoutContainer } from './styles'
import CustomToolbar from '../../components/Toolbar'

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <CustomToolbar />
      <Outlet />
    </LayoutContainer>
  )
}
