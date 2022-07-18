import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { createInvoice } from '../../apis/invoices'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
// import { use } from '../../../server/routes/tasks'

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

// Click create client invoice
// Generates the invoice from API
// Display invoice
// Confirm the invoice (click Save)
// Save invoice to the db and mark the tasks as invoiced
// Prompt for save location

export function NewInvoice() {
  const [pageNumber, setPageNumber] = useState(1)
  const [pdf, setPDF] = useState('')

  let res
  let pdfURL
  let invoice

  async function handleClick(e) {
    e.preventDefault()
    res = await createInvoice(invoiceTemplate)
    console.log('response', res)
    invoice = new Blob([res], { type: 'application/pdf' })
    console.log('invoice', invoice)
    pdfURL = URL.createObjectURL(res)
    setPDF(res)
    console.log('pdfURL', pdfURL)
  }

  return (
    <>
      <Button onClick={handleClick} colorScheme="teal">
        Create Invoice
      </Button>
      {/* <Document file="https://assets.ctfassets.net/l3l0sjr15nav/29D2yYGKlHNm0fB2YM1uW4/8e638080a0603252b1a50f35ae8762fd/Get_Started_With_Smallpdf.pdf"> */}
      <Document file={pdf}>
        <Page pageNumber={pageNumber} />
      </Document>
    </>
  )
}
