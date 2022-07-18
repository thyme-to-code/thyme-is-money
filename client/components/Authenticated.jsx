import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

export const isAuthenticated = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated
}

export function IfAuthenticated({ children }) {
  return isAuthenticated() ? <>{ children }</> : null
}

export function IfNotAuthenticated({ children }) {
  return !isAuthenticated() ? <>{ children }</> : null
}

