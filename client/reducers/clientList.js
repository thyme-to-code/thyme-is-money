import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import request from 'superagent'

const rootUrl = '/api/v1/clients'

let initialState = {
  data: [],
  loading: false,
}

const getClients = createAsyncThunk(
  'clientsList/getClients',
  async (thunkAPI) => {
    const res = await fetch(rootUrl).then((data) => data.json())
    return res
  }
)

export const clientListSlice = createSlice({
  name: 'clientList',
  initialState,
  reducers: {
    // loadClients: (state, action) => {
    //   return action.payload
    // },
  },
  extraReducers: {
    [getClients.pending]: (state) => {
      state.loading = true
    },
    [getClients.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.data = payload
    },
    [getClients.rejected]: (state) => {
      state.loading = false
    },
  },
})

// export const { loadClients } = clientListSlice.actions
// export default clientListSlice.reducer
export const clientListReducer = clientListSlice.reducer
