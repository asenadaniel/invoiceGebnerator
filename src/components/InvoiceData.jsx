import { format, parseISO } from 'date-fns';
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteInvoice, markAsPaid } from '../store/invoiceSlice';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';



function InvoiceData({ invoice }) {

  console.log(invoice)

  const dispatch = useDispatch()



  const handleMarkAsPaid = () => {
    dispatch(markAsPaid(invoice.id))
  }

  const handleDelete = () => {
    dispatch(deleteInvoice(invoice.id))
  }

  const formDate = (date) => {
    try {
      return format(parseISO(date), 'dd-MMM-yyyy');
    } catch {
      return 'Invalid Date';
    }
  }



  return (
    <div className='bg-slate-800 rounded-lg p-8'>
      <div className=' flex justify-between items-center mb-8'>
        <div className=' flex items-center space-x-4'>
          <span>Status</span>
          <div
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${invoice.status === 'paid'
              ? 'bg-green-900 text-green-200'
              : invoice.status === 'pending'
                ? 'bg-yellow-950 text-white'
                : 'bg-slate-700 text-slate-400'}`
            }>
            <span className='text-2xl capitalize '>{invoice.status}</span>
          </div>
        </div>
        <div className=' flex items-center space-x-4'>
          <button className=' px-6 py-3  bg-red-950 hover:bg-red-800' onClick={handleDelete}>
            Delete
          </button>
          <button className=' px-6 py-3  bg-green-950 hover:bg-green-800 ' onClick={handleMarkAsPaid}>
            Mark as Paid
          </button>

          <PDFDownloadLink document={<InvoicePDF invoice={invoice} />} fileName={`Invoice_${invoice.id}.pdf`}>
            {({ loading }) =>
              loading ? (
                <button className="px-6 py-3 bg-blue-700">Loading...</button>
              ) : (
                <button className="px-6 py-3 bg-blue-700 hover:bg-blue-600">Download PDF</button>
              )
            }
          </PDFDownloadLink>

        </div>
      </div>

      <div className=' bg-slate-900 rounded-lg p-8'>
        <div className=' flex justify-between mb-8'>
          <div>
            <h2 className=' text-xl font-bold mb-2'>{invoice.id}</h2>
            <p className=' text-slate-400'>{invoice.description}</p>
          </div>
          <div className=' text-right text-slate-400'>
            <p>{invoice.billFrom.streetAddress}</p>
            <p>{invoice.billFrom.city}</p>
            <p>{invoice.billFrom.postCode}</p>
            <p>{invoice.billFrom.country}</p>
          </div>
        </div>

        <div className=' grid grid-cols-2 gap-8 mb-8'>
          <div>
            <p className=' text-slate-400 mb-2'>Invoice Date </p>
            <p className=' font-bold'>{formDate(invoice.
              invoiceDate
            )}</p>
            <p className=' text-slate-400 mb-2'>Payment Due</p>
            <p className='font-bold'>{formDate(invoice.
              dueDate
            )}</p>
          </div>
          <div>
            <p className=' text-slate-400 mb-2'>Bill to</p>
            <p className=' font-bold mb-2 '>{invoice.clientName}</p>
            <p className='text-slate-400'>{invoice.billTo.streetAddress}</p>
            <p className='text-slate-400'>{invoice.billTo.city}</p>
            <p className='text-slate-400'>{invoice.billTo.postCode}</p>
            <p className='text-slate-400'>{invoice.billTo.country}</p>
          </div>
          <div>
            <p className=' text-slate-400 mb-2'>Sent to</p>
            <p className=' font-bold mb-2'>{invoice.clientName}</p>
          </div>
        </div>

        <div className=' bg-slate-800 rounded-lg overflow-hidden'>
          <div className=' p-8'>
            <table className=' w-full'>
              <thead>
                <tr className=' text-slate-400'>
                  <th className=' text-left'>Item Name</th>
                  <th className=' text-center'> Quantity</th>
                  <th className=' text-right'> Price</th>
                  <th className=' text-right'>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => {

                  return (
                    <tr className='  text-white' key={index}>
                      <td className=' text-left'>{item.name}</td>
                      <td className=' text-center'> {item.quantity}</td>
                      <td className=' text-right'>₦ {item.price.toFixed(2)}</td>
                      <td className=' text-right'>₦ {item.total.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className=' bg-slate-950 p-8 flex justify-between items-center'>
            <span className=' text-white'>Amount Due</span>
            <span className=' text-3xl font-bold'>₦ {invoice.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceData
