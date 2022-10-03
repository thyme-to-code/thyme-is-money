import React from 'react'
import { useSelector } from 'react-redux'
import {
  Center,
  CircularProgress,
  Divider,
  Heading,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Text,
  SimpleGrid,
  Flex,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react'
import { MdAttachMoney, MdHourglassBottom } from 'react-icons/md'

import { EditTask } from './tasks/EditTask'
import { DeleteTask } from './tasks/DeleteTask'

export function Overview() {
  const { uninvoiced, loading } = useSelector((state) => state.items)
  const invoices = useSelector((state) => state.invoices.all)
  const clients = useSelector((state) => state.clients)

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
      return <></>
    }
    return (
      <>
        <Heading my={2} as="h2" size="md" color="brand.100">
          {client.business_name}
        </Heading>
        <SimpleGrid minChildWidth="260px" spacing="11px">
          {uninvoiced?.map((item) => {
            if (item.client_id === client.id) {
              return (
                <Flex
                  maxWidth="480px"
                  bg="brand.300"
                  borderBottomRadius="lg"
                  borderColor={'brand.200'}
                  borderWidth={2}
                  direction="column"
                  key={item.id}
                >
                  <Text p={3}> {item.description}</Text>
                  <Spacer />
                  <Flex
                    bg={'brand.200'}
                    borderBottomRadius="lg"
                    direction="row"
                  >
                    <EditTask value={{ item }} />
                    <Spacer />
                    <Tag p={1} variant="ghost" fontSize="2xl">
                      <TagLeftIcon as={MdHourglassBottom} color={'brand.50'} />
                      <TagLabel color="brand.50">{item.quantity} </TagLabel>
                    </Tag>
                    <Spacer />
                    <Tag p={1} variant="ghost" fontSize="2xl">
                      <TagLeftIcon
                        boxSize="24px"
                        as={MdAttachMoney}
                        color="brand.50"
                      />
                      <TagLabel color="brand.50">
                        {(item.quantity * client.rate).toLocaleString('en-US')}
                      </TagLabel>
                    </Tag>
                    <Spacer />
                    <DeleteTask itemId={item.id} />
                  </Flex>
                </Flex>
              )
            }
          })}
        </SimpleGrid>
      </>
    )
  })

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
                  $ {invoice.total.toFixed(2).toLocaleString('en-US')}
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
                        {invoice.amount_paid.toFixed(2).toLocaleString('en-US')}
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
          <Tab>Tasks</Tab>
          <Tab>Invoices</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>{itemCards}</TabPanel>
          <TabPanel>{invoicesTable}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
