// @ts-check
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
} from '@chakra-ui/react'

import { getUninvoicedTasks } from '../reducers/taskList'
import { getFullInvoiceList } from '../reducers/invoiceList'

export function Overview() {
  const dispatch = useDispatch()
  const { uninvoiced, loading } = useSelector((state) => state.taskList)
  const invoices = useSelector((state) => state.invoiceList.all)
  const clients = useSelector((state) => state.clients)

  useEffect(() => {
    dispatch(getUninvoicedTasks())
    dispatch(getFullInvoiceList())
  }, [])

  if (loading && clients.loading) {
    return (
      <Center>
        <CircularProgress isIndeterminate color="teal.300" />
      </Center>
    )
  }

  return (
    <>
      <Heading as="h2" size="md" color="brand.100">
        Uninvoiced Tasks
      </Heading>
      <Divider my={1} />
      <TableContainer mr={5}>
        <Table p="1" variant="striped" colorScheme="table">
          <Thead color="brand.100">
            <Tr>
              <Td py="1">
                <Heading as="h3" size="sm">
                  Description
                </Heading>
              </Td>
              <Td py="1">
                <Heading as="h3" size="sm">
                  Client
                </Heading>
              </Td>
              <Td py="1" isNumeric={true}>
                <Heading as="h3" size="sm">
                  Hours
                </Heading>
              </Td>
              <Td py="1" isNumeric={true}>
                <Heading as="h3" size="sm">
                  Amount
                </Heading>
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {uninvoiced?.tasks.length === 0 ? (
              <Tr>
                <Td>No uninvoiced tasks? Go do some work!</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </Tr>
            ) : (
              uninvoiced?.tasks.map((task, i) => (
                <Tr key={i}>
                  <Td py="1">{task.description}</Td>
                  <Td py="1">
                    {
                      clients.active.find(
                        (client) => client.id == task.client_id
                      ).business_name
                    }
                  </Td>
                  <Td py="1" isNumeric={true}>
                    {task.quantity}
                  </Td>
                  <Td py="1" isNumeric={true}>
                    $&nbsp;
                    {(
                      clients.active.find(
                        (client) => client.id == task.client_id
                      ).rate * task.quantity
                    ).toLocaleString('en-US')}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <Divider my="5" />

      <Heading as="h2" size="md" color="brand.100">
        Recent Invoices
      </Heading>
      <Divider my={1} />
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
                          {invoice.amount_paid
                            .toFixed(2)
                            .toLocaleString('en-US')}
                        </Text>
                      ))}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
