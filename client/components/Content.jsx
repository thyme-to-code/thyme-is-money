import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Flex,
  Spacer,
  CircularProgress,
  Center,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { setUninvoicedTotals } from '../reducers/taskList'
import { UpdateClient } from './clients/UpdateClient'

export function Content() {
  const dispatch = useDispatch()
  const { selectedClient, loading } = useSelector((state) => state.clientList)
  const { data: tasks, uninvoiced } = useSelector((state) => state.taskList)

  useEffect(() => {
    dispatch(setUninvoicedTotals({ tasks, rate: selectedClient.rate }))
  }, [tasks])

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
        <Flex>
          <ClientDetails />
          <Spacer />
          {/* TODO Consider refactoring into a ClientStats component */}
          <Stat>
            <StatLabel>Uninvoiced Amount</StatLabel>
            <StatNumber>${uninvoiced.amount}</StatNumber>
            <StatHelpText>Total Hours: {uninvoiced.hours}</StatHelpText>
          </Stat>
        </Flex>

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
