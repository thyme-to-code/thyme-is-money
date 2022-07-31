import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTasks } from '../apis/tasks'

const initialState = {
  loading: true,
  uninvoiced: [],
}

export const getUninvoicedTasks = createAsyncThunk(
  'taskList/getUninvoicedTasks',
  async () => {
    try {
      return await getTasks('?invoiced=no')
    } catch (err) {
      return err
    }
  }
)

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUninvoicedTasks.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUninvoicedTasks.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getUninvoicedTasks.fulfilled, (state, { payload }) => {
      state.loading = false
      state.uninvoiced = payload
    })
  },
})

export default tasksSlice.reducer
