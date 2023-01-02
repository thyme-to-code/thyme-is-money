import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getClients } from '../apis/clients'
import { Item } from './items'

interface Client {
  id:number,
  user_id:number,
  business_name: string,
  contact_name: string,
  email: string,
  phone: string,
  address: string,
  rate:number,
  isActive:number,
  created_at: string,
  updated_at: string
}
interface Totals {
  amount: number,
  quantity: number
}
interface TotalData {
  items: Item[],
  rate: number
}
interface InitState {
  loading: boolean,
  active: Client[],
  selected: Client,
  totals: Totals 
}

const initialState = {
  loading: true,
  active: [],
  selected: {
    id: 0,
  },
  totals: {
    amount: 0,
    quantity: 0,
  },
}

export const getActiveClients = createAsyncThunk(
  'clients/getActiveClients',
  async (post, { rejectWithValue }) => {
    try {
      //TODO Change this to be active clients only once tasks reducer has been similarly modified
      return await getClients()
    } catch (err) {
      //TODO better error message
      return rejectWithValue('That failed')
    }
  }
)

export const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<Client>) => {
      state.selected = action.payload
    },
    clearSelectedClient: (state) => {
      state.selected = initialState.selected
    },
    setTotals: (state, action: PayloadAction<TotalData>) => {
      const { items, rate } = action.payload
      state.totals.quantity = 0
      items.forEach(
        (item) => !item.invoice_id && (state.totals.quantity += item.quantity)
      )
      state.totals.amount = state.totals.quantity * rate
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveClients.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getActiveClients.rejected, (state) => {
      state.loading = false
    })
    // look into typing for Redux Thunks
    builder.addCase(getActiveClients.fulfilled, (state, { payload }) => {
      state.loading = false
      state.active = payload
    })
  },
})

export const { setTotals, setSelectedClient, clearSelectedClient } =
  clientSlice.actions
export default clientSlice.reducer
