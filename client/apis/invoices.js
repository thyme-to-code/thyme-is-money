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
