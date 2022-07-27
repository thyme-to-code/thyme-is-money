// @ts-check
import React from 'react'
import { useDispatch } from 'react-redux'
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

import { clearSelectedClient } from '../reducers/clientList'

export function Header() {
  const { logout } = useAuth0()
  const dispatch = useDispatch()

  function handleLogOut(event) {
    event.preventDefault()
    localStorage.clear()
    logout()
  }

  function handleClick() {
    dispatch(clearSelectedClient())
  }

  return (
    <Flex>
      <Box>
        <HStack>
          <Image
            onClick={handleClick}
            boxSize="64px"
            alt="Two leaves as logo"
            src="/favicon-crop.png"
          />
          <Spacer px="1" />
          <Heading onClick={handleClick} as="h1" color="#fff">
            Thyme is Money
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <Box mr={3}>
        <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          Log Out
        </Button>
      </Box>
    </Flex>
  )
}
