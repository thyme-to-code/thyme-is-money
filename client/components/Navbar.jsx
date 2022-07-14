import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UnorderedList, ListItem } from '@chakra-ui/react'
import { setSelectedClient } from '../reducers/clientList'

export function Navbar() {
  const dispatch = useDispatch()
  const clients = useSelector((state) => state.clientList.data)

  const orderedCompanyNames = clients
    .map((client) => client.business_name)
    .sort()

  function handleClick(company) {
    const myClient = clients.find((client) => client.business_name == company)
    return dispatch(setSelectedClient(myClient))
  }

  return (
    <>
      <UnorderedList>
        {orderedCompanyNames &&
          orderedCompanyNames.map((company, i) => (
            <ListItem onClick={() => handleClick(company)} key={i}>
              {company}
            </ListItem>
          ))}
      </UnorderedList>
    </>
  )
}
