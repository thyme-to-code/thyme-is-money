// @ts-check
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Heading, Select, FormLabel } from '@chakra-ui/react'
import { setSelectedClient, clearSelectedClient } from '../../reducers/clients'

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

  return (
    <>
      <FormLabel>
        <Heading as="h2" fontSize="2xl" color="brand.100">
          Select Client
        </Heading>
      </FormLabel>
      <Select
        onChange={handleChange}
        size="lg"
        width={'70%'}
        bg="brand.300"
        variant="outline"
        placeholder="Summary"
        mb="3"
      >
        {orderedCompanyNames.map((company, i) => (
          <option key={i} value={company}>
            {company}
          </option>
        ))}
      </Select>
    </>
  )
}
