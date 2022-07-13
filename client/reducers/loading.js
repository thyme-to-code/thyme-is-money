import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    // functions/actions
    toggle: (state) => {
      state.isLoading = !state.isLoading
    },
    setState: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { toggle, setState } = loadingSlice.actions
export default loadingSlice.reducer
