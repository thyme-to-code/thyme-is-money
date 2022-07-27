// @ts-check
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Heading,
  HStack,
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react'
import {
  MdAccountBox,
  MdAttachMoney,
  MdEmail,
  MdHourglassBottom,
  MdMap,
  MdPhone,
} from 'react-icons/md'
import { setUninvoicedTotals } from '../../reducers/taskList'

export function ClientDetails() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const { data: tasks, uninvoiced } = useSelector((state) => state.taskList)

  useEffect(() => {
    dispatch(setUninvoicedTotals({ tasks, rate: selectedClient.rate }))
  }, [tasks])

  return (
    <Box>
      <Heading as="h2" fontSize="2xl" color="brand.100">
        {selectedClient.business_name}
      </Heading>
      <Divider my={1} />
      <HStack>
        <Box ml={5}>
          <Heading as="h3" size="sm" color="brand.100">
            Contact
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon as={MdAccountBox} color="brand.100"/>
              {selectedClient.contact_name}
            </ListItem>
            <ListItem>
              <ListIcon as={MdPhone} color="brand.100"/>
              <a href={`tel:${selectedClient.phone}`}>{selectedClient.phone}</a>
            </ListItem>
            <ListItem>
              <ListIcon as={MdEmail} color="brand.100"/>
              <a href={`mailto:${selectedClient.email}`}>
                {selectedClient.email}
              </a>
            </ListItem>
            <ListItem>
              <ListIcon as={MdMap} color="brand.100"/>
              {selectedClient.address}
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading as="h3" size="sm" color="brand.100">
            Uninvoiced
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon as={MdAttachMoney} color="brand.100"/>
              {uninvoiced.amount.toLocaleString('en-US')}
            </ListItem>
            <ListItem>
              <ListIcon as={MdHourglassBottom} color="brand.100"/>
              {uninvoiced.hours} hours
            </ListItem>
            <ListItem>
              <ListIcon as={MdAttachMoney} color="brand.100"/>
              {selectedClient.rate} / hour
            </ListItem>
          </List>
        </Box>
      </HStack>
    </Box>
  )
}
