import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const rootUrl = '/api/v1/clients'

const initialState = {
  data: [],
  loading: true,
  selectedClient: {},
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

export const clientListSlice = createSlice({
  name: 'clientList',
  initialState,
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
  },
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

export const { setSelectedClient } = clientListSlice.actions
export default clientListSlice.reducer
