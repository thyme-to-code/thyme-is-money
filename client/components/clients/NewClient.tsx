import React from "react";
import { useAppDispatch } from "../../reducers/hooks";
import { useDispatch } from "react-redux";
import request from "superagent";
import { Formik } from "formik";
import {
  useDisclosure,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { MdPersonAdd } from "react-icons/md";

import { setSelectedClient, getActiveClients } from "../../reducers/clients";
import { ClientForm } from "./ClientForm";

export function NewClient() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  return (
    <>
      <MenuItem icon={<MdPersonAdd />} color="brand.200" onClick={onOpen}>
        New Client
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Create client</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              business_name: "",
              contact_name: "",
              phone: "",
              email: "",
              address: "New Zealand",
              rate: 50,
            }}
            onSubmit={(values) => {
              request
                .post("/api/v1/clients")
                .send(values)
                .then((res) => {
                  dispatch(getActiveClients());
                  dispatch(setSelectedClient(res.body));
                  onClose();
                })
                .catch((err) => console.log(err));
            }}
          >
            {() => <ClientForm isUpdate={false} onClose={onClose} />}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}
