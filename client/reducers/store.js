import { configureStore } from '@reduxjs/toolkit'

import clientList from './clientList'
import clients from './clients'
import taskList from './taskList'
import invoiceList from './invoiceList'
import user from './user'

export const store = configureStore({
  reducer: {
    clientList,
    clients,
    taskList,
    user,
    invoiceList,
  },
})
