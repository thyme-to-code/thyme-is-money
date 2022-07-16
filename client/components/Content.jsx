import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

export function Content() {
  // Selectors
  const { selectedClient, loading } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)

  // Invoicing stats at the top of page
  const [stats, setStats] = useState({ uninvoicedAmount: 0, hours: 0 })
  let totalHours = 0
  let totalAmount = 0

  taskList?.data.forEach((task) => {
    if (task.status === 'uninvoiced') {
      return (totalHours += task.hours)
    } else {
      return
    }
  })

  useEffect(() => {
    totalAmount = totalHours * selectedClient.rate
    setStats({ ...stats, hours: totalHours, uninvoicedAmount: totalAmount })
  }, [taskList])

  if (loading) {
    return <>Loading...</>
  }

  return (
    selectedClient.id && (
      <>
        <ClientDetails />

        {/* TODO Consider refactoring into a ClientStats component */}
        <Stat>
          <StatLabel>Uninvoiced Amount</StatLabel>
          <StatNumber>${stats.uninvoicedAmount}</StatNumber>
          <StatHelpText>Total Hours: {stats.hours}</StatHelpText>
        </Stat>

        <Divider />

        <Tasks />

        <NewTask />
        <NewInvoice />
      </>
    )
  )
}
