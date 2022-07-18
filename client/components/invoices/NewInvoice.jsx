import React from 'react'
import { Button } from '@chakra-ui/react'

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
    tax: '%', //hard code
  },
  tax: 15, // what is this?
  notes: 'Thanks for being an awesome customer!',
  terms: 'No need to submit payment. You will be auto-billed for this invoice.',
}

// Click create client invoice
// Generates the invoice from API
// Display invoice
// Confirm the invoice (click Save)
// Save invoice to the db and mark the tasks as invoiced
// Prompt for save location

export function NewInvoice() {
  return (
    <>
      <Button colorScheme="teal">Create Invoice</Button>
      TAX INVOICE
    </>
  )
}
