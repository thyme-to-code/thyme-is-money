// @ts-check
import React from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Center,
  CircularProgress,
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
} from "@chakra-ui/react";
import { MdList } from "react-icons/md";

export function ClientInvoiceList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { all: invoices, loading } = useSelector((state) => state.invoices);
  const { selected } = useSelector((state) => state.clients);

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    );
  }

  return (
    <>
      <Button
        leftIcon={<MdList />}
        onClick={onOpen}
        bg="brand.100"
        color="brand.50"
        _hover={{ bg: "brand.200" }}
      >
        Invoices
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#0CA789">
            Invoice History: {selected.business_name}
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
                  {invoices?.length === 0 ? ( // This could potentially be handled better
                    <Tr key="something">
                      <Td>No invoices! Are you a freelancer or what?</Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  ) : (
                    invoices?.map((invoice) => {
                      if (invoice?.client_id === selected.id) {
                        return (
                          <Tr key={invoice.invoice_number}>
                            <Td py="1">INV-{invoice.invoice_number}</Td>
                            <Td py="1" isNumeric={true}>
                              {new Date(invoice.date_sent).toLocaleDateString(
                                "en-NZ"
                              )}
                            </Td>
                            <Td py="1" isNumeric={true}>
                              {invoice.date_paid &&
                                new Date(invoice.date_paid).toLocaleDateString(
                                  "en-NZ"
                                )}
                            </Td>
                            <Td py="1" isNumeric={true}>
                              {invoice.amount_paid &&
                                "$" +
                                  invoice.amount_paid.toLocaleString("en-NZ")}
                            </Td>
                            <Td py="1" isNumeric={true}>
                              ${invoice.total.toLocaleString("en-NZ")}
                            </Td>
                            <Td py="1" isNumeric={true}>
                              JSON
                            </Td>
                          </Tr>
                        );
                      }
                    })
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="brand.100"
              color="brand.50"
              onClick={onClose}
              _hover={{ bg: "brand.200" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
