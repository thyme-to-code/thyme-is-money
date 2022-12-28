import { configureStore } from '@reduxjs/toolkit'

import clients from './clients'
import items from './items'
import invoices from './invoices'
import user from './user'

export const store = configureStore({
  reducer: {
    clients,
    items,
    user,
    invoices,
  },
})

export type RootState = ReturnType<typeof store.getState>
