import React from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button, 
  IconButton,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { GoGrabber } from 'react-icons/go'

import { clearSelectedClient } from '../reducers/clientList'

export function Header() {
  const { logout } = useAuth0()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  function handleLogOut(event) {
    event.preventDefault()
    localStorage.clear()
    logout()
  }

  function handleClick() {
    dispatch(clearSelectedClient())
  }

  const expandMenu = () => {
    onOpen()
  }

  return (
    <>
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
          <IconButton
            onClick={expandMenu}
            colorScheme="whiteAlpha"
            icon={<GoGrabber />}
          />
        </Box>
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size={{ base: 'full', md: 'xs', lg: 'xs' }}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Menu`}</DrawerHeader>
          <DrawerBody>
            <Button variant="outline" onClick={handleLogOut}>
              Log Out
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>

     
  )
}
