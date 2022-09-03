import React from "react";
import { useSelector, useDispatch } from "react-redux";
import request from "superagent";
import { Formik } from "formik";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";

import { setSelectedClient, getActiveClients } from "../../reducers/clients";
import { ClientForm } from "./ClientForm";
import { MdEdit } from "react-icons/md";

export function EditClient() {
  const dispatch = useDispatch();
  const { selected } = useSelector((state) => state.clients);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        bg="bisque"
        color="brand.100"
        label="Edit Client Details"
        placement="top-end"
      >
        <Button
          leftIcon={<MdEdit />}
          _hover={{ color: "bisque" }}
          onClick={onOpen}
          pt={1.5}
          style={{ fontSize: "1.4em", fontWeight: "600" }}
          // onClick={onOpen}
          variant="ghost"
        />
      </Tooltip>

      {/* <Button
        leftIcon={<MdEdit />}
        onClick={onOpen}
        mr={5}
        bg="brand.100"
        color="brand.50"
        _hover={{ bg: "brand.200" }}
      >
        Client
      </Button> */}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Update client</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={selected}
            onSubmit={(values) => {
              request
                .patch("/api/v1/clients")
                .send(values)
                .then((res) => {
                  dispatch(getActiveClients());
                  dispatch(setSelectedClient(res.body));
                  onClose();
                })
                .catch((err) => console.log(err));
            }}
          >
            {() => <ClientForm isUpdate={true} onClose={onClose} />}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
