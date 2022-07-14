import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  selectedClient: 1,
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
  },
})

export const { setLoading, setSelectedClient } = statusSlice.actions
export default statusSlice.reducer
