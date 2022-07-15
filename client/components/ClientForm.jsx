import React from 'react'
import { Field, Form } from 'formik'
import {
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react'

export function ClientForm(props) {
  // const { onClose } = useDisclosure()

  return (
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
          <FormLabel htmlFor="contact_name">Primary Contact</FormLabel>
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
        <Button colorScheme="gray" mr={3} onClick={props.onClose}>
          Cancel
        </Button>
        <Button colorScheme={props.isUpdate ? 'orange' : 'green'} type="submit">
          {props.isUpdate ? <>Update</> : <>Create</>}
        </Button>
      </ModalFooter>
    </Form>
  )
}
