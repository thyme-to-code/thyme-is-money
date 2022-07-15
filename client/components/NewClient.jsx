import React from 'react'
import { useDispatch } from 'react-redux'
import request from 'superagent'
import { setSelectedClient, getClients } from '../reducers/clientList'
import { Formik, Field, Form } from 'formik'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react'

export function NewClient() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <>
      <Button onClick={onOpen}>New Client</Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new client</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              business_name: 'Foo',
              contact_name: 'Bar',
              phone: '021 123 456',
              email: 'eat@sherman.com',
              address: 'New Zealand',
              rate: 50,
            }}
            onSubmit={(values) => {
              console.log(values)
              request
                .post('/api/v1/clients')
                .send(values)
                .then((res) => {
                  dispatch(getClients())
                  dispatch(setSelectedClient(res.body))
                  onClose()
                })
                .catch((err) => console.log(err))
            }}
          >
            {(props) => (
              <Form>
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel htmlFor="business_name">Business Name</FormLabel>
                    <Field
                      as={Input}
                      name="business_name"
                      id="business_name"
                      type="text"
                      variant="filled"
                    />
                    <FormLabel htmlFor="contact_name">
                      Primary Contact
                    </FormLabel>
                    <Field
                      as={Input}
                      name="contact_name"
                      id="contact_name"
                      type="text"
                      variant="filled"
                    />
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Field
                      as={Input}
                      name="phone"
                      id="phone"
                      type="tel"
                      variant="filled"
                    />
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      as={Input}
                      name="email"
                      id="email"
                      type="email"
                      variant="filled"
                    />
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Field
                      as={Textarea}
                      name="address"
                      id="address"
                      type="text"
                      variant="filled"
                    />
                    <FormLabel htmlFor="rate">Hourly Rate</FormLabel>
                    <Field
                      as={Input}
                      name="rate"
                      id="reate"
                      type="number"
                      variant="filled"
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="green" type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
