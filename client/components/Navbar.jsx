import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UnorderedList, Heading, ListItem } from '@chakra-ui/react'
import { setSelectedClient } from '../reducers/clientList'

export function Navbar() {
  const dispatch = useDispatch()
  const clients = useSelector((state) => state.clientList)

  const orderedCompanyNames = clients.data
    .map((client) => client.business_name)
    .sort()

  function handleClick(company) {
    const myClient = clients.data.find(
      (client) => client.business_name == company
    )
    return dispatch(setSelectedClient(myClient))
  }

  if (clients.loading) {
    return <>Loading ...</>
  }

  return (
    <>
      <Heading as="h2" color="green">
        Clients
      </Heading>
      <UnorderedList>
        {orderedCompanyNames.map((company, i) => (
          <ListItem onClick={() => handleClick(company)} key={i}>
            {company}
          </ListItem>
        ))}
      </UnorderedList>
    </>
  )
}
