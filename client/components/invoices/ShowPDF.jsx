import React, { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import { createInvoice } from '../../apis/invoices'

const invoiceTemplate = {
  logo: 'http://invoiced.com/img/logo-invoice.png', // hard code
  from: 'Invoiced\n701 Brazos St\nAustin, TX 78748', // hard code
  to: 'Johnny Appleseed', // From client data
  currency: 'NZD', // hard code
  number: 'INV-0001', // From Invoice table
  payment_terms: 'Auto-Billed - Do Not Pay', // hard coded
  items: [
    // Iterated from list of client task
    {
      name: 'Subscription to Starter',
      quantity: 1,
      unit_cost: 50, // Currently pulled from client data
    },
  ],
  fields: {
    tax: '%', // hard code
  },
  tax: 15, // hard code
  notes: 'Thanks for being an awesome customer!', // hard code
  terms: 'No need to submit payment. You will be auto-billed for this invoice.', // hard code
}

export function ShowPDF() {
  // const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const [pdf, setPDF] = useState('')

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  useEffect(() => {
    createInvoice(invoiceTemplate)
      .then((res) => {
        setPDF(URL.createObjectURL(res))
      })
      .catch((err) => err)
  }, [])

  return (
    <>
      <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </>
  )
}
