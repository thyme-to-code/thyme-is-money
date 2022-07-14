import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'


export function Task() {

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

  return <p>task</p>
}