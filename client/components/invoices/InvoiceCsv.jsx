import React from 'react'
import { Button } from '@chakra-ui/react'
import * as dfd from 'danfojs'
import { getInvoiceCsv } from '../../apis/invoices'

export function InvoiceCsv() {
  function handleClick() {
    let df_data = []

    return getInvoiceCsv().then((invoiceData) => {
      const df_columns = Object.keys(invoiceData[0])

      invoiceData.map((invoiceData) => {
        const {
          invoice_number,
          total,
          date_sent,
          date_paid,
          amount_paid,
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
          amount_paid,
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
      dfd.toCSV(dataFrame, { fileName: 'invoices.csv', download: true })
    })
  }

  return (
    <>
      <Button
        onClick={() => handleClick()}
        bg="brand.100"
        mb={3}
        color="brand.50"
        _hover={{ bg: 'brand.200' }}
      >
        Download CSV
      </Button>
    </>
  )
}
