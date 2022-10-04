import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Spacer,
  Tab,
  Table,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { Overview } from './Overview'

export function Content() {
  const { selected, loading } = useSelector((state) => state.clients)
  const { all: invoices } = useSelector((state) => state.invoices)

  if (loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    )
  }

  const clientInvoiceTable = (
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
                      {new Date(invoice.date_sent).toLocaleDateString('en-NZ')}
                    </Td>
                    <Td py="1" isNumeric={true}>
                      {invoice.date_paid &&
                        new Date(invoice.date_paid).toLocaleDateString('en-NZ')}
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
                )
              }
            })
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )

  return (
    <Box m={5}>
      {selected.id ? (
        <>
          <Flex>
            <ClientDetails />
            <Flex
              w="100px"
              h="128px"
              direction="column"
              minWidth="max-content"
              alignItems="center"
            >
              <NewTask />
              <NewInvoice />
              <Spacer />
            </Flex>
          </Flex>
          <Divider m={3} />
          <Tabs>
            <TabList>
              <Tab>Tasks</Tab>
              <Tab>Invoices</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Tasks />
              </TabPanel>
              <TabPanel>{clientInvoiceTable}</TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <Overview />
      )}
    </Box>
  )
}
