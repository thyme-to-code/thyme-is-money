import { createSlice } from '@reduxjs/toolkit'

const initialState = [] // array of {client}

export const clientListSlice = createSlice({
  name: 'clientList',
  initialState,
  reducers: {
    loadClients: (state, action) => {
      state = action.payload
    },
  },
})

export const { loadClients } = clientListSlice.actions
export default clientListSlice.reducer
