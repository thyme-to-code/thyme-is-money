import React from 'react'
import { Formik, FormikProps, Field, Form } from 'formik'
import {
  useDisclosure,
  useNumberInput,
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
  HStack,
  NumberInput,
  NumberInputField,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'

export function NewClient() {
  // function handleClick() {}
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
  //   useNumberInput({
  //     step: 5,
  //     defaultValue: 50,
  //     min: 0,
  //     max: 200,
  //     precision: 0,
  //   })

  // const inc = getIncrementButtonProps()
  // const dec = getDecrementButtonProps()
  // const input = getInputProps()

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
              name: 'Business',
              // contact: 'Fred',
              // phone: '234324323423',
              // email: '123@me.me',
              // address: '42 Wallaby Way',
              // rate: 50,
            }}
            onSubmit={(values) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2))
              }, 100)
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Business Name</FormLabel>
                    <Field
                      as={Input}
                      name="name"
                      id="name"
                      type="text"
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
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
