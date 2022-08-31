import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  IconButton,
} from '@chakra-ui/react'
import { MdHome, MdMenu, MdOutlineLogout } from 'react-icons/md'

import { clearSelectedClient } from '../reducers/clients'

import { AddClient } from './clients/AddClient'
import { InvoiceCsv } from './invoices/InvoiceCsv'

export function Header() {
  const { logout } = useAuth0()
  const dispatch = useDispatch()

  function handleLogOut(event) {
    event.preventDefault()
    localStorage.clear()
    logout()
  }

  function showSummary() {
    dispatch(clearSelectedClient())
  }

  const menu = (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MdMenu />}
        variant="flush"
        fontSize={'xxx-large'}
        color="brand.50"
        _hover={{ bg: 'brand.200' }}
        _active={{ bg: 'brand.200' }}
      />
      <MenuList>
        <MenuItem color="brand.200" icon={<MdHome />} onClick={showSummary}>
          Home
        </MenuItem>
        <AddClient />
        <InvoiceCsv />
        <MenuItem
          color="brand.200"
          icon={<MdOutlineLogout />}
          onClick={handleLogOut}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )

  return (
    <Flex>
      <Box>
        <HStack>
          <Image
            onClick={showSummary}
            boxSize="64px"
            alt="Two leaves as logo"
            src="/favicon-crop.png"
          />
          <Spacer px="1" />
          <Heading onClick={showSummary} as="h1" color="#fff">
            Thyme is Money
          </Heading>
        </HStack>
      </Box>
      <Spacer />
      <Box mr={3}>
        {menu}
        {/* <Button colorScheme="whiteAlpha" onClick={handleLogOut}>
          Log Out
        </Button> */}
      </Box>
    </Flex>
  )
}
