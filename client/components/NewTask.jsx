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
} from '@chakra-ui/react'

export function NewTask() {
  const dispatch = useDispatch()
  const { selectedClient, loading } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)
  const initialState = { description: '', hours: '' }
  const [task, setNewTask] = useState(initialState)
  const [stats, setStats] = useState({ uninvoicedAmount: 0, hours: 0 })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)


return (
{selectedClient.business_name && (
    <>
      <Button mr={3} onClick={onOpen}>
        Create Task
      </Button>
      <Button>Create Invoice</Button>
    </>
  )
}
;<Modal
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
      <Button type="submit" onClick={handleSubmit} colorScheme="green" mr={3}>
        Save
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
)
}