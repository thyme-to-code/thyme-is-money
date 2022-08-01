import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getItems } from '../apis/items'

const initialState = {
  loading: true,
  uninvoiced: [],
}

export const getUninvoicedItems = createAsyncThunk(
  'items/getUninvoicedItems',
  async () => {
    try {
      return await getItems('?invoiced=no')
    } catch (err) {
      return err
    }
  }
)

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUninvoicedItems.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getUninvoicedItems.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getUninvoicedItems.fulfilled, (state, { payload }) => {
      state.loading = false
      state.uninvoiced = payload
    })
  },
})

export default itemsSlice.reducer
