// @ts-check
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
  getClientInvoiceList,
} from '../../reducers/invoiceList'

export function NewInvoice() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { selectedClient } = useSelector((state) => state.clientList)
  const { data: tasks, uninvoiced } = useSelector((state) => state.taskList)
  const { invoicePdfUrl, invoiceJson } = useSelector(
    (state) => state.invoiceList
  )
  const [isApproved, setIsApproved] = useState(false)

  const saveFile = async (pdfUrl) => {
    const a = document.createElement('a')
    a.download = `${selectedClient.business_name}-invoice.pdf`
    a.href = pdfUrl
    a.click()
  }

  async function handleClick(e) {
    e.preventDefault()
    const invoice = {
      client_id: selectedClient.id,
      total: (uninvoiced.amount * 1.15).toFixed(2),
      json: invoiceJson,
    }
    if (isApproved) {
      await saveFile(invoicePdfUrl)
    } else {
      await saveInvoice(invoice, tasks)
      setIsApproved(true)
    }
  }

  function afterClose() {
    dispatch(clearInvoicePdfUrl())
    dispatch(clearInvoiceJson())
    if (isApproved) {
      dispatch(getActiveClientTasks(selectedClient.id))
      dispatch(getClientInvoiceList(selectedClient.id))
      setIsApproved(false)
    }
    onClose()
  }

  return (
    <>
      {tasks.length > 0 && (
        <Button
          onClick={onOpen}
          bg="brand.100"
          color="brand.50"
          _hover={{ bg: 'brand.200' }}
        >
          Create Invoice
        </Button>
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        onCloseComplete={afterClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">Preview Invoice</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <ShowPDF />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="gray" onClick={onClose}>
              Close
            </Button>
            {isApproved ? (
              <Button
                onClick={handleClick}
                type="submit"
                bg="brand.400"
                color="brand.50"
                _hover={{ bg: 'brand.500' }}
              >
                Download
              </Button>
            ) : (
              <Button
                onClick={handleClick}
                type="submit"
                bg="brand.100"
                color="brand.50"
                _hover={{ bg: 'brand.200' }}
              >
                Approve
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
