import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUninvoicedTasks } from '../apis/tasks'
import { loadTasks } from '../reducers/taskList'

export function Client() {
  const dispatch = useDispatch()
  // const { selectedClient } = useSelector((state) => state.status)
  const { selectedClient } = useSelector((state) => state.clientList)

  useEffect(() => {
    getUninvoicedTasks(selectedClient.id)
      .then((tasks) => dispatch(loadTasks(tasks)))
      .catch((err) => {
        throw err
      })
  })

  return (
    <>
      <div className="client">
        <h1>{selectedClient.business_name}</h1>
        <p>{selectedClient.contact_name}</p>
        <p>{selectedClient.email}</p>
        <p>{selectedClient.phone}</p>
      </div>
      {selectedClient.business_name && <button>Create Task</button>}
      {selectedClient.business_name && <button>Create Invoice</button>}
    </>
  )
}
