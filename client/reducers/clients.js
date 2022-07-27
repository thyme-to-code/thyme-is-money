import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getClients } from '../apis/clients'

const initialState = {
  active: [],
  selected: {},
  loading: true,
}

export const getActiveClients = createAsyncThunk(
  'clients/getActiveClients',
  async (post, { rejectWithValue }) => {
    try {
      //TODO Change this to be active clients only once tasks reducer has been similarly modified
      return await getClients()
    } catch (err) {
      //TODO better error message
      return rejectWithValue('That failed')
    }
  }
)

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action) => {
      state.selected = action.payload
    },
    clearSelectedClient: (state) => {
      state.selected = {}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveClients.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getActiveClients.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getActiveClients.fulfilled, (state, { payload }) => {
      state.loading = false
      state.active = payload
    })
  },
})

export const { setSelectedClient, clearSelectedClient } = clientSlice.actions
export default clientSlice.reducer
