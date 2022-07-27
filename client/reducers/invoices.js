import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInvoiceCsv } from '../apis/invoices'

const initialState = {
  loading: true,
  all: [], // TODO adjust to recent
  current: {
    total: 0,
    amount: 0,
    pdfUrl: '',
    json: {
      header: 'TAX INVOICE',
      tax_title: 'GST',
      logo: 'https://whau.haume.nz/thyme.png',
      from: '\nThyme is Money Inc\n42 Thyme Lane\nWellington\nNew Zealand',
      to: '',
      currency: 'NZD',
      number: '',
      payment_terms: '7 days',
      items: [],
      fields: {
        tax: '%',
      },
      tax: 15,
      notes: 'Thank you for your continued support. - The Thyme Team',
      terms: '',
    },
  },
}

export const getInvoices = createAsyncThunk(
  'invoices/getInvoices',
  async () => {
    // TODO Rename this to get Invoices.
    // Can't think of a situation when we want the data set without client info
    return await getInvoiceCsv()
  }
)

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    //TODO investigate combining these into an updateCurrentInvoice reducer.
    // Where action.payload = { total: 121 }
    // so we can do things like this state.current = action.payload
    // Will this update all of state.current or only the state.current.total key
    // working on the immer library. It may not work quite as expected.
    setInvoiceJson: (state, action) => {
      state.current.json = action.payload
    },
    setInvoicePdfUrl: (state, action) => {
      state.current.pdfUrl = action.payload
    },
    clearCurrentInvoice: (state) => {
      URL.revokeObjectURL(state.invoicePdfUrl)
      state.current = initialState.current
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvoices.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getInvoices.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getInvoices.fulfilled, (state, { payload }) => {
      state.loading = false
      state.all = payload
    })
  },
})

export const { setInvoiceJson, setInvoicePdfUrl, clearCurrentInvoice } =
  invoicesSlice.actions
export default invoicesSlice.reducer
