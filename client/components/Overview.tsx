import React from 'react'
import { useAppSelector } from '../reducers/hooks'
import {
  Center,
  CircularProgress,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Text,
  SimpleGrid,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'

import { InvoiceCard } from './invoices/InvoiceCard'
import { ItemCard } from './tasks/ItemCard'

export function Overview() {
  const { uninvoiced, loading } = useAppSelector((state) => state.items)
  const invoices = useAppSelector((state) => state.invoices.all)
  const clients = useAppSelector((state) => state.clients)

  if (loading && clients.loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    )
  }

  const itemCards = clients.active.map((client) => {
    if (
      uninvoiced?.find((item) => item.client_id === client.id) === undefined
    ) {
      return <div key={client.id}></div>
    }
    return (
      <div key={client.id}>
        <Heading my={2} as="h2" size="md" color="brand.100">
          {client.business_name}
        </Heading>
        <SimpleGrid minChildWidth="260px" spacing="11px">
          {uninvoiced?.map((item) => {
            if (item.client_id === client.id) {
              return <ItemCard key={item.id} item={item} rate={client.rate} />
            }
          })}
        </SimpleGrid>
      </div>
    )
  })

  const invoiceCards = (
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {invoices?.map((invoice) => {
        return <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
      })}
    </SimpleGrid>
  )

  const invoicesTable = (
    <TableContainer mr={10}>
      <Table p="1" variant="striped" colorScheme="table">
        <Thead color="brand.100">
          <Tr>
            <Td py="1">
              <Heading as="h3" size="sm">
                Client
              </Heading>
            </Td>
            <Td py="1" isNumeric={true}>
              <Heading as="h3" size="sm">
                Date Sent
              </Heading>
            </Td>
            <Td py="1" isNumeric={true}>
              <Heading as="h3" size="sm">
                $ Invoiced
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
          </Tr>
        </Thead>
        <Tbody>
          {invoices?.length === 0 ? (
            <Tr>
              <Td>No invoices! Are you a freelancer or what?</Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
          ) : (
            invoices?.map((invoice) => (
              <Tr key={invoice.invoice_number}>
                <Td py="1">{invoice.business_name}</Td>
                <Td py="1" isNumeric={true}>
                  {new Date(invoice.date_sent).toLocaleDateString('en-NZ')}
                </Td>
                <Td py="1" isNumeric={true}>
                  $ {invoice.total.toFixed(2).toLocaleString()}
                </Td>
                <Td py="1" isNumeric={true}>
                  {invoice.date_paid ? (
                    new Date(invoice.date_paid).toLocaleDateString('en-NZ')
                  ) : (
                    <></>
                  )}
                </Td>
                <Td py="1" isNumeric={true}>
                  {invoice.amount_paid &&
                    (invoice.amount_paid == invoice.total ? (
                      '$ ' + invoice.amount_paid.toLocaleString('en-US')
                    ) : (
                      <Text color="red">
                        $&nbsp;
                        {invoice.amount_paid.toFixed(2).toLocaleString()}
                      </Text>
                    ))}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )

  return (
    <>
      <Tabs>
        <TabList>
          <Tab key="TaskTab">Tasks</Tab>
          <Tab key="InvoiceTab">Invoices</Tab>
          <Tab key="InvoiceTableTab">Invoice Table</Tab>
        </TabList>

        <TabPanels>
          <TabPanel key="TaskPanel">{itemCards}</TabPanel>
          <TabPanel key="InvoicePanel">{invoiceCards}</TabPanel>
          <TabPanel key="InvoiceTablePanel">{invoicesTable}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
