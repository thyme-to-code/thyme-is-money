import React from 'react'
import { Button } from '@chakra-ui/react'
import * as dfd from 'danfojs'
import { getInvoiceData } from '../../apis/invoiceCsv'

export function InvoiceCsv() {
  function handleClick() {
    let df_data = []

    return getInvoiceData().then((invoiceData) => {
      const df_columns = Object.keys(invoiceData[0])

      invoiceData.map((invoiceData) => {
        const {
          invoice_number,
          total,
          date_sent,
          date_paid,
          client_id,
          business_name,
          contact_name,
          email,
          rate,
        } = invoiceData
        df_data.push([
          invoice_number,
          total,
          date_sent,
          date_paid,
          client_id,
          business_name,
          contact_name,
          email,
          rate,
        ])
      })
      let dataFrame = new dfd.DataFrame(df_data, {
        columns: df_columns,
      })
      console.log(dataFrame.head().print())
      dfd.toCSV(dataFrame, { fileName: 'invoices.csv', download: true })
    })
  }

  return (
    <>
      <Button colorScheme="whiteAlpha" onClick={() => handleClick()}>
        Download csv
      </Button>
    </>
  )
}
