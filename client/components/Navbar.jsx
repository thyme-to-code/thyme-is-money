import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { InvoiceList } from './InvoiceList'

export function Navbar() {
  return (
    <>
      <InvoiceList />
    </>
  )
}
