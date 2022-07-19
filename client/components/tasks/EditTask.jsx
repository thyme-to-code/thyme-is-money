import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateClientTask } from '../../reducers/taskList'
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

export function EditTask(props) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { description, hours, id } = props.value.task
  const { selectedClient } = useSelector((state) => state.clientList)

  return (
    <>
      <Button onClick={onOpen} size="sm" m={1} colorScheme="teal">
        e
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Update Task</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              description: description,
              hours: hours,
              status: 'uninvoiced',
              client_id: selectedClient.id,
              id,
            }}
            onSubmit={(newTask) => {
              // console.log(newTask)
              dispatch(updateClientTask(newTask))
              // edit task
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
                  Update
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
