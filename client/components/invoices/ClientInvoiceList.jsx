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
            Invoice History: {selectedClient.business_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table p="1" variant="striped" colorScheme="table">
                <Thead>
                  <Tr>
                    <Td py="1">
                      <Heading as="h3" size="sm">
                        Invoice
                      </Heading>
                    </Td>
                    <Td py="1" isNumeric={true}>
                      <Heading as="h3" size="sm">
                        Date Sent
                      </Heading>
                    </Td>
                    <Td py="1" isNumeric={true}>
                      <Heading as="h3" size="sm">
                        Date Paid
                      </Heading>
                    </Td>
                    <Td py="1" isNumeric={true}>
                      <Heading as="h3" size="sm">
                        $ Paid
                      </Heading>
                    </Td>
                    <Td py="1" isNumeric={true}>
                      <Heading as="h3" size="sm">
                        $ Invoiced
                      </Heading>
                    </Td>
                    <Td py="1" isNumeric={true}>
                      <Heading as="h3" size="sm">
                        Details
                      </Heading>
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {client?.map((invoice) => (
                    <Tr key={invoice.id}>
                      <Td py="1">INV-{invoice.id}</Td>
                      <Td py="1" isNumeric={true}>
                        {new Date(invoice.date_sent).toLocaleDateString(
                          'en-NZ'
                        )}
                      </Td>
                      <Td py="1" isNumeric={true}>
                        {invoice.date_paid &&
                          new Date(invoice.date_paid).toLocaleDateString(
                            'en-NZ'
                          )}
                      </Td>
                      <Td py="1" isNumeric={true}>
                        {invoice.amount_paid &&
                          '$' + invoice.amount_paid.toLocaleString('en-NZ')}
                      </Td>
                      <Td py="1" isNumeric={true}>
                        ${invoice.total.toLocaleString('en-NZ')}
                      </Td>
                      <Td py="1" isNumeric={true}>
                        JSON
                      </Td>
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
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
