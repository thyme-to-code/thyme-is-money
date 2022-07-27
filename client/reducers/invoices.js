// @ts-check
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
      // Would it be worth having a seperate templates piece of state?
      // Future feature perhaps; Selectable invoice templates.
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
    setInvoiceJson: (state, action) => {
      state.invoiceJson = action.payload
    },
    setInvoicePdfUrl: (state, action) => {
      state.invoicePdfUrl = action.payload
    },
    clearCurrentInvoice: (state) => {
      URL.revokeObjectURL(state.invoicePdfUrl)
      // This is a potential option here but it will clear our totals and amount values.
      // This wouldn't be a problem as long as we ensure it's set again on return to client details
      // state.current = initialState.current
      state.current.pdfUrl = initialState.current.pdfUrl
      state.current.json = initialState.current.json
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
