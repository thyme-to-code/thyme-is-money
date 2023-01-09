import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../reducers/hooks'
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
import { MdAddCircle } from 'react-icons/md'

import { getUninvoicedItems } from '../../reducers/items'
import { clearCurrentInvoice, getInvoices } from '../../reducers/invoices'

import { saveInvoice } from '../../apis/invoices'
import { ShowPDF } from './ShowPDF'

export function NewInvoice() {
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { totals, selected } = useAppSelector((state) => state.clients)
  const items = useAppSelector((state) => state.items)
  const { pdfUrl, json } = useAppSelector((state) => state.invoices.current)
  const [isApproved, setIsApproved] = useState(false)

  const clientItems = items.uninvoiced.filter(
    (item) => item.client_id === selected.id
  )

  const saveFile = async (pdfUrl) => {
    const a = document.createElement('a')
    a.download = `${selected.business_name}-invoice.pdf`
    a.href = pdfUrl
    a.click()
  }

  async function handleClick(e) {
    e.preventDefault()
    const invoice = {
      client_id: selected.id,
      total: (totals.amount * 1.15).toFixed(2),
      json,
    }
    if (isApproved) {
      await saveFile(pdfUrl)
    } else {
      await saveInvoice(invoice, clientItems)
      setIsApproved(true)
    }
  }

  function afterClose() {
    dispatch(clearCurrentInvoice())
    if (isApproved) {
      dispatch(getUninvoicedItems())
      dispatch(getInvoices())
      setIsApproved(false)
    }
    onClose()
  }

  return (
    <>
      {clientItems.length > 0 && (
        <Button
          mt={2}
          leftIcon={<MdAddCircle />}
          onClick={onOpen}
          bg="brand.100"
          color="brand.50"
          justifyContent={'left'}
          _hover={{ bg: 'brand.200' }}
          w="100%"
        >
          Invoice
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
