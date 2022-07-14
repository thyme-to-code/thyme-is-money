import { createSlice } from '@reduxjs/toolkit'
// import { getAllClients } from '../apis/clients'

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
