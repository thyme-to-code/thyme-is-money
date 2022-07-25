import request from 'superagent'

const rootUrl = '/api/v1/invoices'

export function createInvoice(invoice) {
  return request
    .post(rootUrl + '/pdf')
    .send(invoice)
    .responseType('blob')
    .then((res) => {
      return res.body
    })
}

export function saveInvoice(invoice, items) {
  return request
    .post(rootUrl + '/')
    .send({ invoice, items })
    .then((res) => res.body)
}

export function getInvoicesByClient(id) {
  return request.get(rootUrl + '/client/' + Number(id)).then((res) => res.body)
}

export function getInvoices() {
  return request.get(rootUrl).then((res) => res.body)
}

export function getInvoiceCsv() {
  return request
    .get(`${rootUrl}/csv`)
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log(err)
    })
}
