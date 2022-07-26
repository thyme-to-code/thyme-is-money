import React from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  SimpleGrid,
} from '@chakra-ui/react'

import { ClientDetails } from './clients/ClientDetails'
import { NewInvoice } from './invoices/NewInvoice'
import { NewTask } from './tasks/NewTask'
import { Tasks } from './tasks/Tasks'
import { Overview } from './Overview'
import { InvoiceCard } from './invoices/InvoiceCard'

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

  const invoiceCards = (
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {invoices
        ?.filter((invoice) => invoice.client_id === selected.id)
        .map((invoice) => {
          return <InvoiceCard key={invoice.invoice_number} invoice={invoice} />
        })}
    </SimpleGrid>
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
              <TabPanel>{invoiceCards}</TabPanel>
            </TabPanels>
          </Tabs>
        </>
      ) : (
        <Overview />
      )}
    </Box>
  )
}
