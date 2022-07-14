import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Invoice } from './Invoice'

export function Client() {
  const selectedClient = useSelector((state) => state.selectedClient)
  // console.log(selectedClient)
  // useEffect(() => {

  // },)
  return (
    <>
      <Invoice />
    </>
  )
}
