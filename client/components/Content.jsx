import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { setUninvoicedTotals } from '../reducers/taskList'

export function Content() {
  const dispatch = useDispatch()
  // Selectors
  const { selectedClient, loading } = useSelector((state) => state.clientList)
  const { data: tasks, uninvoiced } = useSelector((state) => state.taskList)

  useEffect(() => {
    dispatch(setUninvoicedTotals({ tasks, rate: selectedClient.rate }))
  }, [tasks])

  if (loading) {
    return <>Loading...</>
  }

  return (
    selectedClient.id && (
      <>
        <ClientDetails />

        <Divider />
        {/* TODO Consider refactoring into a ClientStats component */}
        <Stat>
          <StatLabel>Uninvoiced Amount</StatLabel>
          <StatNumber>${uninvoiced.amount}</StatNumber>
          <StatHelpText>Total Hours: {uninvoiced.hours}</StatHelpText>
        </Stat>

        <Divider />

        <Tasks />

        <NewTask />
        <NewInvoice />
      </>
    )
  )
}
