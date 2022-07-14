import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import request from 'superagent'

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

// export const clientList = createSlice({
//   name: 'clientList',
//   initialState,
//   reducers: {
//     // loadClients: (state, action) => {
//     //   return action.payload
//     // },
//   },
//   extraReducers: {
//     [getClients.pending]: (state) => {
//       state.loading = true
//     },
//     [getClients.fulfilled]: (state, { payload }) => {
//       state.loading = false
//       state.data = payload
//     },
//     [getClients.rejected]: (state) => {
//       state.loading = false
//     },
//   },
// })

// export const { loadClients } = clientListSlice.actions
export default clientList.reducer
// export const clientList = clientListSlice.reducer
