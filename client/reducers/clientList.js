import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const rootUrl = 'http://localhost:3000/api/v1/clients'

let initialState = {
  data: [],
  loading: false,
}

export const getClients = createAsyncThunk(
  'clientsList/getClients',
  async (post, { rejectWithValue }) => {
    try {
      const res = await fetch(rootUrl).then((data) => data.json())
      return res
    } catch (err) {
      return rejectWithValue('That failed')
    }
  }
)

export const clientList = createSlice({
  name: 'clientList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClients.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getClients.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getClients.fulfilled, (state, { payload }) => {
      state.loading = false
      state.data = payload
    })
  },
})

export default clientList.reducer
