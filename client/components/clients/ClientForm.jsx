// @ts-check
import React from "react";
import { Field, Form } from "formik";
import {
  ModalBody,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

export function ClientForm(props) {
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
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
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
          <InputGroup>
            <InputLeftAddon>+64</InputLeftAddon>
            <Field
              as={Input}
              name="phone"
              id="phone"
              type="tel"
              variant="filled"
            />
          </InputGroup>
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
          <InputGroup>
            <InputLeftAddon>NZD$</InputLeftAddon>
            <Field
              as={Input}
              name="rate"
              id="create"
              type="number"
              variant="filled"
            />
          </InputGroup>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="gray" mr={3} onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          color="brand.50"
          _hover={props.isUpdate ? { bg: "brand.500" } : { bg: "brand.200" }}
          bg={props.isUpdate ? "brand.400" : "brand.100"}
          type="submit"
        >
          {props.isUpdate ? <>Update</> : <>Create</>}
        </Button>
      </ModalFooter>
    </Form>
  );
}
