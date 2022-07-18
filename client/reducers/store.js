import { configureStore } from '@reduxjs/toolkit'

import clientList from './clientList'
import taskList from './taskList'
import user from './user'

export const store = configureStore({
  reducer: {
    clientList,
    taskList,
    user
  },
})
