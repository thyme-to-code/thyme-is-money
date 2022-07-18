import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
// import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { ShowPDF } from './ShowPDF'
// import { use } from '../../../server/routes/tasks'

// Click create client invoice
// Generates the invoice from API
// Display invoice
// Confirm the invoice (click Save)
// Save invoice to the db and mark the tasks as invoiced
// Prompt for save location

export function NewInvoice() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Create Invoice
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Preview Invoice</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <ShowPDF />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="gray" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" colorScheme="teal">
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
