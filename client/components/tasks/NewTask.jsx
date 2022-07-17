import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
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
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button mr={3} onClick={onOpen} colorScheme="teal">
        Create Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Create Task</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              description: '',
              hours: '',
              status: 'uninvoiced',
              client_id: selectedClient.id,
              created_at: new Date(),
            }}
            onSubmit={(newTask) => {
              dispatch(addClientTask(newTask))
              onClose()
            }}
          >
            <Form>
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Field
                    as={Textarea}
                    name="description"
                    id="description"
                    variant="filled"
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Hours</FormLabel>
                  <Field
                    as={Input}
                    name="hours"
                    id="hours"
                    type="number"
                    variant="filled"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} colorScheme="gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal">
                  Create
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
