import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UnorderedList, ListItem } from '@chakra-ui/react'

export function Navbar() {

  const clients = useSelector((state) => state.clientList)

  const capitaliseCompanyNames = clients.map((client) => {
    const firstLetter = client.business_name.charAt(0).toUpperCase()
    const remainingName = client.business_name.substring(1)
    return firstLetter + remainingName
  })

  const orderedCompanyNames = capitaliseCompanyNames.sort()
  




  return (
    <>
      <UnorderedList>
        {orderedCompanyNames &&
          orderedCompanyNames.map((company, i) => {
            return <ListItem onClick={} key={i}>{company}</ListItem>
          })}
      </UnorderedList>
    </>
  )
}
