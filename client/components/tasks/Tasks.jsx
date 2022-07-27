// @ts-check
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  IconButton,
  Heading,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react'
import { MdDeleteForever } from 'react-icons/md'

import { deleteTask } from '../../apis/tasks'
import { getActiveClientTasks } from '../../reducers/taskList'
import { EditTask } from './EditTask'

export function Tasks() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const taskList = useSelector((state) => state.taskList)

  function handleDelete(id) {
    deleteTask(id)
    dispatch(getActiveClientTasks(selectedClient.id))
  }

  useEffect(() => {
    dispatch(getActiveClientTasks(selectedClient.id))
  }, [selectedClient])

  if (taskList.loading) {
    return <>Loading ...</>
  }

  return (
    <div className="tasks">
      <TableContainer mr={5}>
        <Table p="1" variant="striped" colorScheme="table">
          {/* borderColor="brand.500" borderWidth="1px" borderRadius="lg" */}

          {selectedClient.business_name && (
            <Thead color="brand.100">
              <Tr>
                <Td py="1">
                  <Heading as="h3" size="md">
                    Uninvoiced Tasks
                  </Heading>
                </Td>
                <Td py="1" isNumeric={true}>
                  <Heading as="h3" size="md">
                    Hours
                  </Heading>
                </Td>
                <Td py="1" isNumeric={true}>
                  <Heading as="h3" size="md">
                    Amount
                  </Heading>
                </Td>
                <Td px={2} py="1" isNumeric={true}></Td>
              </Tr>
            </Thead>
          )}

          {taskList?.data.length > 0 ? (
            <Tbody>
              {taskList?.data.map((task) => (
                <Tr key={task.id}>
                  <Td py="1">{task.description}</Td>
                  <Td py="1" isNumeric={true}>
                    {task.quantity}
                  </Td>
                  <Td py="1" isNumeric={true}>
                    $
                    {(task.quantity * selectedClient.rate).toLocaleString(
                      'en-US'
                    )}
                  </Td>
                  <Td px="2" py="1" isNumeric={true}>
                    <EditTask value={{ task, client_id: selectedClient.id }} />
                    <IconButton
                      fontSize="1.4em"
                      size="sm"
                      bg="brand.400"
                      color="brand.50"
                      _hover={{ bg: 'brand.500' }}
                      id={task.id}
                      value={task.id}
                      onClick={() => handleDelete(task.id)}
                      icon={<MdDeleteForever />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              <Tr key="dafe">
                <Td py="3.5">No tasks. Do some Work!</Td>
                <Td py="3.5"></Td>
                <Td py="3.5"></Td>
                <Td py="3.5"></Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </div>
  )
}
