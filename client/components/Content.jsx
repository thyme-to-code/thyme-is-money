import React from 'react'
import { useSelector } from 'react-redux'
import {
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
import { UpdateClient } from './clients/UpdateClient'

export function Content() {
  const { selectedClient, loading } = useSelector((state) => state.clientList)

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    )
  }

  return (
    selectedClient.id && (
      <>
        <ClientDetails />
        <Divider mt={2} mb={2} />
        <Flex>
          <NewTask />
          <NewInvoice />
          <Spacer />
          <UpdateClient />
        </Flex>
        <Divider mt={2} mb={2} />
        <Tasks />
      </>
    )
  )
}
