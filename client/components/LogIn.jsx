import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

function LogIn() {
  const { loginWithRedirect } = useAuth0()

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
        <Button colorScheme="whiteAlpha">
          <Link to="/home">Continue</Link>
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
