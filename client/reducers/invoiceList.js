import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  clientList: [],
  invoiceJson: {
    header: 'TAX INVOICE',
    tax_title: 'GST',
    logo: 'https://whau.haume.nz/thyme.png',
    from: '\nThyme is Money Inc\n42 Thyme Lane\nWellington\nNew Zealand',
    to: '',
    currency: 'NZD',
    number: '',
    payment_terms: 'Please pay within 7 days',
    items: [],
    fields: {
      tax: '%',
    },
    tax: 15,
    notes: 'Thank you for your continued support. - The Thyme Team',
    terms: '',
  },
  invoicePdfUrl: '',
  loading: true,
}

export const getClientInvoiceList = createAsyncThunk(
  'invoiceList/getInvoiceList',
  async (clientId) => {
    const res = await getClientInvoiceList(clientId)
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
