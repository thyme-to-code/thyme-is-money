import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Invoice } from './Invoice'
import { getUninvoicedTasks } from '../apis/tasks'
import { loadTasks } from '../reducers/taskList'

export function Client() {
  const dispatch = useDispatch()
  useEffect(() => {
    getUninvoicedTasks()
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
