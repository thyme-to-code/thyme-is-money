import React from 'react'
import {
  Heading,
  Text,
  Flex,
  Spacer,
  Tag,
  TagLeftIcon,
  TagLabel,
} from '@chakra-ui/react'
import { MdAttachMoney } from 'react-icons/md'

export function InvoiceCard({ invoice }) {
  return (
    <Flex
      bg="brand.300"
      borderBottomRadius="lg"
      borderColor={'brand.200'}
      borderWidth={2}
      direction="column"
    >
      <Heading p={3} as="h3" size="md" color="brand.100">
        {invoice.business_name}
      </Heading>
      <Text px={3}>
        Sent: {new Date(invoice.date_sent).toLocaleDateString('en-US')}
      </Text>
      <Text px={3}>
        Paid:{' '}
        {invoice.date_paid ? (
          new Date(invoice.date_paid).toLocaleDateString('en-US')
        ) : (
          <>unpaid</>
        )}
      </Text>
      <Spacer />
      <Flex color="brand.50" bg={'brand.200'} direction="column">
        <Tag p={1} variant="ghost" fontSize="2xl">
          <Text>Amount</Text>
          <TagLeftIcon as={MdAttachMoney} color={'brand.50'} />
          <TagLabel>{invoice.total} </TagLabel>
        </Tag>
        <Spacer />
        <Tag p={1} variant="ghost" fontSize="2xl">
          <Text>Paid</Text>
          <TagLeftIcon boxSize="24px" as={MdAttachMoney} />
          <TagLabel>{invoice.amount_paid}</TagLabel>
        </Tag>
      </Flex>
    </Flex>
  )
}
