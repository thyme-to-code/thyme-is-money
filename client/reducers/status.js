import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedClient: {},
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setSelectedClient: (state, action) => {
      state.selectedClient = action.payload
    },
  },
})

export const { setLoading, setSelectedClient } = statusSlice.actions
export default statusSlice.reducer
