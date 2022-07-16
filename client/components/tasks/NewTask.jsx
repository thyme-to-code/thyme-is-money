import React, { useRef, useState } from 'react'
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
} from '@chakra-ui/react'

import { addClientTask } from '../../reducers/taskList'

export function NewTask() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)

  const initialState = { description: '', hours: '' }
  const [task, setNewTask] = useState(initialState)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)

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

  return (
    <>
      <Button mr={3} onClick={onOpen} colorScheme="teal">
        Create Task
      </Button>
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
            <Button mr={3} colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit} colorScheme="green">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
