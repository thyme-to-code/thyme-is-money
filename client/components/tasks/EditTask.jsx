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
  IconButton,
} from '@chakra-ui/react'
import { MdEdit } from 'react-icons/md'

export function EditTask(props) {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { description, hours, id } = props.value.task
  const { selectedClient } = useSelector((state) => state.clientList)

  return (
    <>
      <IconButton
        fontSize="1.4em"
        onClick={onOpen}
        mr="2"
        size="sm"
        bg="brand.100"
        color="brand.50"
        _hover={{ bg: 'brand.200' }}
        icon={<MdEdit />}
      ></IconButton>

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
              dispatch(updateClientTask(newTask))
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
