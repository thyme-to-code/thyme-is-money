import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'

export function Landing() {
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
    <div className="landing">
      <div className="context">
        <h1>Thyme is Money</h1>
        <IfAuthenticated>
        <Button colorScheme="whiteAlpha">
          Continue
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
      </div>
      <div className="background" >
        <div className="shapes">
          <div className="shape"></div>
          <div className="shape"></div>  
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      </div >
    </div>
  )
}

