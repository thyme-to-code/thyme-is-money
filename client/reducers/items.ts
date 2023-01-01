import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getItems } from '../apis/items'

interface Item {
  id: number,
  user_id: number,
  client_id: number,
  invoice_id: number,
  type: number,
  description: string, 
  quantity: number,
  cost: number,
  created_at: string,
  updated_at: string
}

interface InitState {
  loading: boolean,
  uninvoiced: Item[]
}

const initialState: InitState = {
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
    builder.addCase(getUninvoicedItems.fulfilled, (state, { payload }: PayloadAction<Item[]>) => {
      state.loading = false
      state.uninvoiced = payload
    })
  },
})

export default itemsSlice.reducer
