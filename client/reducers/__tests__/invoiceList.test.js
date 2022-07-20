import invoiceList, {
  setInvoiceJson,
  clearInvoiceJson,
  setInvoicePdfUrl,
  clearInvoicePdfUrl,
} from '../invoiceList'

describe('invoiceList reducers', () => {
  it('sets the payload data into the invoice JSON in state', () => {
    const oldState = {
      invoiceJson: {
        items: [],
      },
    }
    const action = setInvoiceJson({
      items: ['whittle arrows', 'polish armour'],
    })
    const newState = invoiceList(oldState, action)
    expect(newState.invoiceJson).toEqual(action.payload)
  })
  it('clears data from the invoice JSON in state', () => {
    const oldState = {
      invoiceJson: {
        items: ['repair ship', 'sew cloak'],
      },
    }
    const action = clearInvoiceJson()
    const newState = invoiceList(oldState, action)
    expect(newState.invoiceJson.items).toEqual([])
  })
  it('sets the invoice pdf url in state', () => {
    const oldState = {
      invoicePdfUrl: '',
    }
    const action = setInvoicePdfUrl('https://invoice.pdf')
    const newState = invoiceList(oldState, action)
    expect(newState.invoicePdfUrl).toEqual(action.payload)
  })
  it('clears the invoice pdf url in state', () => {
    const oldState = {
      invoicePdfUrl: 'https://thyme-invoice.pdf',
    }
    const action = clearInvoicePdfUrl()
    const newState = invoiceList(oldState, action)
    expect(newState.invoicePdfUrl).toBe('')
  })
})
