import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Select, Stack } from '@chakra-ui/react'
import { setSelectedClient, clearSelectedClient } from '../../reducers/clients'
import { MdOutlineArrowDropDownCircle } from 'react-icons/md'

import { EditClient } from './EditClient'

export function ClientSelector() {
  const dispatch = useDispatch()
  const clients = useSelector((state) => state.clients)

  const orderedCompanyNames = clients.active
    .map((client) => client.business_name)
    .sort()

  function handleChange(e) {
    if (e.target.value) {
      const myClient = clients.active.find(
        (client) => client.business_name == e.target.value
      )
      return dispatch(setSelectedClient(myClient))
    } else {
      return dispatch(clearSelectedClient())
    }
  }

  if (clients.loading) {
    return <>Loading ...</>
  }
  console.log(clients.selected.id)
  return (
    <>
      <Box bg="brand.100" borderRadius="lg" color="brand.50">
        <Stack direction="row">
          {clients.selected.id && <EditClient />}
          <Select
            icon={<MdOutlineArrowDropDownCircle />}
            iconSize={50}
            onChange={handleChange}
            size="lg"
            p="0px"
            placeholder="Select a client"
            borderColor="brand.100"
            _hover={{ color: 'brand.500' }}
            style={{
              fontSize: '1.4em',
              fontWeight: '600',
            }}
          >
            {orderedCompanyNames.map((company, i) => (
              <option key={i} value={company}>
                {company}
              </option>
            ))}
          </Select>
        </Stack>
      </Box>
    </>
  )
}
