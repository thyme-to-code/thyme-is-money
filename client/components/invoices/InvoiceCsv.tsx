// @ts-check
import React from 'react'
import { MenuItem } from '@chakra-ui/react'
import { MdOutlineTextSnippet } from 'react-icons/md'
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
      <MenuItem
        onClick={() => handleClick()}
        icon={<MdOutlineTextSnippet />}
        color="brand.200"
      >
        Download CSV
      </MenuItem>
    </>
  )
}
