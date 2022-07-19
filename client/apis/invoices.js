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

export function saveInvoice(invoice) {
  return request
    .post(rootUrl + '/create')
    .send(invoice)
    .then((res) => res.body)
}
