import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../contexts/AuthContext'

export default function useAuthContext() {
  const authContext = useContext(AuthContext) as AuthContextProps
  return authContext
}
