// @ts-check
import { configureStore } from '@reduxjs/toolkit'

import clients from './clients'
import taskList from './taskList'
import invoiceList from './invoiceList'
import user from './user'

export const store = configureStore({
  reducer: {
    clients,
    taskList,
    user,
    invoiceList,
  },
})
