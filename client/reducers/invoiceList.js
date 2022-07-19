import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  invoiceJson: {
    logo: 'http://invoiced.com/img/logo-invoice.png',
    from: '\nHappy Fly Company\n42 McFly Lane\nWellington\nNew Zealand',
    to: '',
    currency: 'NZD',
    number: '',
    payment_terms: 'Please pay within 7 days',
    items: [],
    fields: {
      tax: '%',
    },
    tax: 15,
    notes: 'Thank you for your continued support. James McFly',
    terms: '',
  },
  invoicePdfUrl: '',
  loading: true,
}

export const getInvoiceList = createAsyncThunk(
  'invoiceList/getInvoiceList'
  // Hit GET /api/v1/invoices
)

export const invoiceListSlice = createSlice({
  name: 'invoiceList',
  initialState,
  reducers: {
    setInvoiceJson: (state, action) => {
      state.invoiceJson = action.payload
    },
    clearInvoiceJson: (state) => {
      state.invoiceJson = initialState.invoiceJson
    },
    setInvoicePdfUrl: (state, action) => {
      state.invoicePdfUrl = action.payload
    },
    clearInvoicePdfUrl: (state) => {
      URL.revokeObjectURL(state.invoicePdfUrl)
      state.invoicePdfUrl = initialState.invoicePdfUrl
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInvoiceList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getInvoiceList.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getInvoiceList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.list = payload
    })
  },
})

export const {
  setInvoiceJson,
  clearInvoiceJson,
  setInvoicePdfUrl,
  clearInvoicePdfUrl,
} = invoiceListSlice.actions
export default invoiceListSlice.reducer
