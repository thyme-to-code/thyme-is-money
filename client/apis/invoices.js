// @ts-check
import request from 'superagent'

const rootUrl = '/api/v1'

export function createInvoice(invoice) {
  return request
    .post(rootUrl + '/invoices/pdf')
    .send(invoice)
    .responseType('blob')
    .then((res) => {
      return res.body
    })
}

export function saveInvoice(invoice, items) {
  return request
    .post(rootUrl + '/invoices')
    .send({ invoice, items })
    .then((res) => res.body)
}

export function getInvoicesByClient(id) {
  return request
    .get(rootUrl + '/clients/' + id + '/invoices')
    .then((res) => res.body)
}

export function getInvoices() {
  return request.get(rootUrl + '/invoices').then((res) => res.body)
}

export function getInvoiceCsv() {
  return request
    .get(`${rootUrl}/invoices/csv`)
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log(err)
    })
}
