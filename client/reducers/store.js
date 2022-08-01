import { configureStore } from '@reduxjs/toolkit'

import clients from './clients'
import taskList from './taskList'
import tasks from './tasks'
import invoices from './invoices'
import user from './user'

export const store = configureStore({
  reducer: {
    clients,
    taskList,
    tasks,
    user,
    invoices,
  },
})
