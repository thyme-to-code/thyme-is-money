import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Flex, Spacer, Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function Header() {
  const { logout } = useAuth0()

  function handleLogOut(event) {
    event.preventDefault()
    localStorage.clear()
    logout()
  }

  return (
    <Flex>
      <Box>
        <Heading as="h1" color="#fff">
          🌱 Thyme is Money
        </Heading>
      </Box>
      <Spacer />
      <Box mr={3}>
        <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          <Link to="/">Log Out</Link>
        </Button>
      </Box>
    </Flex>
  )
}
