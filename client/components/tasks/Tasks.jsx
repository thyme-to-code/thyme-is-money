import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, SimpleGrid, Box, Stack } from '@chakra-ui/react'

import { deleteTask } from '../../apis/tasks'
import { getActiveClientTasks } from '../../reducers/taskList'
import { EditTask } from './EditTask'

export function Tasks() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)

  function handleDelete(e) {
    const taskId = e.target.id
    taskId && deleteTask(taskId)
    return dispatch(getActiveClientTasks(selectedClient.id))
  }

  useEffect(() => {
    dispatch(getActiveClientTasks(selectedClient.id))
  }, [selectedClient])

  return (
    <div className="tasks">
      {selectedClient.business_name && (
        <SimpleGrid columns={4} spacing={10}>
          <Box w="50%">Task</Box>
          <Box>Hours</Box>
          <Box>Amount</Box>
          <Box>Action</Box>
        </SimpleGrid>
      )}

      {taskList?.data.length > 0 ? (
        taskList?.data.map((task) => (
          <SimpleGrid key={task.id} columns={4} spacing={10}>
            <Box>
              <>{task.description} </>
            </Box>
            <Box>
              <>{task.hours}</>
            </Box>
            <Box>
              <>${task.hours * selectedClient.rate}</>
            </Box>
            <Box>
              <Stack direction="row" align="center" spacing={1}>
                <Button
                  m={1}
                  colorScheme="teal"
                  size="sm"
                  id={task.id}
                  value={task.id}
                  onClick={handleDelete}
                >
                  x
                </Button>
                <EditTask value={{task, client_id: selectedClient.id}} />
              </Stack>
            </Box>
          </SimpleGrid>
        ))
      ) : (
        <>No uninvoiced tasks.</>
      )}
    </div>
  )
}
