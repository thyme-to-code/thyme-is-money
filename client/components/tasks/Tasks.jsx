import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Box,
  Heading,
  IconButton,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import {
  MdDeleteForever,
  MdAttachMoney,
  MdHourglassBottom,
} from 'react-icons/md'

import { getUninvoicedItems } from '../../reducers/items'

// TODO Update to be items
import { deleteTask } from '../../apis/tasks'
import { EditTask } from './EditTask'

export function Tasks() {
  const dispatch = useDispatch()
  const { selected } = useSelector((state) => state.clients)
  const items = useSelector((state) => state.items)

  function handleDelete(id) {
    deleteTask(id)
    dispatch(getUninvoicedItems())
  }

  if (items.loading) {
    return <>Loading ...</>
  }

  const itemCards = (
    // <Wrap justify="flex-start" align="center}">
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return (
            <Flex
              bg="brand.300"
              borderBottomRadius="lg"
              borderColor={'brand.100'}
              borderWidth={1}
              direction="column"
              key={item.id}
            >
              <Text p={3}> {item.description}</Text>
              <Spacer />
              <Flex bg={'brand.200'} borderBottomRadius="lg" direction="row">
                <EditTask value={{ item }} />
                <Spacer />
                <Tag p={1} variant="ghost" fontSize="2xl">
                  <TagLeftIcon as={MdHourglassBottom} color={'brand.50'} />
                  <TagLabel color="brand.50">{item.quantity}</TagLabel>
                </Tag>
                <Spacer />
                <Tag p={1} variant="ghost" fontSize="2xl">
                  <TagLeftIcon
                    boxSize="24px"
                    as={MdAttachMoney}
                    color="brand.50"
                  />
                  <TagLabel color="brand.50">
                    {(item.quantity * selected.rate).toLocaleString('en-US')}
                  </TagLabel>
                </Tag>
                <Spacer />
                <IconButton
                  aria-label={'button'}
                  bgColor="brand.200"
                  color="brand.50"
                  fontSize="1.4em"
                  icon={<MdDeleteForever />}
                  id={item.id}
                  onClick={() => handleDelete(item.id)}
                  size="md"
                  value={item.id}
                  _hover={{ color: 'red' }}
                />
              </Flex>
            </Flex>
          )
        }
      })}
    </SimpleGrid>
  )

  return <div className="tasks">{itemCards}</div>
}
