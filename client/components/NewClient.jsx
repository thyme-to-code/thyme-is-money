import React from 'react'
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
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 5,
      defaultValue: 50,
      min: 0,
      max: 200,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <>
      <Button onClick={onOpen}>New Client</Button>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new client</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Business Name</FormLabel>
              <Input id="name" type="text" />
              <FormLabel htmlFor="contact-name">Primary Contact</FormLabel>
              <Input id="contact-name" type="text" />
              <FormLabel htmlFor="contact-phone">Contact Phone</FormLabel>
              <InputGroup>
                <InputLeftElement color="gray.300">+</InputLeftElement>
                <Input id="tel" type="text" />
              </InputGroup>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input id="email" type="email" />
              <FormLabel htmlFor="address">Address</FormLabel>
              <Textarea
                id="address"
                placeholder="42 Wallaby Way, Sydney, Australia"
                size="sm"
              />
              <FormLabel htmlFor="rate">Hourly Rate</FormLabel>
              <HStack maxW="320px">
                <InputGroup>
                  <InputLeftElement color="gray.300">$</InputLeftElement>
                  <Input {...input} />
                </InputGroup>
                <Button {...dec}>-</Button>
                <Button {...inc}>+</Button>
              </HStack>

              {/* <NumberInput min={0}>
                <NumberInputField id="rate" />
              </NumberInput> */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
