import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Center,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { setUninvoicedTotals } from '../reducers/taskList'

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

  return selectedClient.id ? (
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

      <Divider />

      <Tasks />

      <NewTask />
      <NewInvoice />
    </>
  ) : (
    <>
      <Heading size="2xl">Current Summary</Heading>
      <Flex mt="5" mr="10">
        <Box
          p="3"
          borderColor="goldenrod"
          borderWidth="2px"
          borderRadius="lg"
          color="goldenrod"
          alignItems="right"
        >
          <Box
            color="gray.600"
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="2xl"
            textTransform="uppercase"
          >
            Earnings
          </Box>
          <Heading size="xl">$ 61,345.87</Heading>
        </Box>
        <Spacer />
        <Box
          p="3"
          borderColor="red"
          borderWidth="2px"
          borderRadius="lg"
          color="red"
          alignItems="right"
        >
          <Box
            color="gray.600"
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="2xl"
            textTransform="uppercase"
          >
            GST
          </Box>
          <Heading size="xl">$ 5,344.23</Heading>
        </Box>
        <Spacer />
        <Box
          p="3"
          borderColor="green"
          borderWidth="2px"
          borderRadius="lg"
          color="green"
          alignItems="right"
        >
          <Box
            color="gray.600"
            fontWeight="bold"
            letterSpacing="wide"
            fontSize="2xl"
            textTransform="uppercase"
          >
            Uninvoiced
          </Box>
          <Heading size="xl">$ 2,003.87</Heading>
        </Box>
      </Flex>
      <Heading mt="5" size="xl">
        Uninvoiced Tasks
      </Heading>
      <Heading mt="5" size="xl">
        Recent Invoices
      </Heading>
    </>
  )
}
