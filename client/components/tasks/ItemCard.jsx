import React from 'react'
import {
  Text,
  Flex,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react'
import { MdAttachMoney, MdHourglassBottom } from 'react-icons/md'

import { EditTask } from './EditTask'
import { DeleteTask } from './DeleteTask'

export function ItemCard({ item, rate }) {
  return (
    <Flex
      maxWidth="480px"
      bg="brand.300"
      borderBottomRadius="lg"
      borderColor={'brand.200'}
      borderWidth={2}
      direction="column"
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
          <TagLeftIcon boxSize="24px" as={MdAttachMoney} color="brand.50" />
          <TagLabel color="brand.50">
            {(item.quantity * rate).toLocaleString('en-US')}
          </TagLabel>
        </Tag>
        <Spacer />
        <DeleteTask itemId={item.id} />
      </Flex>
    </Flex>
  )
}
