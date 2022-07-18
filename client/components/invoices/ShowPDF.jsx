import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createInvoice } from '../../apis/invoices'
import { Spinner } from '@chakra-ui/react'
import { Tasks } from '../tasks/Tasks'
import taskList from '../../reducers/taskList'

import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import './ShowPdf.css'

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
  const { selectedClient } = useSelector((state) => state.clientList)
  const clientTasks = useSelector((state) => state.taskList.data)

  const [numPages, setNumPages] = useState(null)
  const [invoicePdf, setInvoicePdf] = useState('')

  const invoiceTasks = clientTasks.map((task) => ({
    name: task.description,
    quantity: task.hours,
    unit_cost: selectedClient.rate,
  }))

  const invoiceTemplate = {
    logo: 'http://invoiced.com/img/logo-invoice.png',
    from: '\nHappy Fly Company\n42 McFly Lance\nWellington\nNew Zealand',
    to: selectedClient.business_name,
    currency: 'NZD',
    number: `${invoiceNumber()}-${selectedClient.id}`,
    payment_terms: 'Please pay immediately',
    items: invoiceTasks,
    fields: {
      tax: '%',
    },
    tax: 15,
    notes: 'Thank you for your continued support. James McFly',
    terms: 'Please pay immediately.',
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  useEffect(() => {
    createInvoice(invoiceTemplate)
      .then((res) => {
        setInvoicePdf(URL.createObjectURL(res))
      })
      .catch((err) => err)
  }, [])

  return invoicePdf ? (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document">
          <Document
            file={invoicePdf}
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
