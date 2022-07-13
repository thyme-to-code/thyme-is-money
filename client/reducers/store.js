import { configureStore } from '@reduxjs/toolkit'

import loading from './loading'

export const store = configureStore({
  reducer: {
    // when we call useSelector (state.loading)
    loading,
  },
})
