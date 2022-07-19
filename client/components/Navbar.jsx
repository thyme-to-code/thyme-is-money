import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Spacer } from '@chakra-ui/react'
import { InvoiceCsv } from './invoices/InvoiceCsv'
import { NewClient } from './clients/NewClient'
import { ClientSelector } from './clients/ClientSelector'

export function Navbar() {
  const clients = useSelector((state) => state.clientList)

  if (clients.loading) {
    return <>Loading ...</>
  }

  return (
    <>
      <Flex height={'100%'} direction="column">
        <ClientSelector />
        <Spacer />
        <Flex sx={{ position: 'sticky', bottom: 0 }} direction="column">
          <NewClient />
          <InvoiceCsv />
        </Flex>
      </Flex>
    </>
  )
}
