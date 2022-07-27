// @ts-check
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getInvoicesByClient, getInvoiceCsv } from '../apis/invoices'

const initialState = {
  client: [],
  all: [],
  invoicePdfUrl: '',
  loading: true,
  invoiceJson: {
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
}

export const getClientInvoiceList = createAsyncThunk(
  'invoiceList/getClientInvoiceList',
  async (clientId) => {
    const res = await getInvoicesByClient(clientId)
    return res
  }
)

export const getFullInvoiceList = createAsyncThunk(
  'invoiceList/getFullInvoiceList',
  async () => {
    const res = await getInvoiceCsv()
    return res
  }
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
    builder.addCase(getClientInvoiceList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getClientInvoiceList.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getClientInvoiceList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.client = payload
    })
    builder.addCase(getFullInvoiceList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getFullInvoiceList.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(getFullInvoiceList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.all = payload
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
