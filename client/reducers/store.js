import { configureStore } from '@reduxjs/toolkit'

import clients from './clients'
import taskList from './taskList'
import items from './items'
import invoices from './invoices'
import user from './user'

export const store = configureStore({
  reducer: {
    clients,
    taskList,
    items,
    user,
    invoices,
  },
})
