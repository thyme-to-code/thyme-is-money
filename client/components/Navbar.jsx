import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { InvoiceList } from './InvoiceList'

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
      <InvoiceList />
    </>
  )
}

// step 0 - create an array of dummy company names
// step 1 - show all company names in navbar
// step 2 - order all company names by ABC
// step 3 - add bar for company names
