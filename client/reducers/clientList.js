import { createSlice } from '@reduxjs/toolkit'

let initialState = [] // array of {client}

export const clientListSlice = createSlice({
  name: 'clientList',
  initialState,
  reducers: {
    loadClients: (state, action) => {
      return action.payload
    },
  },
})

export const { loadClients } = clientListSlice.actions
export default clientListSlice.reducer
