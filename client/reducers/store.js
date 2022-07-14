import { configureStore } from '@reduxjs/toolkit'

import status from './status'
import clientList from './clientList'
import taskList from './taskList'

export const store = configureStore({
  reducer: {
    status,
    clientList,
    taskList,
  },
})
