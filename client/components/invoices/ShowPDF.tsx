import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../reducers/hooks'
import { Spinner } from '@chakra-ui/react'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'

import { createInvoice } from '../../apis/invoices'
import { setInvoiceJson, setInvoicePdfUrl } from '../../reducers/invoices'
import '../../styles/ShowPdf.css'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
}

function invoiceNumber() {
  const myDate = new Date()
  const dayOfMonth = myDate.getDate()
  const month = myDate.getMonth()
  const year = myDate.getFullYear()

  function pad(n: number): string {
    return n < 10 ? '0' + n : n.toString()
  }

  return year + pad(month + 1) + pad(dayOfMonth)
}

export function ShowPDF() {
  const dispatch = useAppDispatch()
  const { selected } = useAppSelector((state) => state.clients)
  const items = useAppSelector((state) => state.items)
  const { json, pdfUrl } = useAppSelector((state) => state.invoices.current)

  const [numPages, setNumPages] = useState(null)

  const clientItems = items.uninvoiced.filter(
    (item) => item.client_id === selected.id
  )

  const invoiceItems = clientItems.map((task) => ({
    name: task.description,
    quantity: task.quantity,
    unit_cost: selected.rate,
  }))

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  useEffect(() => {
    const invoice = {
      ...json,
      items: invoiceItems,
      to: `${selected.business_name}\nAttn: ${selected.contact_name}\n${selected.address}`,
      number: `${invoiceNumber()}-${selected.id}`,
    }
    dispatch(setInvoiceJson(invoice))
    createInvoice(invoice)
      .then((res) => {
        dispatch(setInvoicePdfUrl(URL.createObjectURL(res)))
      })
      .catch((err) => err)
  }, [])

  return pdfUrl ? (
    <div className="pdf">
      <div className="pdf__container">
        <div className="pdf__container__document">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Spinner color="green.400" /> Loading PDF ...
    </>
  )
}
