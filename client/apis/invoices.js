import request from 'superagent'

const rootUrl = '/api/v1/invoices'

export function createInvoice(invoice) {
  return request
    .post(rootUrl + '/createPDF')
    .send(invoice)
    .responseType('blob')
    .then((res) => {
      console.log('fetched')
      return res.body
    })
}

// const pdfFile = createInvoice(invoiceObj)

// var blobObj = new Blob([atob(data)], { type: "application/pdf" });
// var url = window.URL.createObjectURL(blobObj);
// document.getElementById("iframe-target").setAttribute("src", url);
