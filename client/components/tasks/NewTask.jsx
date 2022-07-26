// @ts-check
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

import { getUninvoicedItems } from '../../reducers/items'
import { addTask } from '../../apis/tasks'
import { MdAddCircle } from 'react-icons/md'

export function NewTask() {
  const dispatch = useDispatch()
  const { selected } = useSelector((state) => state.clients)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        leftIcon={<MdAddCircle />}
        onClick={onOpen}
        bg="brand.100"
        color="brand.50"
        justifyContent={'left'}
        _hover={{ bg: 'brand.200' }}
        w="100%"
      >
        Task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Create Task</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              description: '',
              type: 1,
              quantity: '',
              client_id: selected.id,
            }}
            onSubmit={async (newTask) => {
              await addTask(newTask)
              dispatch(getUninvoicedItems())
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
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Hours</FormLabel>
                  <Field
                    as={Input}
                    name="quantity"
                    id="quantity"
                    type="number"
                    variant="filled"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} colorScheme="gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  bg="brand.100"
                  color="brand.50"
                  _hover={{ bg: 'brand.200' }}
                >
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
