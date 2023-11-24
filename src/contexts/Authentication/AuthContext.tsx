import { ReactNode, createContext, useState, useContext } from 'react'

interface IAuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const contextValue: IAuthContextType = {
    isAuthenticated,
    setIsAuthenticated,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
