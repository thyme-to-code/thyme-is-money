import request from 'superagent'

const rootUrl = '/api/v1/invoices'

export function createInvoice(invoice) {
  return request
    .post(rootUrl + '/createPDF')
    .send(invoice)
    .responseType('blob')
    .then((res) => {
      return res.body
    })
}

export function saveInvoice(invoice, items) {
  return request
    .post(rootUrl + '/create')
    .send({ invoice, items })
    .then((res) => res.body)
}

export function getInvoicesByClient(id) {
  return request.get(rootUrl + '/client/' + Number(id)).then((res) => res.body)
}

export function getInvoices() {
  return request.get(rootUrl + '/all/').then((res) => res.body)
}
