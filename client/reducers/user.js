// @ts-check
import { createSlice } from '@reduxjs/toolkit'

// state.user containts this object
const getInitialState = () => {
  return {
    auth0Id: '',
    email: '',
    token: localStorage.getItem('token') || '',
  }
}

export const loggedInUserSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setLoggedInUser: (state, action) => {
      // state = { ...action.payload } doesn't seem to work
      state.auth0Id = action.payload.auth0Id
      state.email = action.payload.email
      state.token = action.payload.token
    },
    clearLoggedInUser: () => {
      return getInitialState()
    },
  },
})

export const { setLoggedInUser, clearLoggedInUser } = loggedInUserSlice.actions
export default loggedInUserSlice.reducer
