// @ts-check
import React from 'react'
import { useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/react'
import { ClientSelector } from './clients/ClientSelector'

export function Navbar() {
  const clients = useSelector((state) => state.clients)

  if (clients.loading) {
    return <>Loading ...</>
  }

  return (
    <>
      <Flex>
        <ClientSelector />
      </Flex>
    </>
  )
}
