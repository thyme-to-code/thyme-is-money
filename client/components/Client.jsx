import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActiveClientTasks } from '../reducers/taskList'

export function Client() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)

  useEffect(() => {
    dispatch(getActiveClientTasks(selectedClient.id))
  }, [selectedClient])

  return (
    <>
      <div className="client">
        <h1>{selectedClient.business_name}</h1>
        <p>{selectedClient.contact_name}</p>
        <p>{selectedClient.email}</p>
        <p>{selectedClient.phone}</p>
      </div>
      {selectedClient.business_name && (
        <>
          <button>Create Task</button>
          <button>Create Invoice</button>
        </>
      )}
      <h1>Uninvoiced Tasks</h1>
      <div className="tasks">
        {taskList?.data.map((task, i) => (
          <li key={i}>{task.description}</li>
        ))}
      </div>
    </>
  )
}
