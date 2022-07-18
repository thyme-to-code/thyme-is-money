import { createSlice } from '@reduxjs/toolkit'

// state.user containts this object
const initialState = {
  auth0Id: '',
  email: '',
  token: '',
}

export const loggedInUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state = action.payload
    },
    clearLoggedInUser: (state = initialState) => {
      state
    },
  },
})

export const { setLoggedInUser } = loggedInUserSlice.actions
export default loggedInUserSlice.reducer


