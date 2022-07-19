import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
import { ShowPDF } from './ShowPDF'
import { saveInvoice } from '../../apis/invoices'
import { getActiveClientTasks } from '../../reducers/taskList'
import {
  clearInvoiceJson,
  clearInvoicePdfUrl,
} from '../../reducers/invoiceList'

export function NewInvoice() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedClient } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)
  const invoiceJson = useSelector((state) => state.invoiceList.invoiceJson)
  const { invoicePdfUrl } = useSelector((state) => state.invoiceList)

  const [isApproved, setIsApproved] = useState(false)

  const saveFile = async (pdfUrl) => {
    const a = document.createElement('a')
    a.download = 'invoice.pdf'
    a.href = pdfUrl
    a.click()
  }

  async function handleClick(e) {
    e.preventDefault()
    const invoice = {
      client_id: selectedClient.id,
      tasks: taskList.data,
      total: (taskList.uninvoiced.amount * 1.15).toFixed(2),
      invoice_json: invoiceJson,
    }
    if (isApproved) {
      await saveFile(invoicePdfUrl)
    } else {
      await saveInvoice(invoice)
      setIsApproved(true)
    }
  }

  function handleClose(e) {
    e.preventDefault()
    dispatch(clearInvoicePdfUrl())
    dispatch(clearInvoiceJson())
    dispatch(getActiveClientTasks())
    setIsApproved(false)
    onClose()
  }

  return (
    <>
      {taskList.data.length > 0 && (
        <Button onClick={onOpen} colorScheme="teal">
          Create Invoice
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        onCloseComplete={() => handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Preview Invoice</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <ShowPDF />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="gray" onClick={handleClose}>
              Close
            </Button>
            {isApproved ? (
              <Button onClick={handleClick} type="submit" colorScheme="teal">
                Download
              </Button>
            ) : (
              <Button onClick={handleClick} type="submit" colorScheme="teal">
                Approve
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
