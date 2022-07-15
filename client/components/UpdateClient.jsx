import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import request from 'superagent'
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

import { setSelectedClient, getClients } from '../reducers/clientList'

export function UpdateClient() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  console.log(selectedClient)
  return (
    <>
      <Button mr={3} bgColor="orange.600" onClick={onOpen}>
        Update Client
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update client</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={selectedClient}
            onSubmit={(values) => {
              request
                .patch('/api/v1/clients')
                .send(values)
                .then((res) => {
                  dispatch(getClients())
                  dispatch(setSelectedClient(res.body))
                  onClose()
                })
                .catch((err) => console.log(err))
            }}
          >
            {() => (
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
                  <Button colorScheme="orange" type="submit">
                    Update
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
