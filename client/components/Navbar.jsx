import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UnorderedList, ListItem } from '@chakra-ui/react'
import { setSelectedClient } from '../reducers/status'

export function Navbar() {
  const dispatch = useDispatch()
  const clients = useSelector((state) => state.clientList)

  console.log(clients)
  const allCompanyNames = clients.map((client) => {
    return client.business_name
  })

  const orderedCompanyNames = allCompanyNames.sort()

  function handleClick(company) {
    const myClient = clients.find((client) => client.business_name == company)
    return dispatch(setSelectedClient(myClient))
  }

  return (
    <>
      <UnorderedList>
        {orderedCompanyNames &&
          orderedCompanyNames.map((company, i) => {
            return (
              <ListItem onClick={() => handleClick(company)} key={i}>
                {company}
              </ListItem>
            )
          })}
      </UnorderedList>
    </>
  )
}
