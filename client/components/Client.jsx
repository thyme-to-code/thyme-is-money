import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Invoice } from './Invoice'
import { getUninvoicedTasks } from '../apis/tasks'
import { loadTasks } from '../reducers/taskList'

export function Client() {
  const dispatch = useDispatch()
  const { isLoading, selectedClient } = useSelector((state) => state.status)

  useEffect(() => {
    getUninvoicedTasks(selectedClient)
      .then((tasks) => dispatch(loadTasks(tasks)))
      .catch((err) => {
        throw err
      })
  })

  return (
    <>
      <Invoice />
    </>
  )
}
