import React from 'react'
import { useSelector } from 'react-redux'
import {
  Flex,
  SimpleGrid,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
  Text,
} from '@chakra-ui/react'
import { MdAttachMoney, MdHourglassBottom } from 'react-icons/md'

import { EditTask } from './EditTask'
import { DeleteTask } from './DeleteTask'

export function Tasks() {
  const { selected } = useSelector((state) => state.clients)
  const items = useSelector((state) => state.items)

  if (items.loading) {
    return <>Loading ...</>
  }

  const itemCards = (
    <SimpleGrid minChildWidth="260px" spacing="11px">
      {items?.uninvoiced.map((item) => {
        if (item.client_id === selected.id) {
          return (
            <Flex
              bg="brand.300"
              borderBottomRadius="lg"
              borderColor={'brand.200'}
              borderWidth={2}
              direction="column"
              key={item.id}
            >
              <Text p={3}> {item.description}</Text>
              <Spacer />
              <Flex bg={'brand.200'} direction="row">
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
                    {(item.quantity * selected.rate).toLocaleString('en-US')}
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
  )

  return <div className="tasks">{itemCards}</div>
}
