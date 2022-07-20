import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
} from '@chakra-ui/react'
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
        <HStack>
          <Image
            boxSize="64px"
            alt="Two leaves as logo"
            src="/favicon-crop.png"
          />
          <Spacer px="1" />
          <Heading as="h1" color="#fff">
            Thyme is Money
          </Heading>
        </HStack>
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
