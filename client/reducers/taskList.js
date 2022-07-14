import { createSlice } from '@reduxjs/toolkit'

let initialState = [] // array of {client}

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    loadTasks: (state, action) => {
      return action.payload
    },
  },
})

export const { loadTasks } = taskListSlice.actions
export default taskListSlice.reducer
