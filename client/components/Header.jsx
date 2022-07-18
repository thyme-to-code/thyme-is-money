import React from 'react'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { Box, Flex, Spacer, Heading, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { NewClient } from './clients/NewClient'
import { UpdateClient } from './clients/UpdateClient'

export function Header() {
  const { logout } = useAuth0()
  const { selectedClient } = useSelector((state) => state.clientList)

  function handleLogOut(event) {
    event.preventDefault()
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
        {selectedClient.id && <UpdateClient />}
        <NewClient />
        <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          <Link to="/">Log Out</Link>
        </Button>
      </Box>
    </Flex>
  )
}
