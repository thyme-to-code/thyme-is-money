import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Flex, Spacer } from '@chakra-ui/react'

import { NewClient } from './NewClient'
import { UpdateClient } from './UpdateClient'

export function Header() {
  const { selectedClient } = useSelector((state) => state.clientList)
  return (
    <Flex>
      <Box>
        <h1>🌱 Thyme is Money</h1>
      </Box>
      <Spacer />
      <Box mr={3}>
        {selectedClient.id && <UpdateClient />}
        <NewClient />
      </Box>
    </Flex>
  )
}
