import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActiveClientTasks } from '../reducers/taskList'
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
  IconButton,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { addTask, deleteTask } from '../apis/tasks'

export function Client() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)
  const initialState = { description: '', hours: '' }
  const [task, setNewTask] = useState(initialState)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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
    addTask(task)
    return onClose()
  }

  function handleDelete(e) {
    console.log(e.target)
    const taskId = e.target.id
    taskId && deleteTask(taskId)
    return dispatch(getActiveClientTasks(selectedClient.id))
  }

  return (
    <>
      <div className="client">
        <h2>{selectedClient.business_name}</h2>
        <p>{selectedClient.contact_name}</p>
        <p>{selectedClient.email}</p>
        <p>{selectedClient.phone}</p>
      </div>

      <h1>Uninvoiced Tasks</h1>
      <div className="tasks">
        {taskList?.data.map((task, i) => (
          <>
            <li key={i}>
              {task.description}{' '}
              <Button
                id={task.id}
                value={task.id}
                onClick={handleDelete}
              >x</Button>
            </li>
          </>
        ))}
      </div>
      {selectedClient.business_name && (
        <>
          <Button onClick={onOpen}>Create Task</Button>
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
