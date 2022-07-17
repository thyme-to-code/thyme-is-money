import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addTask } from '../apis/tasks'

const initialState = {
  data: [],
  loading: true,
}

export const getActiveClientTasks = createAsyncThunk(
  'taskList/getActiveClientTasks',
  async (clientId) => {
    try {
      const res = await fetch(
        `/api/v1/tasks/${clientId}?status=uninvoiced`
      ).then((data) => data.json())
      return res
    } catch (err) {
      return
    }
  }
)

export const addClientTask = createAsyncThunk(
  'taskList/addClientTask',
  async (task) => {
    const response = await addTask(task)
    return response
  }
)

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActiveClientTasks.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getActiveClientTasks.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getActiveClientTasks.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
    builder.addCase(addClientTask.pending, (state) => {
      state.loading = true
    })
    builder.addCase(addClientTask.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(addClientTask.fulfilled, (state, action) => {
      state.loading = false
      state.data.push(action.payload)
    })
  },
})

export default taskListSlice.reducer
