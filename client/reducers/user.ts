// @ts-check
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitState {
  auth0Id: string;
  email: string;
  token: string;
}

// state.user containts this object
const getInitialState = (): InitState => {
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
    setLoggedInUser: (state, action: PayloadAction<InitState>) => {
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
