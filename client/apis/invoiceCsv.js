import request from 'superagent'
const rootUrl = '/api/v1/invoices'

export function getInvoiceData() {
  return request
    .get(`${rootUrl}/all`)
    .then((res) => {
      return res.body
    })
    .catch((err) => {
      console.log(err)
    })
}
