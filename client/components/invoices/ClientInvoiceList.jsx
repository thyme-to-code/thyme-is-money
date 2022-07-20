import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClientInvoiceList } from '../../reducers/invoiceList'

export function ClientInvoiceList() {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { client } = useSelector((state) => state.invoiceList)
  const { selectedClient } = useSelector((state) => state.clientList)

  useEffect(() => {
    dispatch(getClientInvoiceList(selectedClient.id))
  }, [selectedClient])

  return (
    <>
      <Button
        mr={3}
        onClick={onOpen}
        bg="brand.100"
        color="brand.50"
        _hover={{ bg: 'brand.200' }}
      >
        Invoices
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">
            {selectedClient.business_name} Invoice History
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Td>
                      <Heading as="h3" size="md">
                        Invoice
                      </Heading>
                    </Td>
                    <Td>
                      <Heading as="h3" size="md">
                        Date Sent
                      </Heading>
                    </Td>
                    <Td>
                      <Heading as="h3" size="md">
                        Total
                      </Heading>
                    </Td>
                    <Td>
                      <Heading as="h3" size="md">
                        Paid
                      </Heading>
                    </Td>
                    <Td>
                      <Heading as="h3" size="md">
                        Paid On
                      </Heading>
                    </Td>
                    <Td>
                      <Heading as="h3" size="md">
                        Details
                      </Heading>
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {client?.map((invoice) => (
                    <Tr key={invoice.id}>
                      <Td py="1">{invoice.id}</Td>
                      <Td py="1">
                        {new Date(invoice.date_sent).toLocaleDateString(
                          'en-NZ'
                        )}
                      </Td>
                      <Td py="1">${invoice.total.toLocaleString('en-NZ')}</Td>
                      <Td py="1">
                        $
                        {invoice.amount_paid &&
                          invoice.amount_paid.toLocaleString('en-NZ')}
                      </Td>
                      <Td py="1">
                        {invoice.date_paid &&
                          new Date(invoice.date_paid).toLocaleDateString(
                            'en-NZ'
                          )}
                      </Td>
                      <Td py="1">JSON</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.100"
              color="brand.50"
              onClick={onClose}
              _hover={{ bg: 'brand.200' }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
