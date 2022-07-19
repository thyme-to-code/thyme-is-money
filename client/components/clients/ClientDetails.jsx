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
  MdOutlineChevronRight,
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
      <Heading as="h2" fontSize="2xl">
        {selectedClient.business_name}
      </Heading>
      <Divider my={1} />
      <HStack>
        <Box ml={5}>
          <Heading as="h3" size="sm">
            Contact
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon size={'lg'} as={MdAccountBox} />
              {selectedClient.contact_name}
            </ListItem>
            <ListItem>
              <ListIcon as={MdPhone} />
              {selectedClient.phone}
            </ListItem>
            <ListItem>
              <ListIcon as={MdEmail} />
              {selectedClient.email}
            </ListItem>
            <ListItem>
              <ListIcon as={MdMap} />
              {selectedClient.address}
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading as="h3" size="sm">
            Oustanding amounts
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon as={MdAttachMoney} />
              {uninvoiced.amount}
            </ListItem>
            <ListItem>
              <ListIcon as={MdHourglassBottom} />
              {uninvoiced.hours} hours
            </ListItem>
            <ListItem>
              <ListIcon as={MdOutlineChevronRight} />
              Rate (NZD)
            </ListItem>
            <ListItem>
              <ListIcon as={MdAttachMoney} />
              {selectedClient.rate} / hr
            </ListItem>
          </List>
        </Box>
      </HStack>
    </Box>
  )
}
