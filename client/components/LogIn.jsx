import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function LogIn() {
  const { logout, loginWithRedirect } = useAuth0()

  function handleLogOut(event) {
    event.preventDefault()
    logout()
  }

  function handleRegister(event) {
    event.preventDefault()
    loginWithRedirect({
      redirectUri: `${window.location.origin}/register`,
    })
  }

  function handleLogIn(event) {
    event.preventDefault()
    loginWithRedirect()
  }

  return (
    <>
      <IfAuthenticated>
        <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          Log out
        </Button>
      </IfAuthenticated>

      <IfNotAuthenticated>
        <Button colorScheme="whiteAlpha" mr="15px" onClick={handleRegister}>
          Register
        </Button>
        <Button colorScheme="whiteAlpha" onClick={handleLogIn}>
          Log In
        </Button>
      </IfNotAuthenticated>
    </>
  )
}

export default LogIn
