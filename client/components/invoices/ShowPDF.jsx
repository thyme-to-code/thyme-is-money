// @ts-check
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createInvoice } from '../../apis/invoices'
import { Spinner } from '@chakra-ui/react'
import { setInvoiceJson, setInvoicePdfUrl } from '../../reducers/invoiceList'

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
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

  function pad(n) {
    return n < 10 ? '0' + n : n
  }

  return year + pad(month + 1) + pad(dayOfMonth)
}

export function ShowPDF() {
  const dispatch = useDispatch()
  const { selectedClient } = useSelector((state) => state.clientList)
  const clientTasks = useSelector((state) => state.taskList.data)
  const { invoiceJson, invoicePdfUrl } = useSelector(
    (state) => state.invoiceList
  )

  const [numPages, setNumPages] = useState(null)

  const invoiceTasks = clientTasks.map((task) => ({
    name: task.description,
    quantity: task.quantity,
    unit_cost: selectedClient.rate,
  }))

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  useEffect(() => {
    const invoice = {
      ...invoiceJson,
      items: invoiceTasks,
      to: `${selectedClient.business_name}\nAttn: ${selectedClient.contact_name}\n${selectedClient.address}`,
      number: `${invoiceNumber()}-${selectedClient.id}`,
    }
    dispatch(setInvoiceJson(invoice))
    createInvoice(invoice)
      .then((res) => {
        dispatch(setInvoicePdfUrl(URL.createObjectURL(res)))
      })
      .catch((err) => err)
  }, [])

  return invoicePdfUrl ? (
    <div className="pdf">
      <div className="pdf__container">
        <div className="pdf__container__document">
          <Document
            file={invoicePdfUrl}
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
