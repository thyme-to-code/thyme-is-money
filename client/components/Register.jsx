// @ts-check
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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

export function Register() {
  const user = useSelector((state) => state.user)
  const [formUserData, setFormUserData] = useState({
    auth0Id: '',
    name: '',
    location: '',
    bio: '',
  })

  useEffect(() => {
    setFormUserData({
      ...formUserData,
      auth0Id: user?.auth0Id,
      token: user?.token,
    })
  }, [user])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button mr={3} onClick={onOpen} colorScheme="teal">
        Register
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Register</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              name: '',
              location: '',
              bio: '',
            }}
            onSubmit={(newUser) => {
              // dispatch(addUser(newUser))
              onClose()
            }}
          >
            <Form>
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Field
                    as={Textarea}
                    name="name"
                    id="name"
                    variant="filled"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Field
                    as={Input}
                    name="location"
                    id="location"
                    variant="filled"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Field as={Input} name="bio" id="bio" variant="filled" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} colorScheme="gray" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal">
                  Register
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
