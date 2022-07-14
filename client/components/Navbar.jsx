import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UnorderedList, ListItem } from '@chakra-ui/react'

export function Navbar() {
  const companyNames = [
    'accountico',
    'Endstart',
    'bizgiz',
    'Bookkeeper',
    'accountal',
    'zaccounting',
  ]

  const capitaliseCompanyNames = companyNames.map((name) => {
    const firstLetter = name.charAt(0).toUpperCase()
    const remainingName = name.substring(1)
    return firstLetter + remainingName
  })

  const orderedCompanyNames = capitaliseCompanyNames.sort()

  return (
    <>
      <UnorderedList>
        {orderedCompanyNames &&
          orderedCompanyNames.map((company, i) => {
            return <ListItem key={i}>{company}</ListItem>
          })}
      </UnorderedList>
    </>
  )
}
