// @ts-check
import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
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
  IconButton,
} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";

import { getUninvoicedItems } from "../../reducers/items";

import { updateTask } from "../../apis/tasks.js";

export function EditTask(props) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { description, quantity, id, client_id } = props.value.item;

  return (
    <>
      <IconButton
        aria-label={"button"}
        bgColor="brand.200"
        color="brand.50"
        fontSize="1.4em"
        icon={<MdEdit />}
        _hover={{ color: "brand.500" }}
        onClick={onOpen}
        size="md"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Update Task</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              description,
              quantity,
              client_id,
              id,
            }}
            onSubmit={async (newTask) => {
              await updateTask(newTask);
              dispatch(getUninvoicedItems());
              onClose();
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
                <Button type="submit" colorScheme="teal">
                  Update
                </Button>
              </ModalFooter>
            </Form>
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
