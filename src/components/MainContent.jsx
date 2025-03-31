import React from 'react'
import Header from './Header'
import InvoiceList from './InvoiceList'
import InvoiceForm from './InvoiceForm'
import { useDispatch, useSelector } from 'react-redux'
import { toggleForm } from '../store/invoiceSlice'
import InvoiceData from './InvoiceData'



function MainContent() {

  const { isFormOpen, selectedInvoice } = useSelector((state) => state.invoices)
  const disapatch = useDispatch()

  const handleToggle = () => {
    disapatch(toggleForm())
  }


  return (
    <div className=' bg-slate-900 min-h-screen text-white'>
      <div className=' max-w-5xl mx-auto py-12 px-4'>
        <Header toggle={handleToggle} />
        {selectedInvoice ? <InvoiceData invoice={selectedInvoice} /> : <InvoiceList />}

        {isFormOpen && <InvoiceForm />}


      </div>
    </div>
  )
}

export default MainContent
