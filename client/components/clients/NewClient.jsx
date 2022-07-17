import React from 'react'
import { useDispatch } from 'react-redux'
import request from 'superagent'
import { Formik } from 'formik'
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'

import { setSelectedClient, getClients } from '../../reducers/clientList'
import { ClientForm } from './ClientForm'

export function NewClient() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  return (
    <>
      <Button onClick={onOpen} mr={3} colorScheme="whiteAlpha">
        Create Client
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Create client</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              business_name: '',
              contact_name: '',
              phone: '',
              email: '',
              address: 'New Zealand',
              rate: 50,
            }}
            onSubmit={(values) => {
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
            {() => <ClientForm isUpdate={false} onClose={onClose} />}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
