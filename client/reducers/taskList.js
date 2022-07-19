import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addTask, updateTask } from '../apis/tasks'

const initialState = {
  data: [],
  uninvoiced: {
    amount: 0,
    hours: 0,
  },
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

export const updateClientTask = createAsyncThunk(
  'taskList/updateClientTask',
  async (task) => {
    const response = await updateClientTask(task)
    return response
  }
)

export const taskListSlice = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    setUninvoicedTotals: (state, action) => {
      const { tasks, rate } = action.payload
      state.uninvoiced.hours = 0
      tasks.forEach(
        (task) => !task.invoice_id && (state.uninvoiced.hours += task.hours)
      )
      state.uninvoiced.amount = state.uninvoiced.hours * rate
    },
  },
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
    builder.addCase(updateClientTask.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateClientTask.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(updateClientTask.fulfilled, (state, action) => {
      state.loading = false
      // UNSURE
      // state.data.push(action.payload)
    })
  },
})

export const { setUninvoicedTotals } = taskListSlice.actions
export default taskListSlice.reducer
