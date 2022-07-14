import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let initialState = {
  data: [],
  loading: false,
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
  },
})

export default taskListSlice.reducer
