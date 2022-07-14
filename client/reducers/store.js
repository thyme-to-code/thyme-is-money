import { configureStore } from '@reduxjs/toolkit'

import status from './status'
import { clientListReducer } from './clientList'
import taskList from './taskList'

export const store = configureStore({
  reducer: {
    status,
    clientListReducer,
    taskList,
  },
})
