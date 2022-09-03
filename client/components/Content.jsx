import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Spacer,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { Overview } from './Overview'
import { ClientInvoiceList } from './invoices/ClientInvoiceList'

export function Content() {
  const { selected, loading } = useSelector((state) => state.clients)

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    )
  }

  return (
    <Box m={5}>
      {selected.id ? (
        <>
          <Flex>
            <ClientDetails />
            <Flex
              w="100px"
              h="128px"
              direction="column"
              minWidth="max-content"
              alignItems="center"
            >
              <ClientInvoiceList />
              <Spacer />
              <NewInvoice />
              <Spacer />
              <NewTask />
            </Flex>
          </Flex>
          <Divider m={3} />
          <Tasks />
        </>
      ) : (
        <Overview />
      )}
    </Box>
  )
}
