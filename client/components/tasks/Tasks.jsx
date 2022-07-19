import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, SimpleGrid, Box } from '@chakra-ui/react'

import { deleteTask } from '../../apis/tasks'
import { getActiveClientTasks } from '../../reducers/taskList'

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
        <SimpleGrid columns={4} spacing={10} fontWeight="bold">
          <Box w="50%">Task</Box>
          <Box>Hours</Box>
          <Box>Amount</Box>
          <Box>Remove</Box>
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
              <Button
                m={1}
                bg="brand.100" color="brand.50" 
                _hover={{ bg: "brand.200" }}
                size="sm"
                id={task.id}
                value={task.id}
                onClick={handleDelete}
              >
                x
              </Button>
            </Box>
          </SimpleGrid>
        ))
      ) : (
        <>No uninvoiced tasks.</>
      )}
    </div>
  )
}
