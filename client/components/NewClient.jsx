import React from 'react'
import { Formik, Field, Form } from 'formik'
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
      <Formik
        initialValues={{
          name: 'Business',
          contact: 'Fred',
          phone: '234324323423',
          email: '123@me.me',
          address: '42 Wallaby Way',
          rate: 50,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
          }, 1000)
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Button onClick={onOpen}>New Client</Button>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add new client</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl isRequired>
                    <FormLabel htmlFor="name">Business Name</FormLabel>
                    <Field as={Input} id="name" type="text" />
                  </FormControl>

                  {/* // <FormLabel htmlFor="contact">Primary Contact</FormLabel>
                        // <Input id="contact" type="text" />
                        // <FormLabel htmlFor="phone">Contact Phone</FormLabel>
                        // <InputGroup>
                        //   <InputLeftElement color="gray.400">
                        //     +
                        //   </InputLeftElement>
                        //   <Input id="phone" type="tel" />
                        // </InputGroup>
                        // <FormLabel htmlFor="email">Email address</FormLabel>
                        // <Input id="email" type="email" />
                        // <FormLabel htmlFor="address">Address</FormLabel>
                        // <Textarea
                        //   value={values.address}
                        //   id="address"
                        //   placeholder="42 Wallaby Way, Sydney, Australia"
                        //   size="sm"
                        // />
                        // <FormLabel htmlFor="rate">Hourly Rate</FormLabel>
                        {/* <HStack maxW="320px"> */}
                  {/* <InputGroup>
                        <InputLeftElement color="gray.400">$</InputLeftElement>
                        <Input id="rate" type="number" />
                      </InputGroup> */}
                  {/* <Button {...dec}>-</Button>
                        <Button {...inc}>+</Button>
                      </HStack> */}
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="green"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </form>
        )}
      </Formik>
    </>
  )
}
