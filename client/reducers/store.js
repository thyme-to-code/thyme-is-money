import { configureStore } from '@reduxjs/toolkit'

import clientList from './clientList'
import taskList from './taskList'

export const store = configureStore({
  reducer: {
    clientList,
    taskList,
  },
})
