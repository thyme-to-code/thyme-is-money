import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Divider,
} from '@chakra-ui/react'

import { deleteTask } from '../apis/tasks'
import { getActiveClientTasks } from '../reducers/taskList'
import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'

export function Client() {
  const dispatch = useDispatch()

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

  useEffect(() => {
    dispatch(getActiveClientTasks(selectedClient.id))
  }, [selectedClient])

  function handleDelete(e) {
    const taskId = e.target.id
    taskId && deleteTask(taskId)
    return dispatch(getActiveClientTasks(selectedClient.id))
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <ClientDetails />

      {selectedClient.business_name && (
        <Stat>
          <StatLabel>Uninvoiced Amount</StatLabel>
          <StatNumber>${stats.uninvoicedAmount}</StatNumber>
          <StatHelpText>Total Hours: {stats.hours}</StatHelpText>
        </Stat>
      )}

      <Divider />

      <div className="tasks">
        {selectedClient.business_name && (
          <SimpleGrid columns={4} spacing={10}>
            <Box w="50%">Task</Box>
            <Box>Hours</Box>
            <Box>Amount</Box>
            <Box>Remove</Box>
          </SimpleGrid>
        )}

        {taskList?.data.map((task) => (
          <SimpleGrid key={task.id} columns={4} spacing={10}>
            <Box>
              <>{task.description} </>
            </Box>
            <Box>
              <>{task.hours}</>
            </Box>
            <Box>
              <>${task.hours * selectedClient.rate}</>
            </Box>
            <Box>
              <Button
                m={1}
                colorScheme="teal"
                size="sm"
                id={task.id}
                value={task.id}
                onClick={handleDelete}
              >
                x
              </Button>
            </Box>
          </SimpleGrid>
        ))}
      </div>
      {selectedClient.business_name && (
        <>
          <NewTask />
          <NewInvoice />
        </>
      )}
    </>
  )
}
