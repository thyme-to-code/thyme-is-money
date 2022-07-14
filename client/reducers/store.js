import { configureStore } from '@reduxjs/toolkit'

import status from './status'
import clientList from './clientList'

export const store = configureStore({
  reducer: {
    // when we call useSelector (state.loading)
    status,
    clientList,
  },
})
