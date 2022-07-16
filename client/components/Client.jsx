import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Divider,
  Heading,
} from '@chakra-ui/react'

import { addTask, deleteTask } from '../apis/tasks'
import { addClientTask, getActiveClientTasks } from '../reducers/taskList'
import { ClientDetails } from './client/ClientDetails'
import { NewInvoice } from './invoicing/NewInvoice'

export function Client() {
  const dispatch = useDispatch()
  const { selectedClient, loading } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)
  const initialState = { description: '', hours: '' }
  const [task, setNewTask] = useState(initialState)
  const [stats, setStats] = useState({ uninvoicedAmount: 0, hours: 0 })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

  function handleChange(e) {
    setNewTask({
      ...task,
      [e.target.name]: e.target.value,
      status: 'uninvoiced',
      client_id: selectedClient.id,
    })
  }

  function handleSubmit() {
    dispatch(addClientTask(task))
    return onClose()
  }

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

        {taskList?.data.map((task, i) => (
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
          <Button mr={3} onClick={onOpen} colorScheme="teal">
            Create Task
          </Button>
          <NewInvoice />
        </>
      )}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleChange}
                ref={initialRef}
                placeholder="Description"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Hours</FormLabel>
              <Input
                type="number"
                name="hours"
                onChange={handleChange}
                placeholder="Hours"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              onClick={handleSubmit}
              colorScheme="green"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
