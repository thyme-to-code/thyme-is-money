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
import { setTotals } from '../../reducers/clients'

export function ClientDetails() {
  const dispatch = useDispatch()
  const { totals, selected } = useSelector((state) => state.clients)
  const { uninvoiced } = useSelector((state) => state.items)

  const items = uninvoiced.filter((item) => item.client_id === selected.id)

  useEffect(() => {
    dispatch(setTotals({ items, rate: selected.rate }))
  }, [uninvoiced, selected])

  return (
    <Box>
      <Heading as="h2" fontSize="2xl" color="brand.100">
        {selected.business_name}
      </Heading>
      <Divider my={1} />
      <HStack>
        <Box ml={5}>
          <Heading as="h3" size="sm" color="brand.100">
            Contact
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon as={MdAccountBox} color="brand.100" />
              {selected.contact_name}
            </ListItem>
            <ListItem>
              <ListIcon as={MdPhone} color="brand.100" />
              <a href={`tel:${selected.phone}`}>{selected.phone}</a>
            </ListItem>
            <ListItem>
              <ListIcon as={MdEmail} color="brand.100" />
              <a href={`mailto:${selected.email}`}>{selected.email}</a>
            </ListItem>
            <ListItem>
              <ListIcon as={MdMap} color="brand.100" />
              {selected.address}
            </ListItem>
          </List>
        </Box>
        <Box>
          <Heading as="h3" size="sm" color="brand.100">
            Uninvoiced
          </Heading>
          <List ml={5} mr={15}>
            <ListItem>
              <ListIcon as={MdAttachMoney} color="brand.100" />
              {totals.amount.toLocaleString('en-US')}
            </ListItem>
            <ListItem>
              <ListIcon as={MdHourglassBottom} color="brand.100" />
              {totals.quantity} hours
            </ListItem>
            <ListItem>
              <ListIcon as={MdAttachMoney} color="brand.100" />
              {selected.rate} / hour
            </ListItem>
          </List>
        </Box>
      </HStack>
    </Box>
  )
}
