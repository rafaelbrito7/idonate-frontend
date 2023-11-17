import { createContext } from 'react'
import { SnackbarContextType } from './SnackbarContextType'

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
)
